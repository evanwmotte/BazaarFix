import axios from "axios";

const path = "/api/wanted"

export const saveWanted = (wantedAd) => {
  return axios.post(`${path}`, wantedAd)
}

export const getWanted = () => {
  return axios.get(`${path}`)
}

export const deleteWanted = (id) => {
  return axios.delete(`${path}/${id}`)
}