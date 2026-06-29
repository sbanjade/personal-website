import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars({ count = 4000 }) {
  const mesh = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      [1, 1, 1],
      [0, 0.83, 1],     // electric blue
      [0.48, 0.23, 0.93], // purple
      [0.02, 0.71, 0.83], // cyan
    ];
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 1.5 + 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * 600 * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * 600 * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * 600 * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.elapsedTime * 0.012;
      mesh.current.rotation.y = clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

export default function StarsCanvas() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <Stars />
      </Canvas>
    </div>
  );
}
