import express from 'express';
import { dirname, join } from 'path';
import { authMiddleware, downloadMiddleware } from '../middlewares/permissionMiddleware.js';
import { MongoClient } from 'mongodb';
const router = express.Router();

// #authMiddleware apply all routes 
// router.use(authMiddleware);

// routes using ejs
router.get('/', (req, res) => {
    // MongoClient.connect('mongodb://localhost:3000/sales', (err, db) => {
    //     if (err) throw err
    //     console.log(db)

    //     db.collection('sales').find().toArray((err, result) => {
    //         if (err) throw err
    //         console.log(result)
    //     })
    // })
    res.render('index', {
        title: 'Home'
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});
// using ejs

// apply middleware
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ name: 'jawad', age: 21, qualification: 'undergraduate' });
});

// multiple apply middleware 

// download file 
router.get('/download', [authMiddleware, downloadMiddleware], (req, res) => {
    // const file =  path.resolve(__dirname + '/public/html_javascript_book.zip');
    // const file = path.resolve(__dirname).split('/').slice(0, -1).join('/') + '/public/html_javascript_book.zip';

    // es6 module
    const __dirname = dirname(new URL(import.meta.url).pathname);
    // const filePath = join(__dirname.split('/').slice(0, -1).join('/'), 'public/html_javascript_book.zip');
    const filePath = join(__dirname, '../public/html_javascript_book.zip');
    // console.log(filePath);
    res.download(filePath);
});

export default router;