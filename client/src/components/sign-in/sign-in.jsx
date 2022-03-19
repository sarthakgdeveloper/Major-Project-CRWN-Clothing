import React, { useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user-action";
import CustomButtom from "../custom-button/button";

import FormInput from "../formInput/formInput";

import "./sign-in.scss";

const SingIn = ({ emailSignInStart, googleSignInStart, selectedUser }) => {
  const { t } = useTranslation();
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;
  const handleSubmit = async (event) => {
    event.preventDefault();
    await emailSignInStart({ email, password, selectedUser });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>{t("sign_in_first_line")}</h2>
      <span>{t("sign_in_second_line")}</span>
      <form onSubmit={handleSubmit}>
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
        <div className="button">
          <CustomButtom type="submit">{t("sign_in")}</CustomButtom>
          <CustomButtom
            type="button"
            onClick={() => googleSignInStart(selectedUser)}
            isGoogleSignIn
          >
            {t("google_sign_in")}
          </CustomButtom>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: (selectedUser) =>
    dispatch(googleSignInStart(selectedUser)),
  emailSignInStart: (emailAndPassword) =>
    dispatch(emailSignInStart(emailAndPassword)),
});

export default connect(null, mapDispatchToProps)(SingIn);
