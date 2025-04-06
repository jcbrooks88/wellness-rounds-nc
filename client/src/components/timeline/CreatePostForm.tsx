import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_POST } from '../../graphql/mutations/mutations';
import { GET_ALL_POSTS } from '../../graphql/queries/auth';
import './Timeline.css';

const CreatePostForm = ({ authorId }: { authorId: string }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost({ variables: { title, content, authorId } });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
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
