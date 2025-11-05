import React, { useState } from "react";
import { itemsAPI } from "../services/api";

const AddItem = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    condition: "Good",
    location: "",
    description: "",
  });

  const [attachType, setAttachType] = useState("url"); // url | upload
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let payload;

      if (attachType === "upload" && imageFile) {
        payload = new FormData();
        payload.append("name", formData.name);
        payload.append("condition", formData.condition);
        payload.append("location", formData.location);
        payload.append("description", formData.description);
        payload.append("imageFile", imageFile);
      } else {
        payload = { ...formData, image: formData.image }; // URL method
      }

      await itemsAPI.createItem(payload);

      setSuccess("Item added successfully!");
      setFormData({
        name: "",
        image: "",
        condition: "Good",
        location: "",
        description: "",
      });
      setImageFile(null);
      setPreview("");
      setAttachType("url");

      if (onItemAdded) onItemAdded();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-item-container">
      <div className="form-wrapper">
        <h2>Add New Item</h2>
        <p className="form-subtitle">
          Share items you no longer need with your community
        </p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="item-form">
          <div className="form-group">
            <label>Item Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Attachment Type *</label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label>
                <input
                  type="radio"
                  value="url"
                  checked={attachType === "url"}
                  onChange={() => setAttachType("url")}
                />{" "}
                Image URL
              </label>
              <label>
                <input
                  type="radio"
                  value="upload"
                  checked={attachType === "upload"}
                  onChange={() => setAttachType("upload")}
                />{" "}
                Upload Image
              </label>
            </div>
          </div>

          {attachType === "url" ? (
            <div className="form-group">
              <label>Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
          ) : (
            <div className="form-group">
              <label>Upload Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                required
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    maxHeight: 200,
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>
          )}

          <div className="form-group">
            <label>Condition *</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
