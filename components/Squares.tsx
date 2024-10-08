import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { X } from "./Models";
import { O } from "./Models";
import { ticTacToeStore } from "@/store/store";
import CanvasLoader from "./Loader";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  index: number;
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
  const scale = winingIndexes?.includes(index) ? 2.5 : 1.5;
  const shouldRotate = isDraw
    ? false
    : winingIndexes
    ? winingIndexes.includes(index)
    : true;

  return (
    <div className={className} onClick={onClick}>
      <Canvas
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
        }}
        dpr={[1, 2]} // Limit pixel ratio for better performance
        style={{ width: "100%", height: "100%" }}
      >
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />

        <Suspense fallback={<CanvasLoader />}>
          <Lights />
          {value === "X" ? (
            <>
              <Environment preset="apartment" />
              <X isRotating={shouldRotate} scale={scale} />
            </>
          ) : value === "O" ? (
            <>
              <Environment preset="night" />
              <O isRotating={shouldRotate} scale={scale} />
            </>
          ) : null}
        </Suspense>
      </Canvas>
    </div>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight
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
