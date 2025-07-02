
import { JunkEstimator } from "@/components/junk-estimator/junk-estimator";
import { EmbedHeightReporter } from "@/components/embed-height-reporter";


export const metadata = {
  title: "Junk Removal Estimator – Embed",
  description: "Embeddable version of Redhawk's junk-removal estimator form.",
};

export default function JunkEstimatorEmbedPage() {
  return (
    <div className="bg-white px-4 md:px-6 lg:px-8 max-w-6xl mx-auto py-8">
      {/* The estimator already carries its own layout/style. We keep this wrapper minimal so the iframe host styles don't leak. */}
      <EmbedHeightReporter />
      <JunkEstimator />
    </div>
  );
}
