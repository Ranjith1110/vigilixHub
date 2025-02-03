<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $company = htmlspecialchars($_POST['company']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    $to = "ranjithram878@gmail.com"; // Replace with your email
    $subject = "New Contact Form Submission";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $body = "<h3>Contact Form Submission</h3>
             <p><strong>Name:</strong> $name</p>
             <p><strong>Company Name:</strong> $company</p>
             <p><strong>Email:</strong> $email</p>
             <p><strong>Phone Number:</strong> $phone</p>
             <p><strong>Message:</strong><br>$message</p>";

    // Debugging: Check if email function is working
    if (mail($to, $subject, $body, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
        error_log("Mail function failed.");
    }
} else {
    echo "Invalid request method.";
}
?>
