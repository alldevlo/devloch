const PORTAL_ID = "8082524";
const FORM_ID = "54090bd3-970d-4ad1-b3b3-1c81d54c291e";

export const BLOCKED_DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "yahoo.com",
  "yahoo.fr",
  "outlook.com",
  "live.com",
  "orange.fr",
  "free.fr",
  "laposte.net",
  "wanadoo.fr",
  "icloud.com",
  "proton.me",
  "hotmail.fr",
  "gmail.fr",
] as const;

export function isProEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return !BLOCKED_DOMAINS.includes(domain as (typeof BLOCKED_DOMAINS)[number]);
}

type HubspotPayload = {
  firstname: string;
  email: string;
  company?: string;
  service_interest: string;
  configurator_data?: string;
  page_url: string;
  page_name: string;
};

function buildNote(payload: HubspotPayload): string {
  return [
    `=== LEAD — ${payload.page_name.toUpperCase()} ===`,
    `Service d'intérêt : ${payload.service_interest}`,
    payload.configurator_data ? `\nConfiguration :\n${payload.configurator_data}` : "",
    `\nPage source : ${payload.page_url}`,
    `Date : ${new Date().toLocaleDateString("fr-CH")}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function submitToHubSpot(payload: HubspotPayload): Promise<boolean> {
  const fields = [
    { name: "firstname", value: payload.firstname },
    { name: "email", value: payload.email },
    { name: "company", value: payload.company || "" },
    { name: "strategy_selections", value: buildNote(payload) },
  ];

  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: {
            pageUri: payload.page_url,
            pageName: payload.page_name,
          },
        }),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
}
