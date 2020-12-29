import HomeFeed from "../HomeFeed";
import "./ProfileFeedContainer.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileFeed } from "../../store/posts";

function ProfileFeedContainer() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchProfileFeed(profile.id));
  }, [dispatch, profile]);
  return (
    <div className="profile-feed-container">{posts.feed && <HomeFeed />}</div>
  );
}

export default ProfileFeedContainer;
