/**
 * 3D Interactive Navigation Menu for Research Portfolio
 * Using Three.js for 3D visualization
 * Smooth pathways linking to different sections
 */

(function() {
  'use strict';
  
  class NavigationController3D {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container) {
        console.error('Container not found: ' + containerId);
        return;
      }
      
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight;
      
      // Navigation items matching your site structure
      this.navItems = [
        { name: 'Home', path: '/', color: 0x1e88e5, position: [-3, 0, 0] },
        { name: 'Research', path: '/research', color: 0xd32f2f, position: [0, 3, 0] },
        { name: 'Publications', path: '/publications', color: 0x388e3c, position: [3, 0, 0] },
        { name: 'About', path: '/about', color: 0xf57c00, position: [0, -3, 0] },
        { name: 'Contact', path: '/contact', color: 0x7b1fa2, position: [-2, -2, -2] }
      ];
      
      this.init();
    }
    
    init() {
      this.setupScene();
      this.createNavMesh();
      this.createPathways();
      this.setupControls();
      this.animate();
      window.addEventListener('resize', () => this.onWindowResize());
    }
    
    setupScene() {
      // Scene setup with dark background for research site
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x0a0e27);
      
      // Camera
      this.camera = new THREE.PerspectiveCamera(
        75,
        this.width / this.height,
        0.1,
        1000
      );
      this.camera.position.z = 8;
      
      // Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(this.width, this.height);
      this.renderer.shadowMap.enabled = true;
      this.container.appendChild(this.renderer.domElement);
      
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 5, 5);
      pointLight.castShadow = true;
      this.scene.add(pointLight);
    }
    
    createNavMesh() {
      this.navMeshes = [];
      this.navLabels = [];
      
      this.navItems.forEach((item, index) => {
        // Create sphere for each nav point
        const geometry = new THREE.IcosahedronGeometry(0.5, 4);
        const material = new THREE.MeshPhongMaterial({
          color: item.color,
          emissive: 0x111111,
          shininess: 200,
          wireframe: false
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(item.position[0], item.position[1], item.position[2]);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = {
          name: item.name,
          path: item.path,
          index: index,
          hovered: false
        };
        
        this.scene.add(mesh);
        this.navMeshes.push(mesh);
      });
    }
    
    createPathways() {
      const centerPoint = new THREE.Vector3(0, 0, 0);
      
      this.navMeshes.forEach(mesh => {
        // Create curved paths from center to each nav point
        const curve = new THREE.CatmullRomCurve3([
          centerPoint,
          new THREE.Vector3(
            mesh.position.x * 0.5,
            mesh.position.y * 0.5,
            mesh.position.z * 0.5
          ),
          mesh.position.clone()
        ]);
        
        const points = curve.getPoints(50);
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: mesh.material.color,
          linewidth: 2,
          opacity: 0.6
        });
        
        const pathLine = new THREE.Line(lineGeometry, lineMaterial);
        this.scene.add(pathLine);
      });
    }
    
    setupControls() {
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      
      this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
      this.container.addEventListener('click', (e) => this.onMouseClick(e));
      this.container.addEventListener('touchstart', (e) => this.onTouchStart(e));
    }
    
    onMouseMove(event) {
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / this.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / this.height) * 2 + 1;
      
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.navMeshes);
      
      // Reset all meshes
      this.navMeshes.forEach(mesh => {
        mesh.scale.set(1, 1, 1);
        mesh.userData.hovered = false;
      });
      
      // Highlight intersected mesh
      if (intersects.length > 0) {
        const intersected = intersects[0].object;
        intersected.scale.set(1.3, 1.3, 1.3);
        intersected.userData.hovered = true;
        this.container.style.cursor = 'pointer';
      } else {
        this.container.style.cursor = 'default';
      }
    }
    
    onMouseClick(event) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.navMeshes);
      
      if (intersects.length > 0) {
        const clicked = intersects[0].object;
        window.location.href = clicked.userData.path;
      }
    }
    
    onTouchStart(event) {
      const touch = event.touches[0];
      const rect = this.container.getBoundingClientRect();
      
      this.mouse.x = ((touch.clientX - rect.left) / this.width) * 2 - 1;
      this.mouse.y = -((touch.clientY - rect.top) / this.height) * 2 + 1;
      
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.navMeshes);
      
      if (intersects.length > 0) {
        const touched = intersects[0].object;
        window.location.href = touched.userData.path;
      }
    }
    
    onWindowResize() {
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight;
      
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    }
    
    animate() {
      requestAnimationFrame(() => this.animate());
      
      // Rotation animation
      this.navMeshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.008;
        
        // Gentle floating animation
        mesh.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.001;
      });
      
      this.renderer.render(this.scene, this.camera);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new NavigationController3D('nav-3d-container');
    });
  } else {
    new NavigationController3D('nav-3d-container');
  }
  
  // Export for use in other modules
  window.NavigationController3D = NavigationController3D;
})();
