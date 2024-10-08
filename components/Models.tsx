import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import XModel from "@/models/X-3D";
import OModel from "@/models/O-3D";
import * as THREE from "three";

export function X({
  isRotating,
  scale,
}: {
  isRotating?: boolean;
  color?: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (isRotating && meshRef.current) {
      meshRef.current.rotation.y += delta;
    }

    if (!isRotating && meshRef.current) {
      meshRef.current.rotation.y = 0;
    }
  });

  return (
    <mesh ref={meshRef}>
      <XModel scale={scale} />
    </mesh>
  );
}

export function O({
  isRotating,
  scale,
}: {
  isRotating?: boolean;
  color?: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (isRotating && meshRef.current) {
      meshRef.current.rotation.y += delta;
    } else if (!isRotating && meshRef.current) {
      meshRef.current.rotation.y = 0;
    }
  });

  return (
    <mesh ref={meshRef}>
      <OModel scale={scale} />
    </mesh>
  );
}
