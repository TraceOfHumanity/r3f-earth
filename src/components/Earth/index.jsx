import React from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import styles from "./earth.module.scss";
import { useFrame, useLoader } from "@react-three/fiber";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import MoonMap from "../../assets/textures/moon.jpg";
import { TextureLoader } from "three";

export const Earth = (props) => {
  const [dayMap, normalMap, specularMap, cloudsMap, moonMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap, MoonMap]
  );

  const earthRef = React.useRef();
  const cloudsRef = React.useRef();
  const sunRef = React.useRef();
  const moonRef = React.useRef();
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 60;
    cloudsRef.current.rotation.y = elapsedTime / 70;

    sunRef.current.position.x = Math.cos(elapsedTime / 30) * 20;
    sunRef.current.position.z = Math.sin(elapsedTime / 30) * 20;
    sunRef.current.position.y = Math.sin(elapsedTime / -30) * 10;

    moonRef.current.position.x = Math.cos(elapsedTime / 40) * 3;
    moonRef.current.position.z = Math.sin(elapsedTime / 40) * 3;

    moonRef.current.rotation.y = elapsedTime / 50;
  });

  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      {/* <pointLight position={[-2, 1, 2.7]} intensity={20} /> */}
      <Stars
        radius={300}
        depth={60}
        count={10000}
        factor={3}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.006, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          transparent={true}
          depthWrite={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 100, 100]} />
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
      <mesh position={[3, 0, 1]} rotation={[0, 0, 0]} ref={moonRef}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshPhongMaterial map={moonMap} />
        <pointLight intensity={0.2} />
      </mesh>
      <mesh position={[10, 0, -10]} ref={sunRef} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhongMaterial emissive="yellow" />
        <pointLight intensity={2000} />
      </mesh>
    </>
  );
};
