const AboutSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-gondor">
        {/* Bridge image */}
        <div className="mb-16 overflow-hidden rounded-3xl">
          <img
            src="/images/bridge.png"
            alt="Bridge illustration"
            className="w-full"
            loading="lazy"
          />
        </div>

        {/* About text */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground mb-4 flex items-center justify-center gap-4 flex-wrap">
            A bit
            <img
              src="/images/taxi.png"
              alt="Taxi"
              className="w-16 h-16 sm:w-24 sm:h-24 inline-block rounded-xl"
              loading="lazy"
            />
            about us
          </h2>
          <p className="text-navy-light text-lg sm:text-xl leading-relaxed mt-8">
            We are a small team of prediction markets researchers based out of
            New York, NY. Recently, we raised $2.5M from Prelude, Maven 11 and
            Castle Island Ventures. We believe prediction markets will be the
            largest derivatives product on earth. Gondor will become its
            financial infrastructure, enabling institutions and advanced traders
            to maximize capital efficiency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
