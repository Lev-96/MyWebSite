<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/vendor/autoload.php';

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_USERNAME = 'levonbakunts3@gmail.com';
const SMTP_PASSWORD = 'fago gfkl muqh vfjg';
const SMTP_FROM_NAME = 'Levon Bakunts';
const CONTACT_RECIPIENT = 'levonbakunts96@gmail.com';

function respond(array $payload, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($payload);
    exit;
}

function renderTemplate(string $path, array $replacements): string
{
    if (!file_exists($path)) {
        return buildFallbackBody($replacements);
    }

    $body = file_get_contents($path);
    if ($body === false) {
        return buildFallbackBody($replacements);
    }

    foreach ($replacements as $key => $value) {
        $body = str_replace('%' . $key . '%', $value, $body);
    }

    return $body;
}

function buildFallbackBody(array $replacements): string
{
    return sprintf(
        '<h2>New Message from Website</h2>
        <p><strong>Name:</strong> %s</p>
        <p><strong>Email:</strong> %s</p>
        <p><strong>Message:</strong><br>%s</p>',
        isset($replacements['name']) ? $replacements['name'] : '',
        isset($replacements['email']) ? $replacements['email'] : '',
        isset($replacements['message']) ? $replacements['message'] : ''
    );
}

function configureTransport(PHPMailer $mail, string $encryption, int $port): void
{
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = $encryption;
    $mail->Port = $port;
    $mail->CharSet = 'UTF-8';
    $mail->SMTPKeepAlive = true;
    $mail->isHTML(true);
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer'       => false,
            'verify_peer_name'  => false,
            'allow_self_signed' => true,
        ],
    ];
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond([
        'success' => false,
        'message' => 'Method not allowed.',
    ], 405);
}

$name = trim(isset($_POST['name']) ? $_POST['name'] : '');
$email = trim(isset($_POST['email']) ? $_POST['email'] : '');
$message = trim(isset($_POST['message']) ? $_POST['message'] : '');

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond([
        'success' => false,
        'message' => 'Please double-check the form fields and try again.',
    ], 422);
}

$sanitized = [
    'name'    => htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
    'email'   => htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
    'message' => nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')),
];

$templatePath = __DIR__ . '/template_mail.html';
$bodyContent = renderTemplate($templatePath, $sanitized);

$transports = [
    ['encryption' => PHPMailer::ENCRYPTION_STARTTLS, 'port' => 587],
    ['encryption' => PHPMailer::ENCRYPTION_SMTPS, 'port' => 465],
];

$lastError = null;

foreach ($transports as $transport) {
    try {
        $mail = new PHPMailer(true);
        configureTransport($mail, $transport['encryption'], $transport['port']);

        $mail->setFrom(SMTP_USERNAME, SMTP_FROM_NAME);
        $mail->addAddress(CONTACT_RECIPIENT);
        $mail->addReplyTo($email, $name);

        $mail->Subject = 'Submitting from a form Sirius Logistics';
        $mail->Body = $bodyContent;
        $mail->AltBody = "Name: $name\nEmail: $email\nMessage:\n$message";

        $mail->send();

        $mail->clearAddresses();
        $mail->clearReplyTos();

        $mail->setFrom(SMTP_USERNAME, SMTP_FROM_NAME);
        $mail->addAddress($email, $name);
        $mail->Subject = 'Sirius Logistics';
        $mail->Body = '<h1>Your letter has been successfully sent!</h1>';
        $mail->AltBody = 'Your letter has been successfully sent!';

        $mail->send();

        respond([
            'success' => true,
            'message' => 'Thank you! Your message was sent successfully.',
        ]);
    } catch (Exception $e) {
        $lastError = $e->getMessage();
    }
}

error_log(sprintf('Contact form mailer error (all transports failed): %s', $lastError ?? 'unknown'));
respond([
    'success' => false,
    'message' => 'Message delivery failed. Please try again later.',
], 502);
