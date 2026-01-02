/**
 * spline-system.js
 * Optimized Core for 3D Portfolio - Mobile Optimized
 * Features: Adaptive Loading, Touch Interactions, Fallback Recovery, Analytics
 */

class SplineSystem {
    constructor() {
        this.observers = new Map();
        this.loadedScenes = new Set();
        this.config = { rootMargin: '200px 0px', threshold: 0.01 };

        // Feature Detection
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isSlowConnection = this.checkNetworkStatus();

        this.initLazyLoader();
        this.initScrollSync();
        this.injectStyles();

        console.log(`Antigravity 3D System: Online (Mobile: ${this.isMobile})`);
    }

    checkNetworkStatus() {
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (conn) {
            return ['slow-2g', '2g', '3g'].includes(conn.effectiveType) || conn.saveData;
        }
        return false;
    }

    // --- 1. Optimization: Smart Lazy Loading ---
    initLazyLoader() {
        // on slow connections, decrease preload distance to save bandwidth
        if (this.isSlowConnection) {
            this.config.rootMargin = '50px 0px';
        }

        this.loadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Aggressively skip 3D on very slow connections if fallback exists
                    if (this.isSlowConnection && entry.target.querySelector('.spline-fallback')) {
                        this.triggerFallback(entry.target);
                    } else {
                        this.loadScene(entry.target);
                    }
                    this.loadObserver.unobserve(entry.target);
                }
            });
        }, this.config);

        document.querySelectorAll('.spline-wrapper').forEach(el => {
            this.loadObserver.observe(el);
        });
    }

    loadScene(wrapper) {
        const id = wrapper.dataset.splineId;
        if (this.loadedScenes.has(id)) return;

        const viewer = wrapper.querySelector('spline-viewer');
        const placeholder = wrapper.querySelector('.spline-placeholder');

        if (!viewer) return;

        const startTime = performance.now();

        // Timeout Safety - Extended for mobile
        const timeoutDuration = this.isMobile ? 12000 : 8000;
        const safetyTimer = setTimeout(() => {
            if (!this.loadedScenes.has(id)) {
                console.warn(`Spline Timeout: ${id}`);
                this.triggerFallback(wrapper);
            }
        }, timeoutDuration);

        viewer.addEventListener('load', () => {
            clearTimeout(safetyTimer);
            this.loadedScenes.add(id);

            if (placeholder) {
                placeholder.style.opacity = '0';
                setTimeout(() => placeholder.remove(), 500);
            }

            viewer.style.opacity = '1';

            const loadTime = Math.round(performance.now() - startTime);
            this.trackEvent('3d_scene_loaded', { scene_id: id, load_time_ms: loadTime, mobile: this.isMobile });

            this.attachInteractions(wrapper, viewer);
        });

        viewer.addEventListener('error', (e) => {
            clearTimeout(safetyTimer);
            console.error(`Spline Error: ${id}`, e);
            this.triggerFallback(wrapper);
        });
    }

    triggerFallback(wrapper) {
        const id = wrapper.dataset.splineId;
        const placeholder = wrapper.querySelector('.spline-placeholder');
        const fallback = wrapper.querySelector('.spline-fallback');
        const viewer = wrapper.querySelector('spline-viewer');

        if (fallback) {
            fallback.style.opacity = '1';
            if (viewer) viewer.remove();
            if (placeholder) placeholder.remove();
            this.trackEvent('3d_scene_fallback', { scene_id: id, reason: 'timeout_or_network' });
        } else {
            if (placeholder) placeholder.innerHTML = '<div style="color:#666">Visual unavailable</div>';
        }
    }

    // --- 2. Interaction: Hover & Events (Mobile Optimized) ---
    attachInteractions(wrapper, viewer) {
        const id = wrapper.dataset.splineId;

        // Desktop Hover
        wrapper.addEventListener('mouseenter', () => {
            wrapper.style.transform = 'scale(1.02)';
            this.trackEvent('3d_interaction', { type: 'hover', scene_id: id });
        });

        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.transform = 'scale(1.0)';
        });

        // Mobile Touch
        wrapper.addEventListener('touchstart', () => {
            wrapper.style.transform = 'scale(1.02)';
        }, { passive: true });

        wrapper.addEventListener('touchend', () => {
            setTimeout(() => wrapper.style.transform = 'scale(1.0)', 300);
        });
    }

    // --- 3. Animation: Scroll Sync ---
    initScrollSync() {
        window.addEventListener('scroll', () => {
            if (this.prefersReducedMotion) return;
            // Logic for parallax if needed
        }, { passive: true });
    }

    // --- 4. Analytics Wrapper ---
    trackEvent(eventName, params = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, params);
        }
    }

    injectStyles() {
        if (document.getElementById('spline-sys-styles')) return;
        const style = document.createElement('style');
        style.id = 'spline-sys-styles';
        style.textContent = `
      .spline-wrapper {
        transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        border-radius: 12px;
        overflow: hidden;
        background: transparent;
        contain: content; 
        touch-action: pan-y; /* Allow vertical scroll but capture pinch/horizontal if needed */
      }
      .spinner-ring {
        display: inline-block;
        width: 30px; height: 30px;
        border: 3px solid rgba(0,0,0,0.1);
        border-radius: 50%;
        border-top-color: #3498db;
        animation: spline-spin 1s ease-in-out infinite;
      }
      @keyframes spline-spin { to { transform: rotate(360deg); } }
      canvas { outline: none; }
    `;
        document.head.appendChild(style);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('script[src*="spline-viewer.js"]')) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js';
        document.head.appendChild(script);
    }
    window.splineSystem = new SplineSystem();
});
