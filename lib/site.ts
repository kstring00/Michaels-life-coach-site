export const site = {
  name: "GrowthGains",
  description:
    "Coaching for people who know something needs to change and want support figuring out where they are going next: identity and major decisions, life after collegiate sport, foster care and adoption, grief and loss, and the patterns you want to understand.",
  statement:
    "I work with people who know something needs to change and want support figuring out where they are going next. That covers identity and major decisions, athletes navigating life beyond sport, foster care and adoption, grief and loss, and the patterns someone sees in their own life and wants to change.",
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
  ["Identity and major decisions", "When a choice in front of you changes things, and the answer that used to be obvious no longer is."],
  ["Life after sport", "When the last game has been played and the thing that organised your days and told you who you were is over."],
  ["Foster care and adoption", "When you are inside a family story most people only see from the outside, as a parent or as the person who grew up in it."],
  ["Grief and loss", "When something or someone is gone and the shape of ordinary life has to be worked out again."],
  ["Patterns you can see", "When you keep watching the same thing come back around and you want to understand it well enough to change it."],
  ["Knowing something has to change", "When you cannot yet name the next direction, but staying where you are has stopped being an option."],
] as const;
