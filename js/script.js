// Enhanced Loading Screen Management with Modern Effects
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.querySelector('.loading-text');
    
    // Array of loading messages with modern styling
    const loadingMessages = [
        'Empowering Youth...',
        'Restoring Hope...',
        'Building Futures...',
        'Creating Opportunities...',
        'Welcome to Heartland Boys Home'
    ];
    
    let messageIndex = 0;
    
    // Add modern loading animation
    if (loadingText) {
        loadingText.style.cssText = `
            background: linear-gradient(135deg, var(--primary-red), var(--primary-yellow));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 600;
            font-size: 1.2rem;
            animation: pulse 2s ease-in-out infinite;
        `;
    }
    
    // Change loading text with smooth transitions
    const messageInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length - 1) {
            messageIndex++;
            if (loadingText) {
                loadingText.style.opacity = '0';
                loadingText.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    loadingText.textContent = loadingMessages[messageIndex];
                    loadingText.style.opacity = '1';
                    loadingText.style.transform = 'translateY(0)';
                }, 200);
            }
        } else {
            clearInterval(messageInterval);
        }
    }, 700);
    
    // Hide loading screen with enhanced animation
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.transform = 'scale(1.1)';
            loadingScreen.style.opacity = '0';
            loadingScreen.classList.add('fade-out');
            
            // Remove from DOM after transition
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
                
                // Trigger entrance animations for page elements
                triggerPageEntranceAnimations();
            }, 1000);
        }
    }, 1500);
});

// Modern page entrance animations
function triggerPageEntranceAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroTitle) {
        heroTitle.style.animation = 'slideInFromLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.animation = 'slideInFromLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        }, 200);
    }
    
    if (heroButtons) {
        setTimeout(() => {
            heroButtons.style.animation = 'slideInFromLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        }, 400);
    }
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.animation = 'slideInFromRight 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        }, 300);
    }
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    if (navLinks.length > 0 && hamburger && navMenu) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Close mobile menu when clicking outside
    if (hamburger && navMenu) {
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

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

    // Enhanced Scroll Animations with Modern Effects
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollAnimationOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add dynamic entrance animations
                if (entry.target.classList.contains('content-card')) {
                    entry.target.style.animation = 'slideInFromLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                }
                
                if (entry.target.classList.contains('contact-item')) {
                    entry.target.style.animation = 'slideInFromRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                }

                // location-card: no forced animation; remains visible by default
            }
        });
    }, scrollAnimationOptions);

    // Observe elements for scroll animations
    // 1) Elements with explicit animation classes: set initial hidden state
    const animatedClassElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    animatedClassElements.forEach((el, index) => {
        // Respect reduced motion: don't hide or animate
        if (!reducedMotion) {
            el.style.transitionDelay = `${index * 0.1}s`;
        }
        scrollObserver.observe(el);
    });

    // 2) Content/location/contact cards: observe to apply a gentle entrance, but NEVER hide by default
    const cardElements = document.querySelectorAll('.content-card, .contact-item, .location-card');
    cardElements.forEach((el, index) => {
        // Do not set opacity/transform defaults to avoid hidden content
        if (!reducedMotion) {
            el.style.transitionDelay = `${index * 0.05}s`;
        }
        scrollObserver.observe(el);
    });

    // If reduced motion is preferred, ensure everything is visible
    if (reducedMotion) {
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
            el.classList.add('animate');
            el.style.opacity = '';
            el.style.transform = '';
        });
    }

    // Dynamic card hover effects
    const cards = document.querySelectorAll('.content-card, .contact-item, .location-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });

    // Parallax handling with combined mouse and scroll transforms
    const parallaxElements = Array.from(document.querySelectorAll('.parallax-element'));
    const pointerFine = window.matchMedia ? window.matchMedia('(pointer: fine)').matches : true;
    const enableScrollParallax = !reducedMotion && parallaxElements.length > 0;
    const enableMouseParallax = !reducedMotion && pointerFine && parallaxElements.length > 0;
    const parallaxState = new Map();

    parallaxElements.forEach(element => {
        parallaxState.set(element, { mouseX: 0, mouseY: 0, scrollY: 0 });
    });

    let parallaxFrameRequested = false;
    const scheduleParallaxUpdate = () => {
        if (parallaxFrameRequested) return;
        parallaxFrameRequested = true;
        requestAnimationFrame(() => {
            parallaxState.forEach((state, element) => {
                element.style.transform = `translate3d(${state.mouseX}px, ${state.mouseY}px, 0) translateY(${state.scrollY}px)`;
            });
            parallaxFrameRequested = false;
        });
    };

    if (enableMouseParallax) {
        document.addEventListener('mousemove', event => {
            const normalizedX = (event.clientX / window.innerWidth) - 0.5;
            const normalizedY = (event.clientY / window.innerHeight) - 0.5;

            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.speed) || 0.5;
                const state = parallaxState.get(element);
                if (!state) return;
                state.mouseX = normalizedX * 50 * speed;
                state.mouseY = normalizedY * 50 * speed;
            });

            scheduleParallaxUpdate();
        });
    }

    if (enableScrollParallax) {
        const updateScrollOffsets = () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.speed) || 0.5;
                const state = parallaxState.get(element);
                if (!state) return;
                state.scrollY = -(scrolled * speed);
            });
            scheduleParallaxUpdate();
        };

        window.addEventListener('scroll', updateScrollOffsets, { passive: true });
        updateScrollOffsets();
    } else if (parallaxElements.length > 0) {
        // Clear transforms entirely when motion should be reduced
        parallaxElements.forEach(element => {
            element.style.transform = '';
        });
    }

    // Enhanced navigation with modern effects
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const hasAnchorNav = Array.from(navItems).some(item => {
        const href = item.getAttribute('href') || '';
        return href.includes('#');
    });

    function highlightNavigation() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        // Add navbar background blur effect on scroll
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }
        }
        
        if (!hasAnchorNav || sections.length === 0) {
            return;
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (current && item.getAttribute('href').includes(current)) {
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

    // Ensure correct nav highlight on initial load
    highlightNavigation();
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
    button.className = 'back-to-top';
    button.type = 'button';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
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
    initializeTestimonialsCarousel();
});

