<?php
/**
 * Contact Form Handler — Contreras Martinez
 *
 * Envía leads a Elizabeth y auto-respuesta al cliente via SMTP nativo.
 * Sin dependencias externas.
 */

header('Content-Type: application/json; charset=utf-8');

// --- SMTP CONFIG (loaded from outside document root) ---

$smtp_config_path = dirname(__DIR__, 2) . '/smtp-config.php';

if (!file_exists($smtp_config_path)) {
    error_log('CM contact form: smtp-config.php not found at ' . $smtp_config_path);
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error interno. Intenta de nuevo o escribinos a contacto@ecmarquitectura.cl.']);
    exit;
}

$smtp_cfg = require $smtp_config_path;

if (!is_array($smtp_cfg)
    || empty($smtp_cfg['host'])
    || empty($smtp_cfg['port'])
    || empty($smtp_cfg['user'])
    || empty($smtp_cfg['pass'])
    || empty($smtp_cfg['from_email'])
    || empty($smtp_cfg['from_name'])
    || empty($smtp_cfg['to_email'])
    || empty($smtp_cfg['to_name'])
) {
    error_log('CM contact form: smtp-config.php is missing required keys');
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error interno. Intenta de nuevo o escribinos a contacto@ecmarquitectura.cl.']);
    exit;
}

// --- Rate limiting
define('RATE_LIMIT_WINDOW', 300);
define('RATE_LIMIT_MAX', 3);

// --- SMTP constants from config ---
define('SMTP_HOST',    $smtp_cfg['host']);
define('SMTP_PORT',    $smtp_cfg['port']);
define('SMTP_USER',    $smtp_cfg['user']);
define('SMTP_PASS',    $smtp_cfg['pass']);
define('SMTP_ENCRYPT', $smtp_cfg['encrypt']);
define('SMTP_TIMEOUT', 10);
define('FROM_EMAIL',   $smtp_cfg['from_email']);
define('FROM_NAME',    $smtp_cfg['from_name']);
define('TO_EMAIL',     $smtp_cfg['to_email']);
define('TO_NAME',      $smtp_cfg['to_name']);

// --- Solo POST ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Metodo no permitido.']);
    exit;
}

// --- HONEYPOT ---
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado.']);
    exit;
}

// --- RATE LIMITING ---
$client_ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rate_file = sys_get_temp_dir() . '/cm_rate_' . md5($client_ip);

if (file_exists($rate_file)) {
    $data = json_decode(file_get_contents($rate_file), true);
    $window_start = $data['window'] ?? 0;
    $count = $data['count'] ?? 0;

    if (time() - $window_start < RATE_LIMIT_WINDOW) {
        if ($count >= RATE_LIMIT_MAX) {
            http_response_code(429);
            echo json_encode(['success' => false, 'error' => 'Enviaste varios mensajes seguido. Espera unos minutos.']);
            exit;
        }
        $data['count'] = $count + 1;
    } else {
        $data = ['window' => time(), 'count' => 1];
    }
} else {
    $data = ['window' => time(), 'count' => 1];
}
file_put_contents($rate_file, json_encode($data), LOCK_EX);

// --- CAPTURA Y VALIDACION ---

$fields = [
    'name'         => ['label' => 'Nombre',            'required' => true,  'max' => 100],
    'email'        => ['label' => 'Correo electronico', 'required' => true, 'max' => 255],
    'phone'        => ['label' => 'Telefono',          'required' => false, 'max' => 30],
    'project_type' => ['label' => 'Tipo de proyecto',  'required' => false, 'max' => 50],
    'message'      => ['label' => 'Mensaje',           'required' => true,  'max' => 5000],
];

$input = [];
$errors = [];

foreach ($fields as $key => $cfg) {
    $value = isset($_POST[$key]) ? trim($_POST[$key]) : '';

    if ($cfg['required'] && $value === '') {
        $errors[] = "{$cfg['label']} es obligatorio.";
        continue;
    }
    if ($value !== '' && mb_strlen($value) > $cfg['max']) {
        $errors[] = "{$cfg['label']} es demasiado largo.";
        continue;
    }
    $input[$key] = $value;
}

