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
  await fetch(`/api/users/${username}/follow`, {
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
  await fetch(`/api/users/${username}/unfollow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  dispatch(fetchProfile(username, followerUserId));
};

export const updateProfilePic = (
  newBio,
  newDisplayName,
  newProfilePic,
  id
) => async (dispatch) => {
  const formData = new FormData();
  formData.append("newBio", newBio);
  formData.append("newDisplayName", newDisplayName);
  formData.append("image", newProfilePic);
  const res = await fetch(`/api/users/${id}/update/pic`, {
    method: "PUT",
    body: formData,
  });
  const profile = res.data;
  dispatch(loadProfile(profile, id));
};

export const updateProfileBanner = (
  newBio,
  newDisplayName,
  newBannerPic,
  id
) => async (dispatch) => {
  const formData = new FormData();
  formData.append("newBio", newBio);
  formData.append("newDisplayName", newDisplayName);
  formData.append("image", newBannerPic);
  const res = await fetch(`/api/users/${id}/update/banner`, {
    method: "PUT",
    body: formData,
  });
  const profile = res.data;
  dispatch(loadProfile(profile, id));
};

export const updateBothPics = (
  newBio,
  newDisplayName,
  newProfilePic,
  newBannerPic,
  id
) => async (dispatch) => {
  const formData = new FormData();
  formData.append("newBio", newBio);
  formData.append("newDisplayName", newDisplayName);
  formData.append("images", newProfilePic);
  formData.append("images", newBannerPic);
  const res = await fetch(`/api/users/${id}/update/both`, {
    method: "PUT",
    body: formData,
  });
  const profile = res.data;
  dispatch(loadProfile(profile, id));
};

export const updateTextOnly = (newBio, newDisplayName, id) => async (
  dispatch
) => {
  const body = { newBio, newDisplayName };
  const res = await fetch(`/api/users/${id}/update/text`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const profile = res.data;
  dispatch(loadProfile(profile, id));
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
        profilePic: profile.UserPreference.profilePicUrl,
        banner: profile.UserPreference.bannerUrl,
        bio: profile.UserPreference.bioRawData,
        createdAt: profile.createdAt,
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
