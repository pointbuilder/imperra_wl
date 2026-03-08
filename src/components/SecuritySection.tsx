const SecuritySection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-gondor">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight text-foreground mb-8">
              We never{" "}
              <span className="opacity-30">have any access</span>{" "}
              to your{" "}
              <span className="opacity-30">money</span>
            </h2>
            <p className="text-navy-light text-lg leading-relaxed mb-4">
              Your collateral is non-custodially stored in Gondor's lending
              pools. Only you are able to withdraw it once the loan is repaid.
            </p>
            <p className="text-navy-light text-lg leading-relaxed mb-8">
              No matter if you use wallet or email to log into Polymarket, only
              you have control over your shares when they are transferred to
              Gondor.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-sm text-foreground underline underline-offset-4 hover:text-navy-light transition-colors"
            >
              Read our documentation
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/statue.png"
              alt="Statue illustration"
              className="max-w-full max-h-[600px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
