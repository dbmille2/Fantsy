import NewPost from "../NewPost";
import HomeFeed from "../HomeFeed";
import "./HomeContainer.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfo } from "../../store/session";
import { fetchFeed } from "../../store/posts";

function HomeContainer() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchInfo(session.user.username));
    dispatch(fetchFeed(session.user.id));
  }, [dispatch, session.user]);
  return (
    <div className="home-container">
      {session.following && <NewPost />}
      <div className="home-spacer"></div>
      {posts.feed && <HomeFeed />}
    </div>
  );
}

export default HomeContainer;
