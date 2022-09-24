const axios = require("axios").default;

const TCG_PLAYER_API = "https://mpapi.tcgplayer.com";

const getLowestPrice = (id) => {
  const url = `${TCG_PLAYER_API}/v2/product/${id}/listings`;
  const data = {
    filters: {
      term: {
        sellerStatus: "Live",
        channelId: 0,
        language: ["English"],
        printing: ["1st Edition"],
        condition: ["Lightly Played", "Near Mint"],
        listingType: "standard",
      },
      range: {
        quantity: {
          gte: 1,
        },
      },
      exclude: {
        channelExclusion: 0,
        listingType: "custom",
      },
    },
    from: 0,
    size: 1,
    context: {
      shippingCountry: "US",
      cart: {},
    },
    sort: {
      field: "price+shipping",
      order: "asc",
    },
  };

  return axios.post(url, data).then((response) => {
    const result = response.data.results[0];
    const lowestPricedResult = result.results[0];
    const { price } = lowestPricedResult;
    return price;
  });
};

module.exports = { getLowestPrice };
