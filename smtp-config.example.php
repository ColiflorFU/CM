<?php
/**
 * SMTP Configuration — Example Template
 *
 * Copy this file to the directory ABOVE public_html as smtp-config.php:
 *   /home/sites/42a/f/f4da23c179/smtp-config.php
 *
 * This file must NEVER be inside public_html.
 * It must return an associative array with the keys below.
 */

return [
    'host'       => 'mail.example.com',
    'port'       => 587,
    'user'       => 'your-account@example.com',
    'pass'       => 'your-smtp-password',
    'encrypt'    => 'tls',
    'from_email' => 'noreply@example.com',
    'from_name'  => 'Your Business Name',
    'to_email'   => 'receiving-address@example.com',
    'to_name'    => 'Receiving Name',
];
