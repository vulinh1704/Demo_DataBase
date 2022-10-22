const fs = require('fs');
const qs = require('qs');
const ProductService = require('D:\\JavaScript\\Module3\\Module3DemoDatabase\\service\\productService.js');

class ProductRouting {
    static getHtmlProducts(products, indexHtml) {
        let tbody = '';
        products.map((product, index) => {
            tbody += `<tr style="text-align: center">
            <td>${index}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><a href="product/edit/${product.id}" class="btn btn-danger">Edit</a></td>
            <td><a href="product/delete/${product.id}" class="btn btn-danger">Delete</a></td>
        </tr>`
        });
        indexHtml = indexHtml.replace('{products}', tbody);
        return indexHtml;
    }

    static showHome(req, res) {
        fs.readFile('./views/index.html', 'utf-8', async (err, indexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let products = await ProductService.getProducts();
                indexHtml = ProductRouting.getHtmlProducts(products, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(indexHtml);
                res.end();
            }
        });
    }

    static showFormCreate(req, res) {
        if (req.method === "GET") {
            fs.readFile('./views/product/create.html', 'utf-8', async (err, indexHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(indexHtml);
                    res.end();
                }
            });
        } else {
            let productChunk = '';
            req.on('data', chunk => {
                productChunk += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    let product = qs.parse(productChunk);
                    await ProductService.saveProduct(product);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            });
        }
    };

    static showFormEdit(req, res, id) {
        if (req.method === "GET") {
            fs.readFile('./views/product/edit.html', 'utf-8', async (err, editHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let product = await ProductService.findById(id);
                    editHtml = editHtml.replace('{name}', product[0].name);
                    editHtml = editHtml.replace('{price}', product[0].price);
                    editHtml = editHtml.replace('{description}', product[0].description);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            });
        } else {
            let productChunk = '';
            req.on('data', chunk => {
                productChunk += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    let product = qs.parse(productChunk);
                    await ProductService.editProduct(product, id);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            });
        }
    };
}

module.exports = ProductRouting;
