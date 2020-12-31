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
    dispatch(fetchFeed(session.user.id));
    dispatch(fetchInfo(session.user.username));
    // ;
  }, [dispatch, session.user]);
  return (
    <div className="home-container">
      {session.following && <NewPost />}
      <div className="home-spacer"></div>
      {posts && <HomeFeed user={session.user} />}
    </div>
  );
}

export default HomeContainer;
