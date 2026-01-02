/**
 * research-visuals.js
 * Implements interactive 3D visualizations for the Research/About page.
 * Uses Three.js to render data visualizations when strictly Spline scenes aren't available.
 */

class ResearchVisuals {
    constructor() {
        this.containers = document.querySelectorAll('.research-viz-container');
        this.tooltips = new Map();
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.buildScene(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        this.containers.forEach(c => observer.observe(c));
    }

    buildScene(container) {
        const type = container.dataset.vizType;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // --- Three.js Setup ---
        const scene = new THREE.Scene();
        scene.background = null; // Transparent

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 2, 6);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        // Fix for HDPI
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // --- Lights ---
        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambient);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        // --- Objects based on Type ---
        let objects = new THREE.Group();
        let animLoop = null;

        if (type === 'reit-structure') {
            // Visualize REITs as a stable, growing bar chart structure
            const geometry = new THREE.BoxGeometry(0.8, 1, 0.8);
            const materials = [
                new THREE.MeshStandardMaterial({ color: 0x2c5282 }), // Blue
                new THREE.MeshStandardMaterial({ color: 0x2b6cb0 }),
                new THREE.MeshStandardMaterial({ color: 0x3182ce }),
            ];

            // Create 3 Bars
            for (let i = 0; i < 3; i++) {
                const h = 1.5 + i * 0.5;
                const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.8, h, 0.8), materials[i]);
                mesh.position.set((i - 1) * 1.2, h / 2 - 1, 0);
                mesh.userData = {
                    info: i === 0 ? "Embassy REIT: Asia's First" : (i === 1 ? "Mindspace: Commercial Hubs" : "Brookfield: Institutional Grade"),
                    id: `reit-${i}`
                };
                objects.add(mesh);
            }

            animLoop = () => {
                objects.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
            };

        } else if (type === 'invit-components') {
            // Visualize InvITs as connected infrastructure nodes
            const sphereGeo = new THREE.SphereGeometry(0.3, 16, 16);
            const mat = new THREE.MeshStandardMaterial({ color: 0xe53e3e }); // Red

            const nodePositions = [
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(-1.5, -1, 0),
                new THREE.Vector3(1.5, -1, 0),
                new THREE.Vector3(0, 1.5, 0)
            ];

            const nodeInfos = ["Power Grid", "Highways", "Telecom Towers", "Gas Pipelines"];

            nodePositions.forEach((pos, i) => {
                const mesh = new THREE.Mesh(sphereGeo, mat);
                mesh.position.copy(pos);
                mesh.userData = { info: nodeInfos[i], id: `invit-${i}` };
                objects.add(mesh);
            });

            // Links
            const points = nodePositions.map(p => p);
            // Connect to center 0
            const lineGeo = new THREE.BufferGeometry().setFromPoints([
                nodePositions[1], nodePositions[0],
                nodePositions[2], nodePositions[0],
                nodePositions[3], nodePositions[0]
            ]);
            const line = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0xcbd5e0 }));
            objects.add(line);

            animLoop = () => {
                objects.rotation.z += 0.001;
            };

        } else if (type === 'bengaluru-map') {
            // Abstract Map - Grid of cubes
            const gridGroup = new THREE.Group();
            for (let x = -2; x <= 2; x++) {
                for (let z = -2; z <= 2; z++) {
                    const h = Math.random() * 0.5;
                    const mesh = new THREE.Mesh(
                        new THREE.BoxGeometry(0.8, 0.1 + h, 0.8),
                        new THREE.MeshStandardMaterial({
                            color: new THREE.Color().setHSL(0.1, 0.8, 0.5 + h), // Gold/Orange scale
                            transparent: true, opacity: 0.8
                        })
                    );
                    mesh.position.set(x, h / 2 - 1, z);
                    mesh.userData = { info: `Sector ${x + 3}-${z + 3}: Growing`, id: `sector-${x}-${z}` };
                    gridGroup.add(mesh);
                }
            }
            objects.add(gridGroup);

            animLoop = () => {
                gridGroup.rotation.y += 0.002;
            };
        }

        scene.add(objects);

        // --- Interaction: Raycaster ---
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        // Tooltip Element
        const tooltip = document.createElement('div');
        Object.assign(tooltip.style, {
            position: 'absolute',
            background: 'rgba(0,0,0,0.8)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            pointerEvents: 'none',
            display: 'none',
            zIndex: 10,
            transition: 'opacity 0.2s',
            backdropFilter: 'blur(4px)'
        });
        container.style.position = 'relative'; // Ensure overlay works
        container.appendChild(tooltip);

        const onMouseMove = (event) => {
            const rect = container.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

            // Move tooltip
            tooltip.style.left = `${event.clientX - rect.left + 15}px`;
            tooltip.style.top = `${event.clientY - rect.top + 15}px`;
        };

        const onClick = () => {
            raycaster.setFromCamera(mouse, camera);
            // Recursively check children
            const intersects = raycaster.intersectObjects(objects.children, true);

            if (intersects.length > 0) {
                const hit = intersects[0].object;
                if (hit.userData && hit.userData.info) {
                    tooltip.textContent = hit.userData.info;
                    tooltip.style.display = 'block';
                    tooltip.style.opacity = '1';

                    // Highlight effect
                    const originalColor = hit.material.color.getHex();
                    hit.material.color.setHex(0xffffff);
                    setTimeout(() => {
                        if (hit.material) hit.material.color.setHex(originalColor);
                    }, 200);
                }
            } else {
                tooltip.style.opacity = '0';
            }
        };

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('click', onClick);
        container.addEventListener('mouseleave', () => { tooltip.style.opacity = '0'; });

        // --- Animation Loop ---
        const animate = () => {
            requestAnimationFrame(animate);
            if (animLoop) animLoop();
            renderer.render(scene, camera);
        };
        animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ResearchVisuals();
});
