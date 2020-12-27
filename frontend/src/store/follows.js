const LOAD_FOLLOWERS = "followers/loadFollowers";
const LOAD_FOLLOWING = "followers/loadFollowing";

const loadFollowers = (followers) => ({
  type: LOAD_FOLLOWERS,
  payload: followers,
});

const loadFollowing = (following) => ({
  type: LOAD_FOLLOWING,
  payload: following,
});

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
    case LOAD_FOLLOWERS:
      const followers = action.payload;
      newState = Object.assign({}, state, { followers });
      return newState;
    case LOAD_FOLLOWING:
      const following = action.payload;
      newState = Object.assign({}, state, { following });
      return newState;
    default:
      return state;
  }
}

export default reducer;
