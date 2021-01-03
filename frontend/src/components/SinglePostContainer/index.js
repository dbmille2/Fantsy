import "./SinglePostContainer.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Post from "../Post";

function SinglePostContainer() {
  const { postId } = useParams();
  const feed = useSelector((state) => state.posts.feed);
  return (
    <div className="single-post-container">
      <div className="single-post">
        {feed && <Post post={feed[postId]}></Post>}
        <div className="single-spacer"></div>
      </div>
    </div>
  );
}

export default SinglePostContainer;
