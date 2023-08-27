import "./Profile.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {
  getUserLogin,
  updateLogin,
  setUser,
  removeLogin,
  removeUser,
} from "../data/repository";
import { useState } from "react";
import {
  passwordEditValidate,
  emailEditValidate,
} from "../validation/ValidationRules";
import { useForm, useFormPassword } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";

function Profile({ username, logoutUser, loginUser }) {
  const [edit, SetEdit] = useState("none");
  const navigate = useNavigate();
  const login = getUserLogin(username);
  const { values, errors, handleChange, handleSubmit } = useForm(
    e_save,
    emailEditValidate
  );
  const { pw_values, pw_errors, pw_handleChange, pw_handleSubmit } =
    useFormPassword(pw_save, passwordEditValidate, login);

  function e_save() {
    updateLogin(login.email, values.email, login.password);
    login.email = values.email;

    loginUser(values.email);
    setUser(values.email);
    SetEdit(() => "none");
  }

  function pw_save() {
    updateLogin(login.email, login.email, pw_values.password);

    login.password = pw_values.password;

    SetEdit(() => "none");
    pw_values.oldpassword = "";
    pw_values.password = "";
    pw_values.passwordConfirm = "";
  }

  function deleteAccount() {
    const deleteAcc = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (deleteAcc) {
      removeLogin(login.email);
      removeUser();
      logoutUser();
      navigate("/");
    }
  }

  return (
    <div>
      <Navbar username={username} logoutUser={logoutUser} />
      <div className="profile-wrapper">
        <div className="profile-header">
          <h1>Profile</h1>
        </div>
        <div className="profile-card">
          <div className="profile-details">
            <h2>Account Details</h2>
            <form>
              <div className="form-email">
                <label className="field-title">Email:</label>
                <input type="email" name="email" value={username} readOnly />
                <img
                  className="edit-icon"
                  src="edit.png"
                  alt="edit email"
                  onClick={() => SetEdit("email")}
                />
              </div>
              <div className="form-password">
                <label className="field-title">Password:</label>
                <input
                  type="password"
                  name="password"
                  value="********"
                  readOnly
                />
                <img
                  className="edit-icon"
                  src="edit.png"
                  alt="edit password"
                  onClick={() => SetEdit("password")}
                />
              </div>
              <span>
                Joined:{" "}
                {getUserLogin(username).date || "Could not find join date."}
              </span>
            </form>
          </div>
          <div className="profile-extras">
            <button className="profile-delete" onClick={deleteAccount}>
              <img src="bin.png" className="delete-icon" alt="delete account" />
              Delete Account
            </button>
            <hr />
          </div>
          <div className="profile-form">
            {edit === "email" && (
              <form onSubmit={handleSubmit} noValidate>
                <h2>Edit Email</h2>
                <div className="form-email">
                  <label className="field-title">
                    Email:
                    <br />
                    <input
                      className={`input ${errors.email && "is-danger"}`}
                      type="email"
                      name="email"
                      placeholder="Enter new email"
                      onChange={handleChange}
                      value={values.email}
                      required
                    />
                    {errors.email && (
                      <p className="error-message is-danger">{errors.email}</p>
                    )}
                  </label>
                  <div className="profile-edit-save">
                    <input
                      type="submit"
                      value="Save"
                      className="email-submit"
                      onSubmit={e_save}
                    />
                  </div>
                </div>
              </form>
            )}
            {edit === "password" && (
              <form noValidate onSubmit={pw_handleSubmit}>
                <h2>Edit Password</h2>
                <div className="form-password">
                  <label className="field-title">
                    Old Password:
                    <input
                      className={`input ${
                        pw_errors.oldpassword && "is-danger"
                      }`}
                      type="password"
                      placeholder="Enter old password"
                      name="oldpassword"
                      onChange={pw_handleChange}
                      value={pw_values.oldpassword || ""}
                      required
                    />
                    {pw_errors.oldpassword && (
                      <p className="error-message is-danger">
                        {pw_errors.oldpassword}
                      </p>
                    )}
                  </label>
                </div>
                <div className="form-password">
                  <label className="field-title">
                    New Password:
                    <input
                      className={`input ${pw_errors.password && "is-danger"}`}
                      type="password"
                      placeholder="Enter new password"
                      name="password"
                      onChange={pw_handleChange}
                      value={pw_values.password || ""}
                      required
                    />
                    {pw_errors.password && (
                      <p className="error-message is-danger">
                        {pw_errors.password}
                      </p>
                    )}
                  </label>
                </div>
                <div className="form-password">
                  <label className="field-title">
                    Confirm Password:
                    <input
                      className={`input ${
                        pw_errors.passwordConfirm && "is-danger"
                      }`}
                      type="password"
                      placeholder="Confirm password"
                      name="passwordConfirm"
                      value={pw_values.passwordConfirm || ""}
                      onChange={pw_handleChange}
                      required
                    />
                    {pw_errors.passwordConfirm && (
                      <p className="error-message is-danger">
                        {pw_errors.passwordConfirm}
                      </p>
                    )}
                  </label>
                </div>
                <div className="profile-edit-save">
                  <input
                    type="submit"
                    value="Save"
                    className="form-submit"
                    onSubmit={pw_save}
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
