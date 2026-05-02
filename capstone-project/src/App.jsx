import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const itemsPerPage = 10;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const API = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`;

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(API);
        const data = await res.json();

        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [page]);

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(total / itemsPerPage);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <h1>🛍️ City Store</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Cart Items: {cart.length}</h3>

      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>
          Previous
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>

      {loading && <h2 style={{ textAlign: "center" }}>Loading...</h2>}

      <div className="products">
        {filteredProducts.map((item) => (
          <div key={item.id} className="card">
            <img src={item.thumbnail} alt={item.title} />
            <h4>{item.title}</h4>
            <p>₹ {item.price}</p>
            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;