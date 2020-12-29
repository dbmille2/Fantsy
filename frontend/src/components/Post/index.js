import { EditorState, convertFromRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import createMentionPlugin from "draft-js-mention-plugin";
import "../PostInput/PostInput.css";

function Post({ rawData }) {
  const history = useHistory();
  const [userMentionPlugin] = useState(
    createMentionPlugin({
      mentionComponent: (mentionProps) => (
        <span
          className={mentionProps.className}
          onClick={() => history.push(`/${mentionProps.mention.username}`)}
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
  const plugins = [userMentionPlugin];
  let data = JSON.parse(rawData);
  data = convertFromRaw(data);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(data)
  );

  return (
    <div>
      <Editor
        editorState={editorState}
        readOnly={true}
        plugins={plugins}
        onChange={(editorState) => setEditorState(editorState)}
      />
    </div>
  );
}

export default Post;
