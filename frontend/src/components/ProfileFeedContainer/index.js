import HomeFeed from "../HomeFeed";
import "./ProfileFeedContainer.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileFeed,
  fetchLikesFeed,
  fetchMediaFeed,
} from "../../store/posts";

function ProfileFeedContainer({ tab }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    if (tab === "posts") {
      dispatch(fetchProfileFeed(profile.id));
    } else if (tab === "likes") {
      dispatch(fetchLikesFeed(profile.id));
    } else if (tab === "media") {
      dispatch(fetchMediaFeed(profile.id));
    }
  }, [dispatch, profile, tab]);
  return (
    <div className="profile-feed-container">{posts.feed && <HomeFeed />}</div>
  );
}

export default ProfileFeedContainer;
