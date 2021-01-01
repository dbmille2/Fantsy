import "./PlayerList.css";
import { useSelector } from "react-redux";
import PlayerCard from "../PlayerCard";

function PlayerList({ selection, subSelection }) {
  const followedPlayers = useSelector((state) => state.session.followedPlayers);
  const allPlayers = useSelector((state) => state.players.allPlayers);
  return (
    <ul className="player-list">
      {selection === "all" &&
        subSelection === "all" &&
        Object.values(allPlayers).map((player) => {
          return <PlayerCard key={player.id} player={player} />;
        })}
      {selection === "all" &&
        subSelection === "QB" &&
        Object.values(allPlayers)
          .filter((player) => player.position === "QB")
          .map((player) => {
            return <PlayerCard key={player.id} player={player} />;
          })}
      {selection === "all" &&
        subSelection === "RB" &&
        Object.values(allPlayers)
          .filter((player) => player.position === "RB")
          .map((player) => {
            return <PlayerCard key={player.id} player={player} />;
          })}
      {selection === "all" &&
        subSelection === "WR" &&
        Object.values(allPlayers)
          .filter((player) => player.position === "WR")
          .map((player) => {
            return <PlayerCard key={player.id} player={player} />;
          })}
      {selection === "all" &&
        subSelection === "TE" &&
        Object.values(allPlayers)
          .filter((player) => player.position === "TE")
          .map((player) => {
            return <PlayerCard key={player.id} player={player} />;
          })}
      {selection === "all" &&
        subSelection === "K" &&
        Object.values(allPlayers)
          .filter((player) => player.position === "K")
          .map((player) => {
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
