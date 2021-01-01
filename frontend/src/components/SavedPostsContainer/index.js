import HomeFeed from "../HomeFeed";
import "./SavedPostsContainer.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedFeed } from "../../store/posts";

function SavedPostsContainer() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchSavedFeed(user.id));
  }, [dispatch, user]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="saved-posts-container">{posts.feed && <HomeFeed />}</div>
  );
}

export default SavedPostsContainer;
