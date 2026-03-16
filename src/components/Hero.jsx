import React from "react";

const Hero = () => {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center text-center text-white">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/hf_20260313_110147_ab0f5e0f-21cc-45af-b35b-22963f88cd24.png')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/5"></div>
    </section>
  );
};

export default Hero;
