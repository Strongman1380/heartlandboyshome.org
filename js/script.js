// Loading Screen Management
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.querySelector('.loading-text');
    
    // Array of loading messages
    const loadingMessages = [
        'Empowering Youth...',
        'Restoring Hope...',
        'Building Futures...',
        'Welcome to Heartland Boys Home'
    ];
    
    let messageIndex = 0;
    
    // Change loading text every 800ms
    const messageInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length - 1) {
            messageIndex++;
            loadingText.textContent = loadingMessages[messageIndex];
        } else {
            clearInterval(messageInterval);
        }
    }, 800);
    
    // Hide loading screen after 3.5 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Remove from DOM after transition
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 1000);
    }, 3500);
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Google Form is embedded via iframe - no custom form handling needed
    // The form submission is handled directly by Google Forms

    // Enhanced Scroll Animations
    const scrollAnimationOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, scrollAnimationOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    animateElements.forEach((el, index) => {
        // Add staggered animation delay
        el.style.transitionDelay = `${index * 0.1}s`;
        scrollObserver.observe(el);
    });

    // Parallax effects for mouse movement
    document.addEventListener('mousemove', function(e) {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const x = (mouseX - 0.5) * 50 * speed;
            const y = (mouseY - 0.5) * 50 * speed;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Scroll-based parallax for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Back to top button
    const backToTopButton = createBackToTopButton();
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    // Create and show success popup
    const successPopup = document.createElement('div');
    successPopup.className = 'success-popup';
    successPopup.innerHTML = `
        <div class="success-popup-content">
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>Your form has been submitted successfully. We will get back to you within 24 hours.</p>
            <button onclick="this.parentElement.parentElement.remove()" class="btn btn-primary">Close</button>
        </div>
    `;
    
    // Style the popup
    successPopup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = successPopup.querySelector('.success-popup-content');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    content.querySelector('i').style.cssText = `
        font-size: 3rem;
        color: var(--primary-red);
        margin-bottom: 20px;
        display: block;
    `;
    
    content.querySelector('h3').style.cssText = `
        color: var(--primary-red);
        margin-bottom: 15px;
        font-weight: 600;
    `;
    
    content.querySelector('p').style.cssText = `
        color: var(--text-dark);
        line-height: 1.6;
        margin-bottom: 25px;
    `;
    
    document.body.appendChild(successPopup);
    
    // Animate in
    setTimeout(() => {
        successPopup.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 100);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (successPopup.parentNode) {
            successPopup.style.opacity = '0';
            content.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (successPopup.parentNode) {
                    successPopup.remove();
                }
            }, 300);
        }
    }, 5000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        default:
            notification.style.backgroundColor = '#17a2b8';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-red);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    button.addEventListener('mouseenter', function() {
        this.style.background = 'var(--secondary-red)';
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.background = 'var(--primary-red)';
        this.style.transform = 'translateY(0)';
    });
    
    return button;
}

// Behavioral Goals Expandable Cards
function initializeBehavioralGoals() {
    const goalCards = document.querySelectorAll('.behavioral-goal-card');
    
    goalCards.forEach(card => {
        const header = card.querySelector('.goal-header');
        
        header.addEventListener('click', function() {
            // Close other cards
            goalCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('expanded')) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Toggle current card
            card.classList.toggle('expanded');
        });
    });
}

// Initialize behavioral goals when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeBehavioralGoals();
});

// Hamburger animation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});

// SEO Management - Canonical URLs and Vercel.app blocking
document.addEventListener('DOMContentLoaded', function() {
    const currentHost = window.location.hostname;
    const currentPath = window.location.pathname;
    const customDomain = 'heartlandboyshome.org';
    
    // Set canonical URL to custom domain
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `https://${customDomain}${currentPath}`;
    
    // Block indexing if on .vercel.app domain
    if (currentHost.includes('.vercel.app')) {
        // Add noindex meta tag
        let robotsMeta = document.querySelector('meta[name="robots"]');
        if (!robotsMeta) {
            robotsMeta = document.createElement('meta');
            robotsMeta.name = 'robots';
            document.head.appendChild(robotsMeta);
        }
        robotsMeta.content = 'noindex, nofollow';
        
        // Optional: Add a banner for development/staging
        if (window.location.search.includes('dev') || window.location.search.includes('staging')) {
            const devBanner = document.createElement('div');
            devBanner.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #ff6b6b;
                color: white;
                text-align: center;
                padding: 10px;
                z-index: 10000;
                font-weight: bold;
            `;
            devBanner.textContent = 'DEVELOPMENT/STAGING SITE - NOT INDEXED';
            document.body.insertBefore(devBanner, document.body.firstChild);
        }
    }
});

// Add CSS for hamburger animation
const style = document.createElement('style');
style.textContent = `
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);