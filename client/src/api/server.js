import axios from 'axios'

const server = axios.create({
  baseURL: 'http://ecommerceserver.williamsuryawan.com/'
})

export default server

