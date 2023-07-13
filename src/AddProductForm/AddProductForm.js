import React, { useState, useEffect } from 'react';

const AddProductForm = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [category, setCategory] = useState('food');

  useEffect(() => {
    // Retrieve stored products from local storage on page load
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const saveProduct = () => {
    // Create an object to store product data
    const product = {
      productName: productName,
      sellingPrice: sellingPrice,
      category: category
    };
  
    // Update stored products in local storage
    updateLocalStorage();
  
    // Update the products state by appending the new product
    setProducts((prevProducts) => [...prevProducts, product]);
  
    // Clear the form after successful submission
    setProductName('');
    setSellingPrice('');
  };
  
  const updateLocalStorage = () => {
    localStorage.setItem('products', JSON.stringify(products));
  };
  
  const displayProducts = (category) => {
    // Filter products based on the selected category
    const filteredProducts = products.filter((product) => product.category === category);
  
    return (
      <ul>
        {filteredProducts.map((product, index) => (
          <li key={index}>
            <strong>Name:</strong> {product.productName}, <strong>Price:</strong> {product.sellingPrice},{' '}
            <strong>Category:</strong> {product.category}
            <button onClick={() => deleteProduct(product)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
  
  
  const deleteProduct = (product) => {
    // Remove the product from the products array
    const updatedProducts = products.filter((p) => p !== product);
    setProducts(updatedProducts);
  
    // Update stored products in local storage
    updateLocalStorage();
  };
  
  
  
  
  return (
    <div>
      <h2>Add Product</h2>
      <form>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <label htmlFor="sellingPrice">Selling Price:</label>
        <input
          type="number"
          id="sellingPrice"
          name="sellingPrice"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          required
        />

        <label htmlFor="category">Category:</label>
        <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="food">Food</option>
          <option value="electronic">Electronic Item</option>
          <option value="skincare">Skincare</option>
        </select>

        <button type="button" onClick={saveProduct}>
          Add Product
        </button>
      </form>

      <h2>Skincare</h2>
      <ul>{displayProducts('skincare')}</ul>
      <h2>Food</h2>
      <ul>{displayProducts('food')}</ul>
      <h2>Electronic items</h2>
      <ul>{displayProducts('electronic')}</ul>
    </div>
  );
};

export default AddProductForm;
