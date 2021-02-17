import React, { useState, useRef } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [nameFocused, setNameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
  };
  const [nameRef, setNameFocus] = useFocus();
  const [passRef, setPassFocus] = useFocus();

  //   return (
  //     <div className="login-form">
  //       <form onSubmit={handleSubmit}>
  //         <ul>
  //           {errors.map((error, idx) => (
  //             <li key={idx}>{error}</li>
  //           ))}
  //         </ul>
  //         <label>
  //           Username or Email
  //           <input
  //             type="text"
  //             value={credential}
  //             onChange={(e) => setCredential(e.target.value)}
  //             required
  //           />
  //         </label>
  //         <label>
  //           Password
  //           <input
  //             type="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             required
  //           />
  //         </label>
  //         <button type="submit">Log In</button>
  //       </form>
  //     </div>
  //   );
  return (
    <div className="login-form">
      <div className="login-name-wrapper">
        <div
          onClick={() => {
            setNameFocused(true);
            setNameFocus();
          }}
          className={nameFocused ? "cred-wrapper focused" : "cred-wrapper"}
        >
          <span className={nameFocused ? "cred-header focused" : "cred-header"}>
            Email or username
          </span>
          <input
            type="text"
            ref={nameRef}
            onBlur={() => setNameFocused(false)}
            onFocus={() => setNameFocused(true)}
            value={credential}
            onChange={(event) => setCredential(event.target.value)}
            className="cred-input"
          ></input>
        </div>
      </div>
      <div className="password-wrapper">
        <div
          onClick={() => {
            setPasswordFocused(true);
            setPassFocus();
          }}
          className={
            passwordFocused
              ? "password-input-wrapper focused"
              : "password-input-wrapper"
          }
        >
          <span
            className={
              passwordFocused ? "password-header focused" : "password-header"
            }
          >
            Password
          </span>
          <input
            type="password"
            ref={passRef}
            onBlur={() => setPasswordFocused(false)}
            onFocus={() => setPasswordFocused(true)}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="password-input"
          ></input>
        </div>
      </div>
      <button className="login-button" onClick={handleSubmit}>
        Log in
      </button>
    </div>
  );
}

export default LoginForm;
