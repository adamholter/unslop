/* AI Slop Highlighter — Pattern Definitions (shared module)
   Single source of truth for all patterns. Used by benchmark.mjs
   directly, and content.js gets a copy of the compiled regexes. */

// ── Single words (word-boundary matched, case-insensitive) ────────
export const SINGLE_WORDS = [
  "actually",
  "ever-changing", "ever-evolving", "ever-expanding", "ever-competitive",
  "hyper-connected", "digitally-driven",
  "diverse", "evolve", "evolves", "evolving",
  "leverage", "leveraging",
  "revolutionizing", "vibrant", "unveiling", "revolutionized",
  "bustling", "marvel", "marveling", "timeless", "timelessly",
  "revolutionize",
  "comprehensive", "comprehensively",
  "intricately", "intricacies",
  "unprecedented", "unparalleled", "boundless",
  "multifaceted", "uncharted",
  "delve", "delves", "delving",
  "embark", "embarks", "embarking",
  "indispensable",
  "captivate", "captivates", "captivating",
  "fast-paced", "fast-changing", "ultimate",
  "significant",
  "reshape",
  "redefining",
  "game-changer",
  "action-packed",

  // High-signal AI buzzwords
  "groundbreaking",
  "cutting-edge",
  "state-of-the-art",
  "transformative",
  "holistic",
  "synergy", "synergies",
  "meticulous", "meticulously",
  "paramount",
  "empower", "empowers", "empowering", "empowerment",
  "pivotal",
  "demystify", "demystifies", "demystifying", "demystified",
  "nuanced", "nuances",
  "overarching",
  "invaluable",
  "noteworthy",
  "interplay",
  "fostering",
  "spearheading",
  "cornerstone",
  "underpinning", "underpinnings",
  "harnessing",
  "seamless",
  "innovative", "innovation",
  "curated",
  "bespoke",
  "bolster", "bolstering", "bolsters",
  "underscoring",
  "propel", "propelling",
  "amplify", "amplifying",
  "catalyst",
  "forefront",
  "endeavor", "endeavors",
  "ethos",
  "myriad",
  "plethora",
  "robust",
  "landscape",
  "realm",
  "paradigm",
  "ecosystem",
];

