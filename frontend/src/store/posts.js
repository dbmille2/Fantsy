import { fetch } from "./csrf.js";

const LOAD_FEED = "posts/loadFeed";
const CREATE_POST = "posts/createPost";

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
  switch (action.type) {
    case LOAD_FEED:
      const feed = {};
      let feedArr = action.payload.feed;
      feedArr.forEach((post) => {
        feed[post.id] = post;
      });
      return { ...state, feed };
    case CREATE_POST:
      const { post } = action.payload;
      let newState = { ...state };
      newState.feed = { ...newState.feed, [post.id]: post };
      return newState;
    default:
      return state;
  }
}

export default reducer;
