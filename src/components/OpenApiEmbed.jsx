// src/components/OpenApiEmbed.jsx
import React, { useEffect, useRef } from "react";

/**
 * OpenApiEmbed loads Redoc standalone from CDN and mounts a <redoc> element
 * with the specUrl you pass. Safe for SSR because it only touches window on mount.
 *
 * Usage in MDX: import OpenApiEmbed from '@site/src/components/OpenApiEmbed';
 * <OpenApiEmbed specUrl="/openapi.yml" />
 */
export default function OpenApiEmbed({ specUrl }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const mountRedoc = () => {
      if (containerRef.current && !containerRef.current.querySelector("redoc")) {
        const el = document.createElement("redoc");
        el.setAttribute("spec-url", specUrl);
        containerRef.current.appendChild(el);
      }
    };

    if (typeof window !== "undefined" && !window.Redoc) {
      const s = document.createElement("script");
      s.src = "https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js";
      s.async = true;
      s.onload = mountRedoc;
      document.head.appendChild(s);
      return () => {
        // cleanup
        if (containerRef.current) containerRef.current.innerHTML = "";
      };
    } else if (typeof window !== "undefined") {
      mountRedoc();
      return () => { if (containerRef.current) containerRef.current.innerHTML = ""; };
    }
    // No-op for SSR
    return undefined;
  }, [specUrl]);

  return <div ref={containerRef} style={{ minHeight: "60vh" }} />;
}
