import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const BASE_TUBE_RADIUS = 0.18;
// Requirement: tube diameter should be ~4x thicker => radius ~2x thicker.
const TUBE_RADIUS = BASE_TUBE_RADIUS * 2;

const TUBE_SEG = 160;
const RADIAL_SEG = 48;

const V3 = (x: number, y: number, z = 0) => new THREE.Vector3(x, y, z);

const C_ORANGE = new THREE.Color("#FF6B35");
const C_PINK = new THREE.Color("#D946EF");
const C_PURPLE = new THREE.Color("#7C3AED");

function circlePts(cx: number, cy: number, r: number, n = 48): THREE.Vector3[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return V3(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  });
}

function makeTube(pts: THREE.Vector3[], closed = false) {
  const curve = new THREE.CatmullRomCurve3(pts, closed, "catmullrom", 0.15);
  return new THREE.TubeGeometry(curve, TUBE_SEG, TUBE_RADIUS, RADIAL_SEG, closed);
}

function applyGradient(geo: THREE.BufferGeometry) {
  const pos = geo.getAttribute("position") as THREE.BufferAttribute;
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();
  const xMin = -6.2;
  const xMax = 8;

  for (let i = 0; i < pos.count; i++) {
    const t = Math.max(0, Math.min(1, (pos.getX(i) - xMin) / (xMax - xMin)));
    if (t < 0.5) c.copy(C_ORANGE).lerp(C_PINK, t * 2);
    else c.copy(C_PINK).lerp(C_PURPLE, (t - 0.5) * 2);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

function mergeBufferGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const cleaned = geometries
    .filter(Boolean)
    .map((g) => g.index ? g : g.toNonIndexed());

  const hasIndex = cleaned.every((g) => g.index != null);

  let totalVertexCount = 0;
  let totalIndexCount = 0;

  for (const geo of cleaned) {
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    totalVertexCount += pos.count;
    if (hasIndex && geo.index) totalIndexCount += geo.index.count;
  }

  const merged = new THREE.BufferGeometry();

  const pos0 = cleaned[0]?.getAttribute("position") as THREE.BufferAttribute | undefined;
  const norm0 = cleaned[0]?.getAttribute("normal") as THREE.BufferAttribute | undefined;
  const col0 = cleaned[0]?.getAttribute("color") as THREE.BufferAttribute | undefined;
  const uv0 = cleaned[0]?.getAttribute("uv") as THREE.BufferAttribute | undefined;

  if (!pos0) return new THREE.BufferGeometry();

  const positions = new Float32Array(totalVertexCount * 3);
  const normals = norm0 ? new Float32Array(totalVertexCount * 3) : undefined;
  const colors = col0 ? new Float32Array(totalVertexCount * 3) : undefined;
  const uvs = uv0 ? new Float32Array(totalVertexCount * 2) : undefined;

  const indices = hasIndex ? new (Uint32Array as any)(totalIndexCount) : null;

  let vertexOffset = 0;
  let indexOffset = 0;

  for (const geo of cleaned) {
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    const norm = geo.getAttribute("normal") as THREE.BufferAttribute | null;
    const col = geo.getAttribute("color") as THREE.BufferAttribute | null;
    const uv = geo.getAttribute("uv") as THREE.BufferAttribute | null;

    positions.set(pos.array as Float32Array, vertexOffset * 3);

    if (normals && norm) normals.set(norm.array as Float32Array, vertexOffset * 3);
    if (colors && col) colors.set(col.array as Float32Array, vertexOffset * 3);
    if (uvs && uv) uvs.set(uv.array as Float32Array, vertexOffset * 2);

    if (hasIndex && indices && geo.index) {
      const idxArray = geo.index.array as Uint32Array;
      for (let i = 0; i < idxArray.length; i++) {
        indices[indexOffset + i] = idxArray[i] + vertexOffset;
      }
      indexOffset += idxArray.length;
    }

    vertexOffset += pos.count;
  }

  merged.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  if (normals) merged.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  if (colors) merged.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  if (uvs) merged.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

  if (hasIndex && indices) {
    merged.setIndex(new THREE.BufferAttribute(indices, 1));
  }

  return merged;
}

interface TubeDef {
  key: string;
  pts: THREE.Vector3[];
  closed?: boolean;
}

const DEFS: TubeDef[] = [
  ...[1.2, 0.5, -0.2, -0.9].map((y) => ({
    key: `sl-${y}`,
    pts: [V3(-6.2, y), V3(-3.5, y)],
  })),
  {
    key: "s",
    pts: [
      V3(-3.5, 1.2), V3(-2.5, 1.4), V3(-1.5, 1.0),
      V3(-1.2, 0.3), V3(-1.8, -0.3), V3(-1.2, -1.0),
      V3(-2.5, -1.4), V3(-3.5, -1.2),
    ],
  },
  { key: "p-stem", pts: [V3(0, -1.2), V3(0, 1.2)] },
  {
    key: "p-bowl",
    pts: [
      V3(0, 0), V3(0, 1.2), V3(0.6, 1.5),
      V3(1.3, 1.2), V3(1.5, 0.5), V3(1.3, 0), V3(0, 0),
    ],
  },
  { key: "pin-outer", pts: circlePts(3.2, 0.3, 1.0), closed: true },
  {
    key: "pin-point",
    pts: [V3(2.49, -0.41), V3(3.2, -1.7), V3(3.91, -0.41)],
  },
  { key: "pin-inner", pts: circlePts(3.2, 0.3, 0.35, 32), closed: true },
  { key: "t-bar", pts: [V3(5.5, 1.2), V3(8, 1.2)] },
  { key: "t-stem", pts: [V3(6.75, 1.2), V3(6.75, -1.2)] },
];

interface LogoSceneProps {
  stateRef: React.MutableRefObject<{
    dragging: boolean;
    prevX: number;
    prevY: number;
    targetRotX: number;
    targetRotY: number;
  }>;
}

function LogoScene({ stateRef }: LogoSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const phase = useRef<"spin" | "auto" | "manual">("spin");
  const t0 = useRef(Date.now());

  const mergedGeometry = useMemo(() => {
    // Build *tube-only* geometries, gradient-colored, then merge into ONE mesh.
    const geoms: THREE.BufferGeometry[] = DEFS.map((d) => {
      const geo = makeTube(d.pts, d.closed ?? false);
      applyGradient(geo);
      return geo;
    });

    // Merge into a single BufferGeometry (single solid renderable object).
    // Implemented locally to avoid adding CSG/boolean dependencies.
    const merged = mergeBufferGeometries(geoms);

    // Recompute normals for smooth premium lighting across the merged mesh.
    merged.computeVertexNormals();

    // Helps avoid any faceted "plate" look.
    // (TubeGeometry already has smooth curvature; this ensures smooth lighting.)
    merged.attributes.normal.needsUpdate = true;

    return merged;
  }, []);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const s = stateRef.current;

    if (phase.current === "spin") {
      const elapsed = (Date.now() - t0.current) / 1000;
      if (elapsed < 1.5) {
        const t = elapsed / 1.5;
        g.rotation.y = (1 - Math.pow(1 - t, 3)) * Math.PI * 2;
      } else {
        g.rotation.y = Math.PI * 2;
        phase.current = "auto";
        t0.current = Date.now();
      }
      g.rotation.x = 0;
      return;
    }

    if (s.dragging) {
      phase.current = "manual";
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, s.targetRotX, 0.15);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, s.targetRotY, 0.15);
      return;
    }

    if (phase.current === "manual") {
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, s.targetRotX, 0.08);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, s.targetRotY, 0.08);
      return;
    }

    g.rotation.y += 0.004;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0, 0.02);
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={mergedGeometry}>
        <meshPhysicalMaterial
          vertexColors
          metalness={0.88}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={1.6}
        />
      </mesh>
    </group>
  );
}

export function SpotLogo3D({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stateRef = useRef({
    dragging: false,
    prevX: 0,
    prevY: 0,
    targetRotX: 0,
    targetRotY: 0,
  });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    stateRef.current.dragging = true;
    stateRef.current.prevX = e.clientX;
    stateRef.current.prevY = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    s.targetRotY += (e.clientX - s.prevX) * 0.012;
    s.targetRotX += (e.clientY - s.prevY) * 0.012;
    s.prevX = e.clientX;
    s.prevY = e.clientY;
  }, []);

  const onPointerUp = useCallback(() => {
    stateRef.current.dragging = false;
  }, []);

  if (!mounted) {
    return (
      <div
        className={`h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 ${className}`}
      />
    );
  }

  return (
    <div
      className={`cursor-grab active:cursor-grabbing touch-none select-none relative ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, 4]} intensity={0.4} color="#FF6B35" />
        <spotLight
          position={[0, 6, 6]}
          angle={0.35}
          penumbra={0.6}
          intensity={0.9}
        />
        <Environment preset="studio" />
        <LogoScene stateRef={stateRef} />
      </Canvas>
    </div>
  );
}

export default SpotLogo3D;
