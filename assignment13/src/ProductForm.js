import React, {Component} from 'react';

const RESET_VALUES = {id: '', category: '', price: '', name: '', instock: false};

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            product: Object.assign({}, RESET_VALUES),
            errors: {}
        }
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState((prevState) => {
            if (target.type === 'checkbox') {
                prevState.product[name] = target.checked;
            } else {
                prevState.product[name] = value;
            }
            return {product: prevState.product};
        })
    }

    handleSave(e) {
        this.props.onSave(this.state.product);
        // reset the form values to blank after submitting
        this.setState({
            product: Object.assign({}, RESET_VALUES),
            errors: {}
        });
        // prevent the form submit event from triggering an HTTP Post
        e.preventDefault();
    }

    render() {
        return (
            <form>
                <h4>Add a new product</h4>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" onChange={this.handleChange}
                           value={this.state.product.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input type="text" className="form-control" name="category" onChange={this.handleChange}
                           value={this.state.product.category}/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input type="text" className="form-control" name="price" onChange={this.handleChange}
                               value={this.state.product.price}/>
                    </div>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" name="instock" onChange={this.handleChange}/>
                    <label className="form-check-label" htmlFor="instock">In Stock</label>
                </div>
                <input type="submit" className="btn btn-info" value="Save" onClick={this.handleSave}/>
            </form>
        )
    }
}

export default ProductForm