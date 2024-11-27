import { useState } from 'react';
import Image from 'next/image';
"use client"; 



// Define the type for the Product
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Initial product data
const initialProducts: Product[] = [
  { id: 1, name: "Product 1", price: 100, image: "/images/product1.jpg" },
  { id: 2, name: "Product 2", price: 200, image: "/images/product2.jpg" },
  { id: 3, name: "Product 3", price: 150, image: "/images/product3.jpg" },
];

export default function Marketplace() {
  const [products, setProducts] = useState<Product[]>(initialProducts); // Marketplace products
  const [userCredits, setUserCredits] = useState<number>(1000); // User's credits
  const [secondHandMarket, setSecondHandMarket] = useState<Product[]>([]); // Second-hand market products

  // Handle buying a product
  const handleBuy = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product && userCredits >= product.price) {
      setUserCredits(userCredits - product.price); // Deduct credits
      alert(`You bought ${product.name}! Remaining credits: ${userCredits - product.price}`);
      updateMarketplace(productId); // Remove the purchased product
    } else {
      alert("Not enough credits!");
    }
  };

  // Remove product from marketplace
  const updateMarketplace = (productId: number) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts); // Update the state to re-render the marketplace
  };

  // Handle reselling a product to the second-hand market
  const handleResell = (product: Product) => {
    setSecondHandMarket((prev) => [...prev, product]); // Add product to second-hand market
    alert(`${product.name} added to the Second-Hand Market!`);
  };

  return (
    <section className="p-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Marketplace</h2>

      {/* Display marketplace products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-md p-4 text-center">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-700">Price: {product.price} credits</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
              onClick={() => handleBuy(product.id)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* Second-Hand Market Section */}
      <h2 className="text-3xl font-bold text-center mt-8 mb-4">Second-Hand Market</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {secondHandMarket.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-md p-4 text-center">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-700">Price: {product.price} credits</p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600"
              onClick={() => handleResell(product)}
            >
              Resell
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xl">Your Credits: {userCredits}</p>
      </div>
    </section>
  );
}
