import { useSearchParams } from "react-router-dom";

function PriceFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const handleChange = (e) => {
    const { name, value } = e.target;

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } 
else {
      params.delete(name);
    }
    setSearchParams(params);
  };

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("minPrice");
    params.delete("maxPrice");
    setSearchParams(params);
  };

  return (
    <div className="card shadow-sm p-3 mb-4">
      <h5 className="mb-3">Price Filter</h5>

      <div className="mb-3">
        <label className="form-label">Minimum Price</label>
        <input
          type="number"
          name="minPrice"
          value={minPrice}
          onChange={handleChange}
          className="form-control"
          placeholder="Min Price"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Maximum Price</label>
        <input
          type="number"
          name="maxPrice"
          value={maxPrice}
          onChange={handleChange}
          className="form-control"
          placeholder="Max Price"
        />
      </div>

      <button
        className="btn btn-secondary w-100"
        onClick={clearFilter}
      >
        Clear Filter
      </button>
    </div>
  );
}

export default PriceFilter;