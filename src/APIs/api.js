import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://se-exhibiton-be.onrender.com/api",
});

const getAllArtworks = (
  query,
  page = 1,
  classification,
  technique,
  sortOpt,
  sortOrder
) => {
  return backendApi
    .get("/all-artworks", {
      params: { q: query, page, classification, technique, sortOpt, sortOrder },
    })
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error fetching artworks:", err);
      return [];
    });
};

const fetchArtById = (id) => {
  return backendApi
    .get(`/artwork/${id}`)
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error fetching artwork by ID:", err);
      return null;
    });
};

export { getAllArtworks, fetchArtById };
