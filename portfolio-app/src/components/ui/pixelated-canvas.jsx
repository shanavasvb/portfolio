"use client";
import React, { useRef, useEffect, useState } from 'react';

export const PixelatedCanvas = ({
  src,
  width = 400,
  height = 500,
  cellSize = 3,
  dotScale = 0.9,
  shape = "square",
  backgroundColor = "#000000",
  dropoutStrength = 0.4,
  interactive = false,
  distortionStrength = 3,
  distortionRadius = 80,
  distortionMode = "swirl",
  followSpeed = 0.2,
  jitterStrength = 4,
  jitterSpeed = 4,
  sampleAverage = false,
  tintColor = "#FFFFFF",
  tintStrength = 0.2,
  className = "",
  onError
}) => {
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      ctx.drawImage(img, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height);
      setImageData(data);
    };
    
    img.onerror = () => {
      if (onError) onError();
    };
    
    img.src = src;
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [src, width, height, onError]);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!interactive) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Render pixelated effect
  useEffect(() => {
    if (!imageData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const render = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * cellSize;
          const y = row * cellSize;
          
          // Sample pixel color
          let r = 0, g = 0, b = 0, a = 0;
          let sampleCount = 0;
          
          if (sampleAverage) {
            // Average sampling within cell
            for (let dy = 0; dy < cellSize; dy++) {
              for (let dx = 0; dx < cellSize; dx++) {
                const px = Math.min(Math.floor(x + dx), width - 1);
                const py = Math.min(Math.floor(y + dy), height - 1);
                const idx = (py * width + px) * 4;
                
                r += imageData.data[idx];
                g += imageData.data[idx + 1];
                b += imageData.data[idx + 2];
                a += imageData.data[idx + 3];
                sampleCount++;
              }
            }
            r /= sampleCount;
            g /= sampleCount;
            b /= sampleCount;
            a /= sampleCount;
          } else {
            // Center point sampling
            const px = Math.min(Math.floor(x + cellSize / 2), width - 1);
            const py = Math.min(Math.floor(y + cellSize / 2), height - 1);
            const idx = (py * width + px) * 4;
            
            r = imageData.data[idx];
            g = imageData.data[idx + 1];
            b = imageData.data[idx + 2];
            a = imageData.data[idx + 3];
          }

          // Apply tint
          if (tintStrength > 0) {
            const tint = hexToRgb(tintColor);
            r = r * (1 - tintStrength) + tint.r * tintStrength;
            g = g * (1 - tintStrength) + tint.g * tintStrength;
            b = b * (1 - tintStrength) + tint.b * tintStrength;
          }

          // Dropout effect
          if (Math.random() < dropoutStrength) {
            continue;
          }

          // Apply interactive distortion
          let finalX = x + cellSize / 2;
          let finalY = y + cellSize / 2;
          
          if (interactive && mousePos.x && mousePos.y) {
            const dx = finalX - mousePos.x;
            const dy = finalY - mousePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < distortionRadius) {
              const strength = (1 - distance / distortionRadius) * distortionStrength;
              
              if (distortionMode === "swirl") {
                const angle = strength * 0.5;
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);
                finalX += (dx * cos - dy * sin) * 0.3;
                finalY += (dx * sin + dy * cos) * 0.3;
              } else if (distortionMode === "push") {
                finalX += (dx / distance) * strength;
                finalY += (dy / distance) * strength;
              }
            }
          }

          // Apply jitter
          const jitterTime = Date.now() * 0.001 * jitterSpeed;
          const jitterX = Math.sin(jitterTime + col * 0.5) * jitterStrength;
          const jitterY = Math.cos(jitterTime + row * 0.5) * jitterStrength;
          finalX += jitterX;
          finalY += jitterY;

          // Draw shape
          ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a / 255})`;
          
          const size = cellSize * dotScale;
          
          if (shape === "circle") {
            ctx.beginPath();
            ctx.arc(finalX, finalY, size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(finalX - size / 2, finalY - size / 2, size, size);
          }
        }
      }

      if (jitterStrength > 0 || interactive) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    imageData,
    cellSize,
    dotScale,
    shape,
    backgroundColor,
    dropoutStrength,
    interactive,
    distortionStrength,
    distortionRadius,
    distortionMode,
    followSpeed,
    jitterStrength,
    jitterSpeed,
    sampleAverage,
    tintColor,
    tintStrength,
    mousePos,
    width,
    height
  ]);

  // Helper function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      style={{
        maxWidth: '100%',
        height: 'auto',
        cursor: interactive ? 'pointer' : 'default'
      }}
    />
  );
};