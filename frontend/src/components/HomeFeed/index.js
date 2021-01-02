import { useSelector } from "react-redux";
import Post from "../Post";
import "./HomeFeed.css";

function HomeFeed({ user }) {
  const feed = useSelector((state) => state.posts.feed);
  return (
    <div className="home-feed">
      {feed &&
        Object.values(feed)
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          .map((post) => {
            return <Post key={post.id} post={post} />;
          })}
    </div>
  );
}

export default HomeFeed;
