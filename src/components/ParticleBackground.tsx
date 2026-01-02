/**
 * ParticleBackground.tsx
 * 
 * USAGE EXAMPLE:
 * 
 * // 1. Install dependencies:
 * // npm install three @types/three
 * 
 * // 2. Import and use in your React component:
 * // import ParticleBackground from './ParticleBackground';
 * //
 * // function App() {
 * //   return (
 * //     <div className="App">
 * //       <ParticleBackground />
 * //       <main style={{ position: 'relative', zIndex: 1, color: 'white' }}>
 * //         <h1>Your Portfolio Content</h1>
 * //       </main>
 * //     </div>
 * //   );
 * // }
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

// --- Constants & Configuration ---
const PARTICLE_COUNT = 15000;
const BOUNDS = 100; // ±100 units
// Physics
const DAMPING = 0.95;
const GRAVITY = 0.05; // Adjusted from 0.1 for visual usability (0.1 is extremely fast at 60fps)
const LIFESPAN_DECAY = 0.01; // Linear decay per frame (replacing 0.81 multiplier which would be instant/strobe)
// Colors
const COLOR_DEEP_GOLD = new THREE.Color(0xB8860B);
const COLOR_BRIGHT_YELLOW = new THREE.Color(0xFFFF00);
const COLOR_WHITE = new THREE.Color(0xFFFFFF);

export default function ParticleBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    // Refs for cleanup to avoid closure staleness if needed, though mostly handled in useEffect
    const isMouseDown = useRef(false);
    const mouse = useRef(new THREE.Vector2(-1000, -1000)); // Off-screen init
    const keys = useRef<{ [key: string]: boolean }>({ w: false, a: false, s: false, d: false });

    useEffect(() => {
        if (!containerRef.current) return;

        // --- 1. Three.js Initialization ---
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 60; // Pulled back to see the 100 unit bounds

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // --- 2. Physics & Particle Storage ---
        // Using Float32Array for performance (Structure of Arrays)
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const velocities = new Float32Array(PARTICLE_COUNT * 3);
        const accelerations = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const lifespans = new Float32Array(PARTICLE_COUNT);
        const maxLifespans = new Float32Array(PARTICLE_COUNT);
        const masses = new Float32Array(PARTICLE_COUNT);

        // Helper: Initialize a single particle
        const initParticle = (i: number, fromBurst: boolean = false, burstPos?: THREE.Vector3) => {
            const i3 = i * 3;

            if (fromBurst && burstPos) {
                // Burst emissions
                positions[i3] = burstPos.x + (Math.random() - 0.5) * 5;
                positions[i3 + 1] = burstPos.y + (Math.random() - 0.5) * 5;
                positions[i3 + 2] = burstPos.z + (Math.random() - 0.5) * 5;

                // Explosive velocity
                velocities[i3] = (Math.random() - 0.5) * 2.0;
                velocities[i3 + 1] = (Math.random() - 0.5) * 2.0;
                velocities[i3 + 2] = (Math.random() - 0.5) * 2.0;
            } else {
                // Random placement within bounds
                positions[i3] = (Math.random() - 0.5) * BOUNDS * 2;
                positions[i3 + 1] = (Math.random() - 0.5) * BOUNDS * 2;
                positions[i3 + 2] = (Math.random() - 0.5) * BOUNDS * 2;

                velocities[i3] = (Math.random() - 0.5) * 0.2;
                velocities[i3 + 1] = (Math.random() - 0.5) * 0.2;
                velocities[i3 + 2] = (Math.random() - 0.5) * 0.2;
            }

            accelerations[i3] = 0;
            accelerations[i3 + 1] = 0;
            accelerations[i3 + 2] = 0;

            // Random properties
            masses[i] = 0.5 + Math.random() * 1.5;
            lifespans[i] = Math.random() * 2 + 1; // 1 to 3 seconds base lifespan
            maxLifespans[i] = lifespans[i];

            // Initial Color (Start Gold)
            colors[i3] = COLOR_DEEP_GOLD.r;
            colors[i3 + 1] = COLOR_DEEP_GOLD.g;
            colors[i3 + 2] = COLOR_DEEP_GOLD.b;
        };

        // Initialize all particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            initParticle(i);
        }

        // --- 3. Geometry & Material ---
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.2, // Visible size
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false, // Important for accumulation effect
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // --- 4. Post-Processing (Bloom) ---
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        // Bloom parameters: Strength, Radius, Threshold
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.8,
            0.5,
            0.1
        );
        composer.addPass(bloomPass);

        // --- 5. Interaction Setup ---
        const raycaster = new THREE.Raycaster();
        const tempColor = new THREE.Color();
        const targetPos = new THREE.Vector3(); // Reused for allocation

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        const handleMouseDown = () => {
            isMouseDown.current = true;
            // Emit burst on click
            raycaster.setFromCamera(mouse.current, camera);
            const rayDir = raycaster.ray.direction.clone().multiplyScalar(40); // 40 units out
            const burstPos = camera.position.clone().add(rayDir);

            // Recycle/Emit some particles at this location
            for (let i = 0; i < 50; i++) {
                const idx = Math.floor(Math.random() * PARTICLE_COUNT);
                initParticle(idx, true, burstPos);
            }
        };

        const handleMouseUp = () => isMouseDown.current = false;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(e.code)) {
                if (e.code === 'Space') {
                    // Reset
                    for (let i = 0; i < PARTICLE_COUNT; i++) initParticle(i);
                } else {
                    keys.current[e.key.toLowerCase()] = true;
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
                keys.current[e.key.toLowerCase()] = false;
            }
        };

        const handleWheel = (e: WheelEvent) => {
            // Zoom
            camera.position.z += e.deltaY * 0.05;
            camera.position.z = Math.max(10, Math.min(200, camera.position.z));
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('wheel', handleWheel, { passive: false });

        // --- 6. Animation Loop ---
        let frameId = 0;
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            // Camera Movement (WASD)
            const moveSpeed = 0.6;
            if (keys.current.w) camera.position.y += moveSpeed;
            if (keys.current.s) camera.position.y -= moveSpeed;
            if (keys.current.a) camera.position.x -= moveSpeed;
            if (keys.current.d) camera.position.x += moveSpeed;

            // Mouse Raycast for Physics
            raycaster.setFromCamera(mouse.current, camera);
            // Project mouse into 3D space at arbitrary depth (e.g., z=0 plane or fixed distance)
            // Here we project to a distance matching the camera Z roughly, or use a plane
            // For simple attract/repel, we project to a point in front of camera
            raycaster.ray.at(camera.position.z - 20, targetPos);

            // Updating Attributes
            const posArray = geometry.attributes.position.array as Float32Array;
            const colArray = geometry.attributes.color.array as Float32Array;

            // Time factor
            const time = Date.now() * 0.001;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;

                // 1. Calculate Distances & Forces
                const px = posArray[i3];
                const py = posArray[i3 + 1];
                const pz = posArray[i3 + 2];

                // Vector from particle to mouse
                const dx = targetPos.x - px;
                const dy = targetPos.y - py;
                const dz = targetPos.z - pz;
                const distSq = dx * dx + dy * dy + dz * dz;

                // Mouse Interaction
                // Force calculation: (isMouseDown ? -1.2 : 0.8) * 0.015 * mass / (distSq + 1)
                // Range check to avoid affecting entire world equally (e.g., < 30 units)
                if (distSq < 2500) { // 50^2
                    const forceFactor = (isMouseDown.current ? -1.2 : 0.8) * 0.015 * masses[i] / (distSq + 0.1);
                    accelerations[i3] += dx * forceFactor;
                    accelerations[i3 + 1] += dy * forceFactor;
                    accelerations[i3 + 2] += dz * forceFactor;
                }

                // Environment Gravity
                accelerations[i3 + 1] -= GRAVITY * masses[i];

                // 2. Physics Update
                velocities[i3] += accelerations[i3];
                velocities[i3 + 1] += accelerations[i3 + 1];
                velocities[i3 + 2] += accelerations[i3 + 2];

                velocities[i3] *= DAMPING;
                velocities[i3 + 1] *= DAMPING;
                velocities[i3 + 2] *= DAMPING;

                posArray[i3] += velocities[i3];
                posArray[i3 + 1] += velocities[i3 + 1];
                posArray[i3 + 2] += velocities[i3 + 2];

                // Reset acceleration
                accelerations[i3] = 0;
                accelerations[i3 + 1] = 0;
                accelerations[i3 + 2] = 0;

                // 3. Lifespan & Recycling
                lifespans[i] -= LIFESPAN_DECAY;
                const lifeRatio = lifespans[i] / maxLifespans[i];

                if (lifespans[i] <= 0 || posArray[i3 + 1] < -BOUNDS) {
                    // Recycle
                    initParticle(i);
                } else {
                    // 4. Color Animation (HSL Cycle + Gold Tones)
                    // Cycle hue slightly based on time + particle index
                    const hueCycle = (Math.sin(time + i * 0.001) + 1) * 0.5; // 0 to 1

                    // Interpolate between Gold, Yellow, White based on lifeRatio and shimmer
                    if (lifeRatio > 0.8) {
                        // New born -> White/Yellow spark
                        tempColor.lerpColors(COLOR_BRIGHT_YELLOW, COLOR_WHITE, 0.5);
                    } else if (lifeRatio > 0.3) {
                        // Mid life -> Deep Gold to Yellow
                        tempColor.lerpColors(COLOR_DEEP_GOLD, COLOR_BRIGHT_YELLOW, hueCycle);
                    } else {
                        // Dying -> Fade to dark gold
                        tempColor.set(COLOR_DEEP_GOLD).multiplyScalar(lifeRatio);
                    }

                    colArray[i3] = tempColor.r;
                    colArray[i3 + 1] = tempColor.g;
                    colArray[i3 + 2] = tempColor.b;
                }
            }

            geometry.attributes.position.needsUpdate = true;
            geometry.attributes.color.needsUpdate = true;

            composer.render();
        };

        animate();

        // --- 7. Cleanup ---
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('wheel', handleWheel);

            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }

            // Dispose Three.js resources
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            composer.dispose();
        };
    }, []);

    return (
        <div
            id="particle-container"
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none', // Allow clicks to pass through to content
                backgroundColor: '#000000',
                overflow: 'hidden'
            }}
        />
    );
}
