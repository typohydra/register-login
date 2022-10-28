import { useState } from "react";
import usersServices from "../services/users";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    usersServices
      .register(inputs)
      .then((res) => console.log(res))
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" onChange={handleInputChange} />
        </label>
        <label>
          Email
          <input type="email" name="email" onChange={handleInputChange} />
        </label>
        <label>
          Password
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <label>
          Repeat Password
          <input
            type="password"
            name="repeatPassword"
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Register;
