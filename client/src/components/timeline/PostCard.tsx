import CommentList from './CommentList';

const PostCard = ({ post }: { post: any }) => {
  const { title, content, author, createdAt, comments } = post;

  return (
    <div className="post-card">
      <div className="post-header">
        <h3>{title}</h3>
        <small>by {author.name} • {new Date(createdAt).toLocaleString()}</small>
      </div>
      <p>{content}</p>
      <CommentList comments={comments} />
    </div>
  );
};

export default PostCard;
