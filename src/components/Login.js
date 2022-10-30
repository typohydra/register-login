import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import usersServices from "../services/users";
import Notification from "./Notification";
import { userLoginSchema } from "../validations/userValidations";

const Login = ({ setUserID }) => {
  const navigate = useNavigate();

  const [notification, setNotification] = useState({ text: "", style: "" });
  const [inputs, setInputs] = useState({ username: "", password: "" });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [notification]);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = await userLoginSchema
      .validate(inputs, { abortEarly: false })
      .catch((error) => error);

    if (validation.errors) {
      setNotification({ text: validation.errors[0], style: "error" });
      return;
    }

    usersServices
      .login(inputs)
      .then((res) => {
        setInputs({
          username: "",
          password: "",
        });
        setUserID(res.id);
        navigate("/");
      })
      .catch((error) => {
        setNotification({ text: error.message, style: "error" });
      });
  };

  return (
    <main className="main">
      <h1 className="main__h1">Log In</h1>
      <Notification notification={notification} />
      <form className="main__form" onSubmit={handleSubmit}>
        <input
          className="main__form__input"
          type="text"
          placeholder="Username"
          name="username"
          value={inputs.username}
          onChange={handleInputChange}
        />
        <input
          className="main__form__input"
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleInputChange}
        />
        <input
          className="main__form__input--submit"
          type="submit"
          value="log in"
        />
      </form>
    </main>
  );
};

export default Login;
