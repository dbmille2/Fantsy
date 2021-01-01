import { fetch } from "./csrf.js";

const LOAD_ALL_PLAYERS = "players/loadAllPlayers";
const LOAD_FOLLOWED_PLAYERS = "players/loadFollowedPlayers";
const LOAD_PLAYER_FOLLOWERS = "players/loadPlayerFollowers";
const LOAD_TRENDING_PLAYERS = "players/loadTrendingPlayers";

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

const loadTrendingPlayers = (players) => ({
  type: LOAD_TRENDING_PLAYERS,
  payload: players,
});

export const fetchAllPlayers = () => async (dispatch) => {
  const res = await fetch("/api/players");
  const allPlayers = res.data;
  dispatch(loadAllPlayers(allPlayers.allPlayers));
};

export const fetchTrendingPlayers = () => async (dispatch) => {
  const res = await fetch("/api/players/trending");
  const players = res.data;
  dispatch(loadTrendingPlayers(players));
};

export const fetchFollowedPlayers = (username) => async (dispatch) => {
  const res = await fetch(`/api/users/${username}/players`);
  const followedPlayers = res.data;
  dispatch(loadFollowedPlayers(followedPlayers.followedPlayers));
};

export const fetchPlayerFollowers = (player) => async (dispatch) => {
  const res = await fetch(`/api/players/${player}/followers`);
  const playerFollowers = await res.data;
  dispatch(loadPlayerFollowers(playerFollowers.playerFollowers));
};

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case LOAD_ALL_PLAYERS:
      const players = action.payload;
      const allPlayers = {};
      players.forEach((player) => {
        allPlayers[player.id] = player;
      });
      newState = Object.assign({}, state, { allPlayers });
      return newState;
    case LOAD_TRENDING_PLAYERS:
      const trendingPlayers = action.payload.players;
      newState = Object.assign({}, state, { trendingPlayers });
      return newState;
    case LOAD_FOLLOWED_PLAYERS:
      const fPlayers = action.payload;
      const followedPlayers = {};
      fPlayers.forEach((player) => {
        followedPlayers[player.id] = player;
      });
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
