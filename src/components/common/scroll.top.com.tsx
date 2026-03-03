import { useEffect, useState } from "react";

export const ScrollTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        padding: "10px 12px",
        borderRadius: 999,
        border: "1px solid #ddd",
        background: "#fff",
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      ↑ Top
    </button>
  );
};
