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