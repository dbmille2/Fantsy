import { Link } from "react-router-dom";

function ProfileListItem({ profile }) {
  return (
    <div>
      <Link to={`/${profile.username}`}>
        <p>{profile.displayName}</p>
        <p>@{profile.username}</p>
      </Link>
    </div>
  );
}

export default ProfileListItem;
