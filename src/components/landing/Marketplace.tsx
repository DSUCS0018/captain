import Image from 'next/image';

const products = [
  { id: 1, name: "Product 1", price: 100, image: "product1.jpg" },
  { id: 2, name: "Product 2", price: 200, image: "product2.jpg" },
  { id: 3, name: "Product 3", price: 150, image: "product3.jpg" },
];

export default function Marketplace() {
  return (
    <section className="p-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-md p-4 text-center"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}  // Adjust width and height as needed
              height={300}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-700">Price: {product.price} credits</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
