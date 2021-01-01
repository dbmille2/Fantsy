import "./PlayerList.css";
import { useSelector } from "react-redux";
import PlayerCard from "../PlayerCard";

function PlayerList({ selection }) {
  const followedPlayers = useSelector((state) => state.session.followedPlayers);
  const allPlayers = useSelector((state) => state.players.allPlayers);
  return (
    <ul className="player-list">
      {selection === "all" &&
        Object.values(allPlayers).map((player) => {
          return <PlayerCard key={player.id} player={player} />;
        })}
      {selection === "team" &&
        Object.values(followedPlayers).map((player) => {
          return <PlayerCard key={player.id} player={player} />;
        })}
    </ul>
  );
}

export default PlayerList;
