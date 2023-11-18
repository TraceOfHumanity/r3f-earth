import React from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import styles from "./earth.module.scss";
import { useFrame, useLoader } from "@react-three/fiber";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import { TextureLoader } from "three";

export const Earth = (props) => {
  const [dayMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
    EarthDayMap,
    EarthNormalMap,
    EarthSpecularMap,
    EarthCloudsMap,
  ]);

  const earthRef = React.useRef();
  const cloudsRef = React.useRef();
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 60;
    cloudsRef.current.rotation.y = elapsedTime / 70;
  });

  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      <pointLight position={[-2, 1, 2.7]} intensity={20} />
      <Stars
        radius={300}
        depth={60}
        count={10000}
        factor={3}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef} position={[0, 0, 1.5]}>
        <sphereGeometry args={[1.006, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          transparent={true}
          depthWrite={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 1.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={dayMap}
          normalMap={normalMap}
          metalness={0.1}
          roughness={1}
        />
        {/* <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={4}
          maxDistance={2.2}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        /> */}
      </mesh>
    </>
  );
};
