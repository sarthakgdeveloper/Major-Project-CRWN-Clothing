import React, { useState } from "react";

import SingIn from "../sign-in/sign-in";
import SignUp from "../signup/signup";

import "./sign-in-and-sign-up.scss";

const SignInAndSingUp = () => {
  const [selectedUser, setSelectedUser] = useState("Gharak");
  return (
    <div className="sign-in-sign-up">
      <div class="switches-container">
        <input
          type="radio"
          id="switchGharak"
          name="switchPlan"
          value="Gharak"
          checked="checked"
          onChange={(e) => {
            setSelectedUser(e.target.value);
          }}
        />
        <input
          type="radio"
          id="switchKarigar"
          name="switchPlan"
          value="Karigar"
          onChange={(e) => {
            setSelectedUser(e.target.value);
          }}
        />
        <label for="switchGharak">Gharak</label>
        <label for="switchKarigar">Karigar</label>
        <div class="switch-wrapper">
          <div class="switch">
            <div>Gharak</div>
            <div>Karigar</div>
          </div>
        </div>
      </div>
      <div className="sign-in_sign-Up_container">
        <SingIn selectedUser={selectedUser} />
        <SignUp selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default SignInAndSingUp;
