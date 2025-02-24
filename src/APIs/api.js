import axios from "axios";

const harvardApi = axios.create({
    baseURL: "https://api.harvardartmuseums.org",
    params: {
        apikey: "01ec49c0-f879-4e15-827b-c36c5f02c990",
    },
});

const vnaApi = axios.create({ baseURL: "https://api.vam.ac.uk/v2" });

const getHarvardArtWorks = (query, page = 1, classification, technique , sortOpt , sortOrder) => {
    console.log(classification, technique);

    let params = { q: query, page: page, size: 10, sort:"accessionyear",sortorder :sortOrder };

    if (classification && classification !== "any") {
        params.classification = classification;
    }

    
    if (technique && technique !== "any") {
        params.technique = technique;
    }
if(sortOpt && sortOpt !== "any"){
    params.sort = sortOpt 
}
    return harvardApi
        .get("/object", { params })
        .then(({ data }) => data.records.filter(art => art.images && art.images.length > 0))
        .catch(err => console.error(err));
};

const getVnaArtworks = (query, page = 1, classification, technique, sortOpt, sortOrder) => {
    let params = { q: query, page: page, size: 10, images_exist: true , order_sort: sortOrder };

    if (classification && classification !== "any") {
        params.id_category = classification;
    }
    if (technique && technique !== "any") {
        params.id_technique = technique;
    }
    if(sortOpt && sortOpt !== "any"){
        params.order_by = sortOpt
    }

    return vnaApi
        .get("/objects/search", { params })
        .then(({ data }) => data.records)
        .catch(err => console.error(err));
};

const fetchArtById = (id) => {
    if (id.startsWith("O") || id.startsWith("o")) {
      // V&A API response
      return vnaApi
        .get(`/object/${id}`)
        .then(({ data }) => {
          const record = data.record;
          const meta = data.meta;
          return {
            // Identification
            id: record.systemNumber,
            // Images
            image: meta.images._iiif_image + "full/full/0/default.jpg",
            // Title
            title: record.titles?.[0]?.title || "No Title Available",
            // Date/Production
            date: record.productionDates?.[0]?.date?.text || "Unknown",
            // Medium & Materials
            medium: record.materialsAndTechniques || "Not specified",
            // Dimensions (join array into a string)
            dimensions: record.dimensions
              ? record.dimensions
                  .map(
                    (dim) => `${dim.dimension}: ${dim.value} ${dim.unit}${
                      dim.qualifier ? ` (${dim.qualifier})` : ""
                    }`
                  )
                  .join(", ")
              : "Not provided",
            // Description
            description: record.summaryDescription || "No description available.",
            // Provenance/History
            provenance: record.objectHistory || "Not available",
            // Location
            location:
              record.galleryLocations?.[0]?.current?.text ||
              "No specific location",
            // Credit Line
            creditLine: record.creditLine || "No credit line",
          };
        })
        .catch((err) => {
          console.error("Error fetching from V&A API:", err);
          throw err;
        });
    } else {
      // Harvard API response
      return harvardApi
        .get(`/object/${id}`)
        .then(({ data }) => {
          return {
            // Identification
            id: data.objectid || data.id,
            // Images
            image: data.primaryimageurl || "https://via.placeholder.com/400",
            // Title
            title: data.title || data.titles?.[0]?.title || "No Title Available",
            // Date/Production
            date: data.dated || "Unknown",
            // Medium & Materials
            medium: data.medium || "Not specified",
            // Dimensions (usually a single string)
            dimensions: data.dimensions || "Not provided",
            // Description
            description: data.description || "No description available.",
            // Provenance/History
            provenance: data.provenance || "Not available",
            // Location (from gallery or places array)
            location:
              (data.gallery && data.gallery.name) ||
              data.places?.[0]?.displayname ||
              "No specific location",
            // Credit Line
            creditLine: data.creditline || "No credit line",
          };
        })
        .catch((err) => {
          console.error("Error fetching from Harvard API:", err);
          throw err;
        });
    }
  };
  


const getAllArtworks = async (query, page = 1, classification , technique ,sortOpt, sortOrder, minResults =20 ) => {
    let artworks = [];
    let currentPage = page;

    while (artworks.length < minResults) {
        

        const [harvardData, vnaData] = await Promise.all([
            getHarvardArtWorks(query, currentPage, classification?.harvardId , technique?.harvardId , sortOpt?.harvard , sortOrder),
            getVnaArtworks(query, currentPage, classification?.vnaID , technique?.vnaID ,sortOpt?.vna, sortOrder)
        ]);

      
        const newResults = [...harvardData, ...vnaData];
       

        if (newResults.length === 0) break;
        artworks = [...artworks, ...newResults];
        currentPage++;
    }

    return artworks.slice(0, minResults);
};

export { getHarvardArtWorks, getVnaArtworks, getAllArtworks , fetchArtById };
