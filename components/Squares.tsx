import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { X } from "./Models";
import { O } from "./Models";
import * as THREE from "three";
import { ticTacToeStore } from "@/store/store";
import CanvasLoader from "./Loader";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  index: number;
}

function Lights() {
  const spotLightRef = useRef<THREE.SpotLight>(null);

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight
        ref={spotLightRef}
        position={[5, 5, 5]}
        angle={1.5}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight position={[-5, 0, -5]} intensity={0.5} />
    </>
  );
}

export function Square({ value, onClick, index }: SquareProps) {
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
  const { isDraw, winingIndexes } = ticTacToeStore();
  console.log(winingIndexes, "winnig indexes");
  console.log(isDraw, "is draw");
  const scale = winingIndexes?.includes(index) ? 2.5 : 1.5;
  let shouldRotate = true;
  if (isDraw) {
    shouldRotate = false;
  } else if (winingIndexes) {
    if (!winingIndexes.includes(index)) {
      shouldRotate = false;
    }
  }

  return (
    <div className={className} onClick={onClick}>
      <Canvas>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
        {value === "X" ? (
          <Environment preset="apartment" />
        ) : value === "O" ? (
          <Environment preset="night" />
        ) : null}
        <Lights />
        {value === "X" ? (
          <Suspense fallback={<CanvasLoader />}>
            <X isRotating={shouldRotate} scale={scale} />
          </Suspense>
        ) : value === "O" ? (
          <Suspense fallback={<CanvasLoader />}>
            <O isRotating={shouldRotate} scale={scale} />
          </Suspense>
        ) : null}
      </Canvas>
    </div>
  );
}
