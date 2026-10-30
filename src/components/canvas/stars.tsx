import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useRef, useState } from "react";
import type { Points as PointsType } from "three";

import { useInView } from "../../utils/useInView";

// Stars
const Stars = () => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(6000), { radius: 1.2 }) as Float32Array,
  );

  // Slowly rotate the star field
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Stars Canvas
// The outer box spans all the sections it sits behind, but the canvas itself is
// sticky and only one screen tall, so the GPU only draws what's visible.
const StarsCanvas = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boxRef);

  return (
    <div ref={boxRef} className="absolute inset-0 z-[-1] pointer-events-none">
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          dpr={[1, 1.5]}
          frameloop={inView ? "always" : "never"}
          gl={{ antialias: false, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 2.5] }}
        >
          <Stars />
        </Canvas>
      </div>
    </div>
  );
};

export default StarsCanvas;
