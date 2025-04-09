const CommentList = ({ comments }: { comments: any[] }) => {
    return (
      <div className="comment-list">
        {comments.map(comment => (
          <div key={comment._id} className="comment">
            <p><strong>{comment.firstName}</strong>: {comment.content}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default CommentList;

