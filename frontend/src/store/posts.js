import { fetch } from "./csrf.js";

const LOAD_FEED = "posts/loadFeed";
const CREATE_POST = "posts/createPost";
const STAR_POST = "posts/starPost";
const UNSTAR_POST = "posts/unStarPost";

const loadNewPost = (post) => ({
  type: CREATE_POST,
  payload: {
    post,
  },
});

const loadFeed = (feed) => ({
  type: LOAD_FEED,
  payload: {
    feed,
  },
});

const addStar = (starredPost) => ({
  type: STAR_POST,
  payload: {
    starredPost,
  },
});

const deleteStar = (postId, userId) => ({
  type: UNSTAR_POST,
  payload: {
    postId,
    userId,
  },
});

export const fetchFeed = (userId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${userId}/feed`);
  const feed = res.data.posts;
  dispatch(loadFeed(feed));
};

export const fetchProfileFeed = (userId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${userId}`);
  const feed = res.data.posts;
  dispatch(loadFeed(feed));
};

export const fetchLikesFeed = (userId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${userId}/likes`);
  const feed = res.data.posts;
  dispatch(loadFeed(feed));
};

export const starPost = (postId, userId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/star`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  const updatedPost = res.data.updatedPost;
  dispatch(addStar(updatedPost));
};

export const unStarPost = (postId, userId) => async (dispatch) => {
  await fetch(`/api/posts/${postId}/unstar`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  dispatch(deleteStar(postId, userId));
};

export const createPost = (userId, rawData) => async (dispatch) => {
  const body = { userId, rawData };
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const newPost = res.data.fullPost;
  dispatch(loadNewPost(newPost));
};

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case LOAD_FEED:
      const feed = {};
      let feedArr = action.payload.feed;
      feedArr.forEach((post) => {
        feed[post.id] = post;
        let stars = {};
        post.Stars.forEach((star) => {
          stars[star.id] = star;
        });
        post.stars = stars;
        delete post.Stars;
      });
      return { ...state, feed };
    case CREATE_POST:
      const { post } = action.payload;
      newState = { ...state };
      let stars = {};
      post.Stars.forEach((star) => {
        stars[star.id] = star;
      });
      post.stars = stars;
      delete post.Stars;
      newState.feed = { ...newState.feed, [post.id]: post };
      return newState;
    case STAR_POST:
      const { starredPost } = action.payload;
      let newStars = {};
      starredPost.Stars.forEach((star) => {
        newStars[star.id] = star;
      });
      starredPost.stars = newStars;
      delete starredPost.Stars;
      newState = { ...state };
      newState.feed[starredPost.id] = starredPost;
      return newState;
    case UNSTAR_POST:
      const { postId, userId } = action.payload;
      newState = { ...state };
      delete newState.feed[postId].stars[userId];
      return newState;
    default:
      return state;
  }
}

export default reducer;