// ── Phrase patterns ───────────────────────────────────────────────
// * = wildcard matching 1-4 words
export const PHRASE_PATTERNS = [
  // Article/guide openers
  "in this article, we will",
  "in this article, we'll",
  "in this article, we explore the",
  "this article explores",
  "this article aims to",
  "this article offers",
  "this article will",
  "this article is your",
  "this article delves into the",
  "within this article",
  "within this * article",
  "throughout this article",
  "in this guide, we will",
  "in this guide, we'll",
  "this guide will",
  "this guide aims to",
  "this guide offers",
  "this guide is your passport",
  "this guide is your compass",
  "this guide is * to",
  "within this guide",
  "within this * guide",
  "throughout this guide",
  "outlined in this guide",
  "throughout this exploration",
  "in this exploration of",
  "in this beginner's guide",
  "this beginner's guide aims to",

  // "the * of" patterns
  "the ever-changing * of",
  "the * realm of",
  "the * tapestry of",
  "the tapestry of",
  "the landscape of",
  "the * landscape of",
  "the * journey of",
  "the * journey to",
  "the * journey towards",
  "the * expanse of the",
  "the annals of history",
  "the * annals of",
  "the intricacies of",
  "the mysteries of",
  "the ever-shifting * of",
  "the hustle and bustle of",
  "the evolving landscape of",
  "the fast-paced * of",
  "the realms of",
  "the keys to unlocking",
  "the essential steps and",
  "the refined artistry",

  // "in the *" patterns
  "in the * world of",
  "in the * landscape of",
  "in the * annals of",
  "in the ever-evolving",
  "in the ever evolving world of",
  "in the digital",
  "in the realm of",
  "in the world of",
  "in the pages ahead",
  "in the vast",
  "into the * world of",

  // "in today's *" patterns
  "in today's * age",
  "in today's fast-paced",
  "in today's * world",
  "in today's * realm",
  "in today's digital world",
  "in today's digital landscape",

  // "in a/an *" patterns
  "in a * marked by",
  "in an * marked by",
  "in an era where",

  // "in our *" patterns
  "in our fast-paced * world",
  "in our * world",

  // Conclusion patterns
  "in conclusion",
  "in summary",
  "in closing,",
  "in summation",
  "in wrapping up our",
  "in concluding our * of",
  "to wrap up",
  "to conclude our * of",
  "as we conclude our journey",
  "as we conclude our * guide",
  "as we conclude our",

  // "embark" patterns
  "embark on a journey",
  "embark on a * journey",
  "embark on an * of",
  "embark on a * of",
  "embark on a * adventure",
  "embark on an * adventure",
  "embark on this next",
  "embark on this new",
  "embark on this * endeavor",
  "embark on this * journey",
  "embark on this journey",
  "embark on your journey",
  "embark on your * journey",
  "embark on your own * journey",
  "embarking on your * journey",
  "embarking on the journey to",
  "embarking on the * of",
  "embarking on a * journey",
  "embarking on this * journey",
  "embarked on a journey",
  "as you embark on your own * adventures",

  // "navigate" patterns
  "navigate the uncharted",
  "navigate the * landscape",
  "navigate the * of",
  "navigate this journey",
  "navigating the * of",
  "navigating the * landscape",
  "navigating a * maze of",
  "navigating uncharted territory",

  // "whether you're" patterns
  "whether you're a first-time",
  "whether you're a beginner",
  "whether you're a novice",
  "whether you're a veteran",
  "whether you're a long-time",
  "whether you're an experienced",
  "whether you're a student or a",
  "whether you're new to",

  // "join us" patterns
  "join us as we",
  "join us on this",
  "join us on a * journey",
  "join us on a journey",
  "journey with us as we * the",

  // "embrace" patterns
  "embrace the journey",
  "embrace the process",
  "embrace the * power of",
  "let's embrace the",
  "let us embrace the",
  "by embracing the challenges",
  "by embracing the * of",
  "by embracing this * approach",
  "by embracing the * process",

  // "this * " patterns
  "this * invites you",
  "this * serves as your",
  "this * will serve as your",
  "this * aims to be your",
  "this * sets out to",
  "this * embarks on",
  "this * adventure promises to",
  "this * travel guide",
  "this journey promises to",

  // Miscellaneous phrases
  "it is important to note that",
  "a * tapestry of",
  "a tapestry of",
  "rich * tapestry",
  "a * testament to",
  "a testament to the * of",
  "has emerged as a",
  "have emerged as a",
  "emerges as a",
  "emerges as the beacon",
  "a treasure trove of",
  "our * will provide",
  "our * promises",
  "our * into the realm of",
  "a * exploration",
  "an * exploration",
  "beyond the surface allure",
  "traverse the diverse",
  "cornerstone upon which",
  "stands out as a * marvel",
  "we invite you to * yourself",
  "adventure waiting to be",
  "pack your curiosity",
  "your key to unlocking the",
  "indulge in a * adventure",
  "waiting to be unlocked",
  "beyond its * appearance lies",
  "beyond their * appearance lies",
  "let's deep dive",
  "let's dive in",
  "let's dive into the",
  "let's delve into",
  "uncover the secrets",
  "through the * world of",
  "entering the realm of",
  "you'll be equipped with the",
  "you'll be well-equipped to",
  "you will be well-equipped to",
  "gain valuable insights",
  "gained valuable insights",
  "armed with this knowledge",
  "with this newfound",
  "stands at the forefront of",
  "* as a beacon of",
  "we stand on the * of an",
  "journeyed through the",
  "continue on your * towards",
  "as you continue your journey towards",
  "we explore the * of",
  "we delve into the * of",
  "we will explore the * of",
  "we'll explore the * of",
  "we'll delve into the * of",
  "or a seasoned",
  "delving into the world of",
  "* key to unlocking",
  "stands as a",
  "a delicate dance between",
  "transcends mere",
  "reshaping the landscape of",
  "serve as * milestones",
  "a world of * possibilities",
  "explore the essential steps",
  "filled with endless * possibilities",
  "to feel overwhelmed",
  "a * journey that",
  "with the world in * ways",
  "by understanding the * of",
  "by understanding its causes",
  "every step of the journey",
  "represents a * shift in",
  "but with careful planning",
  "enjoy the journey of",
  "may seem daunting",
  "kickstart your * journey",
  "here's an * guide to",
  "here's an in-depth",
  "but with the right tools and",
  "is an * journey that",
  "discuss * considerations for",
  "discussed * considerations for",
  "discussing * considerations for",
  "by mastering the * of",
  "grasping the essence of",
  "yield * dividends",
  "requires a comprehensive approach",
  "multifaceted challenge",
  "shape the world for future generations",
  "every facet of our lives",
  "every aspect of our lives",
  "every aspect of",

  // "elevate" in AI-sloppy contexts (standalone too false-positive-prone)
  "elevate your",
  "elevate the * of",

  // Tech-bro / LinkedIn patterns
  "here's the kicker",
  "ethical implications",
  "pushing the boundaries",
  "when it comes to",
  "ever wondered",
  "offers valuable insights",
  "shaking up",
  "changing the game",
  "represents a leap forward",
  "blurs the lines",
  "blur the lines",
  "blurring the lines",
  "new era",
  "showing their commitment to",
  "it's like a",
  "cut through the hype",
  "cut through the fluff",
  "actually matters",
  "for real",
  "actually feels like",

  // "moving beyond" / "go beyond" patterns
  "moving beyond",
  "go beyond",
  "goes beyond",
  "going beyond",
  "move beyond",

  // Common AI filler / transition phrases
  "it's worth noting that",
  "it's worth mentioning that",
  "it is worth noting that",
  "at the end of the day",
  "the bottom line is",
  "that being said",
  "needless to say",
  "first and foremost",
  "last but not least",
  "when all is said and done",
  "to put it simply",
  "in a nutshell",
  "the reality is",
  "the truth is",
  "what sets * apart",
  "it goes without saying",
  "at its core",
  "in essence",
  "diving deeper",
  "peeling back the layers",
  "under the hood",
  "from the ground up",
  "on a deeper level",
  "taken together",
  "all things considered",
  "it begs the question",
  "food for thought",
  "the elephant in the room",
  "a deep dive into",
  "the key takeaway",
  "key takeaways",
  "without further ado",
  "as the name suggests",
  "it's no secret that",
  "it is no secret that",
  "look no further",
  "the power of",
  "harness the power of",
  "harness the * of",
  "harness the * potential",
  "harnessing the power of",
  "tap into",
  "tapping into",
  "it's clear that",
  "it is clear that",
  "one thing is clear",
  "the importance of * cannot be overstated",
  "cannot be overstated",
  "can't be overstated",
  "paves the way",
  "paving the way",
  "a game changer",
  "the future of",
  "poised to",
  "well-positioned to",
  "best practices",
  "stay ahead of the curve",
  "ahead of the curve",
  "the next level",
  "take it to the next level",
  "level up your",
  "supercharge your",
  "turbocharge your",
  "streamline your",
  "optimize your * for",
  "seamless * experience",
  "seamlessly",
  "robust * solution",
  "robust and scalable",
  "scalable * solution",
  "the secret sauce",
  "not all * are created equal",
  "separates the good from the great",
  "the gold standard",
  "a must-have",
  "a no-brainer",
  "low-hanging fruit",
  "the tip of the iceberg",
  "barely scratching the surface",
  "just the beginning",
  "final thoughts",
  "wrapping up",
  "parting thoughts",

  // Article/listicle openers
  "here's what you need to know",
  "here's everything you need to know",
  "everything you need to know",
  "what you need to know",
  "a closer look at",
  "let's take a closer look",
  "here's the thing",
  "here's why",
  "here's how",
  "let me break it down",
  "breaking it down",
  "you might be wondering",
  "you may be wondering",
  "the short answer is",

  // Dramatic emphasis / LinkedIn patterns
  "now more than ever",
  "more important than ever",
  "more crucial than ever",
  "there's no denying",
  "there is no denying",
  "let that sink in",
  "make no mistake",
  "let's be honest",
  "let's face it",
  "the fact of the matter",
  "you're not alone",
  "you are not alone",
  "rest assured",
  "fear not",
  "the good news is",
  "here's the deal",
  "here's the bottom line",
  "imagine a world where",
  "in a world where",
  "picture this",
  "think about it",

  // Importance / role patterns
  "at the heart of",
  "lies at the heart",
  "the cornerstone of",
  "a cornerstone of",
  "plays a crucial role",
  "plays a vital role",
  "plays a key role",
  "play a crucial role",
  "play a vital role",
  "play a key role",
  "the advent of",

  // Bar / standard patterns
  "raises the bar",
  "raise the bar",
  "raising the bar",
  "sets the stage",
  "setting the stage",
  "stands the test of time",
  "a breath of fresh air",
  "tried and true",

  // Listicle / guide patterns
  "without a doubt",
  "no doubt about it",
  "there you have it",
  "the bottom line",
  "so what does this mean",
  "so what does that mean",
  "what does this mean for",
  "why does this matter",
  "why it matters",
  "why this matters",
  "how does this work",
  "how it works",
  "what makes * unique",
  "what makes * special",
  "what makes * stand out",
  "the beauty of",
  "the magic of",
  "the promise of",
  "on the other hand",
  "that said",
  "having said that",
  "with that in mind",
  "with that said",
  "with this in mind",
  "keeping that in mind",
  "bearing that in mind",
  "it's safe to say",
  "suffice it to say",

  // Outcome / impact patterns
  "the impact of * cannot",
  "the impact of * is",
  "a win-win",
  "win-win situation",
  "a game-changing",
  "double-edged sword",
  "the sky's the limit",
  "the possibilities are endless",
  "only time will tell",
  "time will tell",
  "the jury is still out",
  "remains to be seen",
  "it remains to be seen",
  "we've only scratched the surface",
  "we have only scratched the surface",
  "scratching the surface",
  "a deep understanding",
  "deeper understanding",
  "a comprehensive understanding",

  // Call to action / engagement patterns
  "are you ready",
  "ready to take",
  "ready to get started",
  "what are you waiting for",
  "don't miss out",
  "don't get left behind",
  "the clock is ticking",
  "it's not too late",
  "there's never been a better time",
  "there has never been a better time",
  "the time is now",
  "start your journey",
  "begin your journey",
  "your journey starts",
  "your journey begins",
];

