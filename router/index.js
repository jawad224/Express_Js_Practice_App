const router = require('express').Router();
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware');
const downloadMiddleware = require('../middlewares/downloadPermission');

// #authMiddleware apply all routes 
// router.use(authMiddleware);

// routes using ejs
router.get('/', (req, res) => {
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
    const file = path.resolve(__dirname).split('/').slice(0, -1).join('/') + '/public/html_javascript_book.zip';
    res.download(file);
});

module.exports = router;