import { EditorState, convertFromRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import createMentionPlugin from "draft-js-mention-plugin";
import "./Post.css";

function Post({ post }) {
  const profilePicUrl = post.User.UserPreference.profilePicUrl;
  const displayName = post.User.displayName;
  const username = post.User.username;
  let createdAt = new Date(post.createdAt);
  let now = new Date();
  let elapsed = now - createdAt;
  let timestamp;
  if (elapsed < 1000) {
    timestamp = `Now`;
  } else if (elapsed < 60000) {
    timestamp = `${Math.floor(elapsed / 1000)}s`;
  } else if (elapsed < 3600000) {
    timestamp = `${Math.floor(elapsed / 60000)}m`;
  } else if (elapsed < 86400000) {
    timestamp = `${Math.floor(elapsed / 3600000)}h`;
  } else {
    timestamp = createdAt.toDateString();
  }

  const history = useHistory();
  const [userMentionPlugin] = useState(
    createMentionPlugin({
      mentionComponent: (mentionProps) => (
        <span
          className={`${mentionProps.className} post-mention`}
          onClick={(event) => {
            event.stopPropagation();
            history.push(`/${mentionProps.mention.username}`);
          }}
        >
          {mentionProps.children}
        </span>
      ),
      theme: {
        mention: "mention",
      },
      mentionPrefix: "@",
    })
  );

  function postClickHandler(event) {
    history.push(`/${username}/post/${post.id}`);
  }

  const plugins = [userMentionPlugin];
  let data = JSON.parse(post.rawData);
  data = convertFromRaw(data);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(data)
  );

  return (
    <div className="post-card" onClick={(event) => postClickHandler(event)}>
      <img className="feed-profile-pic" src={profilePicUrl} alt="Profile" />
      <div className="post-content">
        <div className="post-header">
          <Link
            onClick={(event) => event.stopPropagation()}
            className="post-user-links"
            to={`/${username}`}
          >
            <span className="feed-display-name">{displayName}</span>
            <span className="feed-username">@{username}</span>
            <span className="feed-timestamp-spacer">·</span>
            <span className="feed-timestamp">{timestamp}</span>
          </Link>
        </div>
        <div className="post-card-editor">
          <Editor
            editorState={editorState}
            readOnly={true}
            plugins={plugins}
            onChange={(editorState) => setEditorState(editorState)}
          />
        </div>
      </div>
    </div>
  );
}

export default Post;
