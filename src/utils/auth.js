// authorization 用于操作token
import storage from './storage'

const token = 'Token'

export const setToken = (value) => storage.set(token, value)

export const getToken = () => storage.get(token)

export const removeToken = () => storage.remove(token)
