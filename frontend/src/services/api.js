import API_BASE_URL from "../config";

export async function getProducts() {
  const res = await fetch(`${API_BASE_URL}/api/products`);
  return res.json();
}
export async function submitOrder(formData) {
  const res = await fetch(`${API_BASE_URL}/api/custom`, {
    method: "POST",
    body: formData
  });
  return res.json();
}

export async function sendContactMessage(data) {
  const res = await fetch(`${API_BASE_URL}/api/contact/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchProductDetails(id) {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
  return res.json();
}

