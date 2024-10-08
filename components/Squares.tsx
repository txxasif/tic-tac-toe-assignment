import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { X, O } from "./Models";
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

interface ModelWrapperProps {
  value: "X" | "O";
  scale: number;
  shouldRotate: boolean;
}
const ModelWrapper: React.FC<ModelWrapperProps> = ({
  value,
  scale,
  shouldRotate,
}) => {
  if (value === "X") {
    return <X isRotating={shouldRotate} scale={scale} />;
  } else if (value === "O") {
    return <O isRotating={shouldRotate} scale={scale} />;
  }
  return null;
};

export function Square({ value, onClick, index }: SquareProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { isDraw, winingIndexes } = ticTacToeStore();
  const scale = winingIndexes?.includes(index) ? 2.5 : 1.5;
  const shouldRotate =
    !isDraw && (!winingIndexes || winingIndexes.includes(index));

  useEffect(() => {
    if (!isLoaded && retryCount < 3) {
      const timer = setTimeout(() => {
        setRetryCount((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, retryCount]);

  const handleCanvasCreated = () => {
    setIsLoaded(true);
  };

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
      {value && (
        <Canvas performance={{ min: 0.1 }} onCreated={handleCanvasCreated}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
          <Environment preset={value === "X" ? "apartment" : "night"} />
          <Lights />
          <Suspense fallback={<CanvasLoader />}>
            <ModelWrapper
              value={value as "X" | "O"}
              scale={scale}
              shouldRotate={shouldRotate}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
