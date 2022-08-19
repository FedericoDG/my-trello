import axios from 'axios'

const tasksApi = axios.create({
  baseURL: '/api',
})

export default tasksApi
