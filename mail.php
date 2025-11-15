<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/vendor/autoload.php';

require 'vendor/autoload.php';

$statusMessage = '';
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];
try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'levonbakunts3@gmail.com';
    $mail->Password = 'fago gfkl muqh vfjg';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 465;
    $mail->CharSet = "UTF-8";
    $mail->setFrom($email, 'Website Form');
    $mail->addAddress('levonbakunts96@gmail.com', 'Levon Bakunts');

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

    if (!$mail->send()) {
        $message = "Error is sent message to $email";

    } else {
        $message = "Sent Message is successfully sent to $email!";
    }

    $response = ["message" => $message];

    header('Content-type: application/json');
    echo json_encode($response);
} catch (Exception $e) {
    $statusMessage = 'error';
    header("Location: index.html?status=$statusMessage");
    exit;
}
