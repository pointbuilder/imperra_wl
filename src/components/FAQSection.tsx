import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Gondor?",
    answer:
      "Gondor is the DeFi layer for prediction markets. Our first product is a protocol for borrowing against Polymarket positions. Soon, we will expand to more markets and financial primitives.",
  },
  {
    question: "How does it work?",
    answer:
      "On Polymarket, every share you buy is an ERC-1155 token that unlocks 1 USDC if you are right. Gondor lets you transfer and deposit these tokens in our lending pools to borrow USDC against them.",
  },
  {
    question: "How secure is it?",
    answer:
      "Gondor never takes custody of your positions. Our smart contracts are created on Morpho, a lending protocol with over $5B in deposits that was audited 34 times by 14 different security firms. Nobody else, even our team, can withdraw your collateral.",
  },
  {
    question: "Who uses it?",
    answer:
      "Traders use Gondor to maximize their capital efficiency. By borrowing against their existing positions, they unlock access to more capital that amplifies their gains.",
  },
  {
    question: "Does it have any fees?",
    answer: "Currently, no. Later on, fees will be introduced.",
  },
  {
    question: "Is there a token?",
    answer:
      "No, there is not. We do not plan to issue a token in the foreseeable future.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24" id="faq">
      <div className="container-gondor">
        <div className="flex items-start gap-4 mb-12">
          <div>
            <div className="flex gap-6 mb-4">
              {["FREQUENTLY", "ASKED", "QUESTIONS"].map((word) => (
                <span
                  key={word}
                  className="text-xs font-medium tracking-[0.2em] uppercase text-navy-muted"
                >
                  {word}
                </span>
              ))}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-normal text-foreground">
              Everything you wanted to know
            </h2>
          </div>
          <img
            src="/images/train.png"
            alt="Train illustration"
            className="w-24 hidden sm:block"
            loading="lazy"
          />
        </div>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={index} className="border-t border-border">
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <h3 className="font-display text-xl sm:text-2xl font-normal text-foreground">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-foreground transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <p className="pb-6 text-navy-light text-base leading-relaxed max-w-2xl">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
