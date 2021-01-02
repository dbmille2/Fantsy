import { fetch } from "./csrf.js";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const LOAD_FOLLOWING = "session/loadFollowing";
const LOAD_INFO = "session/loadInfo";
const ADD_PLAYER_FOLLOW = "profile/addPlayerFollow";
const DELETE_PLAYER_FOLLOW = "profile/deletePlayerFollow";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const loadFollowing = (following) => ({
  type: LOAD_FOLLOWING,
  payload: following,
});

const loadInfo = (info) => ({
  type: LOAD_INFO,
  payload: info,
});

const loadPlayerFollow = (player) => ({
  type: ADD_PLAYER_FOLLOW,
  payload: {
    player,
  },
});

const deletePlayerFollow = (playerId) => ({
  type: DELETE_PLAYER_FOLLOW,
  payload: {
    playerId,
  },
});

export const fetchFollowing = (username) => async (dispatch) => {
  const res = await fetch(`/api/users/${username}/following`);
  const following = res.data;
  dispatch(loadFollowing(following.following));
};

export const fetchInfo = (username) => async (dispatch) => {
  const res = await fetch(`/api/users/${username}`);
  const info = res.data;
  dispatch(loadInfo(info));
};

export const addPlayerFollow = (userId, playerId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/follow/${playerId}`);
  const player = res.data.player;
  dispatch(loadPlayerFollow(player));
};

export const removePlayerFollow = (userId, playerId) => async (dispatch) => {
  await fetch(`/api/users/${userId}/follow/${playerId}`, {
    method: "DELETE",
  });
  dispatch(deletePlayerFollow(playerId));
};

export const login = ({ credential, password }) => async (dispatch) => {
  const res = await fetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential, password }),
  });
  dispatch(setUser(res.data.user));
  return res;
};

export const restoreUser = () => async (dispatch) => {
  const res = await fetch("/api/session");
  dispatch(setUser(res.data.user));
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, displayName, image, password } = user;
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("displayName", displayName);
  if (image) formData.append("image", image);
  const response = await fetch("/api/users", {
    method: "POST",
    body: formData,
  });

  dispatch(setUser(response.data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    case LOAD_INFO:
      const info = action.payload.user;
      const followers = {};
      const followersArr = info.Followers;
      followersArr.forEach((follower) => {
        followers[follower.id] = follower;
      });
      const following = {};
      const followingArr = info.Following;
      followingArr.forEach((follow) => {
        following[follow.id] = follow;
      });
      const followedPlayers = {};
      const playerArr = info.FollowedPlayers;
      playerArr.forEach((player) => {
        followedPlayers[player.id] = player;
      });
      const displayName = info.displayName;
      const privateBool = info.private;
      const preferences = info.UserPreference;
      const savedPosts = {};
      const savedPostsArr = info.SavedPosts;
      savedPostsArr.forEach((post) => {
        savedPosts[post.id] = post.id;
      });
      newState = Object.assign({}, state, {
        followers,
        following,
        followedPlayers,
        savedPosts,
        displayName,
        privateBool,
        preferences,
      });
      return newState;
    case ADD_PLAYER_FOLLOW:
      const player = action.payload.player;
      newState = { ...state };
      newState.followedPlayers[player.id] = player;
      return newState;
    case DELETE_PLAYER_FOLLOW:
      const playerId = action.payload.playerId;
      newState = { ...state };
      delete newState.followedPlayers[playerId];
      return newState;
    default:
      return state;
  }
}

export default reducer;
