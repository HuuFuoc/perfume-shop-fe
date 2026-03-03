export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255,255,255,0.7)",
        display: "grid",
        placeItems: "center",
        zIndex: 9999,
      }}
    >
      <div>Loading...</div>
    </div>
  );
}
