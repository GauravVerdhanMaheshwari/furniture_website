// pages/Products.jsx
import { useState, useEffect } from "react";
import {
  FurnitureCard,
  FilterPanel,
  SearchFilter,
} from "../../components/indexComponents.js";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [priceValue, setPriceValue] = useState(10000);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const URL = import.meta.env.VITE_BACK_END_API;
  const minPrice = 100;
  const maxPrice = 10000;

  useEffect(() => {
    fetch(`${URL}/api/products/`)
      .then((res) => res.json())
      .then((data) => {
        const items = data || [];
        setProducts(items);

        const defaultQuantities = {};
        items.forEach((item) => {
          defaultQuantities[item._id] = 1;
        });
        setQuantities(defaultQuantities);

        const types = [...new Set(items.map((item) => item.type))];
        if (!types.includes(selectedType)) setSelectedType("");

        setFilteredProducts(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, [selectedType, URL]);

  useEffect(() => {
    const filtered = products.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || item.type === selectedType;
      const matchesPrice = item.price <= priceValue;
      return matchesSearch && matchesType && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedType, priceValue]);

  const handleClearFilter = () => {
    setPriceValue(maxPrice);
    setSelectedType("");
    setSearchTerm("");
    setShowFilter(false);
  };

  const handleIncrement = (id, maxStock) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 1) + 1, maxStock),
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const handleAddToCart = (id, quantity) => {
    console.log(`Added ${quantity} of product ${id} to cart.`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F1EB]">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-t-[#DDBEA9] border-b-[#A68A64] border-l-transparent border-r-transparent animate-spin"></div>
            <div className="absolute inset-4 rounded-full bg-[#F8F1EB]"></div>
          </div>
          <p className="text-[#7A5C3E] font-semibold text-lg">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFE8D6] min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-[#3F4238]">Our Products</h1>

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />

        {showFilter && (
          <FilterPanel
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceValue={priceValue}
            setPriceValue={setPriceValue}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            handleClearFilter={handleClearFilter}
            products={products}
          />
        )}

        <hr className="w-full border-[#D4C7B0] my-6" />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <FurnitureCard
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              type={item.type}
              imageURL={item.imageURL}
              company={item.company}
              price={item.price}
              height={item.size.height}
              width={item.size.width}
              depth={item.size.depth}
              images={item.images}
              handleAddToCart={() =>
                handleAddToCart(item._id, quantities[item._id] || 1)
              }
              handleIncrement={() => handleIncrement(item._id, item.stock)}
              handleDecrement={() => handleDecrement(item._id)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-8 text-lg text-[#6B705C] font-medium">
            No products match your search.
          </p>
        )}
      </div>
    </div>
  );
}

export default Products;
