// Single source of truth for Dynamic Brief modes.
// Adding a mode = adding one entry here; the API route and terminal both read this list.

export interface BriefMode {
  id: string;
  /** Label shown in the terminal dropdown */
  label: string;
  /** Instruction sent to the model for this voice */
  prompt: string;
  /** Finished copy shown whenever the API is unconfigured, rate-limited, or fails */
  fallback: string;
}

export const BRIEF_MODES: BriefMode[] = [
  {
    id: 'default',
    label: 'Default',
    prompt:
      'Write the brief as a short personal letter from Sai, first person — like he is writing from his desk in East Lansing to one reader somewhere across the world. Open with a warm, light greeting that mentions his own setting (time of day, weather) and, ONLY when you are told the visitor\'s place/time/weather, theirs too — human and unhurried, never formal or corporate (e.g. "Hello from a grey East Lansing afternoon — hope the evening is treating you well in Austin."). Then flow naturally, no headings: who he is, what he is building now at Zymo, what he did before on Voysly, what he cares about building, and a warm close inviting the reader to reach out. Conversational and grounded, zero buzzwords. 120-150 words. If you are not told the visitor\'s location or weather, simply open from Sai\'s own setting with a warm general greeting — never invent a place for them.',
    fallback:
      'Hello from my desk in East Lansing, glad you’re here. I’m Sai, a software engineer who works across AI, backend, and product. Right now I’m at Zymo Solutions, building backend services and voice agents that take the busywork out of restaurants and connected commercial kitchens. Before that I was the sole engineer on Voysly, a Voice AI interviewing platform that ran thousands of interviews across sixteen client locations. What I really care about is building things with a lot going on underneath that still feel simple and calm to the person using them. If any of that resonates or you just want to say hi - my inbox is open. Drop me a message.',
  },
  {
    id: 'technical',
    label: 'Technical',
    prompt:
      'Write a dense, specific 3-4 sentence first-person brief for a technical reader. Open with a clean technical register — no greeting, weather, or location flourish. Name systems, numbers, and tradeoffs. No fluff.',
    fallback:
      'Hello from my desk in East Lansing. I’m Sai. I build AI systems, backend services, and product workflows. Right now I’m at Zymo Solutions, building backend services and voice agents for restaurant operations and connected commercial kitchens. My work touches APIs, databases, cloud infrastructure, device data, and agent tooling that helps restaurant staff get things done without digging through a bunch of screens. Before that, I built Voysly, a Voice AI interviewing platform that ran thousands of interviews across sixteen client locations. I owned the system end to end, from the realtime voice flow and transcript processing to scoring, dashboards, email automation, backend APIs, deployment, and production debugging. I like building systems with a lot moving underneath: voice AI, backend automation, cloud services, databases, realtime workflows, and messy operational tools. What I care about is making technically complex things feel simple, fast, and calm for the person using them. If that resonates, or you just want to say hi, my inbox is open. Drop me a message.',
  },
  {
    id: 'caveman',
    label: 'Caveman',
    prompt:
      'Write a 4-6 short-sentence first-person brief in fully committed caveman speak: "I build thing. Thing work good. Life simple. People happy." energy. If you are told the weather where the visitor is, open with it in caveman speak ("Sky wet where you are." energy). Keep it smart underneath: real facts and numbers surface through the caveman voice. Never break character.',
    fallback:
      'Hello from me desk in East Lansing. Me Sai. Me build AI thing. Me build backend thing. Me build product thing. Now me at Zymo Solutions. Me make restaurant computer brain. Big kitchen machine talk to cloud. Cloud talk to database. Database talk to API. Voice agent talk to human. Human no click many button. Human happy. Before, me build Voysly. Voysly voice AI interview thing. It talk to candidate. Ask question. Listen answer. Make words. Give score. Send email. Show dashboard. Thousands interview. Sixteen client place. Me only engineer. Thing break, me fix. Thing slow, me make fast. Thing ugly, me make less ugly. Me like hard system. Many moving parts. AI, voice, backend, database, cloud, automation, messy workflow. Big chaos under rock. Simple calm thing on top. Me care about make hard thing feel easy. Inbox open. You say hi. Me say hi back.',
  },
];

export const DEFAULT_MODE_ID = 'default';

export function getMode(id: string): BriefMode | undefined {
  return BRIEF_MODES.find(m => m.id === id);
}
