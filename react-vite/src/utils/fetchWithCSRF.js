// 🧠 Helper function to get a cookie value by name
export function getCookie(name) {
    // 🍪 Get the string of all cookies in the browser
    const cookieStr = document.cookie;
  
    // 🔪 Split cookies into an array of individual cookies
    const cookies = cookieStr.split(';');
  
    // 🔁 Loop through each cookie
    for (let cookie of cookies) {
      // 🧼 Clean whitespace, then split "key=value" into key and value
      const [key, value] = cookie.trim().split('=');
  
      // ✅ If the cookie matches the one we're looking for (e.g. "csrf_token"), return its value
      if (key === name) return decodeURIComponent(value);
    }
  
    // ❌ If no match is found, return null
    return null;
  }
  
  // 📡 Wrapper function around fetch to automatically include CSRF protection
  export async function fetchWithCSRF(url, options = {}) {
    // 🔑 Grab the csrf_token from the browser cookies
    const csrfToken = getCookie("csrf_token");
  
    // 🧪 Merge user-provided headers with our default headers
    const headers = {
      ...options.headers,
      "Content-Type": "application/json", // 🏷️ Tell server we're sending JSON
      "X-CSRFToken": csrfToken,           // 🛡️ Send CSRF token to Flask
    };
  
    // 🚀 Make the actual request with all options + credentials
    return fetch(url, {
      ...options,             // 📦 Keep any method/body/etc. the caller passed in
      headers,                // ✅ Add our custom headers (with CSRF)
      credentials: "include", // 🍪 Ensure cookies are included in the request (important!)
    });
  }
  