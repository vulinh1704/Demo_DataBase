const Connection = require('../model/connection');
Connection.connecting();

class ProductService {
    static getProducts() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query('select * from product', (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        })
    }

    static saveProduct(product) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`insert into product(name, price, description,idCategory) VALUES ('${product.name}', ${+product.price}, '${product.description}' , '${+product.idCategory}')`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Create Success !!!');
                    resolve(products);
                }
            });
        })
    }

    static findById(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select * from product where id = ${id}`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        })
    }

    static editProduct(product, id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`update product set name = '${product.name}' , price = ${product.price} , description = '${product.description}' where id = ${id}`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Edit Success !!!');
                    resolve(products);
                }
            });
        })
    }
}

module.exports = ProductService;
