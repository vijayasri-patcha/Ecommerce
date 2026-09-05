import { useState } from "react";
import { toast } from "react-toastify";
import { useAddProductMutation } from "../redux/productsApi";

function AddProduct() {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState("");
  const [sizes, setSizes] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("des", des);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("categories", categories);
    formData.append("sizes", sizes);
    formData.append("imageUrl", imageUrl);

    try {
      await addProduct(formData).unwrap();

      toast.success("Product Added Successfully");

      setName("");
      setDes("");
      setPrice("");
      setStock("");
      setCategories("");
      setSizes("");
      setImageUrl(null);

      // Clear file input
      document.getElementById("imageUrl").value = "";
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add Product</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={des}
              onChange={(e) => setDes(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Categories (comma separated)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Mens wear, Kids wear"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Sizes (comma separated)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="S,M,L,XL"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Product Image</label>
            <input
              id="imageUrl"
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImageUrl(e.target.files[0])}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isLoading}
          >
            {isLoading ? "Adding Product..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;