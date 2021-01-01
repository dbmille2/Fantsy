import "./NavHeader.css";
import SortButton from "../SortButton";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BackButton from "../BackButton";

function NavHeader({ title, subTitle }) {
  const allPlayers = useSelector((state) => state.players.allPlayers);
  const { playerId } = useParams();
  if (playerId) {
    title = allPlayers[playerId].name;
    subTitle = `${allPlayers[playerId].position} - ${allPlayers[playerId].teamName}`;
  }
  const feed = useSelector((state) => state.posts.feed);
  return (
    <div className="nav-header-wrapper">
      {feed && (
        <div className="header">
          <div className="left-header">
            {title !== "Home" && <BackButton />}
            <div className="nav-user-info">
              <span className="header-title">{title}</span>
              {title !== "Home" ||
                title !== "Explore" ||
                title !== "My Team" ||
                title !== "All Players" ||
                (playerId && (
                  <span className="header-number-posts">
                    {Object.keys(feed).length} {subTitle}
                  </span>
                ))}
              {playerId && (
                <span className="header-number-posts">{subTitle}</span>
              )}
            </div>
          </div>

          {title === "Home" && <SortButton />}
        </div>
      )}
    </div>
  );
}

export default NavHeader;
