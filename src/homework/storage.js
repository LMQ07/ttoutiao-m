// 封装一下存储功能

class Storage {
  get(key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

export default new Storage()
