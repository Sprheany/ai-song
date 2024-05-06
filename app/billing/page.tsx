import Shell from "@/components/shell";
import Script from "next/script";
import { Suspense } from "react";
import Plans from "./plans/plans";

const Page = async () => {
  return (
    <>
      {/* Load the Lemon Squeezy's Lemon.js script before the page is interactive. */}
      <Script
        src="https://app.lemonsqueezy.com/js/lemon.js"
        strategy="beforeInteractive"
      />
      <Shell title="Billing">
        <Suspense fallback={<p>Loading plans...</p>}>
          <Plans />
        </Suspense>
      </Shell>
    </>
  );
};

export default Page;
