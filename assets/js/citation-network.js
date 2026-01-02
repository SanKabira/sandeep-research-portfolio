/**
 * citation-network.js
 * Interactive 3D Citation Network Visualization for Publications Page.
 * Uses Three.js for rendering and a custom force-directed layout system.
 */

class CitationNetwork {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        // Paper Data from the page content (normally would be dynamic, hardcoding for the prompt context)
        this.papers = [
            { id: 1, title: 'Performance Analysis of Indian REITs', type: 'Working Paper', theme: 'REIT', year: 2024, status: 'Under Review' },
            { id: 2, title: 'Infrastructure Investment Trusts in India', type: 'Working Paper', theme: 'InvIT', year: 2024, status: 'In Prep' },
            { id: 3, title: 'REITs and InvITs: Transforming Landscape', type: 'Conference', theme: 'Market', year: 2024, status: 'Presented' },
            { id: 4, title: 'Bengaluru Real Estate: Opportunities', type: 'Conference', theme: 'Regional', year: 2024, status: 'Presented' },
            { id: 5, title: 'Regional Analysis: Bengaluru Advantage', type: 'Article', theme: 'Regional', year: 2024, status: 'In Progress' },
            { id: 6, title: 'Investor Sentiment in Emerging Markets', type: 'Article', theme: 'Investor', year: 2024, status: 'In Progress' },
            { id: 7, title: 'Regulatory Evolution: Indian REITs', type: 'Article', theme: 'Regulatory', year: 2024, status: 'In Progress' },
            { id: 8, title: 'REITs in India: Market Development', type: 'Book Chapter', theme: 'REIT', year: 2025, status: 'Outline' }
        ];

        this.links = [
            { source: 1, target: 3 }, { source: 1, target: 5 }, { source: 1, target: 6 },
            { source: 2, target: 3 }, { source: 2, target: 7 },
            { source: 4, target: 5 }, { source: 3, target: 7 }, { source: 3, target: 8 }
        ];

        // Colors per theme
        this.colors = {
            'REIT': 0x4299e1,
            'InvIT': 0xf56565,
            'Market': 0x48bb78,
            'Regional': 0xed8936,
            'Investor': 0x9f7aea,
            'Regulatory': 0xa0aec0
        };

        this.nodes = [];
        this.edges = [];

