import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { X, O } from "./Models";
import * as THREE from "three";
import { ticTacToeStore } from "@/store/store";
import CanvasLoader from "./Loader";

// Detect mobile device
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
  const scale = winingIndexes?.includes(index) ? 2.0 : 1.5;
  const shouldRotate = !isDraw && winingIndexes?.includes(index) && !isMobile();

  return (
    <div
      className={`${className} flex items-center justify-center`}
      onClick={onClick}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        performance={{ min: 0.5, max: 1 }}
      >
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

// For responsive grid layout, wrap Square components in a container:
export function Board() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-[300px] mx-auto">
      {/* Render the squares here */}
    </div>
  );
}
