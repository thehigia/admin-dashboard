import axios from "axios";

export const api = axios.create({
    baseURL: "http://thehigia.com/api/way",
});