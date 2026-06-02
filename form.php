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
    // Bot detected - respond with success but don't send
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado, te responderemos pronto.']);
    exit;
}

// Sanitize and validate inputs
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields first
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'error' => 'Por favor completa todos los campos correctamente.']);
    exit;
}

// Validate email format strictly before any sanitization
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Por favor completa todos los campos correctamente.']);
    exit;
}

// Now sanitize all inputs consistently
$name = htmlspecialchars(strip_tags($name), ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(strip_tags($message), ENT_QUOTES, 'UTF-8');
$message = wordwrap($message, 70, "\n", true);

// Validate email one more time after sanitization to ensure no bypass
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Por favor completa todos los campos correctamente.']);
    exit;
}

// Build email headers - validate email is safe before using in header
$subject = "Nuevo mensaje desde el sitio web - $name";
$headers = "From: $from_email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "MIME-Version: 1.0\r\n";

$email_body = "Nombre: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Mensaje:\n$message\n";

// Send email
$sent = mail($to_email, $subject, $email_body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado, te responderemos pronto.']);
} else {
    echo json_encode(['success' => false, 'error' => 'Error al enviar el mensaje. Intenta nuevamente.']);
}