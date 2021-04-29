import React from "react";
import { useHistory } from "react-router-dom";

import { preAuthAxiosCall } from "../utils";

const initFormVals = {
  username: "",
  password1: "",
  password2: "",
};

const SignUpSignInForm = ({ register }) => {
  const [formVals, setFormVals] = React.useState(initFormVals);
  const { push } = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormVals({
      ...formVals,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    preAuthAxiosCall(formVals)
      .then((res) => {
        push("/game");
        console.log({ res });
      })
      .catch((err) => {
        alert("There was an issue logging in!");
        console.log({ err });
      });

    setFormVals(initFormVals);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormVals(initFormVals);
  };

  return (
    <div className="reg-form-container">
      <form className="form reg-form" onSubmit={handleSubmit}>
        <label className="label reg-form-label">
          Username
          <input
            className="input"
            type="text"
            name="username"
            value={formVals.username}
            onChange={handleChange}
          />
        </label>
        <label className="label reg-form-label">
          Password
          <input
            className="input"
            type="text"
            name="password1"
            value={formVals.password1}
            onChange={handleChange}
          />
        </label>
        {register && (
          <label className="label reg-form-label">
            Password 2
            <input
              className="input"
              type="text"
              name="password2"
              value={formVals.password2}
              onChange={handleChange}
            />
          </label>
        )}
        <button className="button sumbit-button" type="submit">
          Submit
        </button>
        <button
          className="button cancel-button"
          type="submit"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
      {!register && (
        <div className="signup-redirect-container">
          <button
            className="button signup-redirect-button"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              push("/signup");
            }}
          >
            Not Registered?
          </button>
        </div>
      )}
      {register && (
        <div className="signup-redirect-container">
          <button
            className="button signup-redirect-button"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              push("/");
            }}
          >
            Registered?
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUpSignInForm;
