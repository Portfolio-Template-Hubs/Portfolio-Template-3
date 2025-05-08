// Custom cursor effect
document.addEventListener('DOMContentLoaded', function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        return; // Don't add cursor effects if user prefers reduced motion
    }
    
    // Create cursor elements
    const cursorOuter = document.createElement('div');
    cursorOuter.classList.add('cursor-outer');
    document.body.appendChild(cursorOuter);
    
    const cursorInner = document.createElement('div');
    cursorInner.classList.add('cursor-inner');
    document.body.appendChild(cursorInner);
    
    // Add cursor styles
    const style = document.createElement('style');
    style.innerHTML = `
        .cursor-outer, .cursor-inner {
            pointer-events: none;
            position: fixed;
            border-radius: 50%;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s, opacity 0.2s;
        }
        
        .cursor-outer {
            width: 40px;
            height: 40px;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.3);
            transition: all 0.1s ease-out;
        }
        
        .cursor-inner {
            width: 8px;
            height: 8px;
            background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
            transition: all 0.1s ease-out;
        }
        
        a:hover ~ .cursor-outer, button:hover ~ .cursor-outer, .btn:hover ~ .cursor-outer, 
        .project-card:hover ~ .cursor-outer, .skill-item:hover ~ .cursor-outer,
        .social-links a:hover ~ .cursor-outer {
            width: 60px;
            height: 60px;
            opacity: 0.5;
        }
        
        a:hover ~ .cursor-inner, button:hover ~ .cursor-inner, .btn:hover ~ .cursor-inner,
        .project-card:hover ~ .cursor-inner, .skill-item:hover ~ .cursor-inner,
        .social-links a:hover ~ .cursor-inner {
            width: 12px;
            height: 12px;
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Mouse move event
    document.addEventListener('mousemove', function(e) {
        // Update cursor position with slight delay for outer cursor
        cursorInner.style.left = e.clientX + 'px';
        cursorInner.style.top = e.clientY + 'px';
        
        // Delayed movement for outer cursor
        setTimeout(() => {
            cursorOuter.style.left = e.clientX + 'px';
            cursorOuter.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Mouse events for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item, .social-links a');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursorOuter.style.width = '60px';
            cursorOuter.style.height = '60px';
            cursorOuter.style.opacity = '0.5';
            cursorInner.style.width = '12px';
            cursorInner.style.height = '12px';
        });
        
        el.addEventListener('mouseleave', function() {
            cursorOuter.style.width = '40px';
            cursorOuter.style.height = '40px';
            cursorOuter.style.opacity = '1';
            cursorInner.style.width = '8px';
            cursorInner.style.height = '8px';
        });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Show default cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursorOuter.style.opacity = '0';
        cursorInner.style.opacity = '0';
        document.body.style.cursor = 'auto';
    });
    
    // Show custom cursor when entering window
    document.addEventListener('mouseenter', function() {
        cursorOuter.style.opacity = '1';
        cursorInner.style.opacity = '1';
        document.body.style.cursor = 'none';
    });
});