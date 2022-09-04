const axios = require('axios')

const apiURL = "https://api.helius.xyz/v0/addresses"
const address = "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K" // Magic Eden
const resource = "nft-events"
const options = `api-key=667eb493-1ede-4d15-8ddb-209b547d671b&type=NFT_SALE`
let mostRecentTxn = ""

const salesBot = async () => {
  let count = 0;
  let evilClowns = 0;
  let otherCollections = 0;
  while (true) {
    //try all code and catch 
    try {
      const url = `${apiURL}/${address}/${resource}?${options}&until=${mostRecentTxn}`
      const { data } = await axios.get(url)
      
      if (!data.length) { continue; }
      
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].description.includes('EvilClowns')) {
          evilClowns++;
        }

        else { otherCollections++; }
        count++;

        console.log(count)
        console.log(data[i].description)
        console.log(evilClowns + " " + "EVILCLOWNS SALES")
        console.log(otherCollections + " " + "OTHER COLLECTIONS")
      }
      mostRecentTxn = data[0].signature
    } catch (error) {
      console.log(error)
    }
  }
}
salesBot()