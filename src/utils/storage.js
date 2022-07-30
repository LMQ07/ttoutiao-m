// 封装本地存储
// class类 作用：封装 继承 多态

class Storage {
  get(key) {
    // 获取本地存储的值
    const value = localStorage.getItem(key)
    // 如果说value本身是个字符串的话 那么就不需要JSON.parse 比如：JSON.parse("12323ad") 这个时候就会报错
    // 报错就去了catch 直接return出去就可以了
    try {
      // value 必须是JSON格式的字符串 才可以JSON.parse
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
// class类的就是需要new一个实例对象
export default new Storage()
// 如果说是静态的话 也就是在方法前面加上static 那么就可以直接用构造函数本身调用 Storage.get()
