import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFeedInfinite } from "../../store/posts";
import { fetch } from "../../store/csrf";

function useLoadPosts(userId, pageNumber) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(fetchFeedInfinite(userId, pageNumber));
  }, [dispatch, userId, pageNumber]);
  return null;
}

export default useLoadPosts;
