# Professional Portfolio Template

## Overview

This is a modern, responsive portfolio template built with HTML, CSS, and JavaScript. It features smooth animations and excellent accessibility, making it suitable for developers, designers, and other professionals who want to showcase their work.

## Features

- **Responsive Design**: Looks great on all devices from mobile phones to desktop computers
- **Modern Animations**: Smooth, subtle animations enhance the user experience
- **Accessibility**: Built with web accessibility in mind, including support for screen readers and keyboard navigation
- **Reduced Motion Support**: Respects user preferences for reduced motion
- **Interactive Elements**: Dynamic skill bars, counters, and navigation
- **Contact Form**: Ready-to-use contact form (requires backend implementation for actual submission)
- **Customizable**: Easy to customize with your own content, colors, and styling

## Sections

1. **Hero/Introduction**: A welcoming section with your name, title, and a brief introduction
2. **About**: Share your background, experience, and personal information
3. **Skills**: Showcase your technical and professional skills with animated progress bars
4. **Projects**: Display your portfolio projects with descriptions and links
5. **Contact**: A contact form and your contact information

## How to Use

1. **Clone or download** this repository
2. **Customize the content**:
   - Open `index.html` and replace the placeholder text with your information
   - Update the project details, skills, and contact information
   - Replace the placeholder images with your own photos and project screenshots
3. **Customize the styling** (optional):
   - Modify colors and other variables in the `:root` section of `styles.css`
   - Adjust animations, spacing, or any other styles to match your preferences
4. **Test** the website locally to ensure everything works as expected
5. **Deploy** to your preferred hosting service

## Customization Tips

### Changing Colors

The main colors can be changed by editing the CSS variables in the `:root` section of `styles.css`:

```css
:root {
    --primary-color: #4a6cf7; /* Main accent color */
    --secondary-color: #6c757d; /* Secondary color */
    --dark-color: #212529; /* Dark text color */
    --light-color: #f8f9fa; /* Light background color */
    /* ... other variables ... */
}
```

### Adding Projects

To add a new project, copy the project card structure in the Projects section and customize it:

```html
<div class="project-card">
    <div class="project-image">
        <!-- Add your project image here -->
        <div class="project-placeholder" aria-label="Project screenshot"></div>
    </div>
    <div class="project-content">
        <h3>Your Project Title</h3>
        <p>Description of your project goes here.</p>
        <div class="project-tags">
            <span>HTML</span>
            <span>CSS</span>
            <!-- Add more technologies -->
        </div>
        <div class="project-links">
            <a href="#" class="btn small-btn">Demo</a>
            <a href="#" class="btn small-btn">Code</a>
        </div>
    </div>
</div>
```

### Adding Skills

To add a new skill, copy the skill item structure in the Skills section and customize it:

```html
<div class="skill-item">
    <div class="skill-icon"><i class="fab fa-icon-name"></i></div>
    <h4>Skill Name</h4>
    <div class="skill-bar" data-skill="85">
        <div class="skill-progress"></div>
    </div>
</div>
```

Change `data-skill` to a value between 0-100 to represent your proficiency level.

## Accessibility Features

This template includes several accessibility features:

- Semantic HTML structure
- ARIA attributes for interactive elements
- Keyboard navigation support
- Support for screen readers
- Respects user preferences for reduced motion
- Sufficient color contrast
- Focus indicators for keyboard users

## Browser Support

This template works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

Feel free to use this template for your personal portfolio. Attribution is appreciated but not required.

---

Happy coding! 🚀