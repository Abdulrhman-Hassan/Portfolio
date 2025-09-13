document.addEventListener('DOMContentLoaded', function() {

    // Helper function for smooth scrolling to a specific section
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    // --- MOBILE MENU FUNCTIONALITY ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenuPanel.classList.toggle('hidden');
        openIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('#mobile-menu-panel a').forEach(anchor => {
        anchor.addEventListener('click', function() {
            mobileMenuPanel.classList.add('hidden');
            openIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });


    // --- DYNAMIC TITLE ROTATION ---
    const titles = [
        'Full Stack Developer',
        'Ethical Hacker',
        'Bug Bounty Hunter'
    ];
    let currentTitleIndex = 0;

    function rotateTitles() {
        const titleElement = document.getElementById('dynamic-title');
        if (titleElement) {
            titleElement.style.opacity = '0';
            setTimeout(() => {
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                titleElement.textContent = titles[currentTitleIndex];
                titleElement.style.opacity = '1';
            }, 300);
        }
    }
    setInterval(rotateTitles, 3000);

    // --- FADE IN ANIMATION ON SCROLL ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: stop observing once visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });

    // --- CONTACT FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Show loading message
        formMessage.textContent = 'Sending your message...';
        formMessage.style.color = '#10b981';

        // Send email using EmailJS service
        // You need to sign up for EmailJS and replace these with your actual service ID, template ID, and user ID
        emailjs.send('service_your_service_id', 'template_your_template_id', {
            from_name: name,
            from_email: email,
            message: message,
            to_email: 'abdulrhmanhassan2004@gmail.com'
        })
        .then(function(response) {
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            formMessage.style.color = '#10b981';
            contactForm.reset();

            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        }, function(error) {
            formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
            formMessage.style.color = '#ef4444'; // Red color for error

            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        });
    });


    // --- UNIVERSAL BUTTON CLICK HANDLER ---
    document.querySelectorAll('button[data-url]').forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                // Use a placeholder for demo links, open real links in new tab
                if (url.startsWith('#')) {
                    alert(`This is a demo. In a real site, this would open the link for: ${this.textContent}`);
                } else {
                    window.open(url, '_blank');
                }
            }
        });
    });

    // --- ETHICAL HACKER MATRIX BACKGROUND ---
    function createGeometricBackground() {
        const matrixContainer = document.getElementById('matrix-container');
        if (!matrixContainer) return;

        matrixContainer.innerHTML = '';
        const canvas = document.createElement('canvas');
        matrixContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = matrixContainer.offsetWidth;
            canvas.height = matrixContainer.offsetHeight;
        }
        resizeCanvas();

        const matrixChars = '01';
        const columns = Math.floor(canvas.width / 20);
        const drops = Array(columns).fill(1).map(() => Math.random() * canvas.height);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#10b981';
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                ctx.fillText(char, i * 20, drops[i] * 20);

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        const matrixInterval = setInterval(drawMatrix, 33);

        // Cleanup interval on resize to avoid multiple running loops
        window.addEventListener('resize', () => {
            clearInterval(matrixInterval);
            createGeometricBackground();
        });
    }

    // --- MOUSE CURSOR TRAIL EFFECT ---
    function createCursorTrail() {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);

        let mouseX = 0, mouseY = 0;
        let trails = [];
        const trailCount = 10;

        for (let i = 0; i < trailCount; i++) {
            const t = document.createElement('div');
            t.style.position = 'fixed';
            t.style.width = `${10 - i}px`;
            t.style.height = `${10 - i}px`;
            t.style.backgroundColor = '#10b981';
            t.style.borderRadius = '50%';
            t.style.pointerEvents = 'none';
            t.style.zIndex = '9999';
            t.style.opacity = `${1 - i * 0.1}`;
            t.style.boxShadow = '0 0 10px #10b981';
            document.body.appendChild(t);
            trails.push({ el: t, x: 0, y: 0 });
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateTrail() {
            let prevX = mouseX;
            let prevY = mouseY;

            trails.forEach((t, index) => {
                const currentX = t.x;
                const currentY = t.y;

                t.el.style.left = `${currentX}px`;
                t.el.style.top = `${currentY}px`;

                t.x += (prevX - currentX) * 0.3;
                t.y += (prevY - currentY) * 0.3;

                prevX = currentX;
                prevY = currentY;
            });

            requestAnimationFrame(animateTrail);
        }
        animateTrail();
    }

    // --- DYNAMIC COPYRIGHT YEAR ---
    document.getElementById('copyright-year').textContent = new Date().getFullYear();

    // --- INITIALIZE ALL DYNAMIC FUNCTIONS ---
    createGeometricBackground();
    createCursorTrail();

    // Make the global function accessible from the HTML onclick attribute
    window.scrollToSection = scrollToSection;
});