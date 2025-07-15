const users = [
  {
    id: 1,
    email: 'denis@gmail.com',
    password: 'denis123',
    username: 'denisrahmadi'
  }
];

exports.createUser = function(user) {
  users.push({id: users.length + 1, ...user});
};

exports.findUserByEmail = function(email) {
  const foundUser = users.find(user => user.email === email);

  if (!foundUser) {
    return null;
  }

  return foundUser;
};


exports.getUsers = function() {
  return users;
};

exports.getUserById = function(id) {
  return users.find(user => user.id === parseInt(id));
};

exports.updateUser = function(foundUser, user) {
  // foundUser.email = user.email === '' ? foundUser.email : user.email;
  // foundUser.password = user.password === '' ? foundUser.password : user.password;
  // foundUser.username = user.username === '' ? foundUser.username : user.username;

  if (user.email !== undefined && user.email !== '') {
    foundUser.email = user.email;
  }
  if (user.password !== undefined && user.password !== '') {
    foundUser.password = user.password;
  }
  if (user.username !== undefined && user.username !== '') {
    foundUser.username = user.username;
  }

  return foundUser;
};

exports.deleteUser = function (id) {
  const index = users.findIndex(user => user.id === id)
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }

  return false
}