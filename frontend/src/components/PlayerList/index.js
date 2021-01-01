import "./PlayerList.css";
import { useSelector } from "react-redux";
import PlayerCard from "../PlayerCard";

function PlayerList({ selection, subSelection }) {
  const followedPlayers = useSelector((state) => state.session.followedPlayers);
  const allPlayers = useSelector((state) => state.players.allPlayers);
  let allPlayersArr = Object.values(allPlayers);
  let followedPlayersArr = Object.values(followedPlayers);
  allPlayersArr.forEach((player) => {
    switch (player.position) {
      case "QB":
        player.value = 1;
        break;
      case "RB":
        player.value = 2;
        break;
      case "WR":
        player.value = 3;
        break;
      case "TE":
        player.value = 4;
        break;
      case "K":
        player.value = 5;
        break;
      default:
        break;
    }
  });
  followedPlayersArr.forEach((player) => {
    switch (player.position) {
      case "QB":
        player.value = 1;
        break;
      case "RB":
        player.value = 2;
        break;
      case "WR":
        player.value = 3;
        break;
      case "TE":
        player.value = 4;
        break;
      case "K":
        player.value = 5;
        break;
      default:
        break;
    }
  });
  allPlayersArr.sort((a, b) => (a.value > b.value ? 1 : -1));
  followedPlayersArr.sort((a, b) => (a.value > b.value ? 1 : -1));

  return (
    <ul className="player-list">
      {selection === "all" &&
        subSelection === "all" &&
        allPlayersArr.map((player) => {
          return <PlayerCard key={player.id} player={player} />;
        })}
      {selection === "all" &&
        subSelection === "QB" &&
        allPlayersArr
          .filter((player) => player.position === "QB")
          .map((player) => {
            return <PlayerCard key={player.id} player={player} />;
          })}
      {selection === "all" &&
        subSelection === "RB" &&
        allPlayersArr
          .filter((player) => player.position === "RB")
          .map((player) => {
            return <PlayerCard key={player.id} player={player} />;
          })}
      {selection === "all" &&
        subSelection === "WR" &&
        allPlayersArr
          .filter((player) => player.position === "WR")
          .map((player) => {
            return <PlayerCard key={player.id} player={player} />;
          })}
      {selection === "all" &&
        subSelection === "TE" &&
        allPlayersArr
          .filter((player) => player.position === "TE")
          .map((player) => {
            return <PlayerCard key={player.id} player={player} />;
          })}
      {selection === "all" &&
        subSelection === "K" &&
        allPlayersArr
          .filter((player) => player.position === "K")
          .map((player) => {
            return <PlayerCard key={player.id} player={player} />;
          })}
      {selection === "team" &&
        followedPlayersArr.map((player) => {
          return <PlayerCard key={player.id} player={player} />;
        })}
    </ul>
  );
}

export default PlayerList;
