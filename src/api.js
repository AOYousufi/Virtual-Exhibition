import axios from "axios";

const harvardApi = axios.create({
    baseURL: "https://api.harvardartmuseums.org",
    params: {
        apikey: "01ec49c0-f879-4e15-827b-c36c5f02c990",
    },
});

const vnaApi = axios.create({ baseURL: "https://api.vam.ac.uk/v2/objects" });

const getHarvardArtWorks = (query, page = 1, classification, technique , sortOpt , sortOrder) => {
    console.log(classification, technique);

    let params = { q: query, page: page, size: 10, sort:"random",sortorder :sortOrder };

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
        .get("/search", { params })
        .then(({ data }) => data.records)
        .catch(err => console.error(err));
};

const getAllArtworks = async (query, page = 1, classification , technique ,sortOpt, sortOrder, minResults = 18) => {
    let artworks = [];
    let currentPage = page;

    while (artworks.length < minResults) {
        console.log(classification);

        const [harvardData, vnaData] = await Promise.all([
            getHarvardArtWorks(query, currentPage, classification?.harvardId , technique?.harvardId , sortOpt?.harvard , sortOrder),
            getVnaArtworks(query, currentPage, classification?.vnaID , technique?.vnaID ,sortOpt?.vna, sortOrder)
        ]);

       
console.log(harvardData, "Harvard One");
console.log(vnaData, "VNA DATA");
console.log(sortOrder);
        const newResults = [...harvardData, ...vnaData];
        console.log(newResults);

        if (newResults.length === 0) break;
        artworks = [...artworks, ...newResults];
        currentPage++;
    }

    return artworks.slice(0, minResults);
};

export { getHarvardArtWorks, getVnaArtworks, getAllArtworks };
