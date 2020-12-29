import { fetch } from "./csrf.js";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const LOAD_FOLLOWING = "session/loadFollowing";
const LOAD_INFO = "session/loadInfo";

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

export const login = ({ credential, password }) => async (dispatch) => {
  const res = await fetch("/api/session", {
    method: "POST",
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
  const { username, email, displayName, password } = user;
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      displayName,
      password,
    }),
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

      newState = Object.assign({}, state, {
        followers,
        following,
        followedPlayers,
        displayName,
        privateBool,
        preferences,
      });
      return newState;
    default:
      return state;
  }
}

export default reducer;
