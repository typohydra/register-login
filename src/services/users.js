import axios from "axios";
import bcrypt from "bcryptjs";
const baseUrl = "http://localhost:3001/users";

const getAll = async () => {
  const users = await axios.get(baseUrl);
  return users.data;
};

const register = async (newUserData) => {
  const { username, email, password, repeatPassword } = newUserData;

  //check if username is taken
  const users = await getAll();
  const isUsernameTaken = users.find((user) => user.username === username);
  if (isUsernameTaken) throw new Error("Username Taken");

  //check if passwords match
  const arePasswordsMatching = password === repeatPassword;
  if (!arePasswordsMatching) throw new Error("Passwords Don't Match");

  //hash password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = {
    username,
    email,
    password: passwordHash,
  };

  const res = await axios.post(baseUrl, newUser);
  return res.data;
};

const login = async (userData) => {
  const { username, password } = userData;

  const users = await getAll();
  const foundUser = users.find((user) => user.username === username);
  if(!foundUser) throw new Error("User Doesn't Exist")

  const passwordsMatch = await bcrypt.compare(password, foundUser.password)
  if(!passwordsMatch) throw new Error("Incorrect Password")

  localStorage.setItem("user", foundUser.id);
  return {username: foundUser.username, email: foundUser.email, id: foundUser.id}
}

export default {
  getAll,
  register,
  login
};
