import axios from "axios";


export const URL = "https://your/url.com";
export const API_URL = "https://your/api/url.com";
export const my_app = axios.create({baseURL: API_URL});