import { fetch } from "./csrf.js";

const LOAD_PROFILE = "profile/loadProfile";

const loadProfile = (profile, currentUser) => ({
  type: LOAD_PROFILE,
  payload: {
    profile,
    currentUser,
  },
});

export const addFollower = (username, followerUserId, targetUserId) => async (
  dispatch
) => {
  const body = { followerUserId, targetUserId };
  const res = await fetch(`/api/users/${username}/follow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  dispatch(fetchProfile(username, followerUserId));
};

export const removeFollower = (
  username,
  followerUserId,
  targetUserId
) => async (dispatch) => {
  const body = { followerUserId, targetUserId };
  const res = await fetch(`/api/users/${username}/unfollow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  dispatch(fetchProfile(username, followerUserId));
};

export const fetchProfile = (username, currentUser) => async (dispatch) => {
  const res = await fetch(`/api/users/${username}`);
  const profile = res.data;
  // const profile = await res.json();
  dispatch(loadProfile(profile, currentUser));
};

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case LOAD_PROFILE:
      const profile = action.payload.profile.user;
      const currentUser = action.payload.currentUser;
      const followers = {};
      const following = {};
      const followedPlayers = {};
      if (profile.Followers) {
        profile.Followers.forEach((follower) => {
          followers[follower.id] = follower;
        });
      }
      if (profile.Following) {
        profile.Following.forEach((follow) => {
          following[follow.id] = follow;
        });
      }
      if (profile.FollowedPlayers) {
        profile.FollowedPlayers.forEach((player) => {
          followedPlayers[player.id] = player;
        });
      }
      const isFollowing = currentUser in followers;
      const isSelf = currentUser === profile.id;
      newState = Object.assign({}, state, {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        profilePic: profile.ProfilePictures,
        followers,
        following,
        followedPlayers,
        isFollowing,
        isSelf,
      });
      return newState;
    default:
      return state;
  }
}

export default reducer;
