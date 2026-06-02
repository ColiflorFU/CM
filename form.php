<?php
/**
 * Contact Form Handler for Hostinger
 * Sends email via PHP mail() function
 */

header('Content-Type: application/json');

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido.']);
    exit;
}

// Configuration
$to_email = 'elizabethyelizabeth@gmail.com';
$from_email = 'noreply@contrerasmartinez.cl';

// Spam protection: honeypot field
if (!empty($_POST['website'])) {
    // Bot detected - silently "succeed" to not alert bots
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado, te responderemos pronto.']);
    exit;
}

// Sanitize and validate inputs
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
if (empty($name)) {
    echo json_encode(['success' => false, 'error' => 'Por favor completa todos los campos correctamente.']);
    exit;
}

if (empty($message)) {
    echo json_encode(['success' => false, 'error' => 'Por favor completa todos los campos correctamente.']);
    exit;
}

// Validate email format
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Por favor completa todos los campos correctamente.']);
    exit;
}

// Sanitize inputs to prevent injection
$name = htmlspecialchars(strip_tags($name), ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$message = strip_tags($message);
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
$message = wordwrap($message, 70, "\n", true);

// Build email
$subject = "Nuevo mensaje desde el sitio web - $name";
$headers = [
    'From' => $from_email,
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=UTF-8',
    'MIME-Version' => '1.0'
];
$header_string = '';
foreach ($headers as $key => $value) {
    $header_string .= "$key: $value\r\n";
}

$email_body = "Nombre: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Mensaje:\n$message\n";

// Send email
$sent = mail($to_email, $subject, $email_body, $header_string);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado, te responderemos pronto.']);
} else {
    echo json_encode(['success' => false, 'error' => 'Por favor completa todos los campos correctamente.']);
}
