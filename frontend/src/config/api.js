const api_url = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api_origin = api_url;

export const getMediaUrl = (path) => {
  if (!path) {
    return "";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${api_origin}${path.startsWith("/") ? path : `/${path}`}`;
};

export default api_url;
