export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.15} color="#3d5a99" />
      <directionalLight position={[5, 4, 6]} intensity={1.4} color="#eaf2ff" />
      <directionalLight position={[-6, -2, -4]} intensity={0.35} color="#38bdf8" />
    </>
  );
}
