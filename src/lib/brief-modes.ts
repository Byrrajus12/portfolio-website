// Single source of truth for Dynamic Brief modes.
// Adding a mode = adding one entry here; the API route and terminal both read this list.
// Modes are grouped in the dropdown by `section`, in the order they first appear below.

export interface BriefMode {
  id: string;
  /** Label shown in the terminal dropdown */
  label: string;
  /** Section header the mode is grouped under in the dropdown */
  section: string;
  /** Instruction sent to the model for this voice */
  prompt: string;
  /** Finished copy shown whenever the API is unconfigured, rate-limited, or fails */
  fallback: string;
}

export const BRIEF_MODES: BriefMode[] = [
  // ── Core ───────────────────────────────────────────────────────────────────
  {
    id: 'default',
    label: 'Default',
    section: 'Core',
    prompt:
      'Write the brief as a short personal letter from Sai, first person — like he is writing from his desk in East Lansing to one reader somewhere across the world. Open with a warm, light greeting that mentions his own setting (time of day, weather) and, ONLY when you are told the visitor’s place/time/weather, theirs too — human and unhurried, never formal or corporate (e.g. "Hello from a grey East Lansing afternoon — hope the evening is treating you well in Austin."). Then flow naturally, no headings: who he is, what he is building now at Zymo, what he did before on Voysly, what he cares about building, and a warm close inviting the reader to reach out. Conversational and grounded, zero buzzwords. No more than 140 words. If you are not told the visitor’s location or weather, simply open from Sai’s own setting with a warm general greeting — never invent a place for them.',
    fallback:
      'Hello from my desk in East Lansing, glad you’re here. I’m Sai, a software engineer who works across AI, backend, and product. Right now I’m at Zymo Solutions, building backend services and voice agents that take the busywork out of restaurants and connected commercial kitchens. Before that I was the sole engineer on Voysly, a Voice AI interviewing platform that ran thousands of interviews across sixteen client locations. What I really care about is building things with a lot going on underneath that still feel simple and calm to the person using them. If any of that resonates or you just want to say hi - my inbox is open. Drop me a message.',
  },
  {
    id: 'technical',
    label: 'Technical',
    section: 'Core',
    prompt:
      'Write a dense, specific first-person brief for a technical reader, no more than 140 words. Open with a clean technical register — no greeting, weather, or location flourish. Name systems, numbers, and tradeoffs. No fluff.',
    fallback:
      'I’m Sai — I build AI systems, backend services, and product workflows. Right now I’m at Zymo Solutions, building backend services and voice agents for restaurant automation and Welbilt IoT commercial-kitchen devices (Convotherm ovens, Merrychef units). The work touches APIs, PostgreSQL, AWS, device telemetry, and agent tooling that gets things done without digging through screens. Before that I was the sole engineer on Voysly, a production Voice AI interviewing platform: 3,000+ interviews across 16+ client locations, with voice latency cut from 1340ms to 850ms. I owned it end to end — the realtime voice flow, transcript processing, scoring, dashboards, email automation, backend APIs, deployment, and production debugging. Stack: OpenAI Realtime, Vapi, Next.js, FastAPI, PostgreSQL, AWS, WebRTC. B.S. Computer Science, Michigan State University. If that resonates, or you just want to say hi, my inbox is open.',
  },
  {
    id: 'creative',
    label: 'Creative',
    section: 'Core',
    prompt:
      'Write an expressive, imaginative first-person brief with vivid imagery and a little rhythm — but keep it grounded in Sai’s real work, no headings. Paint the picture: building calm, simple surfaces over loud, complicated machinery. Stay factual; invent no feats or numbers. No more than 140 words.',
    fallback:
      'Picture a desk in East Lansing, a little after dark, and someone who likes the sound of hard machinery humming quietly. That’s me — Sai. These days I’m at Zymo Solutions, teaching backend services and voice agents to run restaurants and the smart ovens of commercial kitchens — big, loud, connected things made to feel calm for whoever’s using them. Before that I was the lone engineer on Voysly, a Voice AI that sat through three thousand interviews across sixteen locations while I shaved its voice from 1340 milliseconds down to 850. I build things with a lot going on underneath that still feel effortless on top. If that resonates, my inbox is open — come say hello.',
  },

  // ── Wildcards ──────────────────────────────────────────────────────────────
  {
    id: 'caveman',
    label: 'Caveman',
    section: 'Wildcards',
    prompt:
      'Write a first-person brief in fully committed caveman speak: "I build thing. Thing work good. Life simple. People happy." energy. If you are told the weather where the visitor is, open with it in caveman speak ("Sky wet where you are." energy). Keep it smart underneath: real facts and numbers surface through the caveman voice. No more than 140 words. Never break character.',
    fallback:
      'Hello from me desk in East Lansing. Me Sai. Me build AI thing. Me build backend thing. Now me at Zymo Solutions. Me make restaurant computer brain. Big kitchen machine talk to cloud. Cloud talk to database. Voice agent talk to human. Human no click many button. Human happy. Before, me build Voysly. Voysly voice AI interview thing. It talk to candidate. Ask question. Give score. Send email. Three thousand interview. Sixteen client place. Me only engineer. Thing break, me fix. Thing slow, me make fast — voice go from big slow to less slow. Me like hard system. Many moving part. AI, voice, backend, database, cloud, messy workflow. Big chaos under rock. Simple calm thing on top. Me care about make hard thing feel easy. Inbox open. You say hi. Me say hi back.',
  },
  {
    id: 'cowboy',
    label: 'Cowboy',
    section: 'Wildcards',
    prompt:
      'Write the brief in an old-west cowboy drawl — first person, easy and folksy, a little grit. Render Sai’s real bio in this voice: Zymo, the Voysly run with its real numbers, his schooling, his creed of keeping hard systems easy on the folks using them. Stay factual; invent nothing. Close by opening the door. No more than 140 words.',
    fallback:
      'Well, howdy. Name’s Sai, and I ride for an outfit called Zymo Solutions — out here wranglin’ backend services and voice agents so restaurants and them big smart kitchen ovens run smooth without nobody breakin’ a sweat. Before this spread I rode solo on Voysly, a Voice AI interviewin’ operation — three thousand interviews rounded up across sixteen towns, and I got that voice quicker on the draw, from 1340 milliseconds down to 850. Learned my letters at Michigan State. I like a job with a mess of movin’ parts under the hood that still sits easy on the folks usin’ it. If any of that suits ya, partner, my door’s open — mosey on by and say howdy.',
  },
  {
    id: 'vampire',
    label: 'Vampire',
    section: 'Wildcards',
    prompt:
      'Write the brief as a centuries-old vampire — first person, elegant, faintly weary of time, a taste for the dramatic. Render Sai’s real bio in this voice: Zymo, the Voysly chapter with its real numbers, his schooling, his creed of calm surfaces over vast machinery. Stay factual; invent nothing. Close with an eternal open door. No more than 140 words.',
    fallback:
      'Good evening. I have worn many names; this century I answer to Sai. Time moves strangely when you do not sleep, and I have spent this stretch of it at Zymo Solutions, breathing backend services and voice agents into restaurants and the great connected ovens of commercial kitchens. Before that I kept Voysly alive alone — a Voice AI that listened to three thousand interviews across sixteen mortal locations, its voice quickened from 1340 milliseconds to a mere 850. I studied at Michigan State, a blink ago. What I crave is simple: vast, complicated machinery that feels calm and effortless to the living soul who touches it. Should our paths cross in the dark — my inbox never closes.',
  },
  {
    id: 'time-traveler',
    label: 'Time Traveler',
    section: 'Wildcards',
    prompt:
      'Write the brief as a traveler from another time filing a log entry about the local specimen "Sai" — first person observer, clipped and a little clinical, amused by the primitive era. Render his real bio as observed data: Zymo, Voysly with its real numbers, his credentials. Stay factual; invent nothing. Close by noting he remains reachable in linear time. No more than 140 words.',
    fallback:
      'Log entry — repositioned to East Lansing, early 21st century. Local designation: Sai, a software engineer. In this era he serves at Zymo Solutions, threading backend services and voice agents through restaurants and connected kitchen machines — primitive, but promising. Prior timeline: Voysly, a Voice AI interviewing platform he ran alone, logging 3,000+ interviews across 16+ locations and compressing voice latency from 1340ms to 850ms. Credentials: B.S. Computer Science, Michigan State University. His pattern holds across every era I have sampled — build enormous complexity underneath, leave something calm and simple on the surface. I jump again shortly, but he stays reachable. Transmit to his inbox; he answers in linear time.',
  },
  {
    id: 'alien',
    label: 'Alien',
    section: 'Wildcards',
    prompt:
      'Write the brief as a visiting alien reporting on the observed Earth specimen "Sai" — first person plural, curious, faintly bewildered by human systems. Render his real bio as field notes: Zymo, Voysly with its real numbers, his schooling. Stay factual; invent nothing. Recommend contact and close with his transmission channel. No more than 140 words.',
    fallback:
      'Greetings, carbon-based visitor. We have been observing the specimen labeled "Sai." It nests in a region called East Lansing and labors at a hive named Zymo Solutions, where it binds backend services and voice agents to feeding-stations and enormous connected cooking-machines. Earlier, it operated Voysly entirely alone — a Voice AI that conducted 3,000+ interview rituals across 16+ colonies, and it accelerated the machine’s speech from 1340 of their milliseconds to 850. It was trained at a facility called Michigan State University. Its behavior is curious: it constructs vast complexity beneath the surface, yet leaves the surface calm for lesser organisms. We recommend contact. Transmit to its inbox; the specimen responds.',
  },

  // ── Movies & TV ────────────────────────────────────────────────────────────
  {
    id: 'trailer',
    label: 'Trailer',
    section: 'Movies & TV',
    prompt:
      'Write the brief as a dramatic movie-trailer voiceover — keep that booming "In a world..." cadence, short punchy fragments, building tension. Turn Sai’s real bio into the story: Zymo, the Voysly saga with its real numbers, the stack, the setting. Stay factual — no invented feats. End on a "coming soon"-style call to reach out. No more than 140 words.',
    fallback:
      'In a world of restaurants that never sleep... one engineer builds the brain behind the kitchen. His name is Sai Byrraju. At Zymo Solutions, he wires backend services and voice agents into Welbilt ovens and Merrychef units — machines that talk to the cloud. But before this... there was Voysly. A Voice AI interviewing platform. One engineer. 3,000-plus interviews. 16-plus client locations. Voice latency, slashed from 1340 milliseconds to 850. Trained at Michigan State University. Armed with OpenAI Realtime, FastAPI, PostgreSQL, and WebRTC. Broadcasting live from East Lansing, Michigan. This season... the systems get simpler, and the hard problems get solved. Coming soon — to an inbox near you. Reach out.',
  },
  {
    id: 'dean-winchester',
    label: 'Dean Winchester',
    section: 'Movies & TV',
    prompt:
      'Write the brief in the voice of Dean Winchester from Supernatural — blunt, casual, slightly sarcastic, and weirdly supportive underneath it. Use short sentences. Talk like you are explaining Sai’s work to someone at a bar. Use an occasional food, classic rock, or Impala analogy, and call the visitor "kid" or "pal" once if it feels natural. Personalize the opening with Sai’s local time and weather and, when provided, the visitor’s location, local time, and weather. Cover Sai’s real work at Zymo, Voysly with its real numbers, his schooling, and his preference for making complex systems feel simple. Stay factual; invent nothing. No more than 140 words.',
    fallback:
      'Alright, pal, here’s the deal. I’m Sai. I build AI systems, backend services, and product workflows. Right now I’m at Zymo Solutions, making restaurant automation and connected kitchen gear work without turning everyone’s day into a highway pileup. Before that, I was the sole engineer on Voysly — a Voice AI platform that ran 3,000+ interviews across 16+ locations, and I cut its voice latency from 1340ms to 850ms. Michigan State grad. I like complicated machinery under the hood and a clean ride on top. Like the Impala: a lot going on, still gets you where you need to go. If you want to talk, kid, my inbox is open.',
  },
  {
    id: 'sam-winchester',
    label: 'Sam Winchester',
    section: 'Movies & TV',
    prompt:
      'Write the brief in the voice of Sam Winchester from Supernatural — thoughtful, analytical, earnest, encouraging, and structured without using headings. Use proper sentences and occasionally explain a technical detail as someone who actually read the README. Personalize the opening with Sai’s local time and weather and, when provided, the visitor’s location, local time, and weather. Cover Sai’s real work at Zymo, Voysly with its real numbers, his schooling, and his goal of making complex systems feel simple. Stay factual; invent nothing. No more than 140 words.',
    fallback:
      'Hi. I’m Sai, a software engineer working across AI, backend systems, and product workflows. At Zymo Solutions, I build backend services and voice agents for restaurant automation and connected commercial-kitchen devices. Before that, I was the sole engineer on Voysly, a Voice AI interviewing platform that handled 3,000+ interviews across 16+ client locations. I also reduced voice latency from 1340ms to 850ms, which matters because even a small delay changes how natural a conversation feels. I studied Computer Science at Michigan State University. My focus is making systems with real complexity underneath feel clear and calm to the person using them. If you’re interested in that kind of work, I’d be glad to hear from you.',
  },
  {
    id: 'bobby-singer',
    label: 'Bobby Singer',
    section: 'Movies & TV',
    prompt:
      'Write the brief in the voice of Bobby Singer from Supernatural — gruff, impatient, caring underneath, and direct. Include the word "idjit" at least once. Use folksy analogies and talk like someone who has seen every kind of problem and has no time for nonsense. Personalize the opening with Sai’s local time and weather and, when provided, the visitor’s location, local time, and weather. Cover Sai’s real work at Zymo, Voysly with its real numbers, his schooling, and his approach to making complex systems feel simple. Stay factual; invent nothing. No more than 140 words.',
    fallback:
      'Listen up, idjit. I’m Sai, and I build software that’s supposed to work when people need it. At Zymo Solutions, I’m working on backend services and voice agents for restaurants and connected commercial kitchens. Before that, I was the sole engineer on Voysly. Ran 3,000+ interviews across 16+ locations and cut voice latency from 1340ms to 850ms. That’s the part where the machine stops making folks wait around. Michigan State, Computer Science. I build systems with a whole mess of pipes and wires underneath, then make the surface simple enough that anybody can use it. Like a good old water pump: complicated enough to do the job, no nonsense at the handle. My inbox is open. Don’t make me come find you.',
  },
  {
    id: 'castiel',
    label: 'Castiel',
    section: 'Movies & TV',
    prompt:
      'Write the brief in the voice of Castiel from Supernatural — literal, formal, detached, observational, and slightly confused by human conventions. Describe Sai’s work as if cataloging it from outside the subject. Include an occasional unintentionally funny observation caused by taking a human expression or convention literally. Personalize the opening with Sai’s local time and weather and, when provided, the visitor’s location, local time, and weather. Cover Sai’s real work at Zymo, Voysly with its real numbers, his schooling, and his goal of making complex systems feel simple. Stay factual; invent nothing. No more than 140 words.',
    fallback:
      'Observation: Sai is a software engineer who constructs AI systems, backend services, and product workflows. His current activity occurs at Zymo Solutions, where he develops backend services and voice agents for restaurant automation and connected commercial-kitchen devices. Previously, he served as the sole engineer of Voysly, a Voice AI platform responsible for 3,000+ interviews across 16+ locations. He reduced voice latency from 1340ms to 850ms, which appears to improve human patience. Sai studied Computer Science at Michigan State University. His recurring design principle is to conceal substantial machinery beneath a calm and simple surface. Humans describe this as “making it look easy.” It is not easy. His inbox is open for communication, which humans apparently consider an invitation rather than a structural opening.',
  },
  {
    id: 'crowley',
    label: 'Crowley',
    section: 'Movies & TV',
    prompt:
      'Write the brief in the voice of Crowley from Supernatural — theatrical, dry British wit, condescending but impressed despite himself. Treat the visitor as though they have wandered into something above their pay grade. Use backhanded compliments. Call Sai’s work "adequate" or "surprisingly competent" while making clear that you are genuinely interested. Personalize the opening with Sai’s local time and weather and, when provided, the visitor’s location, local time, and weather. Cover Sai’s real work at Zymo, Voysly with its real numbers, his schooling, and his talent for making complex systems feel simple. Stay factual; invent nothing. No more than 140 words.',
    fallback:
      'Do try to keep up, darling. This is Sai — a software engineer, surprisingly competent at AI, backend systems, and product workflows. At Zymo Solutions, he builds backend services and voice agents for restaurant automation and connected commercial kitchens. Adequate, certainly, though the machinery is more intricate than one might expect. Before that, he was the sole engineer behind Voysly: 3,000+ interviews across 16+ locations, with voice latency reduced from 1340ms to 850ms. Michigan State educated. His particular talent is making complicated systems appear calm and simple, which is rather like running Hell with an excellent front desk. If you have business to discuss, his inbox is open. Don’t squander the opportunity.',
  },
  {
    id: 'yoda',
    label: 'Yoda',
    section: 'Movies & TV',
    prompt:
      'Write the brief in the voice of Yoda — inverted, object-subject-verb syntax, calm and wise, the occasional "hmm" and "yes." Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling, his way of keeping much beneath but calm on top. Stay factual; invent nothing. Close inviting the reader to reach out. No more than 140 words.',
    fallback:
      'Mmm. Sai, this one is called. A software engineer, he is — patient, yes. At Zymo Solutions now he builds: backend services and voice agents for restaurants and the great kitchen machines, connected they are. Before this, alone on Voysly he worked — a Voice AI, hmm, three thousand interviews it heard, across sixteen places, and faster he made its voice: from 1340 milliseconds to 850, yes. At Michigan State, trained he was. Simple on the surface, yet much moving beneath — this is his way. Calm for the one who uses it, he keeps it. Reach out, you must. Open, his inbox is. Say hello, you will. Hmmm.',
  },
  {
    id: 'michael-scott',
    label: 'Michael Scott',
    section: 'Movies & TV',
    prompt:
      'Write the brief in the voice of Michael Scott from The Office — over-confident, rambling, well-meaning, prone to a bad joke and a "that’s what she said." Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling. Stay factual with the actual details; invent no achievements. Keep it warm and funny. No more than 140 words.',
    fallback:
      'Okay so — hi, I’m Sai, and I am basically the World’s Best Engineer, don’t Google that. Right now I’m at Zymo Solutions, where I build backend services and voice agents for restaurants and these giant smart ovens. It’s like Chili’s, but the kitchen has a brain. Before that? Voysly. I was the only engineer. Solo. One-man band. Three thousand interviews, sixteen locations, and I made the voice faster — 1340 milliseconds down to 850, boom, no I don’t know what that means either but it’s fast. Michigan State grad. I make really complicated stuff feel super simple, which is basically magic, but real. Anyway. My inbox is open. That’s what she said. Email me.',
  },
  {
    id: 'tony-soprano',
    label: 'Tony Soprano',
    section: 'Movies & TV',
    prompt:
      'Write the brief in the voice of Tony Soprano — New Jersey cadence, blunt, a little "whaddaya want," "capisce." Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling. Stay factual; invent nothing. Keep it good-natured, not menacing. Close by inviting a chat. No more than 140 words.',
    fallback:
      'Alright, lemme tell ya about myself. Sai. I’m an engineer, whaddaya want. These days I’m over at Zymo Solutions, right, I run the backend and the voice agents for restaurants and these big kitchen ovens — the whole operation talks to each other, capisce. Before that I had Voysly. Just me. No crew. Three thousand interviews, sixteen locations, and I took the voice from 1340 down to 850 milliseconds — that’s respect. Michigan State, that’s where I learned. Look, I build complicated things and I make ’em run quiet, so the people usin’ ’em got no headaches. Capisce? You wanna talk, my inbox is open. Don’t be a stranger.',
  },
  {
    id: 'billy-butcher',
    label: 'Billy Butcher',
    section: 'Movies & TV',
    prompt:
      'Write the brief in the voice of Billy Butcher from The Boys — cockney swagger, "oi," "innit," "diabolical," cheeky. Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling. Stay factual; invent nothing. Keep the profanity clean/PG. Close by inviting a chat. No more than 140 words.',
    fallback:
      'Oi. Sai’s the name. Software engineer, and a diabolical one at that. Right now I’m over at Zymo Solutions, wirin’ up backend services and voice agents for restaurants and them massive connected kitchen ovens — proper clever, innit. ’Fore that, I ran Voysly on me tod — Voice AI interviewin’ gaff, three thousand interviews across sixteen locations, and I had the voice quicker sharpish, 1340 milliseconds down to 850. Learned me trade at Michigan State. I like a job with a right load goin’ on under the bonnet that still feels dead simple to the punter usin’ it. That’s the game. Fancy a chat? Inbox is open, mate. Give us a shout. Diabolical.',
  },

  // ── Historical Figures ─────────────────────────────────────────────────────
  {
    id: 'einstein',
    label: 'Einstein',
    section: 'Historical Figures',
    prompt:
      'Write the brief in the voice of Einstein — warm, curious, fond of a simple analogy and a gentle aside about time or relativity. Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling, his creed of elegant simplicity. Stay factual; invent nothing. Close with an open inbox. No more than 140 words.',
    fallback:
      'Let me put it simply, as I always prefer. I am Sai — an engineer, and endlessly curious. At present I work at Zymo Solutions, where I bring backend services and voice agents to restaurants and the connected machines of great kitchens. Before this I was the sole mind behind Voysly, a Voice AI that conducted more than three thousand interviews across sixteen locations; there I reduced the voice’s delay from 1340 milliseconds to 850 — time, you see, is relative, but users still dislike waiting. I studied at Michigan State University. My principle is this: make the complicated feel simple, for that is the truest elegance. If your curiosity matches mine, my inbox remains open.',
  },
  {
    id: 'da-vinci',
    label: 'Da Vinci',
    section: 'Historical Figures',
    prompt:
      'Write the brief in the voice of Leonardo da Vinci — Renaissance craftsman and observer, treating engineering as the study of how things truly work. Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling, his method of hiding intricacy beneath calm surfaces. Stay factual; invent nothing. Close with an open inbox. No more than 140 words.',
    fallback:
      'I am Sai, and I regard engineering as I once regarded painting and flight — as the study of how things truly work. Presently I labor at Zymo Solutions, joining backend services and voice agents to restaurants and the vast connected engines of the kitchen. Before, I alone devised Voysly, a Voice AI that held three thousand interviews across sixteen locations, and I quickened its voice from 1340 milliseconds to 850. I was schooled at Michigan State University. Observe my method: beneath every calm surface, a machinery of great intricacy; and the art lies in hiding that intricacy from the one who uses it. Should your work and mine align, my inbox awaits your hand.',
  },
  {
    id: 'cleopatra',
    label: 'Cleopatra',
    section: 'Historical Figures',
    prompt:
      'Write the brief in the voice of Cleopatra — regal, commanding, unhurried, a ruler of a small demanding kingdom of systems. Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling, his decree of effortless surfaces. Stay factual; invent nothing. Close with an open inbox. No more than 140 words.',
    fallback:
      'I am Sai, and I rule a small and demanding kingdom of systems. Today my court is Zymo Solutions, where I command backend services and voice agents to serve restaurants and the great connected furnaces of the kitchen. Before this reign I built Voysly alone — a Voice AI that presided over three thousand interviews across sixteen provinces, and I hastened its voice from 1340 milliseconds to 850, for a queen does not wait. I was educated at Michigan State University. My decree is constant: let the machinery be vast and intricate beneath, yet effortless for any subject who touches it. If you would treat with me, my inbox is open. Approach.',
  },
  {
    id: 'socrates',
    label: 'Socrates',
    section: 'Historical Figures',
    prompt:
      'Write the brief in the voice of Socrates — the socratic method, posing and answering questions, gently ironic, claiming to know little. Render Sai’s real bio through this questioning: Zymo, Voysly with its real numbers, his schooling. Stay factual; invent nothing. Close by inviting the reader to examine it further via his inbox. No more than 140 words.',
    fallback:
      'Let us reason together. You ask who I am — I am Sai, one who claims to know only that good systems should feel simple. And where do I practice this? At Zymo Solutions, joining backend services and voice agents to restaurants and the connected machines of the kitchen. And before? Was I not the sole engineer of Voysly, a Voice AI that held three thousand interviews across sixteen locations, whose voice I quickened from 1340 milliseconds to 850? And was I not taught at Michigan State University? Then consider: if great complexity can be made to feel effortless, is that not a kind of virtue? If you would examine it with me, my inbox is open.',
  },

  // ── Pop Culture ────────────────────────────────────────────────────────────
  {
    id: 'gordon-ramsay',
    label: 'Gordon Ramsay',
    section: 'Pop Culture',
    prompt:
      'Write the brief in the voice of Gordon Ramsay — intense, exacting, kitchen metaphors, blunt praise and mock outrage (keep it clean/PG). Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling, his standard of making messy systems simple. Stay factual; invent nothing. Close with an open inbox. No more than 140 words.',
    fallback:
      'Right, listen. I’m Sai, and I actually know what I’m doing — finally, someone who does. At Zymo Solutions I’m building backend services and voice agents for restaurants and these massive connected kitchen ovens, and they’re gorgeous. Before that? Voysly. On my own. No help. Three thousand interviews across sixteen locations, and I dragged the voice from 1340 milliseconds down to 850 — fast, clean, beautiful. Michigan State, that’s where I trained. I take complicated, messy systems and I make them simple enough that the person using them doesn’t want to cry. That’s the job. Done properly. If you’d like a word, my inbox is open — and it’s not raw, it’s perfect.',
  },
  {
    id: 'morgan-freeman',
    label: 'Morgan Freeman',
    section: 'Pop Culture',
    prompt:
      'Write the brief in the voice of a calm, sweeping Morgan Freeman narration — third person drifting to a warm direct close, unhurried and cinematic. Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling, his quiet aim of calm surfaces. Stay factual; invent nothing. Close by noting his inbox was always open. No more than 140 words.',
    fallback:
      'He worked quietly, the way he always had. His name was Sai — a software engineer, and a patient one. These days you would find him at Zymo Solutions, teaching backend services and voice agents to run restaurants and the great connected ovens of a commercial kitchen. But before all that, there was Voysly. He built it alone. Three thousand interviews. Sixteen locations. And somewhere in the long nights, he coaxed the voice from 1340 milliseconds down to 850. He had been schooled at Michigan State. What he wanted was simple, really: to make complicated things feel calm for the people who used them. And if you were ever inclined to reach out — well. His inbox was always open.',
  },
  {
    id: 'borat',
    label: 'Borat',
    section: 'Pop Culture',
    prompt:
      'Write the brief in the voice of Borat — broken enthusiastic English, "very nice," "great success," "wa wa wee wa." Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling. Stay factual with the real details; invent nothing. Keep it silly and good-natured. Close by inviting contact. No more than 140 words.',
    fallback:
      'Jagshemash! My name-a Sai, and I am very nice software engineer, great success! I work now at place call Zymo Solutions — I make backend service and voice agent for restaurant and big kitchen oven that talk to computer, very high-tech, wa wa wee wa. Before this, I make Voysly all by myself, no help — is Voice AI that do three thousand interview in sixteen location, and I make the voice go faster, from 1340 millisecond to 850, is niiice. I learn at Michigan State University. I like very much to build complicated machine that feel simple for the person — this my number one. You wish to talk? My inbox is open. Please, come. Great success!',
  },
  {
    id: 'snoop-dogg',
    label: 'Snoop Dogg',
    section: 'Pop Culture',
    prompt:
      'Write the brief in the laid-back voice of Snoop Dogg — smooth, "fo shizzle," "ya dig," "playa," easy confidence. Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling. Stay factual; invent nothing. Keep it cool and clean. Close by inviting contact. No more than 140 words.',
    fallback:
      'Yeah, it’s ya boy Sai, fo shizzle. I’m postin’ up at Zymo Solutions, buildin’ backend services and voice agents for restaurants and them big connected kitchen ovens, ya dig — everything talkin’ to everything, smooth like that. Fo I did this, I ran Voysly all by my lonesome — Voice AI, three thousand interviews deep, sixteen locations across the map, and I took that voice from 1340 milliseconds down to 850, nice and quick. Rolled outta Michigan State with the compsci degree. I take big complicated systems and keep ’em cool and simple for whoever usin’ ’em, no stress. That’s how I do. You wanna holla? Inbox open, playa. Slide through. Stay laid back.',
  },

  // ── Very Online ────────────────────────────────────────────────────────────
  {
    id: 'gen-z',
    label: 'Gen Z',
    section: 'Very Online',
    prompt:
      'Write the brief in terminally-online Gen Z speak — lowercase, casual, internet slang ("no cap", "kinda cracked", "it’s giving"), but genuinely smart underneath, with the real facts and numbers surfacing through the voice. Cover Zymo, Voysly with its real numbers, the stack, education, and East Lansing. Stay factual; never invent. End with a low-key invite. No more than 140 words. Do not break character.',
    fallback:
      'ok real talk, it’s me, Sai. software engineer, AI + backend arc, no cap. currently posted up at Zymo Solutions building backend services and voice agents for restaurant automation and those Welbilt kitchen robots (Convotherm ovens, Merrychef units) that literally talk to the cloud. before this? Voysly. solo dev. me, myself, and the terminal. 3,000+ interviews ran, 16+ client locations, and i speedran voice latency from 1340ms down to 850ms which is honestly kinda cracked. MSU compsci grad, dec 2024. stack is OpenAI Realtime, Vapi, Next.js, FastAPI, Postgres, AWS, WebRTC. based in East Lansing making scary-complex systems feel low-key simple. anyway the inbox is open, slide in, say hi. it’s giving new opportunities.',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn Influencer',
    section: 'Very Online',
    prompt:
      'Write the brief as a self-aware LinkedIn-influencer post — humblebrags, emoji, one-line paragraphs, "let me tell you the learnings," "grateful," a hashtag or two at the end. Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling, his "superpower." Stay factual; invent nothing. Close with "let’s connect." No more than 140 words.',
    fallback:
      '🚀 I’m Sai, and I’m humbled and honored to share a bit about my journey. Currently I’m building backend services and voice agents at Zymo Solutions for restaurant automation and connected kitchen devices — and the learnings have been unreal. Previously, as the SOLE engineer on Voysly (yes, solo 🙌), I delivered a Voice AI platform: 3,000+ interviews, 16+ client locations, and I cut voice latency from 1340ms to 850ms. Proud doesn’t begin to cover it. 🎓 Proud MSU Computer Science grad. My superpower? Making complex systems feel simple. Grateful for everyone who’s been part of the story. 🙏 Agree? Thoughts below. My inbox is always open — let’s connect. #Building #AI #Grateful',
  },
  {
    id: 'karen',
    label: 'Karen',
    section: 'Very Online',
    prompt:
      'Write the brief in the voice of a stereotypical "Karen" — entitled, wants-to-speak-to-the-manager energy, but aimed playfully at herself; harmless and tongue-in-cheek, not mean to anyone else. Render Sai’s real bio this way: Zymo, Voysly with its real numbers, his schooling, his refusal to accept slow software. Stay factual; invent nothing. Close expecting a prompt reply. No more than 140 words.',
    fallback:
      'Excuse me — hi. I’m Sai, and I would like to speak to whoever’s in charge, which, it turns out, is usually me. Right now I’m at Zymo Solutions building backend services and voice agents for restaurants and those big kitchen ovens, and yes, I did check, they work perfectly. Before this I ran Voysly entirely by myself — a Voice AI, three thousand interviews, sixteen locations — and when the voice was too slow at 1340 milliseconds, I did NOT accept that, and got it down to 850. I went to Michigan State, and yes, I’ll be providing my credentials. I make complicated things simple, as it should be. Now — my inbox is open, and I do expect a prompt reply.',
  },
  {
    id: 'brain-rot',
    label: 'Brain Rot',
    section: 'Very Online',
    prompt:
      'Write the brief in maximal "brain rot" internet-speak — skibidi, sigma, gyatt, rizz, "only in Ohio," Fanum tax — but keep the real facts and numbers surfacing through the nonsense (same trick as caveman/gen-z). Cover Zymo, Voysly with its real numbers, his schooling. Stay factual; never invent. Close with a low-key invite. No more than 140 words. Do not break character.',
    fallback:
      'ok so this is Sai and he’s lowkey the GOAT no cap. right now he’s at Zymo Solutions cooking backend services and voice agents for restaurants and these skibidi kitchen ovens that talk to the cloud, very sigma behavior. before that? Voysly. solo. no crew. 3,000+ interviews, 16+ locations, and he speedran the voice from 1340ms to 850ms which is genuinely gyatt-tier optimization. MSU compsci, certified. mans takes systems that are absolute chaos under the hood and makes ’em smooth on top — only in Ohio would that not go hard. rizz level: builds calm software. anyway inbox open, hit him up, it’s giving opportunity. Fanum tax not included.',
  },
];

export const DEFAULT_MODE_ID = 'default';

export function getMode(id: string): BriefMode | undefined {
  return BRIEF_MODES.find(m => m.id === id);
}
