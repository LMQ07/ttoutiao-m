// 将file对象解析成base64，以promise管理
// promise就是可以用来解决异步问题的
export const getPhotoBase64 = (file) => {
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
