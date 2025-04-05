import { useState, useEffect } from "react";
import Discussions from "../components/discussions/Discussions";
import SearchBar from "../components/discussions/SearchBar";
import SearchResults from "../components/discussions/SearchResults";
import { graphqlRequest } from "../utils/api";
import { gql } from "@apollo/client";

const GET_DISCUSSIONS_QUERY = gql`
  query {
    discussions {
      _id
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
  const [hasSearched, setHasSearched] = useState(false);

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

  const handleSearchResults = (results: any[]) => {
    setDiscussions(results);
    setHasSearched(true); // toggle visibility of DiscussionResults
  };

  return (
    <div>
      <h1>Discussions</h1>
      <SearchBar onResults={handleSearchResults} />

      {hasSearched && <SearchResults />} {/* Show after search */}

      <Discussions discussions={discussions} />
    </div>
  );
}
