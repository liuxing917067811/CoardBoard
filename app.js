App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');

    this.updateVersion(); // 检查更新
    //  this.getAuthCode(); //获取用户名


  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}

    this.updateVersion(); // 检查更新
    //  this.getAuthCode(); //获取用户名
    
    
  },
  globalData: {
    userName: "dd",
    
  },


//获取用户名
async getAuthCode (){
  // console.log(this.globalData.userName);
  //获取免登码
  const res= await dd.getAuthCode();
  // console.log(JSON.stringify(res.authCode));

   //调用api
  const res1 = await dd.httpRequest({
    headers: {
      "Content-Type": "application/json"
    },
    url: 'http://183.247.199.200:8081/api/UserName',
    method: 'POST',

    // 需要手动调用JSON.stringify将数据进行序列化
    data: JSON.stringify({
        Code:  res.authCode,
    }),
    dataType: 'json',

    success: function(res) {
      
      // console.log(JSON.parse(JSON.stringify(res.data)).name);
      //获取用户名
      // app.globalData.userName=JSON.parse(JSON.stringify(res.data)).name;
      //  console.log(app.globalData.userName);

    }, 
    fail: function(res) {
      dd.alert({content: JSON.stringify(res)});
    },
    complete: function(res) {
      // console.log(authCode);
           
    }

  });
  
  // console.log(res1.data.name);
  this.globalData.userName = res1.data.name;

  console.log( this.globalData.userName);

 },


  updateVersion(){

    const updateManager = dd.getUpdateManager()
  
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate) // 是否有更新
    })
    
    updateManager.onUpdateReady(function (ret) {
      console.log(ret.version) // 更新版本号
      dd.confirm({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  
  }


});
