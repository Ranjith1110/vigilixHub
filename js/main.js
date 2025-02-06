(function ($) {
    "use strict";
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    
})(jQuery);

document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    // Show an instant alert to the user
    alert("Submitting your request... Please wait...");

    const formData = {
        name: document.getElementById("name").value,
        company: document.getElementById("company").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value
    };

    try {
        let response = await fetch("http://localhost:5000/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        let result = await response.json();

        if (response.ok) {
            console.log("✅ Email sent successfully!", result);

            // Show success alert after email is sent
            alert("✅ Email sent successfully!");

            // Close the form modal (if using Bootstrap)
            $("#customPopupForm").modal("hide");

            // Show success popup after 500ms delay
            setTimeout(() => {
                $("#successPopup").modal("show");
            }, 500);

            // Clear form fields
            document.getElementById("contactForm").reset();
        } else {
            console.error("❌ Error:", result.error);
            alert("❌ Failed to send email. Please try again.");
        }
    } catch (error) {
        console.error("❌ Fetch Error:", error);
        alert("❌ Failed to send email.");
    }
});


