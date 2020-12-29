import { useSelector } from "react-redux";
import Post from "../Post";

function HomeFeed() {
  const feed = useSelector((state) => state.posts.feed);

  return (
    <>
      <div>HomeFeed placeholder</div>
      {Object.values(feed)
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .map((post) => {
          return <Post key={post.id} rawData={post.rawData} />;
        })}
    </>
  );
}

export default HomeFeed;
