import React from 'react';

export function ScientificDisclaimer() {
  return (
    <div className="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-600 p-4 my-6 text-sm text-emerald-800 dark:text-emerald-200">
      <h4 className="font-semibold mb-1 flex items-center">
        <span className="mr-2">⚠️</span> Scientific & Conservation Notice
      </h4>
      <p className="mb-2">
        Data presented on HerbNexus, including AI predictions, observation trends, and conservation priority indicators, are <strong>preliminary</strong> and intended for research and prioritization support.
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Observation trends are <strong>not direct population estimates</strong>. They may be affected by survey effort, accessibility, seasonality, and other factors.</li>
        <li>The Conservation Priority Indicator does <strong>not</strong> replace official conservation assessments (e.g., IUCN Red List).</li>
        <li>For rare species facing high medicinal demand, HerbNexus recommends controlled propagation/cultivation research rather than wild collection.</li>
        <li>Exact coordinates of sensitive locations are obfuscated for public viewing to prevent over-harvesting.</li>
      </ul>
    </div>
  );
}
