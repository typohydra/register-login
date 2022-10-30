import { useEffect, useState } from "react";
import usersServices from "../services/users";
import { userRegisterSchema } from "../validations/userValidations";
import Notification from "./Notification";

const Register = () => {
  const [notification, setNotification] = useState({ text: "", style: "" });
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

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

    const validation = await userRegisterSchema
      .validate(inputs, { abortEarly: false })
      .catch((error) => error);

    if (validation.errors) {
      setNotification({ text: validation.errors[0], style: "error" });
      return;
    }

    usersServices
      .register(inputs)
      .then((res) => {
        setNotification({
          text: `User ${res.username} Registered, You can now Log In`,
          style: "success",
        });
        setInputs({
          username: "",
          email: "",
          password: "",
          repeatPassword: "",
        });
      })
      .catch((error) =>
        setNotification({ text: error.message, style: "error" })
      );
  };

  return (
    <main className="main">
      <h1 className="main__h1">Register</h1>
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
          type="email"
          placeholder="Email"
          name="email"
          value={inputs.email}
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
          className="main__form__input"
          type="password"
          placeholder="Repeat Password"
          name="repeatPassword"
          value={inputs.repeatPassword}
          onChange={handleInputChange}
        />
        <input
          className="main__form__input--submit"
          type="submit"
          value="sign up"
        />
      </form>
    </main>
  );
};

export default Register;
