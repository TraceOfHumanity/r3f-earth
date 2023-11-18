import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "./components";

function App() {
  return (
    <div className="app">
      <div className="canvasContainer">
        <Canvas>
          <Suspense fallback={null}>
            <Earth />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