// ── Structural patterns ────────────────────────────────────────────
// Tested separately — they need flags (multiline, etc.) that can't
// be inlined into the single combined alternation regex.
export const STRUCTURAL_PATTERNS = [
  // "It's not just X, it's Y" and all variants
  {
    name: "not_just_its",
    re: /\b(?:it['\u2019]?s|that['\u2019]?s|this\s+is)\s+not\s+(?:just|only|merely|simply)\b[^.!?]{1,80}[,;\u2014]\s*(?:it['\u2019]?s|that['\u2019]?s|this\s+is)\b/gi,
  },
  {
    name: "isnt_just_its",
    re: /\b(?:it|that|this)\s+isn['\u2019]?t\s+(?:just|only|merely|simply)\b[^.!?]{1,80}[,;\u2014]\s*(?:it['\u2019]?s|that['\u2019]?s|this\s+is)\b/gi,
  },

  // "Then X. Now Y." contrast beats (exclude code-like content with parens)
  {
    name: "then_now",
    re: /(?:^|[.!?]\s+)Then\s+[^.!?(]{3,60}[.!?]\s*Now\s+/gm,
  },

  // "As X, so does/do Y." bridges
  {
    name: "as_so_does",
    re: /\bAs\s+[^,]{3,50},\s*so\s+(?:does|do|did|will|can|must)\b/gi,
  },

  // "Most people/X don't have a Y problem, they have a Z problem"
  {
    name: "dont_have_problem",
    re: /\bMost\s+\w+\s+don['\u2019]?t\s+have\s+(?:a|an)\s+[^,]{1,40}\s+problem,\s*they\s+have\s+(?:a|an)\s+/gi,
  },

  // "Honestly," / "Honestly?" as sentence opener
  {
    name: "honestly_opener",
    re: /(?:^|[.!?]\s+)Honestly[,?!.\s]/gm,
  },

  // "simple" in AI-sounding compound contexts
  {
    name: "simple_context",
    re: /\b(?:deceptively\s+simple|simple\s+(?:truth|fact|reason|reality|yet)|(?:elegantly|beautifully|surprisingly|refreshingly)\s+simple)\b/gi,
  },

  // "Enter [Noun]" as dramatic sentence opener (exclude instructions/physical actions)
  {
    name: "enter_opener",
    re: /(?:^|[.!?]\s+)Enter\s+(?!(?:your|my|their|our|his|her|its|a\s|an\s|key\b|the\s+(?:code|password|name|email|number|address|value|data|text|key|command|info|url|query|search|field|username|details|amount|date|room|building|house|store|office|door|hall|area|lobby|bathroom|kitchen|car|bus|train|station|garden|garage|cave|tunnel|forest|park|mall|museum|hospital|school|church|library|arena|palace|prison|attic|basement)\b))(?:the\s+)?[A-Za-z]/gm,
  },
  // "Not only X, but also Y" (very AI transition)
  {
    name: "not_only_but_also",
    re: /\bnot\s+only\s+[^.!?]{3,60},?\s*but\s+also\b/gi,
  },

  // "The question isn't X, it's Y" or "The question is not X, it's Y"
  {
    name: "question_isnt",
    re: /\b(?:the|a)\s+(?:question|issue|challenge|problem)\s+isn['\u2019]?t\b[^.!?]{1,60}[,;\u2014]\s*(?:it['\u2019]?s|the\s+(?:question|issue|challenge|problem)\s+is)\b/gi,
  },

  // Single em dash as dramatic transition/pivot
  // Catches: "productivity—and it changes everything", "things"—moving beyond"
  // Anchor allows word chars or closing quotes before the dash
  {
    name: "emdash_dramatic",
    re: /(?:[a-zA-Z]{2,}|["\u201D\u2019])\s*(?:\u2014|\u2013|--)\s*(?:and\s+(?:it|that|this|yet|still|here)|but\s+(?:it|that|this|here|more)|not\s+(?:just|only|merely)|one\s+that|the\s+kind|moving\s+beyond|redefining|transforming|revolutionizing|changing|reshaping)/gi,
  },
];

// ── Em dash detection ─────────────────────────────────────────────
// Double em-dash parenthetical: "word — aside phrase — continues"
// Matches real em dash (—), en dash (–), and double hyphens (--)
// Require at least one letter between dashes (excludes pure numbers like "— 42 —")
// Anchors allow word chars OR quotes/parens adjacent to dashes (handles: things"—aside—"more)
export const EM_DASH_RE = /[\w""\u201C\u201D')\]]\s*(?:\u2014|\u2013|--)\s*(?=[^.\u2014\u2013\n]*[a-zA-Z])[^.\u2014\u2013\n]{2,60}\s*(?:\u2014|\u2013|--)\s*[\w""\u201C\u201D'(\[]/g;

// ── Regex compilation ─────────────────────────────────────────────

function escRegex(s) {
  return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

/** Turn a wildcard pattern (* = 1-4 words) into regex source.
 *  The key fix: \s+ on both sides of the wildcard gap. */
function wildcardToRegex(pat) {
  const segments = pat.split("*");
  const escaped = segments.map((s) => escRegex(s.trim()));
  // Join with: \s+ (one word) then optionally 0-3 more words, then \s+
  return escaped.join("\\s+\\S+(?:\\s+\\S+){0,3}\\s+");
}

export function buildCombinedRegex() {
  // Phrases first (longer = higher priority in alternation)
  const phraseParts = [...PHRASE_PATTERNS]
    .sort((a, b) => b.length - a.length)
    .map((p) => (p.includes("*") ? wildcardToRegex(p) : escRegex(p)));

  const wordParts = [...SINGLE_WORDS]
    .sort((a, b) => b.length - a.length)
    .map(escRegex);

  // Structural patterns are NOT inlined — they need separate regex
  // objects with their own flags (multiline, etc.)

  const all = [...phraseParts, ...wordParts];
  // Replace straight apostrophes with a class matching both straight and curly
  const source = all.join("|").replace(/'/g, "['\u2019]");
  return new RegExp("\\b(" + source + ")(?=[.,;:!?'\u2019\"\\s)\\]\\-]|$)", "gi");
}

export const SLOP_RE = buildCombinedRegex();
