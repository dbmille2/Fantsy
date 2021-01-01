import "./PlayerFeedContainer.css";
import PlayerFeedNav from "../PlayerFeedNav";
import HomeFeed from "../HomeFeed";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchPlayersAllFeed,
  fetchPlayersFollowingFeed,
} from "../../store/posts";

function PlayerFeedContainer({ selection }) {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.posts.feed);
  const user = useSelector((state) => state.session.user);
  const { playerId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (selection === "all") {
      dispatch(fetchPlayersAllFeed(playerId));
    } else if (selection === "following") {
      dispatch(fetchPlayersFollowingFeed(playerId, user.id));
    }
  }, [dispatch, playerId, selection, user]);
  return (
    <div className="player-feed-container">
      <PlayerFeedNav />
      <div className="player-feed">{feed && <HomeFeed />}</div>
    </div>
  );
}

export default PlayerFeedContainer;
