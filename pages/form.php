<?php
/**
 * Contact Form Handler â€” Contreras MartÃ­nez
 * 
 * EnvÃ­a leads calificados a la arquitecta y auto-respuesta al cliente.
 * Soporta PHPMailer (vÃ­a Composer) con fallback a mail().
 * 
 * Modo de uso:
 *   1. En Hostinger: correr "composer install" para activar PHPMailer
 *   2. Sin Composer: funciona con mail() automÃ¡ticamente
 * 
 * ConfiguraciÃ³n SMTP (opcional, para delivery garantizado):
 *   Si querÃ©s usar Gmail SMTP en vez del mail() de Hostinger:
 *   1. ActivÃ¡ 2FA en tu Gmail
 *   2. GenerÃ¡ una "App Password" en https://myaccount.google.com/apppasswords
 *   3. ConfigurÃ¡ las constantes SMTP_* abajo
 */

header('Content-Type: application/json; charset=utf-8');

// â”€â”€â”€ CONFIGURACIÃ“N â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// A dÃ³nde llegan los leads
define('TO_EMAIL', 'elizabethyelizabeth@gmail.com');
define('TO_NAME', 'Elizabeth Contreras');

// De quiÃ©n parece venir el mail (usÃ¡ un dominio real cuando estÃ© configurado)
define('FROM_EMAIL', 'noreply@contrerasmartinez.cl');
define('FROM_NAME', 'Contreras MartÃ­nez Â· Web');

// â”€â”€â”€ SMTP (opcional) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Si completÃ¡s estos datos, PHPMailer los usa en vez de mail()
// DejÃ¡ vacÃ­o para usar mail() automÃ¡ticamente.

define('SMTP_HOST',     '');     // ej: 'smtp.gmail.com'
define('SMTP_PORT',     587);    // 587 (TLS) o 465 (SSL)
define('SMTP_USER',     '');     // tu email completo
define('SMTP_PASS',     '');     // App Password de Gmail
define('SMTP_ENCRYPT',  'tls');  // 'tls' o 'ssl'

// â”€â”€â”€ RATE LIMITING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Previene que un mismo IP envÃ­e muchos formularios seguidos.

define('RATE_LIMIT_WINDOW', 300);    // ventana en segundos (5 min)
define('RATE_LIMIT_MAX', 3);         // mÃ¡x de submits por ventana

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// Solo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'MÃ©todo no permitido.']);
    exit;
}

// â”€â”€â”€ HONEYPOT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Campo oculto â€” si tiene contenido, es un bot.

if (!empty($_POST['website'])) {
    // Respondemos Ã©xito para no alertar al bot
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado, te responderemos pronto.']);
    exit;
}

// â”€â”€â”€ RATE LIMITING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

$client_ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rate_file = sys_get_temp_dir() . '/cm_rate_' . md5($client_ip);

