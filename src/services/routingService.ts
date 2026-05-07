import {
  attributionRecords,
  distributionEvents,
  leads,
  partners,
  routingRules,
  territories,
} from "../data.js";
import type {
  AnalysisInput,
  AnalysisResponse,
  AttributionResponse,
  Partner,
  RoutingStatus,
} from "../types.js";

function statusFromScore(score: number): RoutingStatus {
  if (score >= 80) {
    return "routed";
  }

  if (score >= 55) {
    return "needs-review";
  }

  return "unassigned";
}

function findEligiblePartners(input: AnalysisInput): Partner[] {
  return partners.filter((partner) => {
    const regionMatch = partner.regions.includes(input.region);
    const industryMatch = partner.industries.includes(input.industry);
    const productMatch = partner.productLines.includes(input.productLine);

    return regionMatch && industryMatch && productMatch;
  });
}

export function analyzeRouting(input: AnalysisInput): AnalysisResponse {
  const issues: string[] = [];
  const passedChecks: string[] = [];
  let score = 25;

  const eligiblePartners = findEligiblePartners(input);

  if (eligiblePartners.length > 0) {
    passedChecks.push("Territory alignment is valid.");
    score += 22;
  } else {
    issues.push("No partner satisfies the combined territory, specialization, and product fit requirements.");
  }

  const capacityReady = eligiblePartners.find(
    (partner) => partner.activeCapacity > 0 && partner.responseSlaHours <= input.slaHoursRemaining,
  );

  if (capacityReady) {
    passedChecks.push("Partner capacity is currently available.");
    score += 20;
  } else {
    issues.push("Qualified partner capacity or response posture may miss the current SLA window.");
    score -= 5;
  }

  if (eligiblePartners.some((partner) => partner.productLines.includes(input.productLine))) {
    passedChecks.push("Partner specialization matches the product line.");
    score += 18;
  } else {
    issues.push("The requested product line has weak specialization coverage in the current partner set.");
  }

  if (input.slaHoursRemaining <= 8) {
    issues.push("SLA window is narrowing and requires rapid assignment.");
    score += 8;
  } else {
    passedChecks.push("SLA window still allows a standard routing motion.");
  }

  if (input.companySize >= 1000) {
    passedChecks.push("Enterprise account size supports routing to higher-tier partner coverage.");
    score += 10;
  }

  if (input.leadSource === "partner-webinar" || input.leadSource === "partner-referral") {
    passedChecks.push("Lead source carries strong attribution confidence for partner distribution.");
    score += 12;
  } else {
    issues.push("Lead source is less partner-specific and may require closer attribution review.");
  }

  const finalScore = Math.max(0, Math.min(100, score));
  const status = capacityReady ? statusFromScore(finalScore) : "needs-review";
  const recommendedNextAction =
    status === "routed"
      ? `Route to ${capacityReady?.name ?? "the matched partner"} within the next 2 hours and notify channel manager.`
      : status === "needs-review"
        ? "Escalate to channel operations for manual routing review and partner capacity confirmation."
        : "Route to direct sales coverage or channel leadership because no valid partner fit exists.";

  return {
    status,
    score: finalScore,
    issues,
    passedChecks,
    recommendedNextAction,
  };
}

export function analyzeCapacity(input: AnalysisInput): AnalysisResponse {
  const result = analyzeRouting(input);

  const eligiblePartners = findEligiblePartners(input);
  const overloaded = eligiblePartners.every((partner) => partner.activeCapacity <= 0);

  if (overloaded && eligiblePartners.length > 0) {
    result.issues.push("All qualified partners are currently capacity constrained.");
    result.score = Math.max(0, result.score - 12);
    result.status = "needs-review";
    result.recommendedNextAction =
      "Rebalance the queue across qualified partners or temporarily route through direct coverage to protect SLA performance.";
  }

  return result;
}

export function analyzeAttribution(input: AnalysisInput): AttributionResponse {
  const rationale: string[] = [];
  let priority: AttributionResponse["priority"] = "medium";

  if (input.leadSource === "partner-webinar" || input.leadSource === "partner-referral") {
    priority = "high";
    rationale.push("Lead source supports strong partner attribution confidence.");
  }

  if (input.slaHoursRemaining <= 8) {
    priority = "critical";
    rationale.push("Narrow SLA remaining time increases distribution urgency.");
  }

  const eligiblePartners = findEligiblePartners(input);
  if (eligiblePartners.length > 1) {
    rationale.push("Multiple qualified partners suggest fairness balancing should be considered.");
  }

  if (eligiblePartners.length === 0) {
    rationale.push("No valid partner fit exists, so attribution should be reviewed before final assignment.");
    priority = "high";
  }

  if (rationale.length === 0) {
    rationale.push("The lead can follow standard routing without elevated attribution review.");
  }

  const recommendedNextAction =
    priority === "critical"
      ? "Confirm attribution immediately, assign the best-fit partner, and notify the channel manager before the SLA window closes."
      : priority === "high"
        ? "Route through channel operations with attribution review and fairness balancing across qualified partners."
        : "Keep the lead in the normal distribution queue and monitor for SLA drift.";

  return {
    priority,
    rationale,
    recommendedNextAction,
  };
}

export function getDashboardSummary() {
  const newLeadCount = leads.filter((lead) => lead.status === "new").length;
  const escalatedLeadCount = leads.filter((lead) => lead.status === "escalated").length;
  const constrainedPartners = partners.filter((partner) => partner.activeCapacity <= 2).length;

  return {
    leadCount: leads.length,
    partnerCount: partners.length,
    newLeadCount,
    escalatedLeadCount,
    constrainedPartnerCount: constrainedPartners,
    topOperationalRisks: [
      "SLA compression on webinar-sourced enterprise leads",
      "Capacity balancing across North America modernization partners",
      "Attribution review for mixed-source opportunities",
    ],
  };
}

export {
  attributionRecords,
  distributionEvents,
  leads,
  partners,
  routingRules,
  territories,
};
