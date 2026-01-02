/**
 * projects-3d.js
 * Interactive project showcase logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Logic to handle 3D project cards interaction
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Find internal spline viewer and trigger animation
            const viewer = card.querySelector('spline-viewer');
            if (viewer) {
                // viewer.trigger('hover'); // Pseudo-code
            }
        });
    });
});
