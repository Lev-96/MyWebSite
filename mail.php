<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/vendor/autoload.php';

function respond(array $payload, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($payload);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond([
        'success' => false,
        'message' => 'Method not allowed.',
    ], 405);
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond([
        'success' => false,
        'message' => 'Проверьте корректность заполнения полей и попробуйте снова.',
    ], 422);
}

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'levonbakunts3@gmail.com';
    $mail->Password = 'fago gfkl muqh vfjg';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom('levonbakunts3@gmail.com', 'Website Form');
    $mail->addAddress('levonbakunts96@gmail.com', 'Levon Bakunts');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = 'New Message from Website Form';
    $bodyContent = "
            <html>
                <head>
                    <style>
                        table { border-collapse: collapse; width: 100%; }
                        table, th, td { border: 1px solid black; }
                        th, td { padding: 8px; text-align: left; }
                    </style>
                </head>
                <body>
                    <h2>New Message from Website</h2>
                    <table>
                        <tr>
                            <th>Name</th>
                            <td>" . htmlspecialchars($name) . "</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>" . htmlspecialchars($email) . "</td>
                        </tr>
                        <tr>
                            <th>Message</th>
                            <td>" . nl2br(htmlspecialchars($message)) . "</td>
                        </tr>
                    </table>
                </body>
            </html>";
    $mail->Body = $bodyContent;
    $mail->AltBody = "You have a new message from $name ($email).\nMessage: $message";

    $mail->send();
    respond([
        'success' => true,
        'message' => 'Спасибо! Ваше сообщение успешно отправлено.',
    ]);
} catch (Exception $e) {
    error_log(sprintf('Contact form mailer error: %s', $e->getMessage()));
    respond([
        'success' => false,
        'message' => 'Не удалось отправить сообщение. Попробуйте позже.',
    ], 500);
}
