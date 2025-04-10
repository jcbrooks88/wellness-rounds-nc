import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../../graphql/queries/graphql';
import PostCard from './PostCard';
import '../../App.css';

const Timeline = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading timeline...</p>;
  if (error) {
    console.error('GraphQL Error:', error);
    return <p>Error loading posts 😞</p>;
  }

  return (
    <div className="timeline-container">
      {data.getAllPosts.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Timeline;
