const domain = 'https://wd8716077287svpjzp.wilddogio.com/';
const interfaces = {
  // 获取openID的接口
  getOpenid: domain + 'getOpenid/',
  getMovie: domain,
  getQuestions: domain + 'api/profiles/questions/',
  myLesson: domain + 'api/profiles/mylesson/',
  getHotLessons: domain + 'api/profiles/hotLessons/',
  getCatalogue: domain + 'api/profiles/lessondetail',
  getLessons: domain + 'api/profiles/lessons'
};

module.exports = interfaces;
