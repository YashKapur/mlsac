const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.textContent = isDark ? '🌓' : '🌞';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--primary)';
    } else {
        navbar.style.background = 'var(--primary)';
    }
});

// Section reveal animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

// Fade-In Effect on Scroll for elements with the "fade-in" class
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

class Particle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velocity = {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
        };
        this.radius = Math.random() * 1.5;
        this.color = 'rgba(255, 255, 255, 0.7)';
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update() {
        if (this.x < 0 || this.x > this.canvas.width) this.velocity.x *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.velocity.y *= -1;
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }
}

function initParticles() {
    const canvas = document.querySelector('.particles-canvas');
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 100;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas, ctx));
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Initialize particles when page loads
window.addEventListener('load', initParticles);

// LinkedIn Hover Effect
document.querySelectorAll('.leadership-card').forEach(card => {
    const linkedinBtn = card.querySelector('.linkedin-btn');
    
    card.addEventListener('mouseenter', () => {
        linkedinBtn.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        linkedinBtn.style.opacity = '0';
    });
});
const carousels = {};

function nextSlide(dept) {
  const track = document.getElementById(dept);
  if (!carousels[dept]) carousels[dept] = 0;

  const slides = track.children.length;
  carousels[dept] = (carousels[dept] + 1) % slides;
  track.style.transform = `translateX(-${carousels[dept] * 100}%)`;
}

function prevSlide(dept) {
  const track = document.getElementById(dept);
  if (!carousels[dept]) carousels[dept] = 0;

  const slides = track.children.length;
  carousels[dept] = (carousels[dept] - 1 + slides) % slides;
  track.style.transform = `translateX(-${carousels[dept] * 100}%)`;
}
