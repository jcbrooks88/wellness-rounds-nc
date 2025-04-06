const CommentList = ({ comments }: { comments: any[] }) => {
    return (
      <div className="comment-list">
        {comments.map(comment => (
          <div key={comment._id} className="comment">
            <p><strong>{comment.author.name}</strong>: {comment.content}</p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    );
  };
  
  export default CommentList;
  