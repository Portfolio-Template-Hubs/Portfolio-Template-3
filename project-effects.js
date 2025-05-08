// Additional interactive effects for the project section
document.addEventListener('DOMContentLoaded', function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        return; // Don't add effects if user prefers reduced motion
    }
    
    // Add hover effect for project images
    enhanceProjectImages();
    
    // Add particle background to projects section
    initProjectsParticles();
});

// Enhance project images with interactive effects
function enhanceProjectImages() {
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(imageContainer => {
        const placeholder = imageContainer.querySelector('.project-placeholder');
        
        if (placeholder) {
            // Add icon to placeholder
            const icon = document.createElement('i');
            icon.className = 'fas fa-laptop-code';
            icon.style.fontSize = '3rem';
            icon.style.opacity = '0.7';
            icon.style.transition = 'all 0.5s ease';
            placeholder.innerHTML = '';
            placeholder.appendChild(icon);
            
            // Add hover effect
            imageContainer.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.opacity = '1';
                placeholder.style.background = 'linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%)';
                icon.style.color = 'white';
            });
            
            imageContainer.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0)';
                icon.style.opacity = '0.7';
                placeholder.style.background = 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)';
                icon.style.color = '#999';
            });
        }
    });
}

// Add particle background to projects section
function initProjectsParticles() {
    const projectsSection = document.getElementById('projects');
    
    if (!projectsSection) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.className = 'projects-particles';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.3';
    
    // Insert canvas as first child of projects section
    projectsSection.style.position = 'relative';
    projectsSection.insertBefore(canvas, projectsSection.firstChild);
    
    // Set canvas size
    const setCanvasSize = () => {
        canvas.width = projectsSection.offsetWidth;
        canvas.height = projectsSection.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Particle settings
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 30;
    const colors = [
        'rgba(99, 102, 241, 0.3)',  // primary color
        'rgba(236, 72, 153, 0.3)',   // secondary color
        'rgba(20, 184, 166, 0.3)'     // accent color
    ];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.5
        });
    }
    
    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}