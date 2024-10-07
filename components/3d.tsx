import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, SpotLight } from "@react-three/drei";
import XModel from "@/models/X-3D";
import OModel from "@/models/O-3D";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  index: number;
}

function XXModel(): JSX.Element {
  return (
    <mesh>
      <XModel color="blue" scale={1.5} />
    </mesh>
  );
}

function OOModel(): JSX.Element {
  return (
    <mesh>
      <OModel scale={1.5} />
    </mesh>
  );
}

export function Square({ value, onClick, index }: SquareProps): JSX.Element {
  const [lightIntensity] = useState(100);
  const className = `w-[100px] h-[100px] border-[#0DA192] ${
    index === 0
      ? "border-r-4 border-b-4"
      : index === 1
      ? "border-b-4"
      : index === 2
      ? "border-l-4 border-b-4"
      : index === 3
      ? "border-r-4"
      : index === 5
      ? "border-l-4"
      : index === 6
      ? "border-r-4 border-t-4"
      : index === 7
      ? "border-t-4"
      : index === 8
      ? "border-l-4 border-t-4"
      : ""
  }`;

  return (
    <div className={className} onClick={onClick}>
      <Canvas>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
        />
        <SpotLight
          intensity={lightIntensity}
          position={[0, 0, 0]}
          angle={0.15}
          penumbra={1}
        />
        {value === "X" && <XXModel />}
        {value === "O" && <OOModel />}
      </Canvas>
    </div>
  );
}
