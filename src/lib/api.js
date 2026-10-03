const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `${BASE_URL}/api`;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop().split(";").shift());
  return null;
}

export async function apiFetch(endpoint, options = {}) {
  const { method = "GET", body, headers = {} } = options;
  const xsrfToken = getCookie("XSRF-TOKEN");

  const config = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(xsrfToken ? { "X-XSRF-TOKEN": xsrfToken } : {}),
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorObj = new Error(
        data.message || `Terjadi kesalahan (${response.status})`,
      );
      errorObj.status = response.status;
      errorObj.errors = data.errors;
      throw errorObj;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCsrfToken() {
  await fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
  });
}

export async function login(email, password, captchaToken, remember = false) {
  await getCsrfToken();
  return await apiFetch("/login", {
    method: "POST",
    body: {
      email,
      password,
      captcha_token: captchaToken,
      remember,
    },
  });
}

export async function logout() {
  return await apiFetch("/logout", {
    method: "POST",
  });
}

export async function getMe() {
  return await apiFetch("/me", {
    method: "GET",
  });
}
