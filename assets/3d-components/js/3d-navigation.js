/**
 * 3d-navigation.js
 * Implements a 3D interactive navigation system using Three.js
 */

class NavigationController3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.loadingElement = document.getElementById('nav-3d-loading');

        // Define Navigation Items
        // Paths match _data/navigation.yml
        this.navItems = [
            { name: 'Home', path: '/sandeep-research-portfolio/', color: 0x2196F3, position: [0, 0, 0] }, // Center
            { name: 'About', path: '/sandeep-research-portfolio/about/', color: 0xFFC107, position: [-3, 1, 0] },
            { name: 'CV', path: '/sandeep-research-portfolio/cv/', color: 0x9C27B0, position: [-1.5, 3, 0] },
            { name: 'Research', path: '/sandeep-research-portfolio/research/', color: 0xF44336, position: [1.5, 3, 0] },
            { name: 'Publications', path: '/sandeep-research-portfolio/publications/', color: 0x4CAF50, position: [3, 1, 0] }
        ];

        this.meshes = [];
        this.labels = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.clock = new THREE.Clock();

        this.init();
        this.createObjects();
        this.addLights();
        // Hide loading after init
        if (this.loadingElement) this.loadingElement.style.display = 'none';

        this.animate();
        this.addEventListeners();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();
        // Transparent background

        // Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
        this.camera.position.z = 10;
        this.camera.position.y = 1;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
    }

    createObjects() {
        const geometry = new THREE.IcosahedronGeometry(0.6, 0);

        this.navItems.forEach((item, index) => {
            // Mesh
            const material = new THREE.MeshPhongMaterial({
                color: item.color,
                flatShading: true,
                shininess: 50
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(item.position[0], item.position[1], item.position[2]);
            mesh.userData = { path: item.path, name: item.name, isNav: true, originalScale: 1 };

            this.scene.add(mesh);
            this.meshes.push(mesh);

            // Connector Lines (Curves)
            if (index > 0) { // Don't connect Home (center) to itself, connect others to Home
                const points = [];
                const homePos = new THREE.Vector3(0, 0, 0);
                const itemPos = new THREE.Vector3(item.position[0], item.position[1], item.position[2]);

                // Create a curve
                const curve = new THREE.CatmullRomCurve3([
                    homePos,
                    new THREE.Vector3().lerpVectors(homePos, itemPos, 0.5).add(new THREE.Vector3(0, 0.5, 0.5)), // Control point
                    itemPos
                ]);

                const curvePoints = curve.getPoints(20);
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
                const lineMaterial = new THREE.LineBasicMaterial({ color: item.color, transparent: true, opacity: 0.3 });
                const line = new THREE.Line(lineGeometry, lineMaterial);
                this.scene.add(line);
            }
        });
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.8);
        pointLight.position.set(5, 5, 10);
        this.scene.add(pointLight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = this.clock.getElapsedTime();

        this.meshes.forEach((mesh, i) => {
            // Rotate
            mesh.rotation.y += 0.01;
            mesh.rotation.z += 0.005;

            // Float
            mesh.position.y = this.navItems[i].position[1] + Math.sin(time + i) * 0.1;
        });

        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;
            this.renderer.setSize(width, height);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        });

        // Mouse Move for Raycaster
        this.container.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            this.checkIntersection();
        });

        // Click to Navigate
        this.container.addEventListener('click', () => {
            if (this.hoveredObject) {
                window.location.href = this.hoveredObject.userData.path;
            }
        });
    }

    checkIntersection() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.meshes);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (this.hoveredObject !== object) {
                // Hover In
                this.hoveredObject = object;
                document.body.style.cursor = 'pointer';
                this.transformObject(object, 1.3);
            }
        } else {
            if (this.hoveredObject) {
                // Hover Out
                this.transformObject(this.hoveredObject, 1);
                this.hoveredObject = null;
                document.body.style.cursor = 'default';
            }
        }
    }

    transformObject(object, scale) {
        // Simple tween-like scaling (could use GSAP if desired, but keeping it vanilla)
        object.scale.setScalar(scale);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NavigationController3D('nav-3d-container');
});
