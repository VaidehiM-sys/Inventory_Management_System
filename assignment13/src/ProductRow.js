import React, {Component} from 'react';

class ProductRow extends Component {
    constructor(props) {
        super(props)
        this.destroy = this.destroy.bind(this);
    }
    destroy() {
        this.props.onDestroy(this.props.product._id);
    }
    render() {
        const product = this.props.product.product;
        return (
            <tr>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.instock ? 'Yes' : 'No'}</td>
                <td className="text-right">
                    <button onClick={this.destroy} className="btn btn-info">Delete</button>
                </td>
            </tr>
        )
    }
}
export default ProductRow
