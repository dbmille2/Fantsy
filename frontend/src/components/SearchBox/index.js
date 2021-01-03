import "./SearchBox.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUsers } from "../../store/search";

function SearchBox() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const allPlayers = useSelector((state) => state.players.allPlayers);

  const [searchText, setSearchText] = useState("");
  const [focused, setFocused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [playerSearchResults, setPlayerSearchResults] = useState([]);

  useEffect(() => {
    const openMenu = () => {
      setShowMenu(true);
    };
    openMenu();
  }, [searchText]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setSearchText("");
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    if (searchText !== "" && searchText[0] !== "#") {
      dispatch(searchUsers(searchText));
    } else if (searchText !== "" && searchText[0] === "#") {
      const allPlayersArr = [...Object.values(allPlayers)];
      setPlayerSearchResults(
        allPlayersArr.filter((player) => {
          return player.tagName
            .toLowerCase()
            .includes(searchText.toLowerCase().slice(1));
        })
      );
    }
  }, [dispatch, searchText, allPlayers]);

  return (
    <div className="search-wrapper">
      <div className="search-box-container">
        <button className={focused ? "search-button focused" : "search-button"}>
          <i className="fa fa-search" />
          <input
            className="search-input"
            onBlur={() => setFocused(false)}
            onFocus={() => setFocused(true)}
            type="text"
            placeholder="Search Fantsy"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          ></input>
        </button>
      </div>
      {showMenu && searchText !== "" && searchText[0] !== "#" && (
        <div className="user-search-results">
          <ul className="user-search-results-list">
            {search.users && search.users.length === 0 && (
              <li className="user-search-result">"Nothing found"</li>
            )}
            {search.users &&
              search.users.length !== 0 &&
              search.users.map((user) => {
                return (
                  <Link
                    // onClick={() => setFocused(true)}
                    to={`/${user.username}`}
                  >
                    <li key={user.id} className="user-search-result">
                      {user.UserPreference && (
                        <img
                          className="user-search-result-img"
                          src={user.UserPreference.profilePicUrl}
                          alt="search-pic"
                        ></img>
                      )}
                      <div className="user-search-result-text">
                        <div className="user-search-result-text-name">
                          {user.displayName}
                        </div>
                        <div className="user-search-result-text-username">
                          @{user.username}
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
          </ul>
        </div>
      )}
      {showMenu && searchText !== "" && searchText[0] === "#" && (
        <div className="user-search-results">
          <ul className="user-search-results-list">
            {playerSearchResults && playerSearchResults.length === 0 && (
              <li className="user-search-result">Nothing found</li>
            )}
            {playerSearchResults &&
              playerSearchResults.length !== 0 &&
              playerSearchResults.map((player) => {
                return (
                  <Link
                    // onClick={() => setFocused(true)}
                    to={`/players/${player.id}/all`}
                  >
                    <li key={player.id} className="user-search-result">
                      <img
                        className="user-search-result-img"
                        src={player.imgUrl}
                        alt="search-pic"
                      ></img>

                      <div className="user-search-result-text">
                        <div className="user-search-result-text-name">
                          {player.name}
                        </div>
                        <div className="user-search-result-text-username">
                          {player.position}
                          {" - "}
                          {player.teamName}
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
