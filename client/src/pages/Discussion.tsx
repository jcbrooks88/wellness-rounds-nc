import { useState, useEffect } from "react";
import Discussions from "../components/discussions/Discussions";
import SearchBar from "../components/discussions/SearchBar";
import SearchResultsList from "../components/discussions/SearchResultsList"; // <-- use this!
import { graphqlRequest } from "../utils/api";
import { GET_DISCUSSIONS_QUERY } from "../graphql/queries/graphql";

export default function DiscussionPage() {
  const [allDiscussions, setAllDiscussions] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    async function fetchDiscussions() {
      try {
        const data = await graphqlRequest(GET_DISCUSSIONS_QUERY);
        setAllDiscussions(data.discussions);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    }

    fetchDiscussions();
  }, []);

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div>
      <h1>Search Discussions</h1>
      <SearchBar onResults={handleSearchResults} />

      {hasSearched && <SearchResultsList results={searchResults} />}

      <h2>All Discussions</h2>
      <Discussions discussions={allDiscussions} />
    </div>
  );
}
