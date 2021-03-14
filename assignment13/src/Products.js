import React, {Component} from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            products: []
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    handleSave(product) {
        const id = new Date().getTime()
        if (!product.id) {
            product.id = id
        }
        fetch("http://localhost:5000/product/create", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({product})
        })
            .then(res => res.json())
            .then(product => {
                this.setState((prevState) => {
                    let products = prevState.products;
                    products.push(product);
                    return {products};
                })
            })
            .catch(err => console.log(err));
    }

    handleDestroy(productId) {
        fetch(`http://localhost:5000/product/delete/${productId}`, {method: 'delete'})
            .then(res => res.json())
            .then(data => {
                this.setState((prevState) => {
                    let products = prevState.products.filter(product => product._id !== data.id);
                    return {products};
                });
            });
    }

    componentDidMount() {
        fetch("http://localhost:5000/product/get")
            .then(res => res.json())
            .then(products => this.setState({products: products}))
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                <h1>My Inventory</h1>
                <Filters onFilter={this.handleFilter}/>
                <ProductTable
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onDestroy={this.handleDestroy}/>
                <ProductForm onSave={this.handleSave}/>
            </div>
        )
    }
}

export default Products;