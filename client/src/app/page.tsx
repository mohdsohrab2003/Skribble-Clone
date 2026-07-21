"use client";

import HeroSection from "@/components/HeroSection";
import InfoSidebar from "@/components/InfoSidebar";
import Test from "@/utils/test";

const Home = () => {
  return (
    <main className="mx-auto mt-8 w-full max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <HeroSection />
          <Test />
        </section>

        <aside className="lg:col-span-4">
          <InfoSidebar />
        </aside>
      </div>
    </main>
  );
};

export default Home;
