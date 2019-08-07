// export const a = 111
// export const b = 222
// export const cloud = 333
// module.exports = {
//   table: 444
// }

// export default {
//   table: 444
// }
//云开发初始化
wx.cloud.init({
  env: "movi-a7cc41",
  traceUser: true
});

const db = wx.cloud.database({});
const table = db.collection("movie");
export default table
