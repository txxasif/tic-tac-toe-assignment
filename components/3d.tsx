import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import XModel from "@/models/X-3D";
import OModel from "@/models/O-3D";
import * as THREE from "three";
import { ticTacToeStore } from "@/store/store";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  index: number;
  isWinningSquare?: boolean;
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
function XXModel({
  isRotating,
}: {
  isRotating?: boolean;
  color?: string;
}): JSX.Element {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (isRotating && meshRef.current) {
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <XModel scale={1.5} />
    </mesh>
  );
}

function OOModel({ isRotating = false }): JSX.Element {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (isRotating && meshRef.current) {
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <OModel scale={1.5} />
    </mesh>
  );
}

export function Square({ value, onClick, index }: SquareProps): JSX.Element {
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

  return (
    <div className={className} onClick={onClick}>
      <Canvas shadows>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
        />
        {value === "X" ? (
          <Environment preset="apartment" />
        ) : value === "O" ? (
          <Environment preset="night" />
        ) : null}
        <Lights />
        {value === "X" ? (
          <XXModel isRotating={!isDraw} />
        ) : value === "O" ? (
          <OOModel isRotating={!isDraw} />
        ) : null}
      </Canvas>
    </div>
  );
}
