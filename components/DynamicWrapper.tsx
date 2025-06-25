// components/DynamicWrapper.tsx
"use client";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

// ✅ Dynamic import for Experience component (uses MovingBorder)
export const DynamicExperience = dynamic(
  () => import("./Experience").then((mod) => ({ default: mod.Experience })),
  {
    ssr: false,
    loading: () => (
      <div className="py-20" id="testimonials">
        <h1 className="heading">
          My <span className="text-purple">work experience</span>
        </h1>
        <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-800/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }
);

// ✅ Dynamic import for Grid component if needed
export const DynamicGrid = dynamic(
  () => import("./Grid"),
  {
    ssr: false,
    loading: () => (
      <section id="about">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-4 lg:gap-8 mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-40 bg-slate-800/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </section>
    )
  }
);

const DynamicWrapper = {
  Experience: DynamicExperience,
  Grid: DynamicGrid
};

export default DynamicWrapper;