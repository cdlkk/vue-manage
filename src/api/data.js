import axios from '@/api/axios.js'

export const getMenu = (param) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: param
  })
}
export const getData = () => {
  return axios.request({
    url: '/home/getData'
  })
}

export const getUser = (parms) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    parms
  })
}