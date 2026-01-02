/**
 * research-dashboard.js
 * Interactive 3D Dashboard for REIT/InvIT Research
 */

class ResearchDashboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return; // Guard clause

        this.currentView = 'performance'; // 'performance', 'map', 'investor'
        this.objects = { performance: [], map: [], investor: [] };

        // Data Stubs (Binding ready)
        this.data = {
            performance: [
                { market: 'India', yield: 6.5, volatility: 4.2, color: 0xff9900 },
                { market: 'Singapore', yield: 5.8, volatility: 3.5, color: 0x00ccff },
                { market: 'USA', yield: 4.2, volatility: 5.1, color: 0xff3333 }
            ],
            mapPoints: [
                { name: 'Whitefield', x: 2, z: -1, value: 0.8 },
                { name: 'ORR', x: 0, z: 0, value: 1.2 },
                { name: 'Elec. City', x: 1, z: 2, value: 0.6 }
            ],
            investorNodes: [
                { id: 'Inst', type: 'hub', pos: [0, 0, 0], color: 0x2c5282 },
                { id: 'Retail', type: 'hub', pos: [3, 0, 0], color: 0xe53e3e },
                { id: 'p1', type: 'node', parent: 'Inst', pos: [-1, 1, 1] },
                { id: 'p2', type: 'node', parent: 'Inst', pos: [-1, -1, 0.5] },
                { id: 'p3', type: 'node', parent: 'Inst', pos: [0.5, 1, -1] },
                { id: 'r1', type: 'node', parent: 'Retail', pos: [3.5, 1, 1] },
                { id: 'r2', type: 'node', parent: 'Retail', pos: [2.5, -1, 0] },
            ]
        };

        this.init();
        this.createScenes();
        this.animate();
        this.setupControls();
    }

    init() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xfcfcfc); // Light clean background for academic look
        this.scene.fog = new THREE.FogExp2(0xfcfcfc, 0.05);

        this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        // Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        // Lights
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        this.scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 7);
        dirLight.castShadow = true;
        this.scene.add(dirLight);

        // Raycaster
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Tooltip
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'dashboard-tooltip';
        this.container.appendChild(this.tooltip);

        // Interaction
        this.container.addEventListener('mousemove', this.onMouseMove.bind(this));

        // Touch Optimization: Prevent scroll hijacking
        // On mobile, OrbitControls grabs touch events. We add an overlay "Use 2 fingers to move" or similar if needed.
        // Actually simplest is to ensure touch-action allows scroll unless focused.
        this.container.style.touchAction = 'none'; // Give control to Three.js when touching canvas

        // Mobile "Tap to Interact" Overlay
        if (window.innerWidth < 768) {
            this.createMobileOverlay();
        }

        this.container.addEventListener('click', this.onClick.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
    }

    createMobileOverlay() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;
            color: white; font-weight: bold; pointer-events: auto; z-index: 20;
            transition: opacity 0.3s; cursor: pointer;
        `;
        overlay.innerHTML = '<span>🖐 Tap to Interact</span>';

        // Disable controls initially
        this.controls.enabled = false;

        overlay.addEventListener('click', () => {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            this.controls.enabled = true;
        });

        this.container.appendChild(overlay);
    }

    createScenes() {
        this.mainGroup = new THREE.Group();
        this.scene.add(this.mainGroup);

        // --- 1. Performance Charts ---
        this.perfGroup = new THREE.Group();
        this.data.performance.forEach((d, i) => {
            const h = d.yield; // Height = Yield
            const geo = new THREE.BoxGeometry(1, h, 1);
            const mat = new THREE.MeshStandardMaterial({ color: d.color, roughness: 0.3 });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set((i - 1) * 2.5, h / 2, 0);
            mesh.castShadow = true;
            mesh.userData = { type: 'perf', data: d };
            this.perfGroup.add(mesh);
            this.objects.performance.push(mesh);

            // Label Platform
            const labelGeo = new THREE.PlaneGeometry(1.5, 0.5);
            const can = document.createElement('canvas');
            const ctx = can.getContext('2d');
            can.width = 256; can.height = 64;
            ctx.fillStyle = 'white'; ctx.fillRect(0, 0, 256, 64);
            ctx.fillStyle = 'black'; ctx.font = '30px Arial'; ctx.textAlign = 'center';
            ctx.fillText(d.market, 128, 40);
            const tex = new THREE.CanvasTexture(can);
            const labelMat = new THREE.MeshBasicMaterial({ map: tex });
            const label = new THREE.Mesh(labelGeo, labelMat);
            label.position.set((i - 1) * 2.5, 0.1, 1);
            label.rotation.x = -Math.PI / 2;
            this.perfGroup.add(label);
        });
        this.mainGroup.add(this.perfGroup);

        // --- 2. Map View (Hidden initially) ---
        this.mapGroup = new THREE.Group();
        this.mapGroup.visible = false;
        // Ground plane
        const planeGeo = new THREE.PlaneGeometry(10, 10, 20, 20);
        // Make it terrain-ish
        const posAttr = planeGeo.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
            posAttr.setZ(i, Math.random() * 0.5);
        }
        planeGeo.computeVertexNormals();
        const planeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, wireframe: false });
        const terrain = new THREE.Mesh(planeGeo, planeMat);
        terrain.rotation.x = -Math.PI / 2;
        terrain.receiveShadow = true;
        this.mapGroup.add(terrain);

        // Pins
        this.data.mapPoints.forEach(p => {
            const geo = new THREE.ConeGeometry(0.3, 1, 16);
            const mat = new THREE.MeshStandardMaterial({ color: 0xe53e3e });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(p.x, 0.5, p.z);
            mesh.rotation.x = Math.PI; // Point down
            mesh.userData = { type: 'map', data: p };
            this.mapGroup.add(mesh);
            this.objects.map.push(mesh);
        });
        this.mainGroup.add(this.mapGroup);

        // --- 3. Investor View (Hidden initially) ---
        this.investorGroup = new THREE.Group();
        this.investorGroup.visible = false;

        this.data.investorNodes.forEach(n => {
            const r = n.type === 'hub' ? 0.5 : 0.2;
            const geo = new THREE.SphereGeometry(r);
            const mat = new THREE.MeshStandardMaterial({ color: n.color || 0x718096 });
            const mesh = new THREE.Mesh(geo, mat);
            if (n.pos) mesh.position.set(...n.pos);
            mesh.userData = { type: 'inv', data: n };
            this.investorGroup.add(mesh);
            this.objects.investor.push(mesh); // Track for interactions

            // Link to parent
            if (n.parent) {
                const parentNode = this.data.investorNodes.find(p => p.id === n.parent);
                if (parentNode) {
                    const pts = [new THREE.Vector3(...n.pos), new THREE.Vector3(...parentNode.pos)];
                    const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
                    const l = new THREE.Line(lGeo, new THREE.LineBasicMaterial({ color: 0xcbd5e0 }));
                    this.investorGroup.add(l);
                }
            }
        });
        this.mainGroup.add(this.investorGroup);
    }

    switchView(viewName) {
        // Transition
        const duration = 500;

        // Hide all with fade out logic (simplified here to toggles for robustness)
        if (viewName === 'performance') {
            this.camera.position.set(0, 5, 10);
            this.perfGroup.visible = true;
            this.mapGroup.visible = false;
            this.investorGroup.visible = false;
        } else if (viewName === 'map') {
            this.camera.position.set(0, 8, 5);
            this.perfGroup.visible = false;
            this.mapGroup.visible = true;
            this.investorGroup.visible = false;
        } else if (viewName === 'investor') {
            this.camera.position.set(0, 0, 10);
            this.perfGroup.visible = false;
            this.mapGroup.visible = false;
            this.investorGroup.visible = true;
        }

        this.currentView = viewName;
        this.controls.reset();
    }

    onMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Check intersections based on flow
        let targetObjects = [];
        if (this.currentView === 'performance') targetObjects = this.objects.performance;
        else if (this.currentView === 'map') targetObjects = this.objects.map;
        else if (this.currentView === 'investor') targetObjects = this.objects.investor;

        const intersects = this.raycaster.intersectObjects(targetObjects);

        if (intersects.length > 0) {
            this.container.style.cursor = 'pointer';
            const data = intersects[0].object.userData.data;
            // Update Tooltip
            let text = '';
            if (data.market) text = `${data.market}\nYield: ${data.yield}%`;
            if (data.name) text = `${data.name}\nValue: ${data.value} PSF`;
            if (data.id) text = `Node: ${data.id}`;

            this.tooltip.innerText = text;
            this.tooltip.style.opacity = 1;
            this.tooltip.style.left = (e.clientX - rect.left + 15) + 'px';
            this.tooltip.style.top = (e.clientY - rect.top + 15) + 'px';
        } else {
            this.container.style.cursor = 'default';
            this.tooltip.style.opacity = 0;
        }
    }

    onClick(e) {
        // Logic for drill-down can go here
    }

    onResize() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    setupControls() {
        // UI Buttons bound in HTML
        const btns = document.querySelectorAll('.dashboard-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class
                btns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.switchView(e.target.dataset.view);
            });
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Idle animations
        if (this.currentView === 'investor') {
            this.investorGroup.rotation.y += 0.002;
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Init when DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    window.researchDashboard = new ResearchDashboard('research-dashboard-canvas');
});
