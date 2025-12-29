
// Three.js Finance Scenes Generator

// Shared Materials & Colors
const COLORS = {
    bg: 0x141414,
    grid: 0x2c2c2c,
    gold: 0xf6ad55,
    red: 0xe50914,
    blue: 0x2c5282,
    white: 0xffffff,
    glass: 0xffffff
};

async function initFinanceScenes() {
    const containers = document.querySelectorAll('.finance-3d-container');
    
    // Intersection Observer for Lazy Loading
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadScene(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    containers.forEach(c => observer.observe(c));
}

function loadScene(container) {
    const sceneId = container.dataset.scene;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Basic Three.js Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.bg);
    // Add subtle fog
    scene.fog = new THREE.FogExp2(COLORS.bg, 0.05);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Remove Loading Text
    const loader = container.querySelector('.loading-text');
    if (loader) loader.style.display = 'none';

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(COLORS.gold, 1, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    // Scene Specific Content
    let animFunc = () => {};

    switch(sceneId) {
        case 'intro': // 1. Holographic Building
            animFunc = createIntroScene(scene);
            break;
        case 'ticker': // 2. Stock Ticker (Milestones)
            animFunc = createTickerScene(scene);
            break;
        case 'focus': // 3. DNA Helix (About)
            animFunc = createHelixScene(scene);
            break;
        case 'reit': // 4. Bar Chart (Project 1)
            animFunc = createBarChartScene(scene);
            break;
        case 'invit': // 5. Tower Crane (Project 2)
            animFunc = createCraneScene(scene);
            break;
        case 'regional': // 6. Heat Map (Project 3)
            animFunc = createHeatMapScene(scene);
            break;
        case 'investor': // 7. Neural Network (Project 4)
            animFunc = createNeuralScene(scene);
            break;
        case 'regulatory': // 8. Golden Ratio (Project 5)
            animFunc = createGoldenRatioScene(scene);
            break;
        case 'skills': // 9. Skills Constellation
            animFunc = createSkillsScene(scene);
            break;
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        animFunc();
        renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}

// --- Scene Generators ---

// 1. Holographic Building
function createIntroScene(scene) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ 
        color: COLORS.blue, 
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    
    const buildings = new THREE.Group();
    // Create random cluster
    for(let i=0; i<5; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set((Math.random()-0.5)*2, i*0.5, (Math.random()-0.5)*2);
        mesh.scale.set(0.5, Math.random()*2 + 0.5, 0.5);
        buildings.add(mesh);
    }
    scene.add(buildings);

    return () => {
        buildings.rotation.y += 0.005;
    };
}

// 2. Stock Ticker (Particles Flow)
function createTickerScene(scene) {
    const particlesComp = new THREE.BufferGeometry();
    const count = 500;
    const positions = new Float32Array(count * 3);
    for(let i=0; i<count*3; i++) positions[i] = (Math.random() - 0.5) * 5;
    particlesComp.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const mat = new THREE.PointsMaterial({ color: COLORS.gold, size: 0.05 });
    const points = new THREE.Points(particlesComp, mat);
    scene.add(points);

    return () => {
        const pos = points.geometry.attributes.position.array;
        for(let i=0; i<count; i++) {
            pos[i*3] += 0.02; // Move X
            if(pos[i*3] > 2.5) pos[i*3] = -2.5;
        }
        points.geometry.attributes.position.needsUpdate = true;
    };
}

// 3. DNA Helix
function createHelixScene(scene) {
    const group = new THREE.Group();
    const count = 20;
    
    for(let i=0; i<count; i++) {
        const t = i/count * Math.PI * 4;
        const x = Math.sin(t);
        const y = (i/count)*4 - 2;
        const z = Math.cos(t);
        
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.1),
            new THREE.MeshBasicMaterial({ color: COLORS.red })
        );
        sphere.position.set(x, y, z);
        group.add(sphere);

        // Opposite strand
        const sphere2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.1),
            new THREE.MeshBasicMaterial({ color: COLORS.blue })
        );
        sphere2.position.set(-x, y, -z);
        group.add(sphere2);
        
        // Connector
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x, y, z),
            new THREE.Vector3(-x, y, -z)
        ]);
        const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0x555555 }));
        group.add(line);
    }
    scene.add(group);
    
    return () => {
        group.rotation.y += 0.01;
    };
}

// 4. Bar Chart
function createBarChartScene(scene) {
    const group = new THREE.Group();
    const bars = [];
    
    for(let i=0; i<5; i++) {
        const h = Math.random() * 2 + 0.5;
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.4, h, 0.4),
            new THREE.MeshStandardMaterial({ color: COLORS.gold })
        );
        mesh.position.set((i-2)*0.6, h/2 - 1, 0);
        group.add(mesh);
        bars.push({ mesh, targetH: h });
    }
    scene.add(group);
    
    // Grid floor
    const grid = new THREE.GridHelper(5, 10, COLORS.grid, COLORS.grid);
    grid.position.y = -1;
    scene.add(grid);

    return () => {
        group.rotation.y = Math.sin(Date.now()*0.001) * 0.2;
    };
}

