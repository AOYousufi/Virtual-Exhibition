import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://se-exhibiton-be-dawn-grass-6783.fly.dev/api",
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
    .then(({ data }) => {
      if (data.error) {
        // Throw an error object with a status code and message
        throw { status: data.status || 500, message: data.error };
      }
      return data;
    })
    .catch((err) => {
      console.error("Error fetching artworks:", err);
      if (err.response && err.response.status) {
        throw {
          status: err.response.status,
          message: err.response.data.error || "Error fetching artworks",
        };
      }
      throw { status: 500, message: "Error fetching artworks" };
    });
};

const fetchArtById = (id) => {
  return backendApi
    .get(`/artwork/${id}`)
    .then(({ data }) => {
      if (data.error) {
        throw { status: data.status || 500, message: data.error };
      }
      return data;
    })
    .catch((err) => {
      console.error("Error fetching artwork by ID:", err);
      if (err.response && err.response.status) {
        throw {
          status: err.response.status,
          message: err.response.data.error || "Error fetching artwork details",
        };
      }
      throw { status: 500, message: "Error fetching artwork details" };
    });
};

export { getAllArtworks, fetchArtById };
