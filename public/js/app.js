const App = () => {
    const [Products, setProducts] = React.useState([]);
    const [Form, setForm] = React.useState({
        imgUrl: '',
        name: '',
        price: '',
    });

    React.useEffect(() => {
        FetchProducts();
    }, [])

    const FetchProducts = () => {
        fetch('/api/products')
            .then((res) => res.json())
            .then(data => {
                const { arrayOfProducts } = data;
                setProducts(arrayOfProducts);
            })
    }

    const addProduct = () => {
        fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Form),
        }).then((res) => res.json())
            .then(res => {
                if (res.status) {
                    setProducts(res.data);
                } else {
                    console.log(res.message);
                }
            })
    }

    const deleteProduct = (id) => {
        fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json())
            .then(res => {
                if (res.status) {
                    setProducts(res.data);
                } else {
                    console.log(res.message);
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct();
    }

    const handleInputChange = (e, feild) => {
        if (feild === 'name') {
            setForm({
                ...Form,
                name: e.target.value
            })
        } else if (feild === 'price') {
            setForm({
                ...Form,
                price: e.target.value
            })
        } else {
            setForm({
                ...Form,
                imgUrl: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const AllProducts = Products.map((e, i) => (
        <div className="col-md-3" key={i}>
            <div className="card">
                <img src={e.imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{e.name}</h5>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    <a href="#" className="btn btn-primary">{`$ ${e.price}`}</a>
                    <a onClick={() => deleteProduct(e.id)} className="btn btn-danger ms-3">Delete</a>
                </div>
            </div>
        </div>
    ))

    return (
        <div className="row">
            <div className="card mb-5">
                <h5 className="card-header">Add Product</h5>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="col-md-12 text-start">
                            <div className="mb-3">
                                <label htmlFor="imgUrl" className="form-label">Image</label>
                                <input type="file" onChange={(e) => handleInputChange(e, 'imgUrl')} className="form-control" id="imgUrl" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" value={Form.name} onChange={(e) => handleInputChange(e, 'name')} className="form-control" id="name" placeholder="Enter Product Name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" value={Form.price} onChange={(e) => handleInputChange(e, 'price')} className="form-control" id="price" placeholder="Enter Product Price" />
                            </div>
                        </div>
                        <div className="col-md-12 text-end">
                            <button type="submit" className='btn btn-primary'>Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
            {AllProducts}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('reactApp'));
