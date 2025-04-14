import express from "express";
import path from "path";
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
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Get __dirname for ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

// Combine typeDefs and resolvers
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
      context: ({ req }) => {
        return { user: authMiddleware({ req }).user };
      },
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    // Conditional Logic - Serve frontend only in production
    if (process.env.NODE_ENV === "production") {
      const distPath = path.resolve(__dirname, "../client/dist");
      app.use(express.static(distPath));

      // Fallback for React Router routes
      app.get("*", (_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });

      console.log("🌐 Serving static files from /client/dist");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error("❌ Server startup error:", error);
  }
}

startServer();
