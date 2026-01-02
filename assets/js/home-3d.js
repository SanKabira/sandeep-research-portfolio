/**
 * home-3d.js
 * Interactive 3D components for the "Who's watching?" landing page.
 * Uses Three.js to render lightweight customized 3D icons for each profile.
 */

const HOME_COLORS = {
    recruiter: 0x00d2ff, // Cyan
    researcher: 0xff4b1f, // Red/Orange
    collaborator: 0x11998e, // Green
    explorer: 0xf8b500,   // Gold
    bg: 0x141414          // Dark Netflix BG
};

class Home3DManager {
    constructor() {
        this.containers = document.querySelectorAll('.profile-3d-stage');
        this.initScenes();
        this.initEntranceAnimation();
    }

    initEntranceAnimation() {
        // Simple GSAP-like entrance for specific DOM elements if needed
        // But here we handle 3D scene entrance in the render loops
    }

    initScenes() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.createScene(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        this.containers.forEach(el => observer.observe(el));
    }

    createScene(container) {
        const type = container.dataset.type;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambient);
        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(2, 3, 4);
        scene.add(light);

        // Object Generation
        let meshGroup = new THREE.Group();
        this.generateIcon(type, meshGroup);
        scene.add(meshGroup);

        // Interaction State
        let isHovered = false;
        let isClicked = false;

        // DOM Events for Interaction
        const card = container.closest('.profile-card');
        if (card) {
            // Desktop
            card.addEventListener('mouseenter', () => { isHovered = true; });
            card.addEventListener('mouseleave', () => { isHovered = false; });

            // Mobile Touch
            card.addEventListener('touchstart', () => { isHovered = true; }, { passive: true });
            card.addEventListener('touchend', () => {
                setTimeout(() => isHovered = false, 500);
            });

            card.addEventListener('click', (e) => {
                // Delay navigation for animation
                e.preventDefault();
                isClicked = true;
                const href = card.getAttribute('href');

                // Burst effect logic could go here

                setTimeout(() => {
                    window.location.href = href;
                }, 800); // 800ms exit animation
            });
        }

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Idle Animation
            meshGroup.rotation.y += 0.01;

            // Hover Response
            if (isHovered && !isClicked) {
                meshGroup.rotation.y += 0.05; // Spin faster
                meshGroup.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
            } else if (!isClicked) {
                meshGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }

            // Click/Exit Animation
            if (isClicked) {
                meshGroup.scale.lerp(new THREE.Vector3(0, 0, 0), 0.1);
                meshGroup.rotation.z += 0.2;
                meshGroup.rotation.x += 0.2;
            }

            renderer.render(scene, camera);
        };
        animate();
    }

    generateIcon(type, group) {
        const material = new THREE.MeshStandardMaterial({
            color: HOME_COLORS[type],
            roughness: 0.4,
            metalness: 0.6
        });

        switch (type) {
            case 'recruiter': // Briefcase-ish shape
                const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 0.4), material);
                const handle = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 8, 16, Math.PI), material);
                handle.position.y = 0.6;
                group.add(body, handle);
                break;

            case 'researcher': // Scroll / Diploma
                const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.8, 16), material);
                tube.rotation.z = Math.PI / 4;
                const ribbon = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.05, 8, 16), new THREE.MeshStandardMaterial({ color: 0xff0000 }));
                ribbon.position.set(0, 0, 0);
                ribbon.rotation.z = Math.PI / 4;
                group.add(tube, ribbon);
                break;

            case 'collaborator': // Connected Nodes
                const sphereGeo = new THREE.SphereGeometry(0.3, 16, 16);
                const p1 = new THREE.Mesh(sphereGeo, material);
                const p2 = new THREE.Mesh(sphereGeo, material);
                const p3 = new THREE.Mesh(sphereGeo, material);
                p1.position.set(0, 0.5, 0);
                p2.position.set(-0.6, -0.5, 0);
                p3.position.set(0.6, -0.5, 0);

                // Lines
                const lineGeo = new THREE.BufferGeometry().setFromPoints([p1.position, p2.position, p2.position, p3.position, p3.position, p1.position]);
                const line = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 }));

                group.add(p1, p2, p3, line);
                break;

            case 'explorer': // Planet/Globe
                const globe = new THREE.Mesh(new THREE.SphereGeometry(0.8, 20, 20), material);
                const ring = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.05, 8, 32), new THREE.MeshStandardMaterial({ color: 0xffffff }));
                ring.rotation.x = Math.PI / 2;
                ring.rotation.y = Math.PI / 6;
                group.add(globe, ring);
                break;
        }
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    new Home3DManager();
});