if (!empty($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'El correo electronico no es valido.';
}
if (!empty($input['phone']) && !preg_match('/^[0-9\s\+\-\(\)]{7,20}$/', $input['phone'])) {
    $errors[] = 'El telefono tiene un formato incorrecto.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// --- SANITIZACION ---

$safe = [];
foreach ($input as $key => $value) {
    $safe[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
$safe_email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);

// --- CONSTRUIR EMAILS ---

$project_labels = [
    ''               => 'Sin especificar',
    'residencial'    => 'Residencial',
    'comercial'      => 'Comercial',
    'regularizacion' => 'Regularizacion',
    'otro'           => 'Otro',
];
$project_label = $project_labels[$input['project_type']] ?? htmlspecialchars($input['project_type']);
$lead_date = date('d/m/Y H:i');
$lead_phone = $input['phone'] ?: '-';

// --- Email lead -> Elizabeth ---

$subject_lead = "Nuevo lead - {$safe['name']} - {$project_label}";

$lead_text = "NUEVO LEAD\nFecha: {$lead_date}\n\nNombre: {$safe['name']}\nEmail: {$safe_email}\nTelefono: {$lead_phone}\nTipo: {$project_label}\n\nMensaje:\n{$input['message']}\n\nContreras Martinez";

$lead_html = "<html><body style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;'>";
$lead_html .= "<div style='background:#1a1a2e;color:#fff;padding:20px;'><h2 style='margin:0;'>Nuevo Lead</h2><p style='margin:4px 0 0;opacity:.7;'>{$lead_date}</p></div>";
$lead_html .= "<div style='padding:20px;'>";
$lead_html .= "<p><strong>Nombre:</strong> {$safe['name']}</p>";
$lead_html .= "<p><strong>Email:</strong> <a href='mailto:{$safe_email}'>{$safe_email}</a></p>";
$lead_html .= "<p><strong>Telefono:</strong> {$lead_phone}</p>";
$lead_html .= "<p><strong>Tipo:</strong> {$project_label}</p>";
$lead_html .= "<hr style='border:none;border-top:1px solid #eee;margin:16px 0;'>";
$lead_html .= "<p><strong>Mensaje:</strong></p>";
$lead_html .= "<p style='white-space:pre-wrap;'>{$safe['message']}</p>";
$lead_html .= "</div></body></html>";

// --- Auto-respuesta -> cliente ---

$subject_auto = "Recibimos tu mensaje - Contreras Martinez";

$auto_text = "Hola {$safe['name']},\n\nGracias por escribirnos. Recibimos tu consulta y te responderemos pronto.\n\nMientras tanto, escribinos a elizabeth@ecmarquitectura.cl o llamanos al +56 9 5127 8937.\n\nElizabeth Contreras\nContreras Martinez - Arquitectura Integral";

$auto_html = "<html><body style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;'>";
$auto_html .= "<div style='background:#1a1a2e;color:#fff;padding:20px;'><h2 style='margin:0;'>Recibimos tu mensaje</h2></div>";
$auto_html .= "<div style='padding:20px;'>";
$auto_html .= "<p>Hola <strong>{$safe['name']}</strong>,</p>";
$auto_html .= "<p>Gracias por escribirnos. Recibimos tu consulta y te responderemos pronto.</p>";
$auto_html .= "<p>Mientras tanto, escribinos a <a href='mailto:elizabeth@ecmarquitectura.cl'>elizabeth@ecmarquitectura.cl</a> o llamanos al +56 9 5127 8937.</p>";
$auto_html .= "<p style='margin-top:24px;font-size:13px;color:#666;'><strong>Elizabeth Contreras</strong><br>Contreras Martinez - Arquitectura Integral<br>Paseo Ahumada 341, Of. 504, Santiago Centro</p>";
$auto_html .= "</div></body></html>";

// --- SMTP nativo ---

/**
 * Read full SMTP response (handles multi-line replies).
 *
 * SMTP multi-line rule: lines where the 4th character is a hyphen (e.g. "250-")
 * are continuation lines. When the 4th character is a space (e.g. "250 "), the
 * response is complete.
 *
 * Returns the full response string or false on timeout/EOF.
 */
function smtp_read_response($fp) {
    $response = '';
    $line = fgets($fp, 512);
    if ($line === false) {
        return false;
    }
    $response .= $line;

    // Multi-line: 4th char is '-' → more lines follow; ' ' → final line.
    while (isset($line[3]) && $line[3] === '-') {
        $line = fgets($fp, 512);
        if ($line === false) {
            return false;
        }
        $response .= $line;
    }

    return $response;
}

/**
 * Send an SMTP command and read + validate the response.
 *
 * @param resource $fp     Socket
 * @param string   $cmd    Command to send (without \r\n)
 * @param int      $expect Expected 3-digit code
 * @return string|false    Response on success, false on failure
 */
function smtp_command($fp, $cmd, $expect) {
    if ($cmd !== '') {
        fputs($fp, $cmd . "\r\n");
    }
    $response = smtp_read_response($fp);
    if ($response === false) {
        return false;
    }
    if (strpos($response, (string) $expect) !== 0) {
        return false;
    }
    return $response;
}

function smtp_send($to, $to_name, $subject, $html_body, $text_body, $reply_to) {
    $host = SMTP_HOST;
    $port = SMTP_PORT;
    $user = SMTP_USER;
    $pass = SMTP_PASS;

    $errno = 0;
    $errstr = '';
    $fp = fsockopen($host, $port, $errno, $errstr, 10);
    if (!$fp) {
        error_log("SMTP connect failed: $errstr ($errno)");
        return false;
    }
    stream_set_timeout($fp, SMTP_TIMEOUT);

    // Banner
    $banner = smtp_read_response($fp);
    if ($banner === false || strpos($banner, '220') !== 0) {
        fclose($fp);
        return false;
    }

    if (SMTP_ENCRYPT === 'tls') {
        // EHLO before STARTTLS
        if (smtp_command($fp, 'EHLO ecmarquitectura.cl', 250) === false) {
            fclose($fp);
            return false;
        }

        // STARTTLS
        $starttls = smtp_command($fp, 'STARTTLS', 220);
        if ($starttls === false) {
            fclose($fp);
            return false;
        }

        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)) {
            fclose($fp);
            return false;
        }
    }

    // EHLO after TLS (or plain)
    if (smtp_command($fp, 'EHLO ecmarquitectura.cl', 250) === false) {
        fclose($fp);
        return false;
    }

    // AUTH LOGIN
    if (smtp_command($fp, 'AUTH LOGIN', 334) === false) {
        fclose($fp);
        return false;
    }

    // Username
    if (smtp_command($fp, base64_encode($user), 334) === false) {
        fclose($fp);
        return false;
    }

    // Password
    if (smtp_command($fp, base64_encode($pass), 235) === false) {
        fclose($fp);
        return false;
    }

    // MAIL FROM
    if (smtp_command($fp, 'MAIL FROM:<' . FROM_EMAIL . '>', 250) === false) {
        fclose($fp);
        return false;
    }

    // RCPT TO
    if (smtp_command($fp, 'RCPT TO:<' . $to . '>', 250) === false) {
        fclose($fp);
        return false;
    }

    // DATA
    if (smtp_command($fp, 'DATA', 354) === false) {
        fclose($fp);
        return false;
    }

    // MIME body with unique boundary
    $boundary = md5(uniqid((string) time(), true));

    $headers = "From: " . FROM_NAME . " <" . FROM_EMAIL . ">\r\n";
    $headers .= "Reply-To: " . $reply_to . "\r\n";
    $headers .= "To: $to_name <$to>\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";
    $headers .= "\r\n";

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $body .= $text_body . "\r\n\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
    $body .= $html_body . "\r\n\r\n";
    $body .= "--{$boundary}--\r\n";

    $data_end = "\r\n.\r\n";

    // Send headers + body + end marker as one stream
    fwrite($fp, $headers . $body . $data_end);

    // Final "message accepted" response
    if (smtp_command($fp, '', 250) === false) {
        fclose($fp);
        return false;
    }

    // QUIT
    fputs($fp, "QUIT\r\n");
    fclose($fp);
    return true;
}

// --- ENVIAR ---

// Lead: Reply-To is visitor email so Elizabeth can reply to the visitor
$sent_lead = smtp_send(TO_EMAIL, TO_NAME, $subject_lead, $lead_html, $lead_text, $safe_email);

// Auto-respuesta: Reply-To is Elizabeth so visitor can reply to her
smtp_send($safe_email, $safe['name'], $subject_auto, $auto_html, $auto_text, FROM_EMAIL);

if ($sent_lead) {
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado, te responderemos pronto.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al enviar. Escribinos a elizabeth@ecmarquitectura.cl o llamanos al +56 9 5127 8937.']);
}
