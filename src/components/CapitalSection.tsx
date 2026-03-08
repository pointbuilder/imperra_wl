const CapitalSection = () => {
  return (
    <section className="relative sm:py-12">
      <div className="container-gondor">
        <div className="absolute z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-fit">
          <h2 className="max-w-[522px] w-full mx-auto text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-none font-display text-center text-foreground">
            Unlocking capital{" "}
            <br />
            <span className="opacity-30">
              efficiency for
              <br /> prediction markets
            </span>
          </h2>
        </div>
      </div>
      <div className="max-w-[1920px] mx-auto w-full overflow-hidden relative flex justify-center items-center">
        <img
          alt="Two buildings"
          loading="lazy"
          className="min-w-[180%] sm:min-w-[180%] 2xl:min-w-[120%] mx-auto hidden sm:block"
          src="/images/two-building.png"
        />
        <img
          alt="Two buildings mobile"
          loading="lazy"
          className="min-w-[280%] mx-auto sm:hidden"
          src="/images/two-building-mobile.png"
        />
      </div>
    </section>
  );
};

export default CapitalSection;
