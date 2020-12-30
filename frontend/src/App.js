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
// import * as followActions from "./store/follows";
import * as playerActions from "./store/players";

function App() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(playerActions.fetchAllPlayers());
  }, [dispatch]);

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
              <NavHeader title="Uhh" />
              <ProfilePage />
            </Route>
            <Route path="/:username/following">
              <FollowPage fState={false} />
            </Route>
            <Route path="/:username/followers">
              <FollowPage fState={true} />
            </Route>
          </Switch>
        )}
      </div>
      <div className="right-nav">
        <p>placeholder</p>
      </div>
    </div>
  );
}

export default App;
