import { useState } from 'react';
import CommentList from './CommentList';

const PostCard = ({ post }: { post: any }) => {
  const { title, content, author, createdAt, comments, likes = 0 } = post;
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
    // Optionally: Trigger a mutation here to persist like
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h3>{title}</h3>
        <small>by {author.firstName} {author.lastName} • {new Date(createdAt).toLocaleString()}</small>
      </div>
      <p>{content}</p>

      <button onClick={handleLike} className="like-button">❤️ {likeCount}</button>

      <CommentList comments={comments} />
    </div>
  );
};

export default PostCard;
