import axios from 'axios'

// Chief Warden API
export const chiefWardenAPI = axios.create({
    baseURL: `http://localhost:8000/api/v1/chief-warden`
})