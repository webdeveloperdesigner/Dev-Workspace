"use client";

import React from "react";

export function FlickeringGrid() {
  return (
    <div className="absolute inset-0 -z-10 h-64 w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />
  );
}
