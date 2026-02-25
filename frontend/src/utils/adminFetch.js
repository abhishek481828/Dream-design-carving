/**
 * Wrapper around fetch for admin API calls.
 * Automatically attaches the admin token and redirects to login on 401.
 */
export async function adminFetch(url, options = {}) {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
    return null;
  }

  return res;
}
