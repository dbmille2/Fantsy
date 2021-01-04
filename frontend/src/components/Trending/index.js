import "./Trending.css";
import { useSelector } from "react-redux";
import TrendingPlayerCard from "../TrendingPlayerCard";

function Trending() {
  const trendingPlayers = useSelector((state) => state.players.trendingPlayers);
  return (
    <div className="trending-panel">
      <div className="trending-header">Trending Players</div>
      <ul className="trending-players-list">
        {trendingPlayers &&
          trendingPlayers.map((player) => {
            return <TrendingPlayerCard key={player.id} player={player} />;
          })}
      </ul>
      <div className="trending-footer"></div>
    </div>
  );
}

export default Trending;
