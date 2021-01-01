import "./TeamContainer.css";
import TeamNav from "../TeamNav";
import PlayerList from "../PlayerList";
import { useEffect } from "react";

function TeamContainer({ selection, subSelection }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="team-container">
      <TeamNav />
      <div className={selection === "all" ? "team-feed all" : "team-feed"}>
        {<PlayerList selection={selection} subSelection={subSelection} />}
      </div>
    </div>
  );
}

export default TeamContainer;
