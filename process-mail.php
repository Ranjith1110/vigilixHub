<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

$mail = new PHPMailer(true);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $company = htmlspecialchars($_POST["company"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $message = htmlspecialchars($_POST["message"]);

    try {
        // SMTP Settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'vigilixhub@gmail.com'; // 🔴 Replace with your Gmail
        $mail->Password = 'zlrp cjku hpiz nxiq'; // 🔴 Replace with your Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email Setup
        $mail->setFrom($email, $name);
        $mail->addAddress('vigilixhub@gmail.com'); // 🔴 Replace with your email to receive messages
        $mail->Subject = "New Contact Form Submission";
        $mail->Body = "Name: $name\nCompany: $company\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";

        // Send email
        if ($mail->send()) {
            echo "Your message has been sent successfully!";
        } else {
            echo "Failed to send your message. Please try again.";
        }
    } catch (Exception $e) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
} else {
    http_response_code(405);
    echo "Error: Method Not Allowed.";
}
?>
