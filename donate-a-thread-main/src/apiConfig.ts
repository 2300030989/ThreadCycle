// Combine both links into one "Smart Link"
// If we're on the live server, use its own domain
// If we're developing, use localhost
export const API_BASE_URL = window.location.origin.includes('localhost') 
  ? "http://localhost:5000" 
  : window.location.origin;
