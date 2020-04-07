// 请求默认配置
const rootUrl = 'http://localhost:3000';
const defaultOptions = {
      method: 'POST',
      dataType: 'json',
      header: {
            "content-type": 'application/json'
      }
};
function http(options) {      // options是用户给的配置
      // 将用户配置与默认配置进行合并
      options = Object.assign({}, defaultOptions, options);
      options.url = rootUrl + options.url;
      wx.showLoading({ title: "加载中.." });          // http请求之前显示loading
      return new Promise(resolve => {
            setTimeout(() => {
                  wx.request({
                        ...options,
                        success: function (res) {
                              wx.hideLoading();       // http请求之后关闭loading
                              if (res.statusCode === 200) {
                                    let { status, data, message } = res.data;
                                    // 如果有消息需要显示就调用wx.showModal
                                    if (message !== '') wx.showModal({ title: '提示', content: message, showCancel: false });
                                    switch (status) {
                                          case 200:
                                                resolve(data);
                                                break;
                                          case 199:
                                          case 500:
                                          case 401:
                                          // 什么也不做  
                                    }
                              } else {
                                    // 什么也不做
                                    wx.showModal({ title: '提示', content: "服务器连接失败..", showCancel: false });
                              }
                        }
                  });
            }, 1000);
      });
}

module.exports = http;