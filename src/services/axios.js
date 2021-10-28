import axios from "axios";

const initParams = {
  apikey: process.env.GATSBY_PUBLIC_KEY,
};

const fetchAxios = ({ url, params }) => {
  return axios({
    method: "GET",
    baseURL: process.env.GATSBY_API_URL,
    url,
    params: {
      ...params,
      ...initParams,
    },
  });
};

export default fetchAxios
