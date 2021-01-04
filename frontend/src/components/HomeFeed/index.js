import { useSelector } from "react-redux";
import { useEffect } from "react";
import Post from "../Post";
import "./HomeFeed.css";

function HomeFeed({ user }) {
  const feed = useSelector((state) => state.posts.feed);
  const savedPosts = useSelector((state) => state.session.savedPosts);
  useEffect(() => {}, [savedPosts]);
  return (
    <div className="home-feed">
      {feed &&
        savedPosts &&
        Object.values(feed)
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          .map((post) => {
            return <Post key={post.id} post={post} />;
          })}
    </div>
  );
}

export default HomeFeed;
