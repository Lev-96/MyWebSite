<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: index.html?status=invalid');
    exit;
}

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'levonbakunts3@gmail.com';
    $mail->Password = 'fago gfkl muqh vfjg';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
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
    header('Location: index.html?status=success');
    exit;
} catch (Exception $e) {
    header('Location: index.html?status=error');
    exit;
}
