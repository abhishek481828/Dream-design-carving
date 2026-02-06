import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminNav from "../components/AdminNav";
import API_BASE_URL from "../config";
import "./AdminProducts.css";

const API_URL = `${API_BASE_URL}/api/products`;

const CATEGORY_LABELS = {
    doors: "Wooden Doors",
    furniture: "Furniture",
    sculptures: "Sculptures",
    panels: "Decorative Panels",
    custom: "Custom Designs"
};

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const adminToken = localStorage.getItem("adminToken");

    // Form State
    const [form, setForm] = useState({
        name: "",
        description: "",

        category: "doors",
        image: "",
        featured: false
    });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch(API_URL);
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to load products");
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const [uploadType, setUploadType] = useState("url"); // "url" or "file"
    const [imageFile, setImageFile] = useState(null);

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!adminToken) return toast.error("Unauthorized");

        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `${API_URL}/${editingId}` : API_URL;

            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("description", form.description);

            formData.append("category", form.category);
            formData.append("featured", form.featured);

            if (uploadType === "file" && imageFile) {
                formData.append("image", imageFile);
            } else {
                formData.append("image", form.image);
            }

            const res = await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${adminToken}`
                },
                body: formData
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(editingId ? "Product Updated!" : "Product Added!");
                fetchProducts();
                setForm({ name: "", description: "", category: "doors", image: "", featured: false });
                setImageFile(null);
                setShowForm(false);
                setEditingId(null);
            } else {
                toast.error(data.message || "Operation failed");
            }
        } catch (error) {
            toast.error("Error submitting form");
        }
    };

    const handleEdit = (product) => {
        setForm(product);
        setEditingId(product._id);
        setShowForm(true);
        // Reset upload state on edit
        setUploadType("url");
        setImageFile(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${adminToken}`
                }
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Product Deleted");
                fetchProducts();
            } else {
                toast.error(data.message || "Failed to delete");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Error deleting product");
        }
    };

    const [activeCategory, setActiveCategory] = useState("doors");

    const filteredProducts = products.filter(p => p.category === activeCategory);

    // ... existing handlers ...

    return (
        <div className="admin-products-container">
            <div className="admin-header">
                <div>
                    <h2>Admin Dashboard</h2>
                    <AdminNav />
                </div>
                <button className="add-btn" onClick={() => {
                    setShowForm(!showForm);
                    setEditingId(null);
                    setForm({
                        name: "",
                        description: "",
                        category: activeCategory, // Default to active category
                        image: "",
                        featured: false
                    });
                    setImageFile(null);
                }}>
                    {showForm ? "Close Form" : "+ Add New Product"}
                </button>
            </div>

            <div className="category-tabs">
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <button
                        key={key}
                        className={`category-tab-btn ${activeCategory === key ? 'active' : ''}`}
                        onClick={() => setActiveCategory(key)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {showForm && (
                <form className="product-form" onSubmit={handleSubmit}>
                    <h3>{editingId ? "Edit Product" : `Add New ${CATEGORY_LABELS[activeCategory]} Product`}</h3>

                    <div style={{ display: 'grid', gridColumn: '1 / -1', gap: '1rem', gridTemplateColumns: '1fr' }}>
                        <input name="name" placeholder="Product Name" value={form.name} onChange={handleInputChange} required />
                    </div>

                    <select name="category" value={form.category} onChange={handleInputChange}>
                        {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>

                    <div className="upload-toggle">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                value="url"
                                checked={uploadType === "url"}
                                onChange={() => setUploadType("url")}
                            />
                            <span>Image URL</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                value="file"
                                checked={uploadType === "file"}
                                onChange={() => setUploadType("file")}
                            />
                            <span>Upload File</span>
                        </label>
                    </div>

                    {uploadType === "url" ? (
                        <input name="image" placeholder="Image URL (e.g., https://example.com/image.jpg)" value={form.image} onChange={handleInputChange} required={!editingId} />
                    ) : (
                        <input type="file" accept="image/*" onChange={handleFileChange} required={!editingId} />
                    )}

                    <textarea name="description" placeholder="Product Description" value={form.description} onChange={handleInputChange} required />

                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '1rem' }}>
                            <input type="checkbox" name="featured" checked={form.featured} onChange={handleInputChange} style={{ width: 'auto' }} />
                            Featured Product (Show on Home Page)
                        </label>
                    </div>

                    <button type="submit">{editingId ? "Update Product" : "Save Product"}</button>
                </form>
            )}

            <div className="product-list">
                {loading ? <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Loading products...</div> : (
                    <table>
                        <thead>
                            <tr>
                                <th width="80">Image</th>
                                <th>Name</th>
                                <th>Category</th>

                                <th width="200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                                        No products found in {CATEGORY_LABELS[activeCategory]}.
                                        <br />
                                        <button
                                            style={{ marginTop: '10px', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                            onClick={() => {
                                                setShowForm(true);
                                                setEditingId(null);
                                                setForm({
                                                    name: "", description: "", category: activeCategory, image: "", featured: false
                                                });
                                                setImageFile(null);
                                            }}
                                        >
                                            + Add one now
                                        </button>
                                    </td>
                                </tr>
                            ) : filteredProducts.map(p => (
                                <tr key={p._id}>
                                    <td><img src={p.image} alt={p.name} className="table-img" /></td>
                                    <td>
                                        <div style={{ fontWeight: '600' }}>{p.name}</div>
                                        {p.featured && <span style={{ fontSize: '0.75rem', color: '#ea580c', background: '#ffedd5', padding: '2px 6px', borderRadius: '4px' }}>Featured</span>}
                                    </td>
                                    <td>{CATEGORY_LABELS[p.category] || p.category}</td>

                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
