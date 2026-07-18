<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Not POST']);
    exit;
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

// Test SMTP connection
$host = 'mail.ecmarquitectura.cl';
$port = 587;
$result = ['step' => 'start', 'name' => $name, 'email' => $email];

$fp = @fsockopen($host, $port, $errno, $errstr, 10);
if (!$fp) {
    $result['step'] = 'connect_failed';
    $result['error'] = "$errstr ($errno)";
    echo json_encode($result);
    exit;
}

$response = @fgets($fp, 512);
$result['step'] = 'connected';
$result['banner'] = trim($response);

// Try STARTTLS
@fputs($fp, "EHLO ecmarquitectura.cl\r\n");
for ($i = 0; $i < 10; $i++) { $line = @fgets($fp, 512); if (strpos($line, '250 ') === 0) break; }

@fputs($fp, "STARTTLS\r\n");
$resp = @fgets($fp, 512);
$result['starttls'] = trim($resp);

if (strpos($resp, '220') === 0) {
    $crypto = @stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT);
    $result['tls_enabled'] = $crypto ? 'yes' : 'no';

    @fputs($fp, "EHLO ecmarquitectura.cl\r\n");
    for ($i = 0; $i < 10; $i++) { $line = @fgets($fp, 512); if (strpos($line, '250 ') === 0) break; }
}

// AUTH
@fputs($fp, "AUTH LOGIN\r\n");
$resp = @fgets($fp, 512);
$result['auth_prompt'] = trim($resp);

@fputs($fp, base64_encode('elizabeth@ecmarquitectura.cl') . "\r\n");
$resp = @fgets($fp, 512);
$result['user_resp'] = trim($resp);

@fputs($fp, base64_encode('Ab0ecd501') . "\r\n");
$resp = @fgets($fp, 512);
$result['pass_resp'] = trim($resp);

@fputs($fp, "QUIT\r\n");
@fclose($fp);

$result['step'] = 'done';
echo json_encode($result);
