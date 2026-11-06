import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCcw, Heart, Eye } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

export default function RoseBouquet3D() {
  const mountRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);
  const [petalsShowered, setPetalsShowered] = useState(0);
  const showerPetalsRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x12040b, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffebee, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    mainLight.position.set(4, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xf472b6, 1.5);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const heartGlow = new THREE.PointLight(0xff1744, 2.8, 6);
    heartGlow.position.set(0, 1, 0.5);
    scene.add(heartGlow);

    // Bouquet Main Group
    const bouquetGroup = new THREE.Group();
    scene.add(bouquetGroup);

    // Materials
    const deepRoseMaterial = new THREE.MeshStandardMaterial({
      color: 0x990b28,
      roughness: 0.38,
      metalness: 0.12,
      emissive: 0x3d000f,
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
    });

    const innerRoseMaterial = new THREE.MeshStandardMaterial({
      color: 0xdb143c,
      roughness: 0.32,
      metalness: 0.15,
      emissive: 0x5a0017,
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide,
    });

    const stemMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f4722,
      roughness: 0.6,
      metalness: 0.1,
    });

    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x2e7d32,
      roughness: 0.45,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });

    const goldRibbonMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.75,
      emissive: 0x78350f,
      emissiveIntensity: 0.2,
    });

    // Helper: Create single realistic English Rose Head
    const createRoseHead = (scale = 1.0) => {
      const rose = new THREE.Group();

      // Center bud core
      const coreGeo = new THREE.SphereGeometry(0.22 * scale, 16, 16);
      const core = new THREE.Mesh(coreGeo, innerRoseMaterial);
      core.scale.set(0.9, 1.2, 0.9);
      rose.add(core);

      // Layer 1 - Inner spiral petals
      const innerPetalCount = 6;
      for (let i = 0; i < innerPetalCount; i++) {
        const angle = (i / innerPetalCount) * Math.PI * 2;
        const petalGeo = new THREE.SphereGeometry(0.26 * scale, 12, 12, 0, Math.PI, 0, Math.PI * 0.75);
        const petal = new THREE.Mesh(petalGeo, innerRoseMaterial);
        petal.rotation.x = 0.35;
        petal.rotation.y = angle + 0.3;
        petal.rotation.z = 0.15;
        petal.position.set(Math.sin(angle) * 0.08 * scale, 0.05 * scale, Math.cos(angle) * 0.08 * scale);
        petal.scale.set(0.9, 1.1, 0.4);
        rose.add(petal);
      }

      // Layer 2 - Middle blooming petals
      const midPetalCount = 8;
      for (let i = 0; i < midPetalCount; i++) {
        const angle = (i / midPetalCount) * Math.PI * 2 + 0.4;
        const petalGeo = new THREE.SphereGeometry(0.36 * scale, 14, 14, 0, Math.PI, 0, Math.PI * 0.85);
        const petal = new THREE.Mesh(petalGeo, deepRoseMaterial);
        petal.rotation.x = 0.65;
        petal.rotation.y = angle;
        petal.rotation.z = 0.1;
        petal.position.set(Math.sin(angle) * 0.18 * scale, -0.02 * scale, Math.cos(angle) * 0.18 * scale);
        petal.scale.set(1.1, 1.2, 0.35);
        rose.add(petal);
      }

      // Layer 3 - Outer lush petals
      const outerPetalCount = 10;
      for (let i = 0; i < outerPetalCount; i++) {
        const angle = (i / outerPetalCount) * Math.PI * 2 + 0.2;
        const petalGeo = new THREE.SphereGeometry(0.48 * scale, 14, 14, 0, Math.PI, 0, Math.PI * 0.85);
        const petal = new THREE.Mesh(petalGeo, deepRoseMaterial);
        petal.rotation.x = 0.95;
        petal.rotation.y = angle;
        petal.rotation.z = (Math.random() - 0.5) * 0.2;
        petal.position.set(Math.sin(angle) * 0.3 * scale, -0.1 * scale, Math.cos(angle) * 0.3 * scale);
        petal.scale.set(1.25, 1.15, 0.3);
        rose.add(petal);
      }

      // Green Calyx / Sepals underneath
      for (let j = 0; j < 5; j++) {
        const angle = (j / 5) * Math.PI * 2;
        const calyxGeo = new THREE.ConeGeometry(0.09 * scale, 0.45 * scale, 5);
        const calyx = new THREE.Mesh(calyxGeo, leafMaterial);
        calyx.rotation.x = 1.8;
        calyx.rotation.y = angle;
        calyx.position.set(Math.sin(angle) * 0.25 * scale, -0.22 * scale, Math.cos(angle) * 0.25 * scale);
        rose.add(calyx);
      }

      return rose;
    };

    // Helper: Create single Rose with Stem
    const createFullRose = (x, y, z, rotX, rotY, rotZ, scale = 1.0) => {
      const fullRose = new THREE.Group();

      const head = createRoseHead(scale);
      fullRose.add(head);

      // Curved stem running to bouquet handle
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.2 * scale, 0),
        new THREE.Vector3(-x * 0.3, -1.0, -z * 0.3),
        new THREE.Vector3(-x * 0.85, -2.1, -z * 0.85),
      ]);
      const stemGeo = new THREE.TubeGeometry(curve, 20, 0.045 * scale, 8, false);
      const stem = new THREE.Mesh(stemGeo, stemMaterial);
      fullRose.add(stem);

      // Add a couple of leaves along the stem
      for (let l = 0; l < 2; l++) {
        const leafGeo = new THREE.SphereGeometry(0.18 * scale, 8, 8);
        const leaf = new THREE.Mesh(leafGeo, leafMaterial);
        leaf.scale.set(1.5, 0.08, 0.7);
        leaf.position.set(l === 0 ? 0.2 : -0.2, -0.7 - l * 0.45, 0.1);
        leaf.rotation.set(0.4, l === 0 ? 0.8 : -0.8, l === 0 ? 0.5 : -0.5);
        fullRose.add(leaf);
      }

      fullRose.position.set(x, y, z);
      fullRose.rotation.set(rotX, rotY, rotZ);
      return fullRose;
    };

    // Build Lush 12-Rose Bouquet
    // 1. Center Crown Rose
    bouquetGroup.add(createFullRose(0, 0.95, 0, 0, 0, 0, 1.15));

    // 2. Inner Ring (4 roses)
    const innerPositions = [
      { x: 0.55, y: 0.75, z: 0.35, rx: 0.25, ry: 0.5, rz: -0.2 },
      { x: -0.55, y: 0.75, z: 0.35, rx: 0.25, ry: -0.5, rz: 0.2 },
      { x: 0.4, y: 0.7, z: -0.5, rx: -0.3, ry: 2.3, rz: -0.2 },
      { x: -0.4, y: 0.7, z: -0.5, rx: -0.3, ry: -2.3, rz: 0.2 },
    ];
    innerPositions.forEach((pos) => {
      bouquetGroup.add(createFullRose(pos.x, pos.y, pos.z, pos.rx, pos.ry, pos.rz, 1.0));
    });

    // 3. Outer Ring (7 roses cascading gracefully)
    const outerRadius = 0.95;
    const outerCount = 7;
    for (let i = 0; i < outerCount; i++) {
      const angle = (i / outerCount) * Math.PI * 2;
      const x = Math.cos(angle) * outerRadius;
      const z = Math.sin(angle) * outerRadius;
      const y = 0.35 + Math.sin(i * 1.5) * 0.1;
      const rx = (z / outerRadius) * 0.55;
      const rz = (-x / outerRadius) * 0.55;
      bouquetGroup.add(createFullRose(x, y, z, rx, angle, rz, 0.95));
    }

    // Golden Satin Ribbon Tie around bouquet stems
    const ribbonTorusGeo = new THREE.TorusGeometry(0.32, 0.08, 16, 32);
    const ribbon = new THREE.Mesh(ribbonTorusGeo, goldRibbonMaterial);
    ribbon.position.set(0, -1.45, 0);
    ribbon.rotation.x = Math.PI / 2;
    bouquetGroup.add(ribbon);

    // Ribbon Bow Knot & Tails
    const knotGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const knot = new THREE.Mesh(knotGeo, goldRibbonMaterial);
    knot.position.set(0, -1.45, 0.34);
    bouquetGroup.add(knot);

    // Left and Right bow loops
    const loopGeo = new THREE.TorusGeometry(0.18, 0.05, 12, 24);
    const leftLoop = new THREE.Mesh(loopGeo, goldRibbonMaterial);
    leftLoop.position.set(-0.2, -1.45, 0.32);
    leftLoop.rotation.set(0.3, -0.6, 0.4);
    bouquetGroup.add(leftLoop);

    const rightLoop = new THREE.Mesh(loopGeo, goldRibbonMaterial);
    rightLoop.position.set(0.2, -1.45, 0.32);
    rightLoop.rotation.set(0.3, 0.6, -0.4);
    bouquetGroup.add(rightLoop);

    // Bouquet Stems Base Handle
    const handleGeo = new THREE.CylinderGeometry(0.26, 0.22, 1.2, 16);
    const handle = new THREE.Mesh(handleGeo, stemMaterial);
    handle.position.set(0, -1.95, 0);
    bouquetGroup.add(handle);

    // Floating Golden Stardust Particles around bouquet
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 4.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.5 + 0.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
      particleScales[i] = Math.random() * 0.06 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interactive Showering 3D Petals Pool
    const showerPetals = [];
    const maxShower = 30;
    const showerPetalGeo = new THREE.SphereGeometry(0.12, 8, 8, 0, Math.PI, 0, Math.PI * 0.7);

    for (let i = 0; i < maxShower; i++) {
      const mesh = new THREE.Mesh(showerPetalGeo, deepRoseMaterial);
      mesh.scale.set(1.1, 1.0, 0.3);
      mesh.visible = false;
      scene.add(mesh);
      showerPetals.push({
        mesh,
        active: false,
        vx: 0,
        vy: 0,
        vz: 0,
        rotSpeedX: 0,
        rotSpeedY: 0,
      });
    }

    showerPetalsRef.current = () => {
      romanticAudio.playSparkle();
      setPetalsShowered((prev) => prev + 12);
      for (let i = 0; i < 12; i++) {
        const p = showerPetals.find((sp) => !sp.active);
        if (p) {
          p.active = true;
          p.mesh.visible = true;
          p.mesh.position.set(
            (Math.random() - 0.5) * 1.5,
            1.2 + Math.random() * 0.5,
            (Math.random() - 0.5) * 1.5
          );
          p.vx = (Math.random() - 0.5) * 0.04;
          p.vy = -(Math.random() * 0.03 + 0.02);
          p.vz = (Math.random() - 0.5) * 0.04;
          p.rotSpeedX = Math.random() * 0.05 + 0.02;
          p.rotSpeedY = Math.random() * 0.05 + 0.02;
        }
      }
    };

    // Mouse Interaction / Orbit Dragging
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handlePointerDown = (e) => {
      isDragging = true;
      setIsRotating(false);
      previousMousePosition = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0,
      };
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.006;
      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handlePointerDown);
    domElement.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    domElement.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Idle Rotation & Float
      if (!isDragging) {
        targetRotationY += 0.006;
      }

      bouquetGroup.rotation.y += (targetRotationY - bouquetGroup.rotation.y) * 0.06;
      bouquetGroup.rotation.x += (targetRotationX - bouquetGroup.rotation.x) * 0.06;
      bouquetGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08 + 0.1;

      // Glow pulsing
      heartGlow.intensity = 2.4 + Math.sin(elapsedTime * 3) * 0.8;

      // Particles swirling
      particles.rotation.y = elapsedTime * 0.04;

      // Update shower petals
      showerPetals.forEach((p) => {
        if (p.active) {
          p.mesh.position.x += p.vx;
          p.mesh.position.y += p.vy;
          p.mesh.position.z += p.vz;
          p.mesh.rotation.x += p.rotSpeedX;
          p.mesh.rotation.y += p.rotSpeedY;

          if (p.mesh.position.y < -2.5) {
            p.active = false;
            p.mesh.visible = false;
          }
        }
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const reqId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handlePointerDown);
      domElement.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElement.removeEventListener('touchstart', handlePointerDown);
      domElement.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const triggerShower = () => {
    if (showerPetalsRef.current) {
      showerPetalsRef.current();
    }
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[600px] flex flex-col items-center justify-center rounded-3xl overflow-hidden glass-card-rose border border-rose-500/30 p-2 sm:p-4">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative"
        title="Click and drag to rotate in 3D"
      />

      {/* Floating Header Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-rose-500/30 flex items-center gap-2 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
          <span className="text-xs font-semibold text-rose-200 tracking-wide uppercase">
            3D Velvet Rose Bouquet
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-rose-200/90">
          <Eye className="w-3.5 h-3.5 text-amber-300" />
          <span>Drag to inspect 360°</span>
        </div>
      </div>

      {/* Floating Action Controls */}
      <div className="absolute bottom-5 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        <div className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-rose-500/30 max-w-sm">
          <p className="text-xs text-rose-100 font-serif italic">
            "Yeh 12 gulaab kabhi murjhayenge nahi, bilkul waise hi jaise mera pyaar aapke liye hamesha fresh aur eternal rahega, meri Anika. 🌹✨❤️"
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerShower}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-crimson text-white text-xs font-semibold shadow-lg shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Shower Petals</span>
            {petalsShowered > 0 && (
              <span className="ml-1 bg-white/20 px-1.5 py-0.2 rounded-full text-[10px]">
                +{petalsShowered}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
