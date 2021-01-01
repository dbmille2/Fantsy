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
              <NavHeader title={profile.displayName} subTitle={"posts"} />
              <FollowPage fState={false} />
            </Route>
            <Route path="/:username/followers">
              <NavHeader title={profile.displayName} subTitle={"posts"} />
              <FollowPage fState={true} />
            </Route>
            <Route path="/:username/likes">
              <NavHeader title={profile.displayName} subTitle={"likes"} />
              <ProfilePage tab={"likes"} />
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
            <Route path="/explore/all">
              <NavHeader title="Explore" />
              <ExploreFeedContainer selection="all" />
            </Route>
            <Route path="/explore/players">
              <NavHeader title="Explore" />
              <ExploreFeedContainer selection="players" />
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
