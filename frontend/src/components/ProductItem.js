import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
    <div className="product-item" key={product.token}>
      <Link to={`product/${product.token}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-desc">
        <Link to={`product/${product.token}`}>
          <p>{product.name}</p>
        </Link>
        <p>
          <strong>{product.price}$</strong>
        </p>
        <button>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductItem;
