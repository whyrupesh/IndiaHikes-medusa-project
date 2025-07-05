import axios from "axios";

export const MEDUSA_BACKEND_URL = "http://localhost:9000"; 

export const medusa = axios.create({
  baseURL: `${MEDUSA_BACKEND_URL}/store`,
  withCredentials: true,
    headers: {
    // "x-publishable-api-key": "pk_20388acfe95f61265e095126f35dfd074152c0a05a1ee1210ccce001e13716e0"
    "x-publishable-api-key": "pk_06030c5641c4413feb139bf846bede0a9ae52c3a5e8b2ec3ee9342876dbac0ee"
  }
});
