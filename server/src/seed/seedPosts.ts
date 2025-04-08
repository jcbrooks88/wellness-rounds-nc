import connectDB from '../config/connection.js';
import { User } from '../models/User.js';
import Post from '../models/Post.js';
import { Comment } from '../models/Comment.js';
import { IPost } from '../models/Post.js';
import mongoose from 'mongoose';

const seedPosts = async () => {
  try {
    await connectDB();
    console.log('⚡ MongoDB already connected');

    // Check if data already exists
    const existingUsers = await User.countDocuments();
    const existingPosts = await Post.countDocuments();
    const existingComments = await Comment.countDocuments();

    if (existingUsers > 0 || existingPosts > 0 || existingComments > 0) {
      console.log('⚠️ Posts already seeded. Skipping seeding process.');
      return;
    }

    const now = new Date();

    // Seed users
    const users = await User.insertMany([
      {
        username: 'jeffery',
        email: 'jeffery@example.com',
        password: 'password123',
        firstName: 'Jeffery',
        lastName: 'Hawkins',
        avatar: 'https://ui-avatars.com/api/?name=Jeffery+Hawkins',
        createdAt: now,
        updatedAt: now,
      },
      {
        username: 'jeff',
        email: 'jeff@example.com',
        password: 'password123',
        firstName: 'Jeff',
        lastName: 'Sanders',
        avatar: 'https://ui-avatars.com/api/?name=Jeff+Sanders',
        createdAt: now,
        updatedAt: now,
      },
      {
        username: 'darlene',
        email: 'darlene@example.com',
        password: 'password123',
        firstName: 'Darlene',
        lastName: 'Wright',
        avatar: 'https://ui-avatars.com/api/?name=Darlene+Wright',
        createdAt: now,
        updatedAt: now,
      },
      {
        username: 'brian',
        email: 'brian@example.com',
        password: 'password123',
        firstName: 'Brian',
        lastName: 'Stone',
        avatar: 'https://ui-avatars.com/api/?name=Brian+Stone',
        createdAt: now,
        updatedAt: now,
      },
      {
        username: 'derek',
        email: 'derek@example.com',
        password: 'password123',
        firstName: 'Derek',
        lastName: 'Foster',
        avatar: 'https://ui-avatars.com/api/?name=Derek+Foster',
        createdAt: now,
        updatedAt: now,
      },
    ]);

    const [jeffery, jeff, darlene, brian, derek] = users;

    // Seed posts
    const posts: IPost[] = await Post.insertMany([
      {
        title: 'Getting Started with MERN',
        content: 'The MERN stack is a powerful way to build full-stack applications.',
        author: jeffery._id,
        comments: [],
        createdAt: now,
      },
      {
        title: 'Why MongoDB is Great',
        content: 'Document databases are super flexible!',
        author: darlene._id,
        comments: [],
        createdAt: now,
      },
      {
        title: 'React Tips & Tricks',
        content: 'Keep components small and use hooks!',
        author: brian._id,
        comments: [],
        createdAt: now,
      },
    ]);

    const [post1, post2, post3] = posts;

    // Seed comments
    const comments = await Comment.insertMany([
      {
        content: 'This is super helpful, thanks!',
        username: 'jeff',
        author: jeff._id,
        post: post1._id,
        createdAt: now,
      },
      {
        content: 'Totally agree with this.',
        username: 'derek',
        author: derek._id,
        post: post1._id,
        createdAt: now,
      },
      {
        content: 'Great explanation!',
        username: 'jeffery',
        author: jeffery._id,
        post: post2._id,
        createdAt: now,
      },
      {
        content: 'Hooks changed everything!',
        username: 'darlene',
        author: darlene._id,
        post: post3._id,
        createdAt: now,
      },
    ]);

    // Link comments to posts
    post1.comments = [
      comments[0]._id as mongoose.Types.ObjectId,
      comments[1]._id as mongoose.Types.ObjectId,
    ];
    post2.comments = [comments[2]._id as mongoose.Types.ObjectId];
    post3.comments = [comments[3]._id as mongoose.Types.ObjectId];

    await post1.save();
    await post2.save();
    await post3.save();

    console.log('✅ Seed data created successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
};

export default seedPosts;
