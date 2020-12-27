const LOAD_PROFILE = "profile/loadProfile";
const LOAD_FOLLOWERS = "profile/loadFollowers";
const LOAD_FOLLOWING = "profile/loadFollowing";

const loadProfile = (profile, currentUser) => ({
  type: LOAD_PROFILE,
  payload: {
    profile,
    currentUser,
  },
});

const loadFollowers = (followers) => ({
  type: LOAD_FOLLOWERS,
  payload: followers,
});

const loadFollowing = (following) => ({
  type: LOAD_FOLLOWING,
  payload: following,
});

export const fetchProfile = (username, currentUser) => async (dispatch) => {
  const res = await fetch(`/api/users/${username}`);
  const profile = await res.json();
  dispatch(loadProfile(profile, currentUser));
};

export const fetchFollowers = (username) => async (dispatch) => {
  const res = await fetch(`/api/users/${username}/followers`);
  const followers = await res.json();
  dispatch(loadFollowers(followers.followers));
};

export const fetchFollowing = (username) => async (dispatch) => {
  const res = await fetch(`/api/users/${username}/following`);
  const following = await res.json();
  dispatch(loadFollowing(following.following));
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
