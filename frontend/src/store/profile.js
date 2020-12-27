const LOAD_PROFILE = "profile/loadProfile";
const LOAD_FOLLOWERS = "profile/loadFollowers";
const LOAD_FOLLOWING = "profile/loadFollowing";

const loadProfile = (profile) => ({
  type: LOAD_PROFILE,
  payload: profile,
});

const loadFollowers = (followers) => ({
  type: LOAD_FOLLOWERS,
  payload: followers,
});

const loadFollowing = (following) => ({
  type: LOAD_FOLLOWING,
  payload: following,
});

export const fetchProfile = (username) => async (dispatch) => {
  const res = await fetch(`/api/users/${username}`);
  const profile = await res.json();
  console.log(profile);
  dispatch(loadProfile(profile));
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
      const profile = action.payload.user;
      console.log(profile);
      newState = Object.assign({}, state, {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        followers: profile.Followers,
        following: profile.Following,
        followedPlayers: profile.FollowedPlayers,
      });
      return newState;
    // case LOAD_FOLLOWERS:
    //   const followers = action.payload;
    //   newState = Object.assign({}, state, { followers });
    //   return newState;
    // case LOAD_FOLLOWING:
    //   const following = action.payload;
    //   newState = Object.assign({}, state, { following });
    //   return newState;
    default:
      return state;
  }
}

export default reducer;
