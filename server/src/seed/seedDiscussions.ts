import Discussion from "../models/Discussion";

const seedDiscussions = async () => {
  try {
    console.log("🌱 Seeding discussions...");

    if (await Discussion.countDocuments()) {
      console.log("✅ Discussions already seeded.");
      return;
    }

    const discussions = [
      {
        title: "Managing Stress as a Healthcare Worker",
        content: "Healthcare workers often face intense stress. How do you cope with daily stressors?",
        keywords: ["Mental Health", "Burnout", "Wellness"],
      },
      {
        title: "Transitioning from Nursing to Tech",
        content: "I’m considering a career change to software development. Has anyone else made the switch?",
        keywords: ["Career Change", "Nursing", "Tech Industry"],
      },
      {
        title: "Best Self-Care Practices for Night Shift Nurses",
        content: "Working night shifts has affected my sleep and mental health. Any advice?",
        keywords: ["Self-Care", "Night Shift", "Healthcare"],
      },
      {
        title: "How Therapy Helped Me as a Doctor",
        content: "I was skeptical about therapy at first, but it changed my approach to stress management.",
        keywords: ["Therapy", "Mental Health", "Support"],
      },
      {
        title: "Is Burnout Inevitable in Healthcare?",
        content: "I've seen too many colleagues leave the field due to burnout. Can we prevent it?",
        keywords: ["Burnout", "Healthcare", "Wellness"],
      },
    ];

    await Discussion.deleteMany({});
    await Discussion.insertMany(discussions);
    console.log("🌱 Sample discussions inserted successfully");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

export default seedDiscussions;
