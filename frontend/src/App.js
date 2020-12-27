import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import PostInput from "./components/PostInput";
import ProfilePage from "./components/ProfilePage";
// import * as followActions from "./store/follows";
import * as playerActions from "./store/players";

function App() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  console.log(session);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    
    dispatch(playerActions.fetchAllPlayers());
    
    dispatch(playerActions.fetchPlayerFollowers("JoshAllen"));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/home">
            <PostInput />
          </Route>
          <Route path="/:username">
            <ProfilePage /> 
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
