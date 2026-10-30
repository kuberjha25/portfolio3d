import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";

import CanvasLoader from "../loader";
import { useInView } from "../../utils/useInView";

const MODEL = `${import.meta.env.BASE_URL}planet/planet.glb`;

// Earth
const Earth = () => {
  const earth = useGLTF(MODEL);

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

// Earth Canvas
const EarthCanvas = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boxRef);

  return (
    <div ref={boxRef} className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
        gl={{ powerPreference: "low-power" }}
        camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
