import axios from "axios";

const harvardApi = axios.create({baseURL:"https://api.harvardartmuseums.org" ,
params: {
  apikey: "01ec49c0-f879-4e15-827b-c36c5f02c990",
},})

const vnaApi = axios.create({baseURL: "https://api.vam.ac.uk/v2/objects"})


const getHarvardArtWorks = (query, page = 1 ,classification , technique) => {
    console.log(classification, technique);
    return harvardApi.get('/object', {
        params: { q: query, page: page,classification: classification ,technique:technique ,size :10 , }
    })
    .then(({ data }) => data.records.filter(art => art.images && art.images.length > 0)) 
    .catch(err => console.error(err));
};

console.log(getHarvardArtWorks('china'));


const getVnaArtworks = (query, page = 1 , classification , technique) => {
    return vnaApi.get('/search', {
        params: { q: query, page: page , size :10 , images_exist : true ,id_category:classification , id_technique : technique  }
    })
    .then(({ data }) => data.records) 
    .catch(err => console.error(err));
};

const getAllArtworks = async (query, page = 1, classification,technique, minResults = 18 , ) => {
    let artworks = [];
    let currentPage = page
    while (artworks.length < minResults) {
        console.log(classification)
        const [harvardData, vnaData] = await Promise.all([
        
            getHarvardArtWorks(query, currentPage , classification.harvardId , technique.harvardId),
            getVnaArtworks(query, currentPage, classification.vnaID , technique.vnaID)
        ]);
        console.log(classification.harvardID);
        console.log(harvardData);
        console.log(vnaData);
        console.log(technique);
      const newResults = [...harvardData, ...vnaData];
console.log(newResults);
        if (newResults.length === 0) break;
        artworks = [...artworks, ...newResults];
        currentPage++;
    }

    return artworks.slice(0, minResults); 
};



export{getHarvardArtWorks ,getVnaArtworks , getAllArtworks}