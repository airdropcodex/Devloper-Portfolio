// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          targetElement.scrollIntoView({
              behavior: 'smooth'
          });
      }
  });
});

// Project carousel functionality
const carousel = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 0;

function showSlide(index) {
  if (carousel) {
    const slideWidth = 100; // Each slide is 25% of container, so move 100% to show next slide
    carousel.style.transform = `translateX(-${index * slideWidth}%)`;
  }
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    showSlide(currentIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  });
}

// Initialize carousel
if (carousel) {
  showSlide(currentIndex);
}

// Sticky Navigation Bar
const header = document.querySelector('.navbar');
let sticky = 0;

if (header) {
  sticky = header.offsetTop;
}

function handleScroll() {
  if (header) {
    if (window.pageYOffset > sticky + 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
  }
}

window.addEventListener('scroll', handleScroll);

// Back-to-top button
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '⬆️';
backToTopBtn.className = 'back-to-top';
document.body.appendChild(backToTopBtn);

function toggleBackToTopButton() {
  if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
  } else {
      backToTopBtn.style.display = 'none';
  }
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', toggleBackToTopButton);

// Highlight active section in the navigation bar
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-item a');

function highlightNavLink() {
  let index = sections.length;

  while(--index && window.scrollY + 50 < sections[index].offsetTop) {}

  navLinks.forEach((link) => link.classList.remove('active'));
  if (navLinks[index]) {
    navLinks[index].classList.add('active');
  }
}

window.addEventListener('scroll', highlightNavLink);

// Auto-advance carousel (optional)
setInterval(() => {
  if (carousel && window.innerWidth > 900) { // Only auto-advance on desktop
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  }
}, 5000); // Change slide every 5 seconds

// Form submission handling
const contactForm = document.querySelector('.right form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && subject && message) {
      // Create mailto link
      const mailtoLink = `mailto:iaayushbharti@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Reset form
      contactForm.reset();
      
      // Show success message
      alert('Thank you for your message! Your email client should open now.');
    } else {
      alert('Please fill in all fields.');
    }
  });
}