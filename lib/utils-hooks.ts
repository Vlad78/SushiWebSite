"use client";

import { useCallback, useState } from "react";

export function useClientRect(): [DOMRect | null, (node: HTMLElement) => void | null] {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ref = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
