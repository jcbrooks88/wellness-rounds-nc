import express from "express";
import path from "path";
import { fileURLToPath } from "url";
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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON middleware
app.use(express.json());

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
      context: ({ req }) => {
        return { user: authMiddleware({ req }).user };
      },
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    // Serve static frontend in production
    if (process.env.NODE_ENV === "production") {
      const clientPath = path.resolve(__dirname, "../client/dist");
      app.use(express.static(clientPath));

      app.get("*", (_req, res) => {
        res.sendFile(path.join(clientPath, "index.html"));
      });
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error("❌ Server startup error:", error);
  }
}

startServer();
