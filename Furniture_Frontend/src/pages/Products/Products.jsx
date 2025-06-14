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
  const [selectedCompany, setSelectedCompany] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const URL = import.meta.env.VITE_BACK_END_API;

  const minPrice = 100;
  const maxPrice = 10000;

  useEffect(() => {
    fetch(`${URL}/api/products/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data);
        const items = data?.items || [];
        setProducts(items);

        const defaultQuantities = {};
        items.forEach((item) => {
          defaultQuantities[item._id] = 1;
        });
        setQuantities(defaultQuantities);

        const types = [...new Set(items.map((item) => item.name))];
        if (!types.includes(selectedType)) setSelectedType("");
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [selectedType]);

  const handleClearFilter = () => {
    setPriceValue(maxPrice);
    setSelectedType("");
    setSelectedCompany("");
    setShowFilter(false);
    setSearchTerm("");
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
    // Actual logic goes here
  };

  const filteredProducts = products.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCompany || item.company === selectedCompany) &&
      (!selectedType || item.name === selectedType) &&
      item.price <= priceValue
    );
  });

  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4 bg-[#FFE8D6] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#3F4238]">Our Products</h1>

      {/* Search & Filter */}
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
          handleClearFilter={handleClearFilter}
        />
      )}

      <hr className="w-full border-[#D4C7B0] mb-6" />

      <div className="flex flex-wrap justify-center">
        {filteredProducts.map((item) => (
          <FurnitureCard
            key={item._id}
            id={item._id}
            imageURL={item.imageURL}
            name={item.name}
            description={item.description}
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
    </div>
  );
}

export default Products;
