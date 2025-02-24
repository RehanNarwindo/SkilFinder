import axios from "axios";

const SkillFinderAPI = axios.create({
    baseURL: "http://localhost:3000",
});

export default SkillFinderAPI;
