import "./ExploreFeedContainer.css";
import ExploreFeedNav from "../ExploreFeedNav";
import HomeFeed from "../HomeFeed";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExploreAllFeed,
  fetchExplorePlayersFeed,
} from "../../store/posts";

function ExploreFeedContainer({ selection }) {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.posts.feed);
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (selection === "all") {
      dispatch(fetchExploreAllFeed());
    } else if (selection === "players") {
      dispatch(fetchExplorePlayersFeed(user.id));
    }
  }, [dispatch, selection, user]);
  return (
    <div className="explore-feed-container">
      <ExploreFeedNav />
      <div className="explore-feed">{feed && <HomeFeed />}</div>
    </div>
  );
}

export default ExploreFeedContainer;
