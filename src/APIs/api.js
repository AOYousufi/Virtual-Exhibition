import axios from "axios";

// Set VITE_API_BASE_URL during deployment to override the existing API host.
const backendApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://se-exhibiton-be.onrender.com/api",
  timeout: 15000,
});

const getError = (error, fallback) => {
  if (axios.isCancel(error)) return error;
  const message = error.response?.data?.error || error.message || fallback;
  const normalized = new Error(message);
  normalized.status = error.response?.status || 0;
  return normalized;
};

const getAllArtworks = async (
  query,
  page = 1,
  classification,
  technique,
  sortOpt,
  sortOrder,
  signal
) => {
  try {
    const { data } = await backendApi.get("/all-artworks", {
      params: { q: query, page, classification, technique, sortOpt, sortOrder },
      signal,
    });
    if (!Array.isArray(data?.artworks)) throw new Error("Invalid artwork search response");
    return { artworks: data.artworks, hasNextPage: Boolean(data.hasNextPage) };
  } catch (error) {
    throw getError(error, "Failed to fetch artworks");
  }
};

const fetchArtById = async (id, signal) => {
  try {
    const { data } = await backendApi.get("/artwork/" + encodeURIComponent(id), { signal });
    return data;
  } catch (error) {
    throw getError(error, "Failed to fetch artwork details");
  }
};

export { getAllArtworks, fetchArtById };
