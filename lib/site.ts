export const site = {
  name: "GrowthGains",
  description:
    "Identity and life-transition coaching for the moments when an old role, direction, or understanding of yourself no longer fits and the next chapter has not fully taken shape yet.",
  statement:
    "I specialize in identity and life transitions. My work centers on the moments when an old role, direction, or understanding of yourself no longer fits and the next chapter has not fully taken shape yet.",
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  socials: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
  },
};

export const transitions = [
  ["Empty nest", "When active parenting changes and you have to rediscover the person behind the role."],
  ["Divorce or separation", "When the future you pictured changes and you need room to decide what is yours now."],
  ["New marriage", "When an individual life and a shared life need to grow together without erasing either person."],
  ["Career change", "When what you do, what you value and who you are no longer line up the way they once did."],
  ["Major life reset", "When the expected path disappears and the next direction has not become obvious yet."],
  ["Identity drift", "When nothing is necessarily falling apart, but the version of you that used to fit simply does not anymore."],
] as const;
