import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RecentProject from "@/components/RecentProject";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import dynamic from "next/dynamic";

// ✅ Dynamic imports for components that might have SSR issues
const DynamicGrid = dynamic(() => import("@/components/Grid"), {
  ssr: false,
  loading: () => (
    <section id="about" className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-4 lg:gap-8 mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-40 bg-slate-800/50 rounded-lg animate-pulse" />
        ))}
      </div>
    </section>
  ),
});

const DynamicExperience = dynamic(
  () => import("@/components/Experience").then((mod) => ({ default: mod.Experience })),
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
    ),
  }
);

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <DynamicGrid />
        <RecentProject />
        <Clients />
        <DynamicExperience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
}