document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('ham-btn');
    const navigation = document.getElementById('nav-btr');

    if (hamburger && navigation) {
        hamburger.addEventListener('click', function() {
            navigation.classList.toggle('show');
            this.classList.toggle('show');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('show')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });

        // Close menu when clicking on links (mobile)
        const navLinks = document.querySelectorAll('.navigation a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    navigation.classList.remove('show');
                    hamburger.classList.remove('show');
                    const spans = hamburger.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = '';
                        span.style.opacity = '';
                    });
                }
            });
        });
    }
});