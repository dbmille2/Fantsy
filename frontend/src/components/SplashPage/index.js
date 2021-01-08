import React, { useState } from "react";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupFormModal from "../SignupFormModal";
import SignupForm from "../SignupForm";
import "./SplashPage.css";

function SignupFormPage() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="splash-page">
      <div className="splash-background">
        <div className="splash-background-left">
          <i className="fas fa-football-ball splash-football"></i>
          <div className="splash-info">
            <p>
              <i className="fas fa-search"></i>
              Connect with other users.
            </p>
            <p>
              <i className="far fa-newspaper"></i>
              Keep up with the latest player news.
            </p>
            <p>
              <i className="far fa-comment"></i>
              Ask for advice or give it.
            </p>
          </div>
        </div>
        <div className="splash-background-right">
          <div className="splash-content">
            <div className="splash-login">
              <LoginForm />
            </div>
            <div className="splash-signup-container">
              <i className="fas fa-football-ball signup-icon"></i>
              <p className="splash-signup-header">
                Stay informed during your fantasy football season
              </p>
              <p className="splash-signup-join">Join Fantsy today.</p>
              <button
                onClick={() => setIsSignupOpen(true)}
                className="signup-button"
              >
                Sign up
              </button>
              <button>Demo</button>
              <SignupFormModal
                open={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
              >
                <SignupForm />
              </SignupFormModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
