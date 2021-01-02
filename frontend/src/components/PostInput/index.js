import { EditorState, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import { useState, useRef } from "react";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import ReactGiphySearchbox from "react-giphy-searchbox";
import "./PostInput.css";
import "draft-js/dist/Draft.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost } from "../../store/posts";

const UserEntry = (props) => {
  const { mention, theme, searchValue, isFocused, ...parentProps } = props;

  return (
    <div {...parentProps}>
      <div className={theme.mentionSuggestionsEntryContainer}>
        <div className={theme.mentionSuggestionsEntry}>
          <div className={theme.mentionSuggestionsEntryContainerLeft}>
            <img
              src={mention.UserPreference.profilePicUrl}
              className={theme.mentionSuggestionsEntryProfilePic}
              alt="pic"
            />
          </div>

          <div className={theme.mentionSuggestionsEntryContainerRight}>
            <div className={theme.mentionSuggestionsEntryDisplayName}>
              {mention.displayName}
            </div>

            <div className={theme.mentionSuggestionsEntryUsername}>
              @{mention.username}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerEntry = (props) => {
  const { mention, theme, searchValue, isFocused, ...parentProps } = props;

  return (
    <div {...parentProps}>
      <div className={theme.mentionSuggestionsEntryContainer}>
        <div className={theme.mentionSuggestionsEntry}>
          <div className={theme.mentionSuggestionsEntryContainerLeft}>
            <img
              src={mention.imgUrl}
              className={theme.mentionSuggestionsEntryProfilePic}
              alt="pic"
            />
          </div>

          <div className={theme.mentionSuggestionsEntryContainerRight}>
            <div className={theme.mentionSuggestionsEntryDisplayName}>
              {mention.name}
            </div>

            <div className={theme.mentionSuggestionsEntryUsername}>
              {mention.position}
              {" - "}
              {mention.teamName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function PostInput() {
  const following = useSelector((state) => state.session.following);
  const user = useSelector((state) => state.session.user);
  const players = useSelector((state) => state.players.allPlayers);
  const playersArr = Object.values(players);
  const dispatch = useDispatch();
  const history = useHistory();
  const followingArr = [...Object.values(following)];
  followingArr.forEach((follow) => {
    follow.name = follow.username;
    follow.link = `/${follow.username}`;
  });

  const ref = useRef();
  const [userMentionPlugin] = useState(
    createMentionPlugin({
      followingArr,
      mentionComponent: (mentionProps) => (
        <span
          className={mentionProps.className}
          onClick={() => history.push(`${mentionProps.mention.username}`)}
        >
          {mentionProps.children}
        </span>
      ),
      entityMutability: "IMMUTABLE",
      theme: {
        mention: "mention",
        mentionSuggestions: "mentionSuggestions",
        mentionSuggestionsEntry: "mentionSuggestionsEntry",
        mentionSuggestionsEntryFocused: "mentionSuggestionsEntryFocused",
        mentionSuggestionsEntryDisplayName:
          "mentionSuggestionsEntryDisplayName",
        mentionSuggestionsEntryUsername: "mentionSuggestionsEntryUsername",
        mentionSuggestionsEntryProfilePic: "mentionSuggestionsEntryProfilePic",
      },
      mentionPrefix: "@",
      supportWhitespace: true,
    })
  );

  const [playerMentionPlugin] = useState(
    createMentionPlugin({
      playersArr,
      mentionComponent: (mentionProps) => (
        <span
          className={mentionProps.className}
          onClick={() =>
            history.push(`/players/${mentionProps.mention.id}/following`)
          }
        >
          {mentionProps.children}
        </span>
      ),
      entityMutability: "IMMUTABLE",
      theme: {
        mention: "mention",
        mentionSuggestions: "mentionSuggestions",
        mentionSuggestionsEntry: "mentionSuggestionsEntry",
        mentionSuggestionsEntryFocused: "mentionSuggestionsEntryFocused",
        mentionSuggestionsEntryDisplayName:
          "mentionSuggestionsEntryDisplayName",
        mentionSuggestionsEntryUsername: "mentionSuggestionsEntryUsername",
        mentionSuggestionsEntryProfilePic: "mentionSuggestionsEntryProfilePic",
      },
      mentionTrigger: "#",
      mentionPrefix: "#",
      supportWhitespace: true,
    })
  );
  const [image, setImage] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [gifUrl, setGifUrl] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [suggestions, setSuggestions] = useState(followingArr);
  const [playerSuggestions, setPlayerSuggestions] = useState(playersArr);
  const { MentionSuggestions } = userMentionPlugin;
  const PlayerMentionSuggestions = playerMentionPlugin.MentionSuggestions;
  const plugins = [userMentionPlugin, playerMentionPlugin];

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
    console.log(file);
    setImgSrc(URL.createObjectURL(file));
  };

  const createPostHandler = () => {
    const contentState = editorState.getCurrentContent();
    const rawData = convertToRaw(contentState);
    const userId = user.id;
    setEditorState(EditorState.createEmpty());
    let mentionedUsers = [];
    let mentionedPlayers = [];
    for (let key in rawData.entityMap) {
      const ent = rawData.entityMap[key];
      switch (ent.type) {
        case "mention":
          mentionedUsers.push(ent.data.mention);
          break;
        case "#mention":
          mentionedPlayers.push(ent.data.mention);
          break;
        default:
          break;
      }
    }
    console.log(mentionedUsers, mentionedPlayers);
    dispatch(
      createPost(
        userId,
        mentionedUsers,
        mentionedPlayers,
        JSON.stringify(rawData)
      )
    );
  };

  const focus = () => {
    ref.current.focus();
  };

  return (
    <div>
      <div className="editor" onFocus={focus}>
        <Editor
          editorState={editorState}
          placeholder="What's Happening?"
          onChange={(editorState) => setEditorState(editorState)}
          plugins={plugins}
          ref={(e) => (ref.current = e)}
        />
        <MentionSuggestions
          onSearchChange={({ value }) =>
            setSuggestions(defaultSuggestionsFilter(value, followingArr))
          }
          suggestions={suggestions}
          entryComponent={UserEntry}
        />
        <PlayerMentionSuggestions
          onSearchChange={({ value }) =>
            setPlayerSuggestions(defaultSuggestionsFilter(value, playersArr))
          }
          suggestions={playerSuggestions}
          entryComponent={PlayerEntry}
        />

        {imgSrc && (
          <div className="pic-and-x-button">
            <div
              className="post-x-button"
              onClick={() => {
                setImgSrc(null);
              }}
            >
              X
            </div>
            <img className="preview-post-image" src={imgSrc} alt="" />
          </div>
        )}
        {/* {gifUrl && (
          <div className="pic-and-x-button">
            <div
              className="post-x-button"
              onClick={() => {
                setGifUrl(null);
              }}
            >
              X
            </div>
            <img className="preview-post-image" src={gifUrl} alt="" />
          </div>
        )} */}
      </div>
      {/* <div className="searchboxWrapper">
        <ReactGiphySearchbox
          apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
          onSelect={(item) => setGifUrl(item.images.original.url)}
          masonryConfig={[
            { columns: 2, imageWidth: 110, gutter: 5 },
            { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 },
          ]}
        />
      </div> */}
      <div className="new-post-buttons">
        <div className="util-buttons">
          <label htmlFor="img-input" className="file-upload">
            <i className="far fa-image"></i>
          </label>
          <input id="img-input" type="file" onChange={updateFile}></input>
        </div>
        <button className="post-button" onClick={() => createPostHandler()}>
          Post
        </button>
      </div>
    </div>
  );
}

export default PostInput;
