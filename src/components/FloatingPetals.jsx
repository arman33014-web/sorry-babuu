import React, { useEffect, useRef } from 'react';

export default function FloatingPetals() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Petal particles
    const petalCount = Math.min(35, Math.floor(width / 35));
    const petals = [];

    // Realistic rose petal colors
    const petalColors = [
      'rgba(225, 29, 72, 0.75)',   // Rose 600
      'rgba(244, 63, 94, 0.65)',   // Rose 500
      'rgba(190, 18, 60, 0.8)',    // Rose 700
      'rgba(251, 113, 133, 0.6)',  // Rose 400
      'rgba(159, 18, 57, 0.85)',   // Rose 800
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 14 + 10,
        speedY: Math.random() * 0.9 + 0.6,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.025,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationDistance: Math.random() * 2 + 1,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.4 + 0.5,
        t: Math.random() * 100,
      });
    }

    // Gentle star dust
    const stars = [];
    const starCount = Math.min(50, Math.floor(width / 25));
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.02 + 0.01,
        direction: Math.random() > 0.5 ? 1 : -1,
      });
    }

    // Draw single stylized rose petal path
    const drawPetal = (x, y, size, rotation, color, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size / 15, size / 15);

      ctx.beginPath();
      // Curved organic petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, -10, -15, -25, 0, -30);
      ctx.bezierCurveTo(15, -25, 10, -10, 0, 0);

      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.shadowColor = 'rgba(244, 63, 94, 0.4)';
      ctx.shadowBlur = 10;
      ctx.fill();

      // Delicate inner petal vein
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.quadraticCurveTo(-1, -15, 0, -26);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render gentle stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha > 0.8) {
          star.alpha = 0.8;
          star.direction = -1;
        } else if (star.alpha < 0.2) {
          star.alpha = 0.2;
          star.direction = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254, 240, 138, ${star.alpha})`;
        ctx.shadowColor = 'rgba(254, 240, 138, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      // Render drifting rose petals
      petals.forEach((p) => {
        p.t += p.oscillationSpeed;
        p.y += p.speedY;
        p.x += Math.sin(p.t) * p.oscillationDistance + p.speedX;
        p.rotation += p.rotationSpeed;

        // Reset if drifted off screen
        if (p.y > height + 40) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) p.x = -20;
        if (p.x < -30) p.x = width + 20;

        drawPetal(p.x, p.y, p.size, p.rotation, p.color, p.opacity);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
