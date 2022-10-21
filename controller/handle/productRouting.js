const fs = require('fs');
const ProductService = require('D:\\JavaScript\\Module3\\Module3DemoDatabase\\service\\productService.js');
class ProductRouting {
    static getHtmlProducts(products, indexHtml) {
        let tbody = '';
        products.map((product, index) => {
            tbody += `<tr>
            <th scope="row">${index}</th>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><a href="/edit/${product.id}" class="btn btn-danger">Edit</a></td>
            <td><a href="/delete/${product.id}" class="btn btn-danger">Delete</a></td>
        </tr>`
        });
        indexHtml = indexHtml.replace('{products}', tbody);
        return indexHtml;
    }
    static showHome(req , res) {
        fs.readFile('./views/index.html' , 'utf-8', async (err, indexHtml) => {
            if(err){
                console.log(err);
            } else {
                let products = await ProductService.getProducts();
                indexHtml = ProductRouting.getHtmlProducts(products , indexHtml);
                console.log(indexHtml);
                res.writeHead(200 , 'text/html');
                res.write(indexHtml);
                res.end();
            }
        })
    }
}
module.exports = ProductRouting;
