import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../config/connection.js';

import { User } from '../models/User.js';
import Post from '../models/Post.js';
import { Comment } from '../models/Comment.js';
import Discussion from '../models/Discussion.js';
import { IPost } from '../models/Post.js';

export const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('⚡ MongoDB connected');

    // Clear existing data
    await mongoose.connection.dropDatabase();
    console.log("🧹 Dropped entire database");

    // Create sample user
    const sampleUser = new User({
      username: 'jane_doe',
      email: 'jane@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
      bio: 'Healthcare professional with a passion for mental health advocacy. Transitioning into tech!',
      about: 'I’m a former nurse turned software developer. I love creating tools that make a difference in people’s lives.',
      workHistory: [
        {
          position: 'Registered Nurse',
          company: 'City Hospital',
          startDate: new Date('2015-06-01'),
          endDate: new Date('2022-08-01'),
          description: 'Worked in ICU and emergency care, providing patient support and advocacy.'
        },
        {
          position: 'Software Developer',
          company: 'Tech Innovators',
          startDate: new Date('2023-03-01'),
          description: 'Currently transitioning into software development with a focus on full-stack web development.'
        }
      ],
      commentsCount: 15,
      profileComments: [],
    });

    await sampleUser.save();

    const now = new Date();

    // Seed discussions
    const discussions = await Discussion.insertMany([
      {
        title: 'Managing Stress as a Healthcare Worker',
        content: 'Healthcare workers often face intense stress. How do you cope with daily stressors?',
        keywords: ['Mental Health', 'Burnout', 'Wellness'],
        author: sampleUser._id,
      },
      {
        title: 'Transitioning from Nursing to Tech',
        content: 'I’m considering a career change to software development. Has anyone else made the switch?',
        keywords: ['Career Change', 'Burnout', 'Nursing', 'Mental Health', 'Tech Industry'],
        author: sampleUser._id,
      },
      {
        title: 'Best Self-Care Practices for Night Shift Nurses',
        content: 'Working night shifts has affected my sleep and mental health. Any advice?',
        keywords: ['Self-Care', 'Mental Health', 'Night Shift', 'Healthcare'],
        author: sampleUser._id,
      },
      {
        title: 'How Therapy Helped Me as a Doctor',
        content: 'I was skeptical about therapy at first, but it changed my approach to stress management.',
        keywords: ['Therapy', 'Mental Health', 'Support'],
        author: sampleUser._id,
      },
      {
        title: 'Is Burnout Inevitable in Healthcare?',
        content: 'I\'ve seen too many colleagues leave the field due to burnout. Can we prevent it?',
        keywords: ['Burnout', 'Healthcare', 'Mental Health', 'Wellness'],
        author: sampleUser._id,
      },
    ]);
    
console.log('discussions', discussions);

    // Seed posts
    const posts: IPost[] = await Post.insertMany([
      {

        content: 'After years working in critical care, I hit a wall. Here’s what helped me regain balance and passion for my work.',
        author: sampleUser._id,
        comments: [],
        createdAt: new Date('2025-04-04'),
        updatedAt: now,
      },
      {

        content: 'Burnout led me to explore tech. It wasn’t easy, but here’s how I transitioned from bedside nursing to full-time software development.',
        author: sampleUser._id,
        comments: [],
        createdAt: new Date('2025-03-17'),
        updatedAt: now,
      },
      {
        content: 'Simple practices like breathwork, journaling, and setting boundaries have made a huge difference in my mental well-being.',
        author: sampleUser._id,
        comments: [],
        createdAt: new Date('2025-02-05'),
        updatedAt: now,
      },
    ]);

    const [post1, post2, post3] = posts;

    // Seed comments
    const comments = await Comment.insertMany([
      {
        content: 'Thanks for sharing your burnout story—it’s so relatable.',
        username: sampleUser.username,
        author: sampleUser._id,
        post: post1._id,
        createdAt: new Date('2025-04-05'),
      },
      {
        content: 'I’ve been thinking about making a similar switch. This gave me hope.',
        username: sampleUser.username,
        author: sampleUser._id,
        post: post2._id,
        createdAt: new Date('2025-04-02'),
      },
      {
        content: 'Going to try that journaling habit starting tonight. Appreciate the tips!',
        username: sampleUser.username,
        author: sampleUser._id,
        post: post3._id,
        createdAt: new Date('2025-03-25'),
      },
      {
        content: 'This is exactly what I needed to read today. Thank you.',
        username: sampleUser.username,
        author: sampleUser._id,
        post: post3._id,
        createdAt: new Date('2025-03-16'),
      },
    ]);

    // Link comments to posts
    post1.comments = [comments[0]._id as mongoose.Types.ObjectId];
    post2.comments = [comments[1]._id as mongoose.Types.ObjectId];
    post3.comments = [comments[2]._id as mongoose.Types.ObjectId, comments[3]._id as mongoose.Types.ObjectId];

    await Promise.all([post1.save(), post2.save(), post3.save()]);

    console.log('✅ Seeded all data successfully');

  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
};
