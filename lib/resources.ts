/* Content for the free question sets.
   DRAFT: the framing and questions are Michael's to cut, rewrite or replace.
   They publish under his name, so nothing here is invented or "improved" —
   it is transcribed exactly as supplied. */

export type Question = { q: string; note?: string };

export type Resource = {
  slug: string;
  kicker: string;
  title: string;
  framing: [string, string];
  howToUse: string;
  /* first sentence of framing p1, used on the index */
  teaser: string;
  questions: Question[];
};

export const resources: Resource[] = [
  {
    slug: "life-after-sport",
    kicker: "Life after sport",
    title: "Questions for when a season ends",
    framing: [
      "For a lot of athletes, it doesn’t end with a ceremony. It ends with an injury, a roster decision, or a last game nobody told you was the last one. Then the schedule that organized your entire life is just gone.",
      "These questions are not a plan and they are not advice. They are the kind of thing worth sitting with when the thing you were is no longer the thing you do.",
    ],
    howToUse:
      "Take one. Not all eight. Write the answer down somewhere, or say it out loud to yourself in the car — the point is getting it out of your head where it has been circling. If a question makes you want to skip it, that is usually the one worth coming back to.",
    teaser: "For a lot of athletes, it doesn’t end with a ceremony.",
    questions: [
      {
        q: "When people ask what you do now, what do you actually say — and how does it feel in your mouth?",
        note: "Not the polished version. The one that comes out at a party.",
      },
      {
        q: "What did the sport give you that you have not found anywhere else yet?",
        note: "Structure, a body with a purpose, people who knew you without explanation, a scoreboard that told you where you stood. Name the specific one you miss most.",
      },
      { q: "Who were you to your teammates, aside from your position?" },
      {
        q: "Is there a version of the ending you are still arguing with?",
        note: "The injury, the decision, the coach, the timing. Some of it may be worth putting down. Some of it may not be finished yet.",
      },
      {
        q: "What are you doing now that you would not have had time for before?",
        note: "Even if it feels small compared to what you left.",
      },
      { q: "Whose expectations are you still carrying, and did you ever agree to them?" },
      { q: "What would it mean to be good at something again, if nobody was keeping score?" },
      {
        q: "If this season of your life ended well, what would have to be true a year from now?",
        note: "Not the ideal answer. The honest one.",
      },
    ],
  },
  {
    slug: "foster-care-and-adoption",
    kicker: "Foster care and adoption",
    title: "Questions for a changing family",
    framing: [
      "Foster care and adoption look different depending on where you are standing — whether you came into a family this way, built one this way, opened your home to a child, or aged out of a system that stopped calling. What these have in common is that family stopped being something you could take for granted.",
      "These questions are not a plan and they are not advice. They are for the parts of this that are harder to say out loud than the version you give people who ask.",
    ],
    howToUse:
      "Take one. Not all eight. Some of these will not apply to your situation — skip those without guilt. The ones that make you uncomfortable are usually the ones already taking up room.",
    teaser: "Family stopped being something you could take for granted.",
    questions: [
      { q: "Who in your life understands this without you having to explain it first?" },
      {
        q: "What did you imagine this would look like, and what does it actually look like?",
        note: "The gap is not a failure. It is just information.",
      },
      { q: "Where do you feel loyalty pulling in two directions?" },
      { q: "What part of this is grief, even though it is supposed to be a good thing?" },
      {
        q: "What do you find yourself explaining to people over and over, and what does it cost you to keep explaining it?",
      },
      { q: "What has this asked of you that you did not know you had?" },
      { q: "Is there a question about your own story you have never let yourself ask out loud?" },
      {
        q: "If a year from now this felt settled, what would be different?",
        note: "Not resolved. Settled. Those are not the same thing.",
      },
    ],
  },
  {
    slug: "identity-and-leadership",
    kicker: "Identity and leadership change",
    title: "Questions for who you’re becoming",
    framing: [
      "New title, new city, new role. On paper it is a step up, so nobody thinks to ask how you are doing. Meanwhile the instincts that got you here have stopped working, the people who used to be peers talk to you differently, and you are spending energy being a version of yourself you have not agreed to yet.",
      "These questions are not a plan and they are not advice. They are for the distance between the role you hold and the person holding it.",
    ],
    howToUse:
      "Take one. Not all eight. These work better written down than thought about — thinking about them tends to produce the answer you would give in an interview. Writing tends to produce the other one.",
    teaser: "On paper it is a step up, so nobody thinks to ask how you are doing.",
    questions: [
      { q: "What did you have to become to get this, and do you still want to be that?" },
      {
        q: "Who talks to you differently now?",
        note: "And which of those changes do you actually mind?",
      },
      { q: "What are you performing that you did not have to perform before?" },
      {
        q: "Which of your instincts stopped working?",
        note: "Most people can name the moment they noticed. Start there.",
      },
      {
        q: "What did you leave behind that you have not grieved, because it looked like a promotion?",
      },
      {
        q: "What would you do differently if nobody who knew the earlier version of you were watching?",
      },
      { q: "Who are you when you are not in the role?" },
      { q: "A year from now, what would tell you this was the right change?" },
    ],
  },
];

export const bySlug = (slug: string) => resources.find((r) => r.slug === slug)!;
