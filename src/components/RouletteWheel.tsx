import { useEffect, useRef, useState } from 'react';

interface RouletteWheelProps {
  items: string[];
  selectedItems: string[];
  spinning: boolean;
  onSpinComplete: (result: string) => void;
  onSpin: () => void;
}

export function RouletteWheel({ items, selectedItems, spinning, onSpinComplete, onSpin }: RouletteWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>();

  // Filter out already selected items
  const availableItems = items.filter((item) => {
    return !selectedItems.includes(item);
  });

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#AAB7B8'
  ];

  useEffect(() => {
    drawWheel();
  }, [availableItems, rotation]);

  useEffect(() => {
    if (spinning) {
      spinWheel();
    }
  }, [spinning]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (availableItems.length === 0) {
      ctx.fillStyle = '#E0E0E0';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('完了', centerX, centerY);
      return;
    }

    const anglePerItem = (2 * Math.PI) / availableItems.length;

    availableItems.forEach((item, index) => {
      const startAngle = index * anglePerItem + rotation;
      const endAngle = startAngle + anglePerItem;

      // Draw segment
      ctx.fillStyle = colors[index % colors.length];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();

      // Draw border
      ctx.strokeStyle = '#FFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerItem / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000'; // Changed from '#FFF' to '#000' for black text
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(item, radius * 0.75, 0);
      ctx.restore();
    });

    // Draw center circle
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw pointer at top
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.moveTo(centerX, 40);
    ctx.lineTo(centerX - 15, 10);
    ctx.lineTo(centerX + 15, 10);
    ctx.closePath();
    ctx.fill();
  };

  const spinWheel = () => {
    if (availableItems.length === 0) return;

    const spins = 5 + Math.random() * 3; // 5-8 full rotations
    const extraRotation = Math.random() * Math.PI * 2;
    const totalRotation = spins * Math.PI * 2 + extraRotation;
    const duration = 3000; // 3 seconds
    const startTime = Date.now();
    const startRotation = rotation;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentRotation = startRotation + totalRotation * easeProgress;
      setRotation(currentRotation % (Math.PI * 2));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Calculate winner - pointer is at the top (-Math.PI/2 radians)
        const normalizedRotation = currentRotation % (Math.PI * 2);
        const anglePerItem = (2 * Math.PI) / availableItems.length;
        // Pointer is at -Math.PI/2 (top), calculate which segment is under it
        const pointerAngle = -Math.PI / 2;
        const adjustedAngle = (pointerAngle - normalizedRotation) % (Math.PI * 2);
        const normalizedAngle = adjustedAngle < 0 ? adjustedAngle + Math.PI * 2 : adjustedAngle;
        const winningIndex = Math.floor(normalizedAngle / anglePerItem) % availableItems.length;
        const winner = availableItems[winningIndex];
        onSpinComplete(winner);
      }
    };

    animate();
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="cursor-pointer"
        onClick={(e) => {
          if (!spinning && availableItems.length > 0) {
            // Get click position relative to canvas
            const rect = canvasRef.current?.getBoundingClientRect();
            if (rect) {
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = 600 / 2;
              const centerY = 600 / 2;
              const radius = 600 / 2 - 20;
              
              // Check if click is inside the circle
              const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
              if (distance <= radius) {
                onSpin(); // Trigger parent to start spinning
              }
            }
          }
        }}
      />
    </div>
  );
}