// Testimonials Carousel Functionality
let currentSlideIndex = 0;
let slides, dots;

function initializeTestimonialsCarousel() {
    slides = document.querySelectorAll('.testimonial-slide');
    dots = document.querySelectorAll('.dot');
    
    // Only initialize if elements exist
    if (slides.length > 0 && dots.length > 0) {
        // Auto-advance carousel every 8 seconds
        setInterval(function() {
            changeSlide(1);
        }, 8000);

        // Add keyboard navigation for carousel
        const carouselNav = document.querySelector('.carousel-nav');
        if (carouselNav) {
            document.addEventListener('keydown', function(e) {
                // Only respond when carousel is in viewport
                const rect = carouselNav.getBoundingClientRect();
                const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
                if (!inViewport) return;

                if (e.key === 'ArrowLeft') {
                    changeSlide(-1);
                } else if (e.key === 'ArrowRight') {
                    changeSlide(1);
                }
            });
        }

        // Make dots keyboard accessible
        dots.forEach((dot, index) => {
            dot.setAttribute('role', 'button');
            dot.setAttribute('tabindex', '0');
            dot.setAttribute('aria-label', 'Go to testimonial ' + (index + 1));
            dot.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    currentSlide(index + 1);
                }
            });
        });
    }
}

function showSlide(index) {
    if (!slides || !dots) return;
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function changeSlide(direction) {
    if (!slides || slides.length === 0) return;
    
    currentSlideIndex += direction;
    
    // Loop back to beginning or end
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    if (!slides || slides.length === 0) return;
    
    currentSlideIndex = index - 1; // Convert to 0-based index
    showSlide(currentSlideIndex);
}

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

// Email obfuscation - protect email addresses from spam bots
document.addEventListener('DOMContentLoaded', function() {
    const emailUser = 'rschroetlin78';
    const emailDomain = 'gmail.com';
    const email = emailUser + '@' + emailDomain;

    // Replace all visible email text nodes
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
        if (walker.currentNode.nodeValue.includes('rschroetlin78@gmail.com')) {
            walker.currentNode.nodeValue = walker.currentNode.nodeValue.replace('rschroetlin78@gmail.com', email);
        }
    }

    // Add mailto links where email is just plain text
    document.querySelectorAll('.contact-item p, .footer-section p').forEach(function(el) {
        if (el.innerHTML.includes(email) && !el.querySelector('a[href^="mailto"]')) {
            el.innerHTML = el.innerHTML.replace(email, '<a href="mailto:' + email + '">' + email + '</a>');
        }
    });
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
