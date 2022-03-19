import React, { useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { signUpStart } from "../../redux/user/user-action";
import CustomButtom from "../custom-button/button";
import FormInput from "../formInput/formInput";

import "./signup.scss";

const SignUp = ({ signUpStart, selectedUser }) => {
  const { t } = useTranslation();
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
      <h2 className="title">{t("sign_up_first_line")}</h2>
      <span>{t("sign_up_second_line")}</span>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <FormInput
          type="text"
          id="name"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
          label={t("name")}
          required
        />
        <FormInput
          type="email"
          id="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label={t("email")}
          required
        />
        <FormInput
          type="password"
          id="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label={t("password")}
          required
        />
        <FormInput
          type="password"
          id="cpassword"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label={t("confirm_password")}
          required
        />
        <CustomButtom type="submit">{t("sign_up")}</CustomButtom>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (info) => dispatch(signUpStart(info)),
});

export default connect(null, mapDispatchToProps)(SignUp);
