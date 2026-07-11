    // Inicialização da Hero Cinematográfica
    const heroSwiper = new Swiper(".heroSwiper", {
        speed: 1200, // Transição lenta e majestosa
        parallax: true, // Liga o efeito 3D no background e nos textos
        grabCursor: true, // Muda o cursor para "mãozinha" indicando que pode arrastar
        effect: "slide",
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar", // Barra de progresso luxuosa no rodapé
        },
        navigation: {
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
        },
        on: {
            // Atualiza o contador de números (01 ... 04)
            slideChange: function () {
                const currentNum = document.querySelector('.slider-number.current');
                // Formata com o zero à esquerda (ex: 01, 02)
                currentNum.innerHTML = '0' + (this.realIndex + 1);
            }
        }
    });

        // ==============================
        // LUCIDE ICONS INITIALIZATION
        // ==============================
        lucide.createIcons();

        // ==============================
        // SLIDER
        // ==============================
        let currentSlide = 0;
        const totalSlides = 4;
        let autoSlideInterval;

        function goToSlide(n) {
            currentSlide = n;
            document.getElementById('slider').style.transform = `translateX(-${currentSlide * 100}%)`;
            document.querySelectorAll('.dot').forEach((d, i) => {
                d.classList.toggle('active', i === currentSlide);
            });
        }

        function moveSlide(direction) {
            currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
            goToSlide(currentSlide);
            resetAutoSlide();
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => moveSlide(1), 6000); 
        }

        resetAutoSlide();

        // ==============================
        // MENU MOBILE
        // ==============================
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileOverlay');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        function openMenu() {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            hamburger.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', () => {
            mobileMenu.classList.contains('active') ? closeMenu() : openMenu();
        });

        overlay.addEventListener('click', closeMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // ==============================
        // REVEAL ON SCROLL - PREMIUM SMOOTHNESS
        // ==============================
        const reveals = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

        reveals.forEach(el => observer.observe(el));

        // ==============================
        // HEADER BLUR EFFECT ON SCROLL
        // ==============================
        const header = document.getElementById('main-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
        
