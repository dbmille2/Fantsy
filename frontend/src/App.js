import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import FollowPage from "./components/FollowPage";
import NavHeader from "./components/NavHeader";
import HomeContainer from "./components/HomeContainer";
import SavedPostsContainer from "./components/SavedPostsContainer";
import Trending from "./components/Trending";
import SearchBox from "./components/SearchBox";
import ExploreFeedContainer from "./components/ExploreFeedContainer";
// import * as followActions from "./store/follows";
import * as playerActions from "./store/players";
import PlayerFeedContainer from "./components/PlayerFeedContainer";
import TeamContainer from "./components/TeamContainer";
import PlayerPositionNav from "./components/PlayerPositionNav";
import SinglePostContainer from "./components/SinglePostContainer";

function App() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const profile = useSelector((state) => state.profile);
  const feed = useSelector((state) => state.posts.feed);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(playerActions.fetchAllPlayers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(playerActions.fetchTrendingPlayers());
  }, [dispatch, feed]);

  return (
    <div className="full-page">
      <Navigation isLoaded={isLoaded} />

      <div className="main-content">
        {isLoaded && (
          <Switch>
            {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
            <Route exact path="/">
              {session.user && <Redirect to="/home" />}
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/home">
              <NavHeader title="Home" />
              {session.user && <HomeContainer />}
            </Route>
            <Route exact path="/:username">
              <NavHeader title={profile.displayName} subTitle={"posts"} />
              <ProfilePage tab={"posts"} />
            </Route>
            <Route path="/:username/following">
              <NavHeader
                title={profile.displayName}
                subTitle={`@${profile.username}`}
              />
              <FollowPage fState={false} />
            </Route>
            <Route path="/:username/followers">
              <NavHeader
                title={profile.displayName}
                subTitle={`@${profile.username}`}
              />
              <FollowPage fState={true} />
            </Route>
            <Route path="/:username/likes">
              <NavHeader title={profile.displayName} subTitle={"likes"} />
              <ProfilePage tab={"likes"} />
            </Route>
            <Route path="/:username/media">
              <NavHeader title={profile.displayName} subTitle={"posts"} />
              <ProfilePage tab={"media"} />
            </Route>
            <Route path="/i/saved">
              <NavHeader title="Saved" subTitle="posts" />
              <SavedPostsContainer />
            </Route>
            <Route path="/players/:playerId/all">
              <NavHeader />
              <PlayerFeedContainer selection={"all"} />
            </Route>
            <Route path="/players/:playerId/following">
              <NavHeader />
              <PlayerFeedContainer selection={"following"} />
            </Route>
            <Route path="/posts/explore/all">
              <NavHeader title="Explore" />
              <ExploreFeedContainer selection="all" />
            </Route>
            <Route path="/posts/explore">
              <NavHeader title="Explore" />
              <ExploreFeedContainer selection="players" />
            </Route>
            <Route exact path="/i/team/all">
              <NavHeader title="All Players" />
              <PlayerPositionNav />
              <TeamContainer selection={"all"} subSelection={"all"} />
            </Route>
            <Route path="/i/team/all/qb">
              <NavHeader title="All Players - QB" subTitle={" "} />
              <PlayerPositionNav />
              <TeamContainer selection={"all"} subSelection={"QB"} />
            </Route>
            <Route path="/i/team/all/rb">
              <NavHeader title="All Players - RB" subTitle={" "} />
              <PlayerPositionNav />
              <TeamContainer selection={"all"} subSelection={"RB"} />
            </Route>
            <Route path="/i/team/all/wr">
              <NavHeader title="All Players - WR" subTitle={" "} />
              <PlayerPositionNav />
              <TeamContainer selection={"all"} subSelection={"WR"} />
            </Route>
            <Route path="/i/team/all/te">
              <NavHeader title="All Players - TE" subTitle={" "} />
              <PlayerPositionNav />
              <TeamContainer selection={"all"} subSelection={"TE"} />
            </Route>
            <Route path="/i/team/all/k">
              <NavHeader title="All Players - K" subTitle={" "} />
              <PlayerPositionNav />
              <TeamContainer selection={"all"} subSelection={"K"} />
            </Route>
            <Route path="/i/team">
              <NavHeader title="My Team" />
              <TeamContainer selection={"team"} />
            </Route>
            <Route path="/:username/post/:postId">
              <NavHeader title="Post" />
              <SinglePostContainer />
            </Route>
          </Switch>
        )}
      </div>
      <div className="right-panel-wrapper">
        <div className="right-panel">
          <SearchBox />
          {<Trending />}
        </div>
      </div>
    </div>
  );
}

export default App;
