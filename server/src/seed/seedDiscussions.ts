import Discussion from "../models/Discussion.js";
import { User } from "../models/User.js";

const seedDiscussions = async () => {
  try {
    console.log("🌱 Seeding discussions...");

    // Clear previous data
    await Discussion.deleteMany({});
    await User.deleteMany({});

    // 1. Create a sample user
    const sampleUser = new User({
      firstName: "Jane",
      lastName: "Doe",
      username: "jane_doe",
      email: "jane@example.com",
      password: "password123" // hash this in production
    });

    await sampleUser.save();

    // 2. Now create discussions with that user's ID
    const discussions = [
      {
        title: "Managing Stress as a Healthcare Worker",
        content: "Healthcare workers often face intense stress. How do you cope with daily stressors?",
        keywords: ["Mental Health", "Burnout", "Wellness"],
        author: sampleUser._id
      },
      {
        title: "Transitioning from Nursing to Tech",
        content: "I’m considering a career change to software development. Has anyone else made the switch?",
        keywords: ["Career Change", "Nursing", "Tech Industry"],
        author: sampleUser._id
      },
      {
        title: "Best Self-Care Practices for Night Shift Nurses",
        content: "Working night shifts has affected my sleep and mental health. Any advice?",
        keywords: ["Self-Care", "Night Shift", "Healthcare"],
        author: sampleUser._id
      },
      {
        title: "How Therapy Helped Me as a Doctor",
        content: "I was skeptical about therapy at first, but it changed my approach to stress management.",
        keywords: ["Therapy", "Mental Health", "Support"],
        author: sampleUser._id
      },
      {
        title: "Is Burnout Inevitable in Healthcare?",
        content: "I've seen too many colleagues leave the field due to burnout. Can we prevent it?",
        keywords: ["Burnout", "Healthcare", "Wellness"],
        author: sampleUser._id
      },
    ];

    await Discussion.insertMany(discussions);

    console.log("🌱 Sample user and discussions seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

export default seedDiscussions;
