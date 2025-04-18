import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_POST_MUTATION } from '../../graphql/mutations/mutations';
import { GET_ALL_POSTS } from '../../graphql/queries/graphql';
import { useAuth } from '../../context/AuthContext';
import '../../App.css';

const CreatePostForm = () => {
  const { user } = useAuth();
  const [content, setContent] = useState('');

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🧠 Current user from AuthContext:", user);

    if (!user || !user._id) {
      console.error("User not authenticated or missing ID.");
      return;
    }

    try {
      await createPost({
        variables: {
          content,
          username: user.username,
        },
      });
      setContent('');
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        placeholder="What's on your mind?"
        value={content}
        required
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Posting...' : 'Post'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default CreatePostForm;
