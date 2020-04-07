// pages/category/index.js
let http = require('../../utils/http.js');
Page({

      /**
       * 页面的初始数据
       */
      data: {
            activeId: 0,
            listMain: [],
            listSub2: [],
            listSub3: []
      },

      getData(fid) {
            return http({ method: 'GET', url: '/category/list/' + fid });
      },

      toggleId(id) {
            this.setData({ 'activeId': id });
            this.getData(id)
                  .then(data2 => {
                        this.setData({ 'listSub2': data2 });
                        return data2;
                  })
                  .then(data2 => {
                        this.setData({ 'listSub3': [] });
                        data2.forEach(item => {
                              this.getData(item.id).then(data3 => this.setData({ 'listSub3': this.data.listSub3.concat(data3) }));
                        });
                  });
      },

      mainList(e) {
            let id = parseInt(e.currentTarget.dataset.id);
            this.toggleId(id);
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            this.getData(0).then(data => {
                  this.setData({ 'listMain': data });
                  this.toggleId(data[0].id);
            });
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

      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {

      }
})