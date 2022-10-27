const MongoDBContainer = require('./../containers/Mongodb.container');
const UserSchema = require('./../schemas/User.schema')
const collection = 'users';


class UsersDao extends MongoDBContainer {
  static instance;
  constructor() {
    if (!UsersDao.instance) {
      super(collection, UserSchema);
      UsersDao.instance = this;
      return this;
    } else {
      return UsersDao.instance;
    }
  }
  async getAllUsers() {

    try {
      const Users = await this.getAll();
      if (!Users) {
        throw new Error(`Cant find Users`)
      } else {
        return Users
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getUserByEmail(email) {
    try {
      const user = await this.getByEmail(email)
      if (!user) {
        const errorMessage = `User with email  "${email}" does not exists`;
        throw new Error(JSON.stringify(errorMessage));
      } else {
        return user;
      }
    } catch (error) {
      console.log('error', error.message)
    }
  }
  async saveUser(newUser) {
    try {
      const user = await this.createItem(newUser)
      if (!user) {
        const errorMessage = `Can't save user`;
        throw new Error(JSON.stringify(errorMessage));
      } else {
        return user;
      }
    } catch (error) {
      console.log('error', error.message)
    }
  }
  async deleteUserByEmail(email) {
    try {
      const user = await this.deleteAll({email: email})
      if (!user) {
        const errorMessage = `Can't delete user with email : ${email}`;
        throw new Error(JSON.stringify(errorMessage));
      } else {
        return user;
      }
    } catch (error) {
      console.log('error', error.message)
    }
  }
  async getUserById(id) {
    try {
      const user = await this.getById({ _id: id})
      if (!user) {
        const errorMessage = `Can't get user with id : ${id}`;
        throw new Error(JSON.stringify(errorMessage));
      } else {
        return user;
      }
    } catch (error) {
      console.log('error', error.message)
    }
  }
  async deleteAllUsers() {
    try {
      const users = await this.deleteAll()
      if (!users) {
        const errorMessage = `Can't delete all Users`;
        throw new Error(JSON.stringify(errorMessage));
      } else {
        return users;
      }
    } catch (error) {
      console.log('error', error.message)
    }
  }

  async updateUserById(id,updatedUser) {
		try {
			const user = await this.updateById(id,updatedUser)
			if (!user) {
				const errorMessage = `User with id "${id}" can not be updated`;
				throw new Error(JSON.stringify(errorMessage));
			} else {
				return user;
			}
		} catch (error) {
			console.log('error', error.message)
		}
	}
}

module.exports = UsersDao;