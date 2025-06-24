// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.benefit-card, .step, .env-benefit, .food-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// FAQ functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Modal functionality
function openWaitlistModal() {
    document.getElementById('waitlistModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeWaitlistModal() {
    document.getElementById('waitlistModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    // Reset form
    document.getElementById('waitlistForm').reset();
    document.getElementById('waitlistSuccess').style.display = 'none';
    document.getElementById('waitlistForm').style.display = 'block';
}

function openPartnerModal() {
    document.getElementById('partnerModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePartnerModal() {
    document.getElementById('partnerModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    // Reset form
    document.getElementById('partnerForm').reset();
    document.getElementById('partnerSuccess').style.display = 'none';
    document.getElementById('partnerForm').style.display = 'block';
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const waitlistModal = document.getElementById('waitlistModal');
    const partnerModal = document.getElementById('partnerModal');
    
    if (event.target === waitlistModal) {
        closeWaitlistModal();
    }
    if (event.target === partnerModal) {
        closePartnerModal();
    }
});

// Form submissions
function submitWaitlistForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    
    // Basic email validation
    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    setTimeout(() => {
        document.getElementById('waitlistForm').style.display = 'none';
        document.getElementById('waitlistSuccess').style.display = 'block';
        
        // Store email in localStorage for demo purposes
        const waitlistEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
        waitlistEmails.push({
            email: email,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('waitlistEmails', JSON.stringify(waitlistEmails));
    }, 1000);
}

function submitPartnerForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const partnerData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        businessName: formData.get('businessName'),
        businessAddress: formData.get('businessAddress'),
        localCouncil: formData.get('localCouncil')
    };
    
    // Basic validation
    for (const [key, value] of Object.entries(partnerData)) {
        if (!value || value.trim() === '') {
            alert(`Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return;
        }
    }
    
    if (!isValidEmail(partnerData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    setTimeout(() => {
        document.getElementById('partnerForm').style.display = 'none';
        document.getElementById('partnerSuccess').style.display = 'block';
        
        // Store partner data in localStorage for demo purposes
        const partnerApplications = JSON.parse(localStorage.getItem('partnerApplications') || '[]');
        partnerApplications.push({
            ...partnerData,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('partnerApplications', JSON.stringify(partnerApplications));
    }, 1000);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Hero CTA button functionality
document.addEventListener('DOMContentLoaded', function() {
    const heroCTA = document.querySelector('.hero-cta .cta-button');
    if (heroCTA) {
        heroCTA.addEventListener('click', openWaitlistModal);
    }
    
    // Add click handlers to all waitlist buttons
    const waitlistButtons = document.querySelectorAll('.cta-button:not([onclick])');
    waitlistButtons.forEach(button => {
        if (button.textContent.includes('Join') && button.textContent.includes('Waitlist')) {
            button.addEventListener('click', openWaitlistModal);
        }
    });
});

// Smooth reveal animations for sections
function createScrollReveal() {
    const sections = document.querySelectorAll('section');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, revealOptions);
    
    sections.forEach(section => {
        section.classList.add('reveal');
        revealObserver.observe(section);
    });
}

// Initialize scroll reveal on load
document.addEventListener('DOMContentLoaded', createScrollReveal);

// Add CSS for reveal animations
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        gap: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy load animations
let animationFrameId;

function optimizedScrollHandler() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    animationFrameId = requestAnimationFrame(() => {
        // Navbar background update
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Replace the existing scroll event listener
window.removeEventListener('scroll', window.scrollHandler);
window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Keyboard accessibility for modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const waitlistModal = document.getElementById('waitlistModal');
        const partnerModal = document.getElementById('partnerModal');
        
        if (waitlistModal.style.display === 'block') {
            closeWaitlistModal();
        }
        if (partnerModal.style.display === 'block') {
            closePartnerModal();
        }
    }
});

// Focus management for accessibility
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    firstElement.focus();
}

// Apply focus trapping when modals open
const originalOpenWaitlistModal = openWaitlistModal;
const originalOpenPartnerModal = openPartnerModal;

openWaitlistModal = function() {
    originalOpenWaitlistModal();
    trapFocus(document.getElementById('waitlistModal'));
};

openPartnerModal = function() {
    originalOpenPartnerModal();
    trapFocus(document.getElementById('partnerModal'));
};
