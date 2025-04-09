import { useState, useEffect } from "react";
import Discussions from "../components/discussions/Discussions";
import SearchBar from "../components/discussions/SearchBar";
import SearchResultsList from "../components/discussions/SearchResultsList";
import { graphqlRequest } from "../utils/api";
import { GET_DISCUSSIONS_QUERY } from "../graphql/queries/graphql";
import "../App.css";

export default function DiscussionPage() {
  const [allDiscussions, setAllDiscussions] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showModal, setShowModal] = useState(true);

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
    <div className="discussion-page">
      <h1>All Discussions</h1>

      {/* Show "Search Discussions" button if modal is closed */}
      {!showModal && (
        <div className="search-again-container">
          <button className="safe-space-button" onClick={() => setShowModal(true)}>
            🔍 Search Discussions
          </button>
        </div>
      )}

      <Discussions discussions={allDiscussions} />

      {/* Search Modal */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Search Discussions</h2>
            <SearchBar onResults={handleSearchResults} />
            {hasSearched && <SearchResultsList results={searchResults} />}
            <button className="close-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
