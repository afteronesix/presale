import { Rocket } from "lucide-react";

const About = () => {
  return (
    <div className="relative p-6 rounded-2xl bg-neutral-900/60 border border-neutral-700 shadow-xl backdrop-blur-xl neon-border">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Rocket size={18} className="text-pink-400" />
        About X804
      </h2>

      <p className="text-gray-300 leading-relaxed text-sm">
        <span className="font-semibold text-white text-md">What is X804?</span>
        <br />
        <br />
        X804 is a clone of X402, meaning it is{" "}
        <span className="font-semibold text-red-400">
          not an official Coinbase product
        </span>
        . Its mission is to enable instant, automated crypto payments by
        reviving HTTP status code{" "}
        <span className="font-semibold">402 — "Payment Required"</span>.
        <br />
        <br />
        It brings{" "}
        <span className="text-blue-400 font-semibold">
          frictionless, account-free payments directly over HTTP
        </span>
        , enabling APIs, digital content, and AI agents to perform seamless and
        autonomous payments.
        <br />
        <br />
        X804 continues this vision by creating a fast, accessible, crypto-driven
        payment layer for the web.
      </p>
    </div>
  );
};

export default About;
