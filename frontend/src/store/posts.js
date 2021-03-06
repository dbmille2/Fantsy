import { fetch } from "./csrf.js";

const LOAD_FEED = "posts/loadFeed";
const PURGE_FEED = "posts/purgeFeed";
const CREATE_POST = "posts/createPost";
const STAR_POST = "posts/starPost";
const UNSTAR_POST = "posts/unStarPost";
const SAVE_POST = "posts/savePost";
const UNSAVE_POST = "posts/unSavePost";

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

export const purgeFeed = () => ({
  type: PURGE_FEED,
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

const addSave = (savedPost) => ({
  type: SAVE_POST,
  payload: {
    savedPost,
  },
});

const deleteSave = (postId, userId) => ({
  type: UNSAVE_POST,
  payload: {
    postId,
    userId,
  },
});

export const fetchFeed = (userId) => async (dispatch) => {
  dispatch(purgeFeed());
  const res = await fetch(`/api/posts/${userId}/feed`);
  const feed = res.data.posts;

  dispatch(loadFeed(feed));
};

export const fetchFeedInfinite = (userId, pageNumber) => async (dispatch) => {
  const res = await fetch(`/api/posts/${userId}/feed/${pageNumber}`);
  const feed = res.data.posts;
  dispatch(loadFeed(feed));
};

export const fetchProfileFeed = (userId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${userId}`);
  const feed = res.data.posts;
  dispatch(loadFeed(feed));
};

export const fetchLikesFeed = (userId) => async (dispatch) => {
  dispatch(purgeFeed());
  const res = await fetch(`/api/posts/${userId}/likes`);
  const feed = res.data.posts;
  dispatch(loadFeed(feed));
};

export const fetchMediaFeed = (userId) => async (dispatch) => {
  dispatch(purgeFeed());
  const res = await fetch(`/api/posts/${userId}/media`);
  const feed = res.data.posts;
  dispatch(loadFeed(feed));
};

export const fetchSavedFeed = (userId) => async (dispatch) => {
  dispatch(purgeFeed());
  const res = await fetch(`/api/posts/${userId}/saved`);
  const feed = res.data.posts;
  dispatch(loadFeed(feed));
};

export const fetchPlayersAllFeed = (playerId) => async (dispatch) => {
  dispatch(purgeFeed());
  const res = await fetch(`/api/posts/players/${playerId}/all`);
  const feed = res.data.posts;
  dispatch(loadFeed(feed));
};

export const fetchPlayersFollowingFeed = (playerId, userId) => async (
  dispatch
) => {
  dispatch(purgeFeed());
  const res = await fetch(`/api/posts/players/${playerId}/following/${userId}`);
  const feed = res.data.posts;
  dispatch(loadFeed(feed));
};

export const fetchExploreAllFeed = () => async (dispatch) => {
  dispatch(purgeFeed());
  const res = await fetch(`/api/posts/`);
  const feed = res.data.posts;
  dispatch(loadFeed(feed));
};

export const fetchExplorePlayersFeed = (userId) => async (dispatch) => {
  dispatch(purgeFeed());
  const res = await fetch(`/api/posts/explore/${userId}`);
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

export const savePost = (postId, userId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/save`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  const updatedPost = res.data.updatedPost;
  dispatch(addSave(updatedPost));
};

export const unSavePost = (postId, userId) => async (dispatch) => {
  await fetch(`/api/posts/${postId}/unsave`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  dispatch(deleteSave(postId, userId));
};

export const createPost = (
  userId,
  mentionedUsers,
  mentionedPlayers,
  rawData,
  contentUrl
) => async (dispatch) => {
  mentionedUsers = mentionedUsers.map((user) => {
    return user.id;
  });
  mentionedPlayers = mentionedPlayers.map((player) => {
    return player.id;
  });
  const body = {
    userId,
    mentionedUsers,
    mentionedPlayers,
    rawData,
    contentUrl,
  };
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const newPost = res.data.fullPost;
  dispatch(loadNewPost(newPost));
};

export const createPostWithImage = (
  userId,
  mentionedUsers,
  mentionedPlayers,
  rawData,
  image
) => async (dispatch) => {
  mentionedUsers = mentionedUsers.map((user) => {
    return user.id;
  });
  mentionedPlayers = mentionedPlayers.map((player) => {
    return player.id;
  });
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("mentionedUsers", mentionedUsers);
  formData.append("mentionedPlayers", mentionedPlayers);
  formData.append("rawData", rawData);
  formData.append("image", image);
  const res = await fetch("/api/posts/image", {
    method: "POST",
    body: formData,
  });
  const newPost = res.data.fullPost;
  dispatch(loadNewPost(newPost));
};

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case PURGE_FEED:
      newState = {};
      return newState;
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
      post.stars = {};
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
      newState.feed[starredPost.id].stars = starredPost.stars;
      return newState;
    case UNSTAR_POST:
      const { postId, userId } = action.payload;
      newState = { ...state };
      delete newState.feed[postId].stars[userId];
      return newState;
    case SAVE_POST:
      const { savedPost } = action.payload;
      newState = { ...state };
      newState.feed[savedPost.id].saved = true;
      return newState;
    case UNSAVE_POST:
      const postIdSave = action.payload.postId;
      newState = { ...state };
      newState.feed[postIdSave].saved = false;
      return newState;
    default:
      return state;
  }
}

export default reducer;
