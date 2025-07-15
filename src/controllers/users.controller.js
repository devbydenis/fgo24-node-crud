const {constants: http} = require("http2");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/users.model");

exports.getAllUsers = function (_req, res) {
  const users = getUsers();

  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: "All users",
    results: users,
  });
};

exports.getUserById = function (req, res) {
  const {id} = req.params;
  const user = getUserById(parseInt(id));

  if (!user) {
    return res.status(http.HTTP_STATUS_NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: "User found",
    results: user,
  });
};

exports.createUser = function (req, res) {
  const {email, password, username} = req.body;

  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: "User created",
    results: createUser({email, password, username}),
  });
};

exports.updateUser = function (req, res) {
  const {id} = req.params;
  const {email, password, username} = req.body;

  const foundUser = getUserById(parseInt(id));

  if (!foundUser) {
    return res.status(http.HTTP_STATUS_NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  const updatedUser = updateUser(foundUser, {email, password, username});

  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: "User updated",
    results: updatedUser,
  });
};

exports.deleteUser = function (req, res) {
  const {id} = req.params;
  const isDeleted = deleteUser(parseInt(id));

  if (!isDeleted) {
    return res.status(http.HTTP_STATUS_NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: "User deleted",
  });
};
