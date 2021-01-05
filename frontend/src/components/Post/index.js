import { EditorState, convertFromRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { fetchInfo } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import createMentionPlugin from "draft-js-mention-plugin";
import { starPost, unStarPost } from "../../store/posts";
import { savePost, unSavePost } from "../../store/posts";
import ImageModal from "../ImageModal";
import "./Post.css";

function Post({ post }) {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchInfo(session.user.username));
  // }, [dispatch, session.user]);
  const user = session.user;
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
    timestamp = createdAt.toDateString().split(" ").splice(1, 2).join(" ");
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

  const [playerMentionPlugin] = useState(
    createMentionPlugin({
      mentionComponent: (mentionProps) => (
        <span
          className={`${mentionProps.className} post-mention`}
          onClick={(event) => {
            event.stopPropagation();
            history.push(`/players/${mentionProps.mention.id}/following`);
          }}
        >
          {mentionProps.children}
        </span>
      ),
      theme: {
        mention: "mention",
      },
      mentionTrigger: "#",
      mentionPrefix: "#",
    })
  );

  const [commentHovered, setCommentHovered] = useState(false);
  const [starHovered, setStarHovered] = useState(false);
  const [starred, setStarred] = useState(post.stars[user.id] !== undefined);
  const [saved, setSaved] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    setSaved(session.savedPosts[post.id] === post.id);
  }, [session.savedPosts, post.id]);

  function starPostHandler(event) {
    event.stopPropagation();
    if (!starred) {
      dispatch(starPost(post.id, user.id));
      setStarred(true);
    } else {
      dispatch(unStarPost(post.id, user.id));
      setStarred(false);
    }
  }

  function savePostHandler(event) {
    event.stopPropagation();
    if (!saved) {
      dispatch(savePost(post.id, user.id));
      setSaved(true);
    } else {
      dispatch(unSavePost(post.id, user.id));
      setSaved(false);
    }
  }

  // function imageClickHandler(event) {

  //   setIsImageOpen(true);
  // }

  function postClickHandler(event) {
    history.push(`/${username}/post/${post.id}`);
  }

  const plugins = [userMentionPlugin, playerMentionPlugin];
  let data = JSON.parse(post.rawData);
  data = convertFromRaw(data);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(data)
  );

  return (
    <div
      className="post-card-container"
      onClick={(event) => postClickHandler(event)}
    >
      <div className="post-card">
        <Link onClick={(event) => event.stopPropagation()} to={`/${username}`}>
          <img className="feed-profile-pic" src={profilePicUrl} alt="Profile" />
        </Link>
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
            {post.contentUrl && (
              <>
                <div className="image-holder">
                  <img
                    className={
                      post.contentUrl.endsWith("gif")
                        ? "preview-post-gif"
                        : "preview-post-image"
                    }
                    src={post.contentUrl}
                    alt=""
                  />
                </div>
                <ImageModal
                  open={isImageOpen}
                  onClose={() => setIsImageOpen(false)}
                ></ImageModal>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="post-interactions">
        <div
          onMouseOver={() => setCommentHovered(true)}
          onMouseOut={() => setCommentHovered(false)}
          className="comment-button"
        >
          <div
            className={
              commentHovered
                ? "comment-wrapper comment-hovered"
                : "comment-wrapper"
            }
          >
            <i id="comment-logo" className="far fa-comment"></i>
          </div>
          <span className="number-comments"></span>
        </div>

        <div
          onMouseOver={() => setStarHovered(true)}
          onMouseOut={() => setStarHovered(false)}
          onClick={(event) => starPostHandler(event)}
          className={starred ? "star-button starred" : "star-button"}
        >
          <div
            className={
              starHovered ? "star-wrapper star-hovered" : "star-wrapper"
            }
          >
            <i
              id="star-logo"
              className={starred ? "fas fa-heart" : "far fa-heart"}
            ></i>
          </div>
          {post.stars && Object.keys(post.stars).length > 0 && (
            <span className="number-stars">
              {Object.keys(post.stars).length}
            </span>
          )}
        </div>
        <div
          className={saved ? "save-button saved" : "save-button"}
          onClick={(event) => savePostHandler(event)}
        >
          <i
            id="save-logo"
            className={saved ? "fas fa-bookmark" : "far fa-bookmark"}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Post;
