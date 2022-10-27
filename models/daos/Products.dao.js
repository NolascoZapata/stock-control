const MongoDBContainer = require('./../containers/Mongodb.container');
const ProductSchema = require('./../schemas/Product.schema')
const collection = 'products';


class ProductsDao extends MongoDBContainer {
	static instance;
	constructor() {
		if (!ProductsDao.instance) {
			super(collection, ProductSchema);
			ProductsDao.instance = this;
			return this;
		} else {
			return ProductsDao.instance;
		}
	}
	async getProducts() {

		try {
			const products = await this.getAll();
			if (!products) {
				throw new Error(`Cant find products`)
			} else {
				return products
			}
		} catch (error) {
			console.log(error);
		}
	}

	async getProductById(id) {
		try {
			const product = await this.getById(id)
			if (!product) {
				const errorMessage = `Product with id  "${id}" does not exists`;
				throw new Error(JSON.stringify(errorMessage));
			} else {
				return product;
			}
		} catch (error) {
			console.log('error', error.message)
		}
	}
	async getProductsByCategory(category) {
		try {
			const products = await this.getAll({
				category: category
			})
			if (!products) {
				const errorMessage = `Products with category  "${category}" does not exists`;
				throw new Error(JSON.stringify(errorMessage));
			} else {
				return products;
			}
		} catch (error) {
			console.log('error', error.message)
		}
	}

	async saveProduct(product) {
		try {
			const prod = await this.createItem(product)
			if (!prod) {
				const errorMessage = `Can't save product`;
				throw new Error(JSON.stringify(errorMessage));
			} else {
				return prod;
			}
		} catch (error) {
			console.log('error', error.message)
		}
	}
	async deleteProductById(id) {
		try {
			const prod = await this.deleteById(id)
			if (!prod) {
				const errorMessage = `Can't delete product`;
				throw new Error(JSON.stringify(errorMessage));
			} else {
				return prod;
			}
		} catch (error) {
			console.log('error', error.message)
		}
	}
	async deleteProductByCategory(category) {
		try {
			const prod = await this.deleteAll(category)
			if (!prod) {
				const errorMessage = `Can't delete all products of category ${category}`;
				throw new Error(JSON.stringify(errorMessage));
			} else {
				return prod;
			}
		} catch (error) {
			console.log('error', error.message)
		}
	}
	async deleteAllProducts() {
		try {
			const products = await this.deleteAll()
			if (!products) {
				const errorMessage = `Can't delete all products`;
				throw new Error(JSON.stringify(errorMessage));
			} else {
				return products;
			}
		} catch (error) {
			console.log('error', error.message)
		}
	}

	async updateProductById(id,updatedProd) {
		try {
			const product = await this.updateById(id,updatedProd)
			if (!product) {
				const errorMessage = `Product with id "${id}" can not be updated`;
				throw new Error(JSON.stringify(errorMessage));
			} else {
				return product;
			}
		} catch (error) {
			console.log('error', error.message)
		}
	}

};

module.exports = ProductsDao;