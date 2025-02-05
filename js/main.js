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
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        autoplayTimeout: 1500,
        smartSpeed: 600,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
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


