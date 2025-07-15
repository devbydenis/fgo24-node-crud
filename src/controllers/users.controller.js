const {constants: http} = require("http2");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers
} = require("../models/users.model");
const { parse } = require("path");

exports.getAllUsers = function (req, res) {
  const {search, sortby, limit, page} = req.query;
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const lastIndex = parseInt(page) * parseInt(limit);
  const users = getUsers();
  const sliceUsers = users.slice(startIndex, lastIndex);
  console.log(sliceUsers);
  let searchedUsers = [];

  if (search) {
    searchedUsers = sliceUsers.filter(user => user.username.includes(search));
  }

  if (sortby === "ascending") {
    searchedUsers.length > 0 
      ?  searchedUsers = [...searchedUsers].sort((a, b) => a.username.localeCompare(b.username))
      : searchedUsers = [...sliceUsers].sort((a, b) => a.username.localeCompare(b.username));
  } else if (sortby === "descending") {
    searchedUsers.length > 0 
      ? searchedUsers = [...searchedUsers].sort((a, b) => b.username.localeCompare(a.username))
      : searchedUsers = [...sliceUsers].sort((a, b) => b.username.localeCompare(a.username));
  }

  const pageInfo = {
    totalPage: searchedUsers.length > 0 ? searchedUsers.length : users.length,
    currentPage: parseInt(page),
    limit: parseInt(limit),
    item: `Showing ${sliceUsers.length} of ${users.length}`
  };

  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: "All users",
    pageInfo: pageInfo,
    results: searchedUsers.length > 0 ? searchedUsers : sliceUsers
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
