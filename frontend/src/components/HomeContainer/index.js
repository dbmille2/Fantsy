import NewPost from "../NewPost";
import HomeFeed from "../HomeFeed";
import "./HomeContainer.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfo} from "../../store/session";

function HomeContainer() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  useEffect(() => {
    dispatch(fetchInfo(session.user.username));
  }, [dispatch, session.user]);
  return (
    <div className="home-container">
      {session.following && <NewPost />}
      <div className="home-spacer"></div>
      <HomeFeed />
    </div>
  );
}

export default HomeContainer;
