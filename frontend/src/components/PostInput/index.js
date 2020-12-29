import { EditorState, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import { useState, useRef } from "react";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import "./PostInput.css";
import "draft-js/dist/Draft.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost } from "../../store/posts";

const Entry = (props) => {
  const { mention, theme, searchValue, isFocused, ...parentProps } = props;

  return (
    <div {...parentProps}>
      <div className={theme.mentionSuggestionsEntryContainer}>
        <div className={theme.mentionSuggestionsEntry}>
          <div className={theme.mentionSuggestionsEntryContainerLeft}>
            <img
              src={mention.UserPreference.profilePicUrl}
              className={theme.mentionSuggestionsEntryAvatar}
              role="presentation"
              alt="pic"
            />
          </div>

          <div className={theme.mentionSuggestionsEntryContainerRight}>
            <div className={theme.mentionSuggestionsEntryText}>
              {mention.displayName}
            </div>

            <div className={theme.mentionSuggestionsEntryTitle}>
              {mention.username}
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
          onClick={() => history.push(`/${mentionProps.mention.username}`)}
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
        mentionSuggestionsEntryText: "mentionSuggestionsEntryText",
        mentionSuggestionsEntryAvatar: "mentionSuggestionsEntryAvatar",
      },
      mentionPrefix: "@",
      supportWhitespace: true,
    })
  );

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [suggestions, setSuggestions] = useState(followingArr);
  const { MentionSuggestions } = userMentionPlugin;
  const plugins = [userMentionPlugin];

  const createPostHandler = () => {
    const contentState = editorState.getCurrentContent();
    const rawData = convertToRaw(contentState);
    const userId = user.id;
    setEditorState(EditorState.createEmpty());
    dispatch(createPost(userId, JSON.stringify(rawData)));
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
          entryComponent={Entry}
        />
      </div>
      <div className="new-post-buttons">
        <div className="util-buttons">UtilButtonsPlaceholder</div>
        <button className="post-button" onClick={() => createPostHandler()}>
          Post
        </button>
      </div>
    </div>
  );
}

export default PostInput;
