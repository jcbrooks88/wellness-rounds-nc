import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../../graphql/queries/auth';
import PostCard from './PostCard';

const Timeline = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading timeline...</p>;
  if (error) return <p>Error loading posts 😞</p>;

  return (
    <div className="timeline">
      {data.getAllPosts.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Timeline;
