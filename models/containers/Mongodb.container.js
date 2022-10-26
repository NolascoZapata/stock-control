const mongoose = require('mongoose');

class MongoDBContainer {
  static instance;
  constructor(collection, Schema) {
    this.model = mongoose.model(collection, Schema);
  };

  async getAll(filter = {}) {
    try{
      const documents = await this.model.find(filter,{ __v: 0 }).lean();
      if (!documents) {
        const error = `Resources do not exist in our records`;
        throw new Error(error)
      } else {
        return documents;
      }
    }
    catch(error) {
      console.log('error',error.message)
    }
  }

  async getById(id) {
    try {
      const document = await this.model.findById(id, { __v: 0 }).lean();
      if (!document) {
        const error = `Resource with id ${id} does not exist in our records`;
        throw new Error(error);

      } else {
        return document;
      }
    }
    catch(error) {
      console.log('error',error.message)
      
    }
  }

  async createItem(resourceItem) {
    try {
      const newItem = new this.model(resourceItem);
      newItem.timestamp = new Date()
      await newItem.save();
      
      return newItem;
    }
    catch (error) {
      console.log('error',error.message)
    }
  }

  async deleteAll(filter = {}){
    try{
      const documents = await this.model.deleteMany(filter,{ __v: 0 }).lean();
      if (!documents) {
        const error = `Resources do not exist in our records`;
        throw new Error(error)
      } else {
        return documents;
      }
    }
    catch(error) {
      console.log('error',error.message)
    }
  }
  async deleteById(id){
    try {
      const document = await this.model.findById(id, { __v: 0 }).lean();
      if (!document) {
        const error = `Resource with id ${id} does not exist in our records`;
        throw new Error(error)
      } else {
        await this.model.deleteOne({_id:id})
        return document;
      }
    }
    catch(error) {
      console.log('error',error.message)
      
    }
  }

  async getByEmail(email){
    try {
      const document = await this.model.findOne({email:email}).lean();
      if (!document) {
        const error = `Resource with email ${email} does not exist in our records`;
        throw new Error(error)
      } else {
        return document;
      }
    }
    catch(error) {
      console.log('error',error.message)
      
    }
  }

  async updateById(id,updatedItem){
    try {
      const document = await this.model.findOneAndReplace({_id:id},updatedItem)
      if (!document) {
        const error = `Resource with id ${id} does not exist in our records`;
        throw new Error(error)
      } else {
        return document;
      }

    } catch (error) {
      console.log('error',error.message)
    }
  }

}
module.exports = MongoDBContainer;
