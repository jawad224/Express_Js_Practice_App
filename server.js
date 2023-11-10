import express from 'express';
const app = express();
import mainRouters from './router/index.js';
import productRouters from './router/product.js';
import ErrorHandler from './errors/errorHanlder.js';
const PORT = process.env.PORT || 3001;
import cors from 'cors'
app.use(cors())


// static files serve
app.use(express.static('public'));
// static files serve end

// json receive post & put request 
app.use(express.json());
// json receive post & put request 

// ejs
app.set('view engine', 'ejs');
// ejs



// #override views to any foldername do you want to override
// app.set('views', path.resolve(__dirname + '/templates'));
// End

// #Simple route
// app.get('/', (req, res) => {
//     res.send("Hello World");
// })

// routes using sendFile
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname + '/index.html'));
// })

// app.get('/about', (req, res) => {
//     res.sendFile(path.resolve(__dirname + '/about.html'));
// })

// Global authMiddleware apply
// app.use(authMiddleware);
// #Routes Using express routes  
app.use(mainRouters);
app.use(productRouters);
// Add preffix
// app.use('/practice',mainRouters);

app.use((req, res, next) => {
    return res.status(404).json({ message: "page not found" })
});

// validation Middleware
app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({ errors: { status: err.status, message: err.message } });
    } else {
        res.status(500).json({ errors: { status: err.status, message: err.message } })
    }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));