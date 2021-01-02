import "./NavHeader.css";
import SortButton from "../SortButton";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../BackButton";
import * as playerActions from "../../store/players";

function NavHeader({ title, subTitle }) {
  const allPlayers = useSelector((state) => state.players.allPlayers);
  const { playerId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(playerActions.fetchAllPlayers());
    // ;
  }, [dispatch]);

  const feed = useSelector((state) => state.posts.feed);
  return (
    <div className="nav-header-wrapper">
      {feed && (
        <div className="header">
          <div className="left-header">
            {title !== "Home" && <BackButton />}
            <div className="nav-user-info">
              <span className="header-title">
                {!playerId ? title : allPlayers[playerId].name}
              </span>
              {title !== "Home" &&
                title !== "Explore" &&
                title !== "My Team" &&
                title !== "All Players" &&
                !playerId && (
                  <span className="header-number-posts">
                    {Object.keys(feed).length}{" "}
                    {!playerId
                      ? subTitle
                      : `${allPlayers[playerId].position} - ${allPlayers[playerId].teamName}`}
                  </span>
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
