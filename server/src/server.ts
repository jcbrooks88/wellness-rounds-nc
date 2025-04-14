import express from "express";
import { ApolloServer } from "apollo-server-express";
import { seedDatabase } from "./seed/seedDatabase.js";
import connectDB from "./config/connection.js";
import userTypeDefs from "./schemas/userSchema.js";
import userResolvers from "./resolvers/userResolvers.js";
import discussionTypeDefs from "./schemas/discussionSchema.js";
import discussionResolvers from "./resolvers/discussionResolvers.js";
import { commentTypeDefs } from "./schemas/commentSchema.js";
import commentResolvers from "./resolvers/commentResolvers.js";
import { postTypeDefs } from "./schemas/postSchema.js";
import postResolvers from "./resolvers/postResolvers.js";
import rootTypeDefs from "./schemas/rootSchema.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import dotenv from "dotenv";
import merge from "lodash.merge";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// JSON middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Apollo setup
const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  discussionTypeDefs,
  postTypeDefs,
  commentTypeDefs,
];

const resolvers = merge(
  userResolvers,
  discussionResolvers,
  postResolvers,
  commentResolvers
);

async function startServer() {
  try {
    await connectDB();
    console.log("✅ MongoDB Ready");

    await seedDatabase();
    console.log("🌱 Database seeding completed");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      persistedQueries: false,
      context: ({ req }) => {
        return { user: authMiddleware({ req }).user };
      },
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

 // Optional message in production
 if (process.env.NODE_ENV === "production") {
  console.log("🌐 Production mode - frontend is hosted separately.");
  await mongoose.connection.dropDatabase();
}

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
});
} catch (error) {
console.error("❌ Server startup error:", error);
}
}

startServer();
