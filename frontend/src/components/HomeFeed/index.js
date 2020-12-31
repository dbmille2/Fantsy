import { useSelector } from "react-redux";
import { useState } from "react";
import useLoadPosts from "../hooks/useLoadPosts";
import Post from "../Post";
import "./HomeFeed.css";

function HomeFeed({ user }) {
  // const [pageNumber, setPageNumber] = useState(1);
  const feed = useSelector((state) => state.posts.feed);
  // useLoadPosts(user.id, pageNumber);
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
