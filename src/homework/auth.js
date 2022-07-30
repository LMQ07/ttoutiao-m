import storage from './storage'

const token = 'HEIMA-TOKEN'

export const getToken = () => storage.get(token)
export const setToken = (value) => storage.set(token, value)
export const removeToken = () => storage.remove(token)
