import "./SearchBox.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../store/search";

function SearchBox() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.users);
  const [searchText, setSearchText] = useState("");
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (searchText !== "" && searchText[0] !== "#") {
      dispatch(searchUsers(searchText));
    }
  }, [dispatch, searchText]);

  return (
    <div className="search-wrapper">
      <div className="search-box-container">
        <button className="search-button">
          <i className="fa fa-search" />
          <input
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          ></input>
        </button>
      </div>
      {focused && searchText !== "" && (
        <div className="user-search-results">
          {results && results.length === 0 && <p>"Nothing found"</p>}
          {results &&
            results.map((result) => {
              return <p>{result.username}</p>;
            })}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
