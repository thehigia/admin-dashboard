import axios from "axios";

export const api = axios.create({
    baseURL: "https://thehigia.com/api/way",
});