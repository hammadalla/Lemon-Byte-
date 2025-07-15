
const cursorDot = document.querySelector(".cursor-dot");
const cursorBorder = document.querySelector(".cursor-border");

let mouseX = 0, mouseY = 0;
let borderX = 0, borderY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
    borderX += (mouseX - borderX) * 0.1;
    borderY += (mouseY - borderY) * 0.1;

    cursorBorder.style.left = `${borderX}px`;
    cursorBorder.style.top = `${borderY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// تأثير الضغط
document.addEventListener("mousedown", () => {
    cursorDot.classList.add("active");
    cursorBorder.style.width = "70px";
    cursorBorder.style.height = "70px";
});

document.addEventListener("mouseup", () => {
    cursorDot.classList.remove("active");
    cursorBorder.style.width = "50px";
    cursorBorder.style.height = "50px";
});

// عند المرور فوق عناصر قابلة للنقر
const hoverTargets = ['a', 'button', 'input', 'textarea', '[data-hover]'];

document.addEventListener("mouseover", (e) => {
    if (hoverTargets.some(sel => e.target.matches(sel))) {
        cursorBorder.classList.add("hover");
    }
});

document.addEventListener("mouseout", (e) => {
    if (hoverTargets.some(sel => e.target.matches(sel))) {
        cursorBorder.classList.remove("hover");
    }
});




(function ($) {
    var wa_time_out, wa_time_in;
    $(document).ready(function () {
        $(".wa__btn_popup").on("click", function () {
            if ($(".wa__popup_chat_box").hasClass("wa__active")) {
                $(".wa__popup_chat_box").removeClass("wa__active");
                $(".wa__btn_popup").removeClass("wa__active");
                clearTimeout(wa_time_in);
                if ($(".wa__popup_chat_box").hasClass("wa__lauch")) {
                    wa_time_out = setTimeout(function () {
                        $(".wa__popup_chat_box").removeClass("wa__pending");
                        $(".wa__popup_chat_box").removeClass("wa__lauch");
                    }, 400);
                }
            } else {
                $(".wa__popup_chat_box").addClass("wa__pending");
                $(".wa__popup_chat_box").addClass("wa__active");
                $(".wa__btn_popup").addClass("wa__active");
                clearTimeout(wa_time_out);
                if (!$(".wa__popup_chat_box").hasClass("wa__lauch")) {
                    wa_time_in = setTimeout(function () {
                        $(".wa__popup_chat_box").addClass("wa__lauch");
                    }, 100);
                }
            }
        });

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        $("#nta-wa-gdpr").change(function () {
            if (this.checked) {
                setCookie("nta-wa-gdpr", "accept", 30);
                if (getCookie("nta-wa-gdpr") != "") {
                    $('.nta-wa-gdpr').hide(500);
                    $('.wa__popup_content_item').each(function () {
                        $(this).removeClass('pointer-disable');
                        $('.wa__popup_content_list').off('click');
                    })
                }
            }
        });

        if (getCookie("nta-wa-gdpr") != "") {
            $('.wa__popup_content_list').off('click');
        } else {
            $('.wa__popup_content_list').click(function () {
                $('.nta-wa-gdpr').delay(500).css({ "background": "red", "color": "#fff" });
            });
        }
    });
})(jQuery);


// Change navbar position 
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        navbar.classList.add("fixed");
    } else {
        navbar.classList.remove("fixed");
    }
});



// Progress bar 

const circle = document.getElementById("indicatorCircle");
const percentText = document.getElementById("scrollPercentText");
const scrollToTopBtn = document.getElementById("progressCircle");

const radius = 26;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function updateProgress() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollTop / scrollHeight;
    const offset = circumference * (1 - percent);

    circle.style.strokeDashoffset = offset;
    percentText.textContent = `${Math.round(percent * 100)}%`;
}


window.addEventListener("scroll", updateProgress);

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});



// change logo 

const logo = document.getElementById("siteLogo");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        logo.src = "includes/images/logo-icon.jpg";
    } else {
        logo.src = "includes/images/logo.png";
    }
});



// partnersSwiper 

const swiper = new Swiper(".partnersSwiper", {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    breakpoints: {
        320: { slidesPerView: 3 },
        640: { slidesPerView: 3 },
        1000: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
    }
});

const counters = document.querySelectorAll('.counter');

const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const originalText = counter.innerText;

        // لو مفيش data-target (زي 24/7) متعملش عد
        if (!target || isNaN(target)) return;

        let count = 0;
        const duration = 3000; // ابطأ شوية
        const steps = 100;
        const increment = target / steps;

        // هل الرقم فيه علامة زي + أو %
        const hasPlus = originalText.includes('+');
        const hasPercent = originalText.includes('%');

        const updateCounter = () => {
            if (count < target) {
                count += increment;
                let display = Math.ceil(count);
                if (hasPlus) display += '+';
                if (hasPercent) display += '%';
                counter.innerText = display;
                setTimeout(updateCounter, duration / steps);
            } else {
                let display = target;
                if (hasPlus) display += '+';
                if (hasPercent) display += '%';
                counter.innerText = display;
            }
        };

        updateCounter();
    });
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            observer.disconnect(); // مرة واحدة بس
        }
    });
});

observer.observe(document.querySelector('.stats-section'));



const testimonialSwiper = new Swiper(".testimonialsSwiper", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next-custom",
        prevEl: ".swiper-button-prev-custom",
    },
    breakpoints: {
        768: { slidesPerView: 1 },
        992: { slidesPerView: 1 }
    }
});

    // Loading page // ----------------------- //
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        let e = document.querySelector(".loading");
        (e.style.transition = "opacity 4s"),
            (e.style.opacity = 0),
            setTimeout(function () {
                e.style.display = "none";
            }, 4e3);
    }, 100);
})





AOS.init();