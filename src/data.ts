import type {
  AttributionRecord,
  DistributionEvent,
  Lead,
  Partner,
  RoutingRule,
  Territory,
} from "./types.js";

export const leads: Lead[] = [
  {
    id: "lead_01",
    companyName: "Northstar Cloud",
    region: "North America",
    industry: "Cloud Infrastructure",
    companySize: 1200,
    leadSource: "partner-webinar",
    productLine: "Platform Modernization",
    slaHoursRemaining: 6,
    status: "new",
  },
  {
    id: "lead_02",
    companyName: "ApexShield Security",
    region: "EMEA",
    industry: "Cybersecurity",
    companySize: 460,
    leadSource: "partner-referral",
    productLine: "Identity Modernization",
    slaHoursRemaining: 18,
    status: "routed",
  },
  {
    id: "lead_03",
    companyName: "BluePeak Analytics",
    region: "North America",
    industry: "Analytics",
    companySize: 240,
    leadSource: "website",
    productLine: "Data Platform",
    slaHoursRemaining: 22,
    status: "escalated",
  }
];

export const partners: Partner[] = [
  {
    id: "partner_01",
    name: "Apex North America",
    regions: ["North America"],
    industries: ["Cloud Infrastructure", "Analytics"],
    productLines: ["Platform Modernization", "Data Platform"],
    tier: "platinum",
    activeCapacity: 4,
    responseSlaHours: 4,
  },
  {
    id: "partner_02",
    name: "Vertex EMEA",
    regions: ["EMEA"],
    industries: ["Cybersecurity", "Cloud Infrastructure"],
    productLines: ["Identity Modernization", "Platform Modernization"],
    tier: "gold",
    activeCapacity: 3,
    responseSlaHours: 8,
  },
  {
    id: "partner_03",
    name: "Signal APAC",
    regions: ["APAC"],
    industries: ["Manufacturing", "Analytics"],
    productLines: ["Data Platform", "AI Enablement"],
    tier: "gold",
    activeCapacity: 2,
    responseSlaHours: 10,
  }
];

export const territories: Territory[] = [
  {
    id: "territory_01",
    region: "North America",
    owner: "Channel Team NA",
    specialNotes: "Favor platinum partners for enterprise modernization opportunities.",
  },
  {
    id: "territory_02",
    region: "EMEA",
    owner: "Channel Team EMEA",
    specialNotes: "Escalate identity opportunities with strict compliance requirements.",
  },
  {
    id: "territory_03",
    region: "APAC",
    owner: "Channel Team APAC",
    specialNotes: "Review partner capacity weekly for new platform launches.",
  }
];

export const routingRules: RoutingRule[] = [
  {
    id: "rule_01",
    name: "Territory alignment",
    priority: 1,
    description: "Lead region must align with an approved partner territory.",
  },
  {
    id: "rule_02",
    name: "Specialization match",
    priority: 2,
    description: "Partner industry and product-line specialization should fit the account.",
  },
  {
    id: "rule_03",
    name: "Capacity and SLA protection",
    priority: 3,
    description: "Partner must have capacity and be able to respond inside the remaining SLA window.",
  }
];

export const distributionEvents: DistributionEvent[] = [
  {
    id: "event_01",
    leadId: "lead_02",
    partnerId: "partner_02",
    outcome: "assigned",
    timestamp: "2026-05-06T15:40:00.000Z",
  },
  {
    id: "event_02",
    leadId: "lead_03",
    partnerId: "partner_01",
    outcome: "escalated",
    timestamp: "2026-05-06T17:15:00.000Z",
  }
];

export const attributionRecords: AttributionRecord[] = [
  {
    id: "attr_01",
    leadId: "lead_01",
    campaign: "Q2 Platform Modernization Webinar",
    source: "partner-webinar",
    influence: "high",
  },
  {
    id: "attr_02",
    leadId: "lead_02",
    campaign: "Regional Identity Partner Referral",
    source: "partner-referral",
    influence: "high",
  },
  {
    id: "attr_03",
    leadId: "lead_03",
    campaign: "Data Platform Resource Hub",
    source: "website",
    influence: "medium",
  }
];
