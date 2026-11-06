import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Heart, Sparkles, Hand, MessageCircle } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

export default function TeddyBear3D() {
  const mountRef = useRef(null);
  const [hugCount, setHugCount] = useState(0);
  const [speechText, setSpeechText] = useState("Hi Anika! Main aapka cute apology bear hoon. Mujhe ek pyaari si warm hug do na! 🧸🥺🫶");
  const triggerHugRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x11040a, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 4.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff1f2, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 2.0);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const softFill = new THREE.DirectionalLight(0xf472b6, 1.2);
    softFill.position.set(-4, -1, -2);
    scene.add(softFill);

    const heartLight = new THREE.PointLight(0xff1744, 2.5, 4);
    heartLight.position.set(0, 0.2, 1.0);
    scene.add(heartLight);

    // Teddy Bear Group
    const bearGroup = new THREE.Group();
    scene.add(bearGroup);

    // Materials
    const furMaterial = new THREE.MeshStandardMaterial({
      color: 0x9c6644,
      roughness: 0.85,
      metalness: 0.05,
    });

    const muzzleMaterial = new THREE.MeshStandardMaterial({
      color: 0xeddcd2,
      roughness: 0.8,
      metalness: 0.05,
    });

    const innerEarMaterial = new THREE.MeshStandardMaterial({
      color: 0xfca5a5,
      roughness: 0.75,
      metalness: 0.05,
    });

    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.1,
      metalness: 0.9,
    });

    const eyeHighlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const heartMaterial = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.25,
      metalness: 0.2,
      emissive: 0x881337,
      emissiveIntensity: 0.5,
    });

    const bowMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.3,
      metalness: 0.5,
    });

    // 1. Teddy Head
    const headGeo = new THREE.SphereGeometry(0.72, 32, 32);
    const head = new THREE.Mesh(headGeo, furMaterial);
    head.position.set(0, 0.75, 0);
    bearGroup.add(head);

    // 2. Muzzle / Snout
    const muzzleGeo = new THREE.SphereGeometry(0.32, 24, 24);
    const muzzle = new THREE.Mesh(muzzleGeo, muzzleMaterial);
    muzzle.scale.set(1.1, 0.8, 1.0);
    muzzle.position.set(0, 0.62, 0.52);
    bearGroup.add(muzzle);

    // 3. Heart-shaped cute nose
    const noseGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const nose = new THREE.Mesh(noseGeo, eyeMaterial);
    nose.scale.set(1.2, 0.85, 0.8);
    nose.position.set(0, 0.7, 0.81);
    bearGroup.add(nose);

    // 4. Glossy Eyes with Catchlights
    const eyeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const highlightGeo = new THREE.SphereGeometry(0.024, 8, 8);

    // Left Eye
    const leftEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    leftEye.position.set(-0.25, 0.82, 0.62);
    const leftHl = new THREE.Mesh(highlightGeo, eyeHighlightMaterial);
    leftHl.position.set(-0.23, 0.85, 0.69);
    bearGroup.add(leftEye);
    bearGroup.add(leftHl);

    // Right Eye
    const rightEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    rightEye.position.set(0.25, 0.82, 0.62);
    const rightHl = new THREE.Mesh(highlightGeo, eyeHighlightMaterial);
    rightHl.position.set(0.27, 0.85, 0.69);
    bearGroup.add(rightEye);
    bearGroup.add(rightHl);

    // 5. Ears (Outer & Inner Pink)
    const earGeo = new THREE.SphereGeometry(0.28, 20, 20);
    const innerEarGeo = new THREE.SphereGeometry(0.18, 16, 16);

    // Left Ear
    const leftEar = new THREE.Mesh(earGeo, furMaterial);
    leftEar.position.set(-0.55, 1.32, 0.05);
    const leftInnerEar = new THREE.Mesh(innerEarGeo, innerEarMaterial);
    leftInnerEar.scale.set(1, 1, 0.3);
    leftInnerEar.position.set(-0.55, 1.32, 0.15);
    bearGroup.add(leftEar);
    bearGroup.add(leftInnerEar);

    // Right Ear
    const rightEar = new THREE.Mesh(earGeo, furMaterial);
    rightEar.position.set(0.55, 1.32, 0.05);
    const rightInnerEar = new THREE.Mesh(innerEarGeo, innerEarMaterial);
    rightInnerEar.scale.set(1, 1, 0.3);
    rightInnerEar.position.set(0.55, 1.32, 0.15);
    bearGroup.add(rightEar);
    bearGroup.add(rightInnerEar);

    // 6. Chubby Body
    const bodyGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const body = new THREE.Mesh(bodyGeo, furMaterial);
    body.scale.set(1.0, 1.15, 0.95);
    body.position.set(0, -0.4, 0);
    bearGroup.add(body);

    // Belly patch
    const bellyGeo = new THREE.SphereGeometry(0.5, 24, 24);
    const belly = new THREE.Mesh(bellyGeo, muzzleMaterial);
    belly.scale.set(0.9, 1.05, 0.3);
    belly.position.set(0, -0.4, 0.72);
    bearGroup.add(belly);

    // 7. Golden Bow Tie at Neck
    const bowKnotGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const bowKnot = new THREE.Mesh(bowKnotGeo, bowMaterial);
    bowKnot.position.set(0, 0.15, 0.7);
    bearGroup.add(bowKnot);

    const bowWingGeo = new THREE.ConeGeometry(0.14, 0.22, 16);
    const bowLeft = new THREE.Mesh(bowWingGeo, bowMaterial);
    bowLeft.rotation.z = Math.PI / 2;
    bowLeft.position.set(-0.16, 0.15, 0.68);
    bearGroup.add(bowLeft);

    const bowRight = new THREE.Mesh(bowWingGeo, bowMaterial);
    bowRight.rotation.z = -Math.PI / 2;
    bowRight.position.set(0.16, 0.15, 0.68);
    bearGroup.add(bowRight);

    // 8. Glowing 3D Heart Held in Paws
    // Procedural Heart Shape using Extrude
    const heartShape = new THREE.Shape();
    const x0 = 0, y0 = 0;
    heartShape.moveTo(x0, y0 + 0.25);
    heartShape.bezierCurveTo(x0, y0 + 0.25, x0 - 0.25, y0 + 0.6, x0 - 0.5, y0 + 0.6);
    heartShape.bezierCurveTo(x0 - 0.8, y0 + 0.6, x0 - 0.8, y0 + 0.25, x0 - 0.8, y0 + 0.25);
    heartShape.bezierCurveTo(x0 - 0.8, y0 - 0.1, x0 - 0.5, y0 - 0.45, x0, y0 - 0.8);
    heartShape.bezierCurveTo(x0 + 0.5, y0 - 0.45, x0 + 0.8, y0 - 0.1, x0 + 0.8, y0 + 0.25);
    heartShape.bezierCurveTo(x0 + 0.8, y0 + 0.25, x0 + 0.8, y0 + 0.6, x0 + 0.5, y0 + 0.6);
    heartShape.bezierCurveTo(x0 + 0.25, y0 + 0.6, x0, y0 + 0.25, x0, y0 + 0.25);

    const extrudeSettings = { depth: 0.28, bevelEnabled: true, bevelSegments: 6, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
    const heart3DGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heart3DGeo.center();
    const heldHeart = new THREE.Mesh(heart3DGeo, heartMaterial);
    heldHeart.scale.set(0.55, 0.55, 0.55);
    heldHeart.position.set(0, -0.22, 0.86);
    bearGroup.add(heldHeart);

    // 9. Arms holding heart
    const armGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.7, 16);

    const leftArm = new THREE.Mesh(armGeo, furMaterial);
    leftArm.position.set(-0.65, -0.15, 0.45);
    leftArm.rotation.set(0.7, -0.6, -0.5);
    bearGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, furMaterial);
    rightArm.position.set(0.65, -0.15, 0.45);
    rightArm.rotation.set(0.7, 0.6, 0.5);
    bearGroup.add(rightArm);

    // 10. Legs sitting down
    const legGeo = new THREE.SphereGeometry(0.36, 16, 16);
    const leftLeg = new THREE.Mesh(legGeo, furMaterial);
    leftLeg.scale.set(1.0, 0.9, 1.4);
    leftLeg.position.set(-0.55, -1.05, 0.4);
    bearGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, furMaterial);
    rightLeg.scale.set(1.0, 0.9, 1.4);
    rightLeg.position.set(0.55, -1.05, 0.4);
    bearGroup.add(rightLeg);

    // Pink paw pads on feet
    const pawPadGeo = new THREE.SphereGeometry(0.15, 12, 12);
    const leftPad = new THREE.Mesh(pawPadGeo, innerEarMaterial);
    leftPad.scale.set(1, 1, 0.2);
    leftPad.position.set(-0.55, -1.05, 0.85);
    bearGroup.add(leftPad);

    const rightPad = new THREE.Mesh(pawPadGeo, innerEarMaterial);
    rightPad.scale.set(1, 1, 0.2);
    rightPad.position.set(0.55, -1.05, 0.85);
    bearGroup.add(rightPad);

    // Floating heart particles pool when hugged
    const floatingHearts = [];
    const maxHearts = 20;

    for (let i = 0; i < maxHearts; i++) {
      const hMesh = new THREE.Mesh(heart3DGeo, heartMaterial);
      hMesh.scale.set(0.16, 0.16, 0.16);
      hMesh.visible = false;
      scene.add(hMesh);
      floatingHearts.push({
        mesh: hMesh,
        active: false,
        vy: 0,
        vx: 0,
        rotY: 0,
      });
    }

    let wiggleAmount = 0;

    // Hug Action
    const cuteReplies = [
      "Aww, itna tight cuddle! Aap sach mein duniya ki sabse sweetest ho, Anika! 🧸❤️",
      "I promise ki ab se hamesha aapki har baat poore dil se sununga! 🥺🫶",
      "Teddy says: Aapki smile meri poori duniya ko roshan kar deti hai! ✨💖",
      "Dher saara pyaar aur warm hugs seedha aapke dil tak bhej raha hoon! 💗😘",
      "Yay! Ek aur pyaari si cuddle mil gayi meri Anika se! 🌸✨",
      "Gussa chhod do na please jaan, dekho main kitna cute hoon! 🥺👉👈❤️",
    ];

    triggerHugRef.current = () => {
      romanticAudio.playHeartBeat();
      wiggleAmount = 0.8;
      setHugCount((prev) => {
        const next = prev + 1;
        setSpeechText(cuteReplies[next % cuteReplies.length]);
        return next;
      });

      // Spawn floating hearts
      for (let i = 0; i < 5; i++) {
        const fh = floatingHearts.find((h) => !h.active);
        if (fh) {
          fh.active = true;
          fh.mesh.visible = true;
          fh.mesh.position.set(
            (Math.random() - 0.5) * 0.5,
            -0.1 + Math.random() * 0.3,
            0.9
          );
          fh.vy = Math.random() * 0.03 + 0.025;
          fh.vx = (Math.random() - 0.5) * 0.02;
          fh.rotY = (Math.random() - 0.5) * 0.1;
        }
      }
    };

    // Orbit Dragging
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handlePointerDown = (e) => {
      isDragging = true;
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
      targetRotationX = Math.max(-0.4, Math.min(0.4, targetRotationX));

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

      // Soft breathing motion
      const breathing = Math.sin(elapsedTime * 2.2) * 0.03;
      body.scale.set(1.0 + breathing, 1.15 + breathing * 0.5, 0.95 + breathing);
      head.position.y = 0.75 + breathing * 0.5;

      // Pulse held heart
      const heartPulse = Math.sin(elapsedTime * 3.5) * 0.04;
      heldHeart.scale.set(0.55 + heartPulse, 0.55 + heartPulse, 0.55 + heartPulse);
      heartLight.intensity = 2.2 + heartPulse * 6;

      // Wiggle on hug
      if (wiggleAmount > 0.01) {
        bearGroup.rotation.z = Math.sin(elapsedTime * 25) * wiggleAmount * 0.2;
        leftEar.rotation.z = Math.sin(elapsedTime * 20) * wiggleAmount * 0.4;
        rightEar.rotation.z = -Math.sin(elapsedTime * 20) * wiggleAmount * 0.4;
        wiggleAmount *= 0.93;
      } else {
        bearGroup.rotation.z = 0;
        leftEar.rotation.z = 0;
        rightEar.rotation.z = 0;
      }

      // Idle float & rotation
      if (!isDragging) {
        targetRotationY += 0.005;
      }

      bearGroup.rotation.y += (targetRotationY - bearGroup.rotation.y) * 0.06;
      bearGroup.rotation.x += (targetRotationX - bearGroup.rotation.x) * 0.06;
      bearGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.06 - 0.15;

      // Update floating hearts
      floatingHearts.forEach((h) => {
        if (h.active) {
          h.mesh.position.y += h.vy;
          h.mesh.position.x += h.vx;
          h.mesh.rotation.y += h.rotY;
          h.mesh.scale.multiplyScalar(0.985);

          if (h.mesh.position.y > 2.6 || h.mesh.scale.x < 0.02) {
            h.active = false;
            h.mesh.visible = false;
            h.mesh.scale.set(0.16, 0.16, 0.16);
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

  const handleHug = () => {
    if (triggerHugRef.current) {
      triggerHugRef.current();
    }
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[600px] flex flex-col items-center justify-center rounded-3xl overflow-hidden glass-card-gold border border-amber-500/30 p-2 sm:p-4">
      {/* 3D Canvas */}
      <div
        ref={mountRef}
        onClick={handleHug}
        className="w-full h-full cursor-pointer relative"
        title="Click to hug the bear!"
      />

      {/* Floating Header Tag */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/30 flex items-center gap-2 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <span className="text-xs font-semibold text-amber-200 tracking-wide uppercase">
            3D Fluffy Apology Bear
          </span>
        </div>

        <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-amber-200/90 flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>Hugs given: <strong className="text-white">{hugCount}</strong></span>
        </div>
      </div>

      {/* Bear Speech Bubble */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none w-11/12 max-w-sm">
        <div className="bg-rose-950/80 backdrop-blur-md text-rose-100 text-xs px-4 py-2.5 rounded-2xl border border-rose-500/30 text-center shadow-xl animate-float-slow flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{speechText}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="absolute bottom-5 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        <div className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-500/30 max-w-sm">
          <p className="text-xs text-amber-100/90 font-serif italic">
            "Jab bhi aap mujhse naraaz ho ya low feel karo, is teddy ko tap karke ek warm cuddle le lena. 🧸💗"
          </p>
        </div>

        <button
          onClick={handleHug}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
        >
          <Hand className="w-4 h-4 text-amber-200" />
          <span>Give Bear a Hug! 🫂</span>
        </button>
      </div>
    </div>
  );
}
