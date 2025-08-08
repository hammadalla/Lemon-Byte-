
// const cursorDot = document.querySelector(".cursor-dot");
// const cursorBorder = document.querySelector(".cursor-border");

// let mouseX = 0, mouseY = 0;
// let borderX = 0, borderY = 0;

// document.addEventListener("mousemove", (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY;

//     cursorDot.style.left = `${mouseX}px`;
//     cursorDot.style.top = `${mouseY}px`;
// });

// function animateCursor() {
//     borderX += (mouseX - borderX) * 0.1;
//     borderY += (mouseY - borderY) * 0.1;

//     cursorBorder.style.left = `${borderX}px`;
//     cursorBorder.style.top = `${borderY}px`;

//     requestAnimationFrame(animateCursor);
// }

// animateCursor();

// // تأثير الضغط
// document.addEventListener("mousedown", () => {
//     cursorDot.classList.add("active");
//     cursorBorder.style.width = "70px";
//     cursorBorder.style.height = "70px";
// });

// document.addEventListener("mouseup", () => {
//     cursorDot.classList.remove("active");
//     cursorBorder.style.width = "50px";
//     cursorBorder.style.height = "50px";
// });

// // عند المرور فوق عناصر قابلة للنقر
// const hoverTargets = ['a', 'button', 'input', 'textarea', '[data-hover]'];

// document.addEventListener("mouseover", (e) => {
//     if (hoverTargets.some(sel => e.target.matches(sel))) {
//         cursorBorder.classList.add("hover");
//     }
// });

// document.addEventListener("mouseout", (e) => {
//     if (hoverTargets.some(sel => e.target.matches(sel))) {
//         cursorBorder.classList.remove("hover");
//     }
// });




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

// const circle = document.getElementById("indicatorCircle");
// const percentText = document.getElementById("scrollPercentText");
// const scrollToTopBtn = document.getElementById("progressCircle");

// const radius = 26;
// const circumference = 2 * Math.PI * radius;

// circle.style.strokeDasharray = `${circumference}`;
// circle.style.strokeDashoffset = `${circumference}`;

// function updateProgress() {
//     const scrollTop = window.scrollY;
//     const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
//     const percent = scrollTop / scrollHeight;
//     const offset = circumference * (1 - percent);

//     circle.style.strokeDashoffset = offset;
//     percentText.textContent = `${Math.round(percent * 100)}%`;
// }


// window.addEventListener("scroll", updateProgress);

// scrollToTopBtn.addEventListener("click", () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
// });


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

    const percentage = Math.round(percent * 100);

    if (percentage >= 100) {
        percentText.innerHTML = '<i class="fa-solid fa-angle-up fs-4 text-warning"></i>';
    } else {
        percentText.textContent = `${percentage}%`;
    }
}

window.addEventListener("scroll", updateProgress);

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// change logo 

const logo = document.getElementById("siteLogo");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        logo.src = "includes/images/logo-icon.png";
    } else {
        logo.src = "includes/images/logo.png";
    }
});



// partnersSwiper 


const currentPage = window.location.pathname.split("/").pop(); // مثال: seo.html

// كل اللينكات
const links = document.querySelectorAll(".service-item");

links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
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






document.addEventListener('DOMContentLoaded', function () {
    const dropdownLinks = document.querySelectorAll('.navbar .dropdown > a');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const isMobile = window.innerWidth < 992;

            if (isMobile) {
                e.preventDefault(); // امنع فتح الصفحة

                const alreadyOpen = this.classList.contains('open');

                // اغلق أي قائمة تانية
                document.querySelectorAll('.navbar .dropdown > a.open').forEach(el => {
                    el.classList.remove('open');
                    el.nextElementSibling?.classList.remove('show');
                });

                // لو مش مفتوحة بالفعل، افتحها
                if (!alreadyOpen) {
                    this.classList.add('open');
                    this.nextElementSibling?.classList.add('show');
                }
            }
            // أما لو ديسكتوب، متعملش أي حاجة وسيب الرابط يفتح عادي
        });
    });

    // اقفل القوائم عند توسيع الشاشة
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992) {
            document.querySelectorAll('.navbar .dropdown > a.open').forEach(el => {
                el.classList.remove('open');
                el.nextElementSibling?.classList.remove('show');
            });
        }
    });
});





AOS.init();



document.addEventListener("DOMContentLoaded", function () {
    const accordionHeaders = document.querySelectorAll(".accordion-footer .accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", function () {
            const parent = header.closest(".accordion-footer");
            parent.classList.toggle("active");
        });
    });
});

