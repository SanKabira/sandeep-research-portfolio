/**
 * common.js
 * Shared utilities for 3D interactions and scene management.
 * 
 * Features:
 * - IntersectionObserver for lazy loading and animation triggers
 * - Mouse interaction handlers
 * - Scroll trigger logic
 */

class SplineManager {
    constructor() {
        this.observers = new Map();
        this.scenes = new Map();
        this.initIntersectionObserver();
        this.initScrollTriggers();
    }

    initIntersectionObserver() {
        // Observer options: trigger when 10% visible
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    this.loadScene(element);
                    observer.unobserve(element);
                }
            });
        }, options);

        // Observe all elements with data-spline-scene attribute
        document.querySelectorAll('[data-spline-scene]').forEach(el => {
            observer.observe(el);
        });
    }

    loadScene(wrapperElement) {
        const sceneId = wrapperElement.dataset.splineScene;
        const url = wrapperElement.dataset.splineUrl;

        if (!url) return;

        console.log(`Loading Spline Scene: ${sceneId}`);

        // Create viewer dynamically if not present
        let viewer = wrapperElement.querySelector('spline-viewer');
        if (!viewer) {
            viewer = document.createElement('spline-viewer');
            viewer.setAttribute('loading', 'lazy');
            viewer.setAttribute('url', url);
            viewer.style.width = '100%';
            viewer.style.height = '100%';
            viewer.style.visibility = 'hidden'; // Hide until loaded
            wrapperElement.appendChild(viewer);

            // Event listener for load
            viewer.addEventListener('load', () => {
                viewer.style.visibility = 'visible';
                viewer.style.opacity = 1;
                const preloader = wrapperElement.querySelector('.spline-preloader');
                if (preloader) preloader.style.display = 'none';

                // Register for interactions
                this.scenes.set(sceneId, viewer);
                this.setupInteractions(wrapperElement, viewer);
            });
        }
    }

    setupInteractions(wrapper, viewer) {
        // Mouse Hover Effects
        wrapper.addEventListener('mouseenter', () => {
            // Example: Access Spline API if exposed, or scale element
            viewer.style.transform = 'scale(1.02)';
            viewer.style.transition = 'transform 0.5s ease-out';
        });

        wrapper.addEventListener('mouseleave', () => {
            viewer.style.transform = 'scale(1.0)';
        });
    }

    initScrollTriggers() {
        window.addEventListener('scroll', () => {
            this.scenes.forEach((viewer, id) => {
                // Simple parallax or trigger logic based on viewport position
                const rect = viewer.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    // Visible
                    // Could pass scroll progress to Spline variables if supported by specific component
                }
            });
        });
    }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    window.splineManager = new SplineManager();
});