// 5. Tower Crane (Abstract)
function createCraneScene(scene) {
    const group = new THREE.Group();
    
    // Tower
    const tower = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 3, 0.2),
        new THREE.MeshStandardMaterial({ color: COLORS.gold })
    );
    group.add(tower);
    
    // Jib
    const jib = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.1, 0.1),
        new THREE.MeshStandardMaterial({ color: COLORS.red })
    );
    jib.position.y = 1.4;
    group.add(jib);
    
    scene.add(group);
    
    return () => {
        jib.rotation.y += 0.01;
    };
}

// 6. Heat Map (Grid of Cubes)
function createHeatMapScene(scene) {
    const group = new THREE.Group();
    const cubes = [];
    
    for(let x=-2; x<=2; x++) {
        for(let z=-2; z<=2; z++) {
            const h = Math.random();
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(0.9, 0.2, 0.9),
                new THREE.MeshStandardMaterial({ 
                    color: new THREE.Color().setHSL(0.6 - h*0.6, 1, 0.5),
                    transparent: true, opacity: 0.9
                })
            );
            mesh.position.set(x, h-1, z);
            group.add(mesh);
            cubes.push({ mesh, baseH: h });
        }
    }
    scene.add(group);
    
    return () => {
        const time = Date.now() * 0.002;
        cubes.forEach((c, i) => {
            c.mesh.position.y = (c.baseH + Math.sin(time + c.mesh.position.x)*0.2) - 1;
        });
        group.rotation.y += 0.002;
    };
}

// 7. Neural Network
function createNeuralScene(scene) {
    const group = new THREE.Group();
    const nodes = [];
    const geometry = new THREE.SphereGeometry(0.05);
    const material = new THREE.MeshBasicMaterial({ color: COLORS.white });
    
    for(let i=0; i<30; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.setRandom().subScalar(0.5).multiplyScalar(4);
        group.add(mesh);
        nodes.push(mesh);
    }
    
    // Connections (dynamic line rendering is expensive, doing static-ish)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.3 });
    const lineGeo = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    scene.add(group);
    
    return () => {
        group.rotation.y += 0.002;
        group.rotation.x += 0.001;
        
        // Update connections based on distance
        const positions = [];
        for(let i=0; i<nodes.length; i++) {
            for(let j=i+1; j<nodes.length; j++) {
                if(nodes[i].position.distanceTo(nodes[j].position) < 1.5) {
                    positions.push(
                        nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
                        nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
                    );
                }
            }
        }
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    };
}

// 8. Golden Ratio Spiral
function createGoldenRatioScene(scene) {
    const group = new THREE.Group();
    const phi = 1.61803398875;
    
    // Create points
    for (let i = 0; i < 200; i++) {
        const theta = 2 * Math.PI * i / (phi * phi);
        const r = Math.sqrt(i) * 0.1;
        
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.05, 0.05),
            new THREE.MeshBasicMaterial({ color: COLORS.gold })
        );
        mesh.position.set(r * Math.cos(theta), r * Math.sin(theta), 0);
        group.add(mesh);
    }
    scene.add(group);
    
    return () => {
        group.rotation.z -= 0.005;
    };
}

// 9. Skills Constellation
function createSkillsScene(scene) {
    const group = new THREE.Group();
    
    const skills = ['Python', 'Three.js', 'REITs', 'Data', 'Finance'];
    skills.forEach((skill, i) => {
        // Can't do text easily without font loader, using colored spheres as abstract rep
        const mesh = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.3),
            new THREE.MeshStandardMaterial({ color: i%2===0 ? COLORS.blue : COLORS.red })
        );
        const theta = (i / skills.length) * Math.PI * 2;
        mesh.userData = { theta };
        group.add(mesh);
    });
    
    // Central core
    const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.5, 1),
        new THREE.MeshStandardMaterial({ color: COLORS.gold, wireframe: true })
    );
    group.add(core);
    
    scene.add(group);
    
    return () => {
        const time = Date.now() * 0.001;
        core.rotation.y -= 0.01;
        
        group.children.forEach((child, i) => {
            if(i === group.children.length - 1) return; // Skip core
            const t = child.userData.theta + time;
            child.position.set(Math.cos(t)*1.5, Math.sin(t*2)*0.5, Math.sin(t)*1.5);
            child.rotation.x += 0.02;
        });
    };
}

// Expose init function
window.initFinanceScenes = initFinanceScenes;

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFinanceScenes);
} else {
    initFinanceScenes();
}
