import axios from 'axios'

// Chief Warden API
export const chiefWardenAPI = axios.create({
    baseURL: `http://localhost:8000/api/v1/chief-warden`
})

// Staff API
export const staffAPI = axios.create({
    baseURL: `http://localhost:8000/api/v1/staffs`
})