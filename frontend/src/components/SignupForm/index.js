import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [displayNameFocused, setDisplayNameFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, displayName, image, password })
      ).catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
  };

  const [emailRef, setEmailFocus] = useFocus();
  const [displayNameRef, setDisplayNameFocus] = useFocus();
  const [usernameRef, setUsernameFocus] = useFocus();
  const [passwordRef, setPasswordFocus] = useFocus();
  const [confirmPasswordRef, setConfirmPasswordFocus] = useFocus();

  if (sessionUser) return <Redirect to="/home" />;

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  // return (
  //   <div className="signup-form">
  //     <h1>Sign Up</h1>
  //     <form onSubmit={handleSubmit}>
  //       <ul>
  //         {errors.map((error, idx) => (
  //           <li key={idx}>{error}</li>
  //         ))}
  //       </ul>
  //       <label>
  //         Email
  //         <input
  //           type="text"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           required
  //         />
  //       </label>
  //       <label>
  //         Username
  //         <input
  //           type="text"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //           required
  //         />
  //       </label>
  //       <label>
  //         Display Name
  //         <input
  //           type="text"
  //           value={displayName}
  //           onChange={(e) => setDisplayName(e.target.value)}
  //           required
  //         />
  //       </label>
  //       <label>
  //         <input type="file" onChange={updateFile} />
  //       </label>
  //       <label>
  //         Password
  //         <input
  //           type="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //       </label>
  //       <label>
  //         Confirm Password
  //         <input
  //           type="password"
  //           value={confirmPassword}
  //           onChange={(e) => setConfirmPassword(e.target.value)}
  //           required
  //         />
  //       </label>
  //       <button type="submit">Sign Up</button>
  //     </form>
  //   </div>
  // );

  return (
    <div className="signup-form">
      <div className="signup-form-header">
        <div className="signup-form-logo">Logo</div>
        <div className="signup-form-button">Sign up</div>
      </div>
      <div className="signup-form-text">Create your account</div>
      <div className="signup-form-inputs">
        <div className="email-wrapper">
          <div
            onClick={() => {
              setEmailFocused(true);
              setEmailFocus();
            }}
            className={
              emailFocused
                ? "email-input-wrapper focused"
                : "email-input-wrapper"
            }
          >
            <span
              className={emailFocused ? "email-header focused" : "email-header"}
            >
              Email
            </span>
            <input
              type="email"
              ref={emailRef}
              onBlur={() => setEmailFocused(false)}
              onFocus={() => setEmailFocused(true)}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="email-input"
            ></input>
          </div>
        </div>
        <div className="display-name-wrapper">
          <div
            onClick={() => {
              setDisplayNameFocused(true);
              setDisplayNameFocus();
            }}
            className={
              displayNameFocused
                ? "email-input-wrapper focused"
                : "email-input-wrapper"
            }
          >
            <span
              className={
                displayNameFocused ? "email-header focused" : "email-header"
              }
            >
              Display Name
            </span>
            <input
              type="text"
              ref={displayNameRef}
              onBlur={() => setDisplayNameFocused(false)}
              onFocus={() => setDisplayNameFocused(true)}
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="email-input"
            ></input>
          </div>
        </div>
        <div className="username-wrapper">
          <div
            onClick={() => {
              setUsernameFocused(true);
              setUsernameFocus();
            }}
            className={
              usernameFocused
                ? "email-input-wrapper focused"
                : "email-input-wrapper"
            }
          >
            <span
              className={
                usernameFocused ? "email-header focused" : "email-header"
              }
            >
              Username
            </span>
            <input
              type="text"
              ref={usernameRef}
              onBlur={() => setUsernameFocused(false)}
              onFocus={() => setUsernameFocused(true)}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="email-input"
            ></input>
          </div>
        </div>
        <div className="password-signup-wrapper">
          <div
            onClick={() => {
              setPasswordFocused(true);
              setPasswordFocus();
            }}
            className={
              passwordFocused
                ? "email-input-wrapper focused"
                : "email-input-wrapper"
            }
          >
            <span
              className={
                passwordFocused ? "email-header focused" : "email-header"
              }
            >
              Password
            </span>
            <input
              type="password"
              ref={passwordRef}
              onBlur={() => setPasswordFocused(false)}
              onFocus={() => setPasswordFocused(true)}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="email-input"
            ></input>
          </div>
        </div>
        <div className="confirm-wrapper">
          <div
            onClick={() => {
              setConfirmPasswordFocused(true);
              setConfirmPasswordFocus();
            }}
            className={
              confirmPasswordFocused
                ? "email-input-wrapper focused"
                : "email-input-wrapper"
            }
          >
            <span
              className={
                confirmPasswordFocused ? "email-header focused" : "email-header"
              }
            >
              Confirm Password
            </span>
            <input
              type="password"
              ref={confirmPasswordRef}
              onBlur={() => setConfirmPasswordFocused(false)}
              onFocus={() => setConfirmPasswordFocused(true)}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="email-input"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
