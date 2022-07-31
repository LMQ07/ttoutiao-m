// import { loginAPI, getCodeAPI } from './user'
// export const loginAPI = login
// export const getCodeAPI = getCode

// export * from "路径"
// 从路径下 引入所有“按需导出”的东西，再原封不动的暴露出去 不包含默认导出的东西
export * from './user'
// 默认导出的话 引入default
// export { default as getUser } from './user'
export * from './channel'
