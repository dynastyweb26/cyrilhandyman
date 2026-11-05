"use client";

import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

/**
 * Before/after comparison. No library: the top layer is clipped with
 * clip-path inset(), drag uses pointer capture, and touch-action: pan-y keeps
 * the page scrollable on touch. Arrow keys move 4%, Shift+Arrow 10%, Home/End
 * jump to either end.
 */
export function BeforeAfter({
  beforeSlot = "[ BEFORE 3:2 · 1800×1200 ]",
  afterSlot = "[ AFTER 3:2 · 1800×1200 ]",
  slotId = "ba",
  altBefore = "[ALT: Before — service, city]",
  altAfter = "[ALT: After — service, city]",
  className = "",
}: {
  beforeSlot?: string;
  afterSlot?: string;
  slotId?: string;
  altBefore?: string;
  altAfter?: string;
  className?: string;
}) {
  const [position, setPosition] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFrom = useCallback((clientX: number) => {
    const element = box.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, next)));
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setFrom(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFrom(event.clientX);
  };

  const release = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 4;
    const moves: Record<string, number> = {
      ArrowLeft: -step,
      ArrowDown: -step,
      ArrowRight: step,
      ArrowUp: step,
    };

    if (moves[event.key] !== undefined) {
      event.preventDefault();
      setPosition((current) => Math.max(0, Math.min(100, current + moves[event.key])));
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  const rounded = Math.round(position);

  return (
    <div
      ref={box}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      className={`relative h-full w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-[#232329] ${className}`}
    >
      {/* After: the full frame underneath. */}
      <div className="absolute inset-0 bg-[#232329]">
        <div className="absolute inset-y-0 left-1/2 right-0 flex items-center justify-center p-4 text-center font-mono text-[11px] leading-[1.5] text-muted-faint">
          {afterSlot}
        </div>
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt={altAfter}
          loading="lazy"
          decoding="async"
          draggable={false}
          data-slot={`${slotId}-after`}
          className="absolute inset-0 size-full object-cover"
        />
        <span className="absolute bottom-4 right-4 bg-ink px-2.5 py-1.5 text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-body-dark">
          After · [ Photo ]
        </span>
      </div>

      {/* Before: clipped to the handle. */}
      <div
        className="absolute inset-0 bg-[#1A1A1E]"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="absolute inset-y-0 left-0 right-1/2 flex items-center justify-center p-4 text-center font-mono text-[11px] leading-[1.5] text-muted-faint">
          {beforeSlot}
        </div>
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt={altBefore}
          loading="lazy"
          decoding="async"
          draggable={false}
          data-slot={`${slotId}-before`}
          className="absolute inset-0 size-full object-cover"
        />
        <span className="absolute bottom-4 left-4 bg-ink px-2.5 py-1.5 text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-body-dark">
          Before · [ Photo ]
        </span>
      </div>

      {/* Divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -ml-px w-0.5 bg-red"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
        aria-valuetext={`${rounded}% before shown`}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex size-[52px] -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-red text-[20px] font-bold leading-none text-white transition-colors duration-150 hover:bg-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-bone"
        style={{ left: `${position}%` }}
      >
        ↔
      </div>
    </div>
  );
}
