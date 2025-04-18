// PostCard.tsx
import { useState } from 'react';
import CommentList from './CommentList';

const PostCard = ({ post }: { post: any }) => {
  const { title, content, author, comments, likes = 0 } = post;
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
    // Optional: Add mutation to persist like count
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h3>{title}</h3>
        <small>
          by {author.firstName} {author.lastName}
        </small>
      </div>
      <p>{content}</p>

      <button onClick={handleLike} className="like-button">
        ❤️ {likeCount}
      </button>

      <CommentList comments={comments} />
    </div>
  );
};

export default PostCard;
