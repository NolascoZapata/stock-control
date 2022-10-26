const formatUserForDB = (userObj) => {
  let date= new Date
  const newUser = {
    name:userObj.name,
    email: userObj.email,
    password: userObj.password,
    isAdmin: userObj.isAdmin,
    userAvatar: userObj.userAvatar,
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}