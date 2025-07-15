const {constants: http} = require("http2");
const {createUser, findUserByEmail} = require("../models/users.model");

exports.login = function (req, res) {
  const {email, password} = req.body;
  const registeredUser = findUserByEmail(email);
  console.log("email", email);
  console.log("password", password);
  console.log("registeredUser", registeredUser);

  if (email === "") {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "email can not be empty",
    });
  }

  if (password === "") {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "password can not be empty",
    });
  }

  if (!registeredUser) {
    return res.status(http.HTTP_STATUS_UNAUTHORIZED).json({
      success: false,
      message: "User with email " + email + " cannot be found. Please register",
    });
  }

  if (email !== registeredUser.email || password !== registeredUser.password) {
    return res.status(http.HTTP_STATUS_OK).json({
      success: false,
      message: "Email or password is incorrect",
    });
  }

  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: "User logged in successfully",
  });
};

exports.register = function (req, res) {
  const {email, password, confirmPassword} = req.body;

  if (email === "") {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "email can not be empty",
    });
  }

  if (password === "") {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "password can not be empty",
    });
  }

  if (password !== confirmPassword) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "password and confirm password do not match",
    });
  }

  createUser({email, password});

  return res.status(http.HTTP_STATUS_CREATED).json({
    success: true,
    message: "User created successfully",
  });
};
