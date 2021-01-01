import "./TeamContainer.css";
import TeamNav from "../TeamNav";
import PlayerList from "../PlayerList";
import { useEffect } from "react";

function TeamContainer({ selection }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="team-container">
      <TeamNav />
      <div className="team-feed">{<PlayerList selection={selection} />}</div>
    </div>
  );
}

export default TeamContainer;
