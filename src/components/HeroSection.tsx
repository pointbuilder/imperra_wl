const HeroSection = () => {
  return (
    <section className="pt-12 sm:pt-16 overflow-hidden">
      <div className="container-gondor relative z-10">
        <div className="flex justify-between flex-wrap items-center sm:items-end gap-4">
          <h1 className="font-display text-5xl sm:text-6xl xl:text-[90px] font-normal leading-[0.9] tracking-tight text-foreground text-center sm:text-start">
            Borrow against your<br className="hidden sm:block" /> Polymarket positions
          </h1>
          <p className="text-navy-light text-base sm:text-xl xl:text-2xl ml-auto sm:ml-0">
            The DeFi layer for<br />prediction markets
          </p>
        </div>
      </div>
      <div className="relative xl:-mt-18 sm:-mt-12 -mt-4 mx-auto w-full flex justify-center overflow-hidden">
        <img
          alt="City skyline illustration"
          loading="eager"
          className="w-full min-w-[974px] -ml-16 sm:ml-0"
          src="/images/hero-bg.webp"
        />
        <div className="absolute h-[10%] w-full bottom-0 left-0 bg-gradient-to-b from-transparent to-background" />
      </div>
    </section>
  );
};

export default HeroSection;
