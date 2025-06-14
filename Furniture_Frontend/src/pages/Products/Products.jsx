import { useState, useEffect } from "react";
import {
  FurnitureCard,
  FilterPanel,
  SearchFilter,
} from "../../components/indexComponents.js";

function Products() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [priceValue, setPriceValue] = useState(10000);
  const [selectedType, setSelectedType] = useState("");
  // const [selectedCompany, setSelectedCompany] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const URL = import.meta.env.VITE_BACK_END_API;

  const minPrice = 100;
  const maxPrice = 10000;

  // Fetch products from backend
  useEffect(() => {
    fetch(`${URL}/api/products/`)
      .then((res) => res.json())
      .then((data) => {
        const items = data?.items || [];
        setProducts(items);

        // Initialize quantity for each product
        const defaultQuantities = {};
        items.forEach((item) => {
          defaultQuantities[item._id] = 1;
        });
        setQuantities(defaultQuantities);

        // Reset selected type if it no longer exists
        const types = [...new Set(items.map((item) => item.name))];
        if (!types.includes(selectedType)) setSelectedType("");
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [selectedType, URL]);

  // Reset filters
  const handleClearFilter = () => {
    setPriceValue(maxPrice);
    setSelectedType("");
    setSearchTerm("");
    setShowFilter(false);
  };

  // Quantity handlers
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
    // Cart functionality to be added
  };

  // Filter logic
  const filteredProducts = products.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedType || item.name === selectedType) &&
      item.price <= priceValue
    );
  });

  useEffect(() => {
    if (filteredProducts.length === 0 && searchTerm) {
      console.warn("No products found for the current search term.");
    }
  }, [filteredProducts, searchTerm]);

  return (
    <div className="bg-[#FFE8D6] min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold mb-6 text-[#3F4238]">Our Products</h1>
        {/* Search bar and filter toggle */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />
        {/* Filter panel */}
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

        {console.log("Filtered Products:", filteredProducts)}

        {/* Divider */}
        <hr className="w-full border-[#D4C7B0] my-6" />
        {/* Product Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <FurnitureCard
              key={item._id}
              id={item._id}
              imageURL={item.imageURL}
              name={item.name}
              company={item.company}
              price={item.price}
              stock={item.stock}
              inStock={item.stock > 0}
              quantities={quantities}
              images={item.images}
              handleAddToCart={handleAddToCart}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          ))}
        </div>
        {/* No results message */}
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