        this.init();
        this.initSimulation();
        this.animate();
        this.setupUI();
    }

    init() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        this.scene.fog = new THREE.FogExp2(0xffffff, 0.02);

        this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
        this.camera.position.z = 20;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.5;

        // Lights
        const ambient = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambient);
        const point = new THREE.PointLight(0xffffff, 0.5);
        point.position.set(10, 10, 10);
        this.scene.add(point);

        // Group
        this.networkGroup = new THREE.Group();
        this.scene.add(this.networkGroup);

        // Raycaster
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // create geometry placeholders
        this.nodeGeo = new THREE.SphereGeometry(0.5, 32, 32);
        this.edgeMat = new THREE.LineBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.6 });

        // Initialize Nodes
        this.papers.forEach(p => {
            const mat = new THREE.MeshStandardMaterial({
                color: this.colors[p.theme] || 0xcccccc,
                roughness: 0.3,
                metalness: 0.2
            });
            const mesh = new THREE.Mesh(this.nodeGeo, mat);

            // Random start position
            mesh.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);

            mesh.userData = { id: p.id, data: p, velocity: new THREE.Vector3() };
            this.networkGroup.add(mesh);
            this.nodes.push(mesh);
        });

        // Initialize Edges
        this.links.forEach(l => {
            const sourceNode = this.nodes.find(n => n.userData.id === l.source);
            const targetNode = this.nodes.find(n => n.userData.id === l.target);
            if (sourceNode && targetNode) {
                const geometry = new THREE.BufferGeometry().setFromPoints([sourceNode.position, targetNode.position]);
                const line = new THREE.Line(geometry, this.edgeMat);
                line.userData = { source: sourceNode, target: targetNode };
                this.networkGroup.add(line);
                this.edges.push(line);
            }
        });

        // Events
        this.container.addEventListener('mousemove', this.onMouseMove.bind(this));

        // Mobile Touch Overlay
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
        this.controls.enabled = false;
        overlay.onclick = () => {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            this.controls.enabled = true;
        };
        this.container.parentElement.appendChild(overlay); // Append to wrapper relative parent
    }

    initSimulation() {
        // Simple force layout params
        this.repulsion = 50.0; // Push nodes apart
        this.springLength = 4.0;
        this.springStrength = 0.1;
        this.centerPull = 0.05;
        this.damping = 0.95; // Velocity decay
    }

    updatePhysics() {
        // 1. Repulsion (All vs All)
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const n1 = this.nodes[i];
                const n2 = this.nodes[j];
                const dir = new THREE.Vector3().subVectors(n1.position, n2.position);
                const distSq = dir.lengthSq();
                if (distSq > 0.1) {
                    const force = dir.normalize().multiplyScalar(this.repulsion / distSq);
                    n1.userData.velocity.add(force.multiplyScalar(0.01));
                    n2.userData.velocity.sub(force.multiplyScalar(0.01));
                }
            }
        }

        // 2. Springs (Connected)
        this.edges.forEach(edge => {
            const n1 = edge.userData.source;
            const n2 = edge.userData.target;
            const dir = new THREE.Vector3().subVectors(n2.position, n1.position);
            const dist = dir.length();
            const force = dir.normalize().multiplyScalar((dist - this.springLength) * this.springStrength);
            n1.userData.velocity.add(force.multiplyScalar(0.01));
            n2.userData.velocity.sub(force.multiplyScalar(0.01));
        });

        // 3. Center Gravity + Velocity Update
        this.nodes.forEach(n => {
            n.userData.velocity.sub(n.position.clone().multiplyScalar(this.centerPull * 0.01));
            n.userData.velocity.multiplyScalar(this.damping);
            n.position.add(n.userData.velocity);
        });

        // 4. Update Lines
        this.edges.forEach(edge => {
            const pos = edge.geometry.attributes.position;
            pos.setXYZ(0, edge.userData.source.position.x, edge.userData.source.position.y, edge.userData.source.position.z);
            pos.setXYZ(1, edge.userData.target.position.x, edge.userData.target.position.y, edge.userData.target.position.z);
            pos.needsUpdate = true;
        });
    }

    onMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.nodes);

        if (intersects.length > 0) {
            this.container.style.cursor = 'pointer';
            // Hover logic (scale up)
            if (this.hoveredNode !== intersects[0].object) {
                if (this.hoveredNode) this.hoveredNode.scale.set(1, 1, 1);
                this.hoveredNode = intersects[0].object;
                this.hoveredNode.scale.set(1.5, 1.5, 1.5);

                // Show floating tooltip (simple div positioned nearby)
                this.showTooltip(e, this.hoveredNode.userData.data);
            }
        } else {
            this.container.style.cursor = 'default';
            if (this.hoveredNode) this.hoveredNode.scale.set(1, 1, 1);
            this.hoveredNode = null;
            this.hideTooltip();
        }
    }

    onClick(e) {
        if (this.hoveredNode) {
            const data = this.hoveredNode.userData.data;
            this.showDetailsPanel(data);
            // Focus camera (simple tween-like lookAt)
            this.controls.target.copy(this.hoveredNode.position);
            this.controls.autoRotate = false;
        }
    }

    setupUI() {
        // Tooltip
        this.tooltipEl = document.createElement('div');
        this.tooltipEl.className = 'network-tooltip';
        this.container.parentElement.appendChild(this.tooltipEl);

        // Details Panel
        this.panelEl = document.getElementById('paper-details-panel');

        // Filter Buttons (bound via HTML IDs usually, but here setup simple listener if needed)
        // Search (simple integration)
        const searchInput = document.getElementById('network-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                this.nodes.forEach(n => {
                    const match = n.userData.data.title.toLowerCase().includes(term);
                    n.material.opacity = match ? 1 : 0.1;
                    n.material.transparent = true;
                });
            });
        }

        // Export
        const exportBtn = document.getElementById('network-export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                const img = this.renderer.domElement.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = 'citation-network.png';
                link.href = img;
                link.click();
            });
        }
    }

    showTooltip(e, data) {
        const rect = this.container.getBoundingClientRect();
        this.tooltipEl.style.display = 'block';
        this.tooltipEl.style.left = (e.clientX - rect.left + 15) + 'px';
        this.tooltipEl.style.top = (e.clientY - rect.top + 15) + 'px';
        this.tooltipEl.innerHTML = `<strong>${data.title}</strong><br><span style="font-size:0.8em; color:#ddd">${data.type} • ${data.year}</span>`;
    }

    hideTooltip() {
        this.tooltipEl.style.display = 'none';
    }

    showDetailsPanel(data) {
        if (!this.panelEl) return;
        this.panelEl.classList.add('active');
        this.panelEl.querySelector('.title').innerText = data.title;
        this.panelEl.querySelector('.meta').innerText = `${data.type} | ${data.status} | ${data.year}`;
        this.panelEl.querySelector('.theme-tag').innerText = data.theme;
        this.panelEl.querySelector('.theme-tag').style.backgroundColor = '#' + this.colors[data.theme].toString(16);
    }

    onResize() {
        if (!this.container) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Run physics simulation steps (slow down over time usually, but keep active for floating effect)
        this.updatePhysics();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.citationNetwork = new CitationNetwork('citation-network-container');
});
