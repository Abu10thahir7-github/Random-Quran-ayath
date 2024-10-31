  const axios = require('axios');

  let config = {
    method: 'get',
  maxBodyLength: Infinity,
    url: 'https://api.quran.com/api/v4/verses/random',
    headers: { 
      'Accept': 'application/json'
    }
  };
  
  axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });

  useEffect(()=>{
    const axios = require('axios');

let config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://api.quran.com/api/v4/recitations/:recitation_id/by_ayah/:ayah_key',
  headers: { 
    'Accept': 'application/json'
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
  })