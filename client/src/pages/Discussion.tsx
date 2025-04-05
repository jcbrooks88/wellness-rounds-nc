import { useState, useEffect } from "react";
// import DiscussionForm from "../components/discussions/DiscussionForm";
import Discussions from "../components/discussions/Discussions";
import SearchBar from "../components/discussions/SearchBar";
import { graphqlRequest } from "../utils/api";
import { gql } from "@apollo/client";

const GET_DISCUSSIONS_QUERY = gql`
  query {
    discussions {
      title
      content
      keywords
      author {
        username
      }
    }
  }
`;

export default function DiscussionPage() {
  const [discussions, setDiscussions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDiscussions() {
      try {
        const data = await graphqlRequest(GET_DISCUSSIONS_QUERY);
        setDiscussions(data.discussions);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    }

    fetchDiscussions();
  }, []);


  return (
    <div>
      <h1>Discussions</h1>
      <SearchBar onResults={(results) => setDiscussions(results)} />
      
      <Discussions discussions={discussions} /> {/* Use the Discussions component here */}
    </div>
  );
}
