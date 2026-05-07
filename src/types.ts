export type LeadStatus = "new" | "routed" | "escalated";
export type RoutingStatus = "routed" | "needs-review" | "unassigned";
export type LeadSource = "partner-webinar" | "partner-referral" | "field-event" | "website";
export type Region = "North America" | "EMEA" | "APAC";

export interface Lead {
  id: string;
  companyName: string;
  region: Region;
  industry: string;
  companySize: number;
  leadSource: LeadSource;
  productLine: string;
  slaHoursRemaining: number;
  status: LeadStatus;
}

export interface Partner {
  id: string;
  name: string;
  regions: Region[];
  industries: string[];
  productLines: string[];
  tier: "platinum" | "gold" | "silver";
  activeCapacity: number;
  responseSlaHours: number;
}

export interface Territory {
  id: string;
  region: Region;
  owner: string;
  specialNotes: string;
}

export interface RoutingRule {
  id: string;
  name: string;
  priority: number;
  description: string;
}

export interface DistributionEvent {
  id: string;
  leadId: string;
  partnerId: string;
  outcome: "assigned" | "rebalanced" | "escalated";
  timestamp: string;
}

export interface AttributionRecord {
  id: string;
  leadId: string;
  campaign: string;
  source: LeadSource;
  influence: "high" | "medium" | "low";
}

export interface AnalysisInput {
  companyName: string;
  region: Region;
  industry: string;
  companySize: number;
  leadSource: LeadSource;
  productLine: string;
  slaHoursRemaining: number;
}

export interface AnalysisResponse {
  status: RoutingStatus;
  score: number;
  issues: string[];
  passedChecks: string[];
  recommendedNextAction: string;
}

export interface AttributionResponse {
  priority: "medium" | "high" | "critical";
  rationale: string[];
  recommendedNextAction: string;
}