if (file_exists($rate_file)) {
    $data = json_decode(file_get_contents($rate_file), true);
    $window_start = $data['window'] ?? 0;
    $count = $data['count'] ?? 0;

    if (time() - $window_start < RATE_LIMIT_WINDOW) {
        if ($count >= RATE_LIMIT_MAX) {
            http_response_code(429);
            echo json_encode(['success' => false, 'error' => 'Enviaste varios mensajes muy seguido. EsperÃ¡ unos minutos e intentÃ¡ de nuevo.']);
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

// â”€â”€â”€ CAPTURA Y VALIDACIÃ“N â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

$fields = [
    'name'         => ['label' => 'Nombre',          'required' => true,  'max' => 100],
    'email'        => ['label' => 'Correo electrÃ³nico','required' => true, 'max' => 255],
    'phone'        => ['label' => 'TelÃ©fono',        'required' => false, 'max' => 30],
    'city'         => ['label' => 'Ciudad',          'required' => false, 'max' => 100],
    'project_type' => ['label' => 'Tipo de proyecto','required' => false, 'max' => 50],
    'message'      => ['label' => 'Mensaje',         'required' => true,  'max' => 5000],
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
        $errors[] = "{$cfg['label']} es demasiado largo (mÃ¡x {$cfg['max']} caracteres).";
        continue;
    }

    $input[$key] = $value;
}

// ValidaciÃ³n especÃ­fica de email
if ($input['email'] !== '' && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'El correo electrÃ³nico no tiene un formato vÃ¡lido.';
}

// Validar telÃ©fono si se ingresÃ³ (solo dÃ­gitos, +, -, espacios)
if ($input['phone'] !== '' && !preg_match('/^[0-9\s\+\-\(\)]{7,20}$/', $input['phone'])) {
    $errors[] = 'El telÃ©fono tiene un formato incorrecto.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// â”€â”€â”€ SANITIZACIÃ“N PARA OUTPUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

$safe = [];
foreach ($input as $key => $value) {
    $safe[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$safe_email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
if (!filter_var($safe_email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'El correo electrÃ³nico no es vÃ¡lido.']);
    exit;
}

// â”€â”€â”€ CONSTRUIR EMAILS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

$project_type_labels = [
    ''              => 'Sin especificar',
    'residencial'   => 'Residencial',
    'comercial'     => 'Comercial',
    'regularizacion'=> 'RegularizaciÃ³n',
    'otro'          => 'Otro',
];

$project_label = $project_type_labels[$input['project_type']] ?? htmlspecialchars($input['project_type']);

$lead_date = date('d/m/Y H:i');
$lead_phone = $input['phone'] ?: 'â€”';
$lead_city  = $input['city'] ?: 'â€”';

// â”€â”€ Email para la arquitecta (HTML) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

$subject_lead = "ðŸŸ¢ Nuevo lead â€” {$safe['name']} â€” {$project_label}";

$body_lead_html = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
.container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; }
.header { background: #1a1a2e; color: #fff; padding: 24px 32px; }
.header h1 { margin: 0; font-size: 20px; font-weight: 600; }
.header p { margin: 4px 0 0; font-size: 13px; opacity: 0.7; }
.body { padding: 24px 32px; }
.field { margin-bottom: 16px; }
.field-label { font-size: 11px; text-transform: uppercase; color: #888; letter-spacing: 1px; margin-bottom: 2px; }
.field-value { font-size: 15px; color: #1a1a2e; line-height: 1.4; }
.field-value a { color: #c9a94e; text-decoration: none; }
hr { border: none; border-top: 1px solid #eee; margin: 20px 0; }
.footer { padding: 16px 32px 24px; font-size: 12px; color: #999; text-align: center; }
.tag { display: inline-block; background: #c9a94e; color: #fff; font-size: 12px; padding: 2px 10px; border-radius: 3px; font-weight: 600; }
</style></head>
<body>
<div class="container">
<div class="header"><h1>ðŸŸ¢ Nuevo Lead</h1><p>{$lead_date}</p></div>
<div class="body">
<div class="field"><div class="field-label">Nombre</div><div class="field-value">{$safe['name']}</div></div>
<div class="field"><div class="field-label">Correo</div><div class="field-value"><a href="mailto:{$safe_email}">{$safe_email}</a></div></div>
<div class="field"><div class="field-label">TelÃ©fono</div><div class="field-value">{$lead_phone}</div></div>
<div class="field"><div class="field-label">Ciudad</div><div class="field-value">{$lead_city}</div></div>
<div class="field"><div class="field-label">Tipo de proyecto</div><div class="field-value"><span class="tag">{$project_label}</span></div></div>
<hr>
<div class="field"><div class="field-label">Mensaje</div><div class="field-value" style="white-space:pre-wrap;">{$safe['message']}</div></div>
</div>
<div class="footer">Contreras MartÃ­nez Â· Arquitectura Integral</div>
</div>
</body>
</html>
HTML;

$body_lead_text = "ðŸŸ¢ NUEVO LEAD
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Fecha: {$lead_date}

Nombre: {$safe['name']}
Email: {$safe_email}
TelÃ©fono: {$lead_phone}
Ciudad: {$lead_city}
Tipo de proyecto: {$project_label}

Mensaje:
{$input['message']}
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Contreras MartÃ­nez Â· Arquitectura Integral";

// â”€â”€ Auto-respuesta para el cliente â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

$subject_auto = "Recibimos tu mensaje â€” Contreras MartÃ­nez";

$body_auto_html = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
.container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; }
.header { background: #1a1a2e; color: #fff; padding: 24px 32px; }
.header h1 { margin: 0; font-size: 20px; font-weight: 600; }
.body { padding: 24px 32px; }
p { font-size: 15px; color: #333; line-height: 1.6; }
.signature { margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 13px; color: #666; }
.signature strong { color: #1a1a2e; }
.footer { padding: 16px 32px 24px; font-size: 12px; color: #999; text-align: center; }
</style></head>
<body>
<div class="container">
<div class="header"><h1>Recibimos tu mensaje</h1></div>
<div class="body">
<p>Hola <strong>{$safe['name']}</strong>,</p>
<p>Gracias por escribirnos. Recibimos tu consulta y en breve nos pondremos en contacto con vos para coordinar una conversaciÃ³n.</p>
<p>Mientras tanto, si necesitÃ¡s algo urgente, no dudes en escribirnos directamente a <a href="mailto:elizabeth@contrerasmartinez.cl">elizabeth@contrerasmartinez.cl</a> o llamarnos al <a href="tel:+56951278937">+56 9 5127 8937</a>.</p>
<div class="signature">
<strong>Elizabeth Contreras</strong><br>
Arquitecta â€” Contreras MartÃ­nez Â· Arquitectura Integral<br>
Paseo Ahumada 341, Of. 504, Santiago Centro
</div>
</div>
<div class="footer">Este mensaje fue generado automÃ¡ticamente desde nuestro sitio web.</div>
</div>
</body>
</html>
HTML;

$body_auto_text = "Hola {$safe['name']},

Gracias por escribirnos. Recibimos tu consulta y en breve nos pondremos en contacto con vos para coordinar una conversaciÃ³n.

Mientras tanto, si necesitÃ¡s algo urgente, no dudes en escribirnos directamente a elizabeth@contrerasmartinez.cl o llamarnos al +56 9 5127 8937.

â€”
Elizabeth Contreras
Arquitecta â€” Contreras MartÃ­nez Â· Arquitectura Integral
Paseo Ahumada 341, Of. 504, Santiago Centro";

// â”€â”€â”€ ENVÃO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// Intentar con PHPMailer si estÃ¡ disponible
$phpmailer_available = file_exists(__DIR__ . '/../vendor/autoload.php');

if ($phpmailer_available && SMTP_HOST !== '') {
    $sent = sendWithPHPMailer($safe_email, $safe['name']);
} elseif ($phpmailer_available) {
    $sent = sendWithPHPMailerMail($safe_email, $safe['name']);
} else {
    $sent = sendWithMail($safe_email, $safe['name']);
}

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado, te responderemos pronto.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al enviar el mensaje. Intenta nuevamente o escribinos directamente a elizabeth@contrerasmartinez.cl.']);
}

// â”€â”€â”€ FUNCIONES DE ENVÃO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * Enviar con PHPMailer + SMTP
 */
function sendWithPHPMailer(string $client_email, string $client_name): bool
{
    global $subject_lead, $body_lead_html, $body_lead_text,
           $subject_auto, $body_auto_html, $body_auto_text,
           $input;

    require __DIR__ . '/../vendor/autoload.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    $mail = new PHPMailer(true);

    try {
        // â”€â”€ Config SMTP â”€â”€
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = SMTP_ENCRYPT;
        $mail->Port       = SMTP_PORT;
        $mail->CharSet    = PHPMailer::CHARSET_UTF8;
        $mail->XMailer    = 'CM Website';

        // â”€â”€ Email 1: lead â†’ arquitecta â”€â”€
        $mail->clearAddresses();
        $mail->setFrom(FROM_EMAIL, FROM_NAME);
        $mail->addAddress(TO_EMAIL, TO_NAME);
        $mail->addReplyTo($client_email, $client_name);
        $mail->Subject = $subject_lead;
        $mail->isHTML(true);
        $mail->Body    = $body_lead_html;
        $mail->AltBody = $body_lead_text;
        $mail->send();

        // â”€â”€ Email 2: auto-respuesta â†’ cliente â”€â”€
        $mail->clearAddresses();
        $mail->setFrom(FROM_EMAIL, FROM_NAME);
        $mail->addAddress($client_email, $client_name);
        $mail->Subject = $subject_auto;
        $mail->isHTML(true);
        $mail->Body    = $body_auto_html;
        $mail->AltBody = $body_auto_text;
        $mail->send();

        return true;

    } catch (Exception $e) {
        error_log('PHPMailer error: ' . $e->getMessage());
        // Si falla PHPMailer, intentar con mail() como respaldo
        return sendWithMail($client_email, $client_name);
    }
}

/**
 * Enviar con PHPMailer usando mail() (sin SMTP)
 */
function sendWithPHPMailerMail(string $client_email, string $client_name): bool
{
    global $subject_lead, $body_lead_html, $body_lead_text,
           $subject_auto, $body_auto_html, $body_auto_text;

    require __DIR__ . '/../vendor/autoload.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    $mail = new PHPMailer(true);

    try {
        $mail->isMail();
        $mail->CharSet = PHPMailer::CHARSET_UTF8;
        $mail->XMailer = 'CM Website';

        // Email 1: lead
        $mail->clearAddresses();
        $mail->setFrom(FROM_EMAIL, FROM_NAME);
        $mail->addAddress(TO_EMAIL, TO_NAME);
        $mail->addReplyTo($client_email, $client_name);
        $mail->Subject = $subject_lead;
        $mail->isHTML(true);
        $mail->Body    = $body_lead_html;
        $mail->AltBody = $body_lead_text;
        $mail->send();

        // Email 2: auto-respuesta
        $mail->clearAddresses();
        $mail->setFrom(FROM_EMAIL, FROM_NAME);
        $mail->addAddress($client_email, $client_name);
        $mail->Subject = $subject_auto;
        $mail->isHTML(true);
        $mail->Body    = $body_auto_html;
        $mail->AltBody = $body_auto_text;
        $mail->send();

        return true;

    } catch (Exception $e) {
        error_log('PHPMailer(mail) error: ' . $e->getMessage());
        return sendWithMail($client_email, $client_name);
    }
}

/**
 * Enviar con mail() â€” respaldo sin PHPMailer
 */
function sendWithMail(string $client_email, string $client_name): bool
{
    global $subject_lead, $body_lead_html, $body_lead_text,
           $subject_auto, $body_auto_html, $body_auto_text;

    $separator = md5(uniqid((string) time(), true));

    // â”€â”€ Email 1: lead â†’ arquitecta â”€â”€

    $headers_lead  = "From: " . FROM_NAME . " <" . FROM_EMAIL . ">\r\n";
    $headers_lead .= "Reply-To: {$client_email}\r\n";
    $headers_lead .= "MIME-Version: 1.0\r\n";
    $headers_lead .= "Content-Type: multipart/alternative; boundary=\"{$separator}\"\r\n";

    $body_lead  = "--{$separator}\r\n";
    $body_lead .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $body_lead .= $body_lead_text . "\r\n\r\n";
    $body_lead .= "--{$separator}\r\n";
    $body_lead .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
    $body_lead .= $body_lead_html . "\r\n\r\n";
    $body_lead .= "--{$separator}--";

    $sent1 = mail(TO_EMAIL, $subject_lead, $body_lead, $headers_lead);

    // â”€â”€ Email 2: auto-respuesta â†’ cliente â”€â”€

    $separator2 = md5(uniqid((string) time(), true));

    $headers_auto  = "From: " . FROM_NAME . " <" . FROM_EMAIL . ">\r\n";
    $headers_auto .= "MIME-Version: 1.0\r\n";
    $headers_auto .= "Content-Type: multipart/alternative; boundary=\"{$separator2}\"\r\n";

    $body_auto  = "--{$separator2}\r\n";
    $body_auto .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $body_auto .= $body_auto_text . "\r\n\r\n";
    $body_auto .= "--{$separator2}\r\n";
    $body_auto .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
    $body_auto .= $body_auto_html . "\r\n\r\n";
    $body_auto .= "--{$separator2}--";

    $sent2 = mail($client_email, $subject_auto, $body_auto, $headers_auto);

    return $sent1 && $sent2;
}

