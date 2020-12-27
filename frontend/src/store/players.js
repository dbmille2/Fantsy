const LOAD_ALL_PLAYERS = "players/loadAllPlayers";
const LOAD_FOLLOWED_PLAYERS = "players/loadFollowedPlayers";
const LOAD_PLAYER_FOLLOWERS = "players/loadPlayerFollowers";

const loadAllPlayers = (players) => ({
  type: LOAD_ALL_PLAYERS,
  payload: players,
});

const loadFollowedPlayers = (players) => ({
  type: LOAD_FOLLOWED_PLAYERS,
  payload: players,
});

const loadPlayerFollowers = (followers) => ({
  type: LOAD_PLAYER_FOLLOWERS,
  payload: followers,
});

export const fetchAllPlayers = () => async (dispatch) => {
  const res = await fetch("/api/players");
  const allPlayers = await res.json();
  dispatch(loadAllPlayers(allPlayers.allPlayers));
};

export const fetchFollowedPlayers = (username) => async (dispatch) => {
  const res = await fetch(`/api/users/${username}/players`);
  const followedPlayers = await res.json();
  dispatch(loadFollowedPlayers(followedPlayers.followedPlayers));
};

export const fetchPlayerFollowers = (player) => async (dispatch) => {
  const res = await fetch(`/api/players/${player}/followers`);
  const playerFollowers = await res.json();
  dispatch(loadPlayerFollowers(playerFollowers.playerFollowers));
};

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case LOAD_ALL_PLAYERS:
      const allPlayers = action.payload;
      newState = Object.assign({}, state, { allPlayers });
      return newState;
    case LOAD_FOLLOWED_PLAYERS:
      const followedPlayers = action.payload;
      newState = Object.assign({}, state, { followedPlayers });
      return newState;
    case LOAD_PLAYER_FOLLOWERS:
      const playerFollowers = action.payload;
      newState = Object.assign({}, state, { playerFollowers });
      return newState;
    default:
      return state;
  }
}

export default reducer;
