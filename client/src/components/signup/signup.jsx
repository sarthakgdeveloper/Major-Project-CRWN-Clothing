import React, { useState } from "react";
import { connect } from "react-redux";
import { signUpStart } from "../../redux/user/user-action";
import CustomButtom from "../custom-button/button";
import FormInput from "../formInput/formInput";

import "./signup.scss";

const SignUp = ({ signUpStart, selectedUser }) => {
  const [userCredentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, displayName, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    signUpStart({
      email,
      displayName,
      password,
      confirmPassword,
      selectedUser,
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2 className="title">Don't have an Account</h2>
      <span>Sign up to create a new one</span>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <FormInput
          type="text"
          id="name"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
          label="name"
          required
        />
        <FormInput
          type="email"
          id="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          type="password"
          id="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <FormInput
          type="password"
          id="cpassword"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="confirm password"
          required
        />
        <CustomButtom type="submit">sign up</CustomButtom>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (info) => dispatch(signUpStart(info)),
});

export default connect(null, mapDispatchToProps)(SignUp);
