// pages/list/index.js
let http = require('../../utils/http.js');
Page({

      /**
       * 页面的初始数据
       */
      data: {
            search: {
                  cid: 0,
                  name: '',
                  orderCol: 'price',
                  orderDir: true,
                  begin: 0,
                  pageSize: 6
            },
            list: [],
            isLogin: true,
            input: ''
      },
      getData(loadMore = false) {
            if(this.data.isLogin) {
                  this.data.search.begin = loadMore ? this.data.list.length : 0;
                  http({ url: '/product/list', data: { jsonStr: JSON.stringify(this.data.search) } })
                        .then(data => {
                              this.setData({
                                    'list': this.data.list.concat(data)
                              });
                              if(data.length === 0) {
                                    this.setData({
                                          'isLogin': false
                                    })
                              }
                        })
            }
      },
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            this.data.search.cid = options.id || 54;
            this.getData();
      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {
            
      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {

      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function () {

      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function () {

      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {
            this.getData(true);
      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {

      }
})