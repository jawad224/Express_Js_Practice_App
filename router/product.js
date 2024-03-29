import express from 'express' 
const router = express.Router();
import ErrorHandler from '../errors/errorHanlder.js';
import Products from '../static/productData.js';

// routes using ejs
router.get('/products', (req, res) => {
    res.render('product', {
        title: 'Products'
    });
});


router.get('/api/products', (req, res) => {
    res.json(Products);
});
router.get('/api/product/:id', (req, res, next) => {
    try {
        const { id } = req.params;
        if (!Products.arrayOfProducts.filter((e) => e.id == id)) {
            return res.status(404).json({ status: false, message: 'product id required' })
        }
        console.log('products==>',Products.arrayOfProducts)
        console.log('id==>',id)
        const products = Products.arrayOfProducts.find((e) => e.id == id);
        // Products.arrayOfProducts = products;
        return res.json({ status: true, data: products })
    } catch (err) {
        next(ErrorHandler.ServerError(err.message));
    }
});

router.post('/api/products', (req, res, next) => {
    try {
        const { name, price, imgUrl } = req.body
        if (!name || !price || !imgUrl) {
            next(ErrorHandler.ValidationError('name, price & image feild are required'));
            // throw new Error('all feils are required');
            // return res.status(404).json({ status: false, message: 'all feilds are required' })
        }

        Products.arrayOfProducts.push({
            id: new Date().getTime().toString(),
            name,
            price,
            imgUrl
        })

        res.json({ status: true, data: Products.arrayOfProducts });
    } catch (err) {
        next(ErrorHandler.ServerError(err.message));
    }
});

router.delete('/api/products/:id', (req, res, next) => {
    try {
        const { id } = req.params;
        if (!Products.arrayOfProducts.filter((e) => e.id == id)) {
            return res.status(404).json({ status: false, message: 'product id required' })
        }
        const products = Products.arrayOfProducts.filter((e) => e.id != id);
        Products.arrayOfProducts = products;
        res.json({ status: true, data: products })
    } catch (err) {
        next(ErrorHandler.ServerError(err.message));
    }
});

export default router;