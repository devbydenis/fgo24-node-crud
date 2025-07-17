const users = [
  {
    id: 1,
    email: 'denis@gmail.com',
    password: 'denis123',
    username: 'denisrahmadi'
  },
  {
    id: 2,
    email: 'sarah@gmail.com',
    password: 'sarah456',
    username: 'sarahsmith'
  },
  {
    id: 3,
    email: 'mike@gmail.com',
    password: 'mike789',
    username: 'mikejones'
  },
  {
    id: 4,
    email: 'lisa@gmail.com',
    password: 'lisa101',
    username: 'lisawong'
  },
  {
    id: 5,
    email: 'david@gmail.com',
    password: 'david202',
    username: 'davidlee'
  },
  {
    id: 6,
    email: 'anna@gmail.com',
    password: 'anna303',
    username: 'annakim'
  },
  {
    id: 7,
    email: 'james@gmail.com',
    password: 'james404',
    username: 'jamesbrown'
  },
  {
    id: 8,
    email: 'emily@gmail.com',
    password: 'emily505',
    username: 'emilytaylor'
  },
  {
    id: 9,
    email: 'ryan@gmail.com',
    password: 'ryan606',
    username: 'ryangarcia'
  },
  {
    id: 10,
    email: 'olivia@gmail.com',
    password: 'olivia707',
    username: 'oliviamartinez'
  },
  {
    id: 11,
    email: 'william@gmail.com',
    password: 'william808',
    username: 'williamclark'
  },
  {
    id: 12,
    email: 'sophia@gmail.com',
    password: 'sophia909',
    username: 'sophiarodriguez'
  },
  {
    id: 13,
    email: 'ethan@gmail.com',
    password: 'ethan1010',
    username: 'ethanhall'
  },
  {
    id: 14,
    email: 'ava@gmail.com',
    password: 'ava1111',
    username: 'avawhite'
  },
  {
    id: 15,
    email: 'noah@gmail.com',
    password: 'noah1212',
    username: 'noahallen'
  },
  {
    id: 16,
    email: 'mia@gmail.com',
    password: 'mia1313',
    username: 'mialopez'
  },
  {
    id: 17,
    email: 'liam@gmail.com',
    password: 'liam1414',
    username: 'liamscott'
  },
  {
    id: 18,
    email: 'charlotte@gmail.com',
    password: 'charlotte1515',
    username: 'charlottegreen'
  },
  {
    id: 19,
    email: 'benjamin@gmail.com',
    password: 'benjamin1616',
    username: 'benjaminadams'
  },
  {
    id: 20,
    email: 'amelia@gmail.com',
    password: 'amelia1717',
    username: 'amelianelson'
  }
];

exports.createUser = function(user) {
  users.push({id: users.length + 1, ...user});
  return user;
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