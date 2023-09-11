const app = getApp();

Page({
  data: {
    objectArray: [
      {
        id: 0,
        code: '00',
        name: '大溪老厂',
      },
      {
        id: 1,
        code: '02',
        name: '大溪新厂',
      },
      {
        id: 2,
        code: '03',
        name: '温森一期',
      },
      {
        id: 3,
        code: '05',
        name: '温森三期',
      },
      {
        id: 4,
        code: '01',
        name: '临海森林',
      },

    ], 
    //瓦楞
    crrcdeArray: [
      {
        id: 0,
        name: 'BC',
      },
      {
        id: 1,
        name: 'EB',
      },
      {
        id: 2,
        name: 'EE',
      },
      {
        id: 3,
        name: 'BA',
      },
    ],

    arrIndex: 1, //厂区
    crrIndex: 0,  //瓦楞
    value_matcde: 'F314D',
    value_lssrat: 1.05,//损耗
    value_strprc: 0.45,//加工成本
    value_inrate: 1.08, //利润
    value_price: 0,//参考平方价
    // value_cbprice: 0,
    tableData: {
      data: [],  //查询纸板价格  
    }, 
  },
 
  onLoad() {

    // this.setData({
    //   tableData: {
    //     data: [{
    //       orgcde:'02',
    //     }]
    //   }
    // });

  },

  //厂区选择事件
  bindObjPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex: e.detail.value,
    });
  },
//瓦楞选择
  bindCrrPickerChange(e) {
  
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      crrIndex: e.detail.value.toString().toUpperCase(), 
    });
  
  },

  //材质输入
  handle_matcde(e){

    let tmp = e.detail.value.trim().toUpperCase();
    console.log('材质输入：',tmp);
    this.setData({
      value_matcde: tmp,
    });
    
    if(tmp.length < 4){
      this.setData({
        crrcdeArray: [
          {
            id: 0,
            name: 'B',
          },
          {
            id: 1,
            name: 'E',
          },
          {
            id: 2,
            name: 'C',
          },
          {
            id: 3,
            name: 'A',
          }
        ],
        crrIndex: 0,
        value_lssrat: 1.05,
        value_strprc: 0.25,
      });
    }else if(tmp.length > 5) {
      this.setData({
        crrcdeArray: [
          {
            id: 0,
            name: 'BCB',
          },
          {
            id: 1,
            name: 'EBC',
          },
          {
            id: 2,
            name: 'BBC',
          },
          {
            id: 3,
            name: 'BBA',
          },
          {
            id: 4,
            name: 'EBA',
          }
        ],
        crrIndex: 0,
        value_lssrat: 1.07,
        value_strprc: 0.65
      });
    }else {
      this.setData({
        crrcdeArray: [
          {
            id: 0,
            name: 'BC',
          },
          {
            id: 1,
            name: 'EB',
          },
          {
            id: 2,
            name: 'EE',
          },
          {
            id: 3,
            name: 'BA',
          },
  
        ],
        crrIndex: 0,
        value_lssrat: 1.05,
        value_strprc: 0.45,
      });

    }

  },
//损耗
handle_lssrat(e){
  console.log("损耗",e.detail.value);
  this.setData({
    value_lssrat: e.detail.value,
  });
},
//加工成本
handle_strprc(e){
  console.log("加工成本：",e.detail.value);
  this.setData({
    value_strprc: e.detail.value,
  });
},
//利润
handle_inrate(e){
  console.log("利润:",e.detail.value);
  this.setData({
    value_inrate: e.detail.value,
  })
},
//参考平方价
handle_price(e){

},
//实际配方价格
handle_cbprice(e){
  this.setData({
    value_cbprice: e.detail.value,
  })
},

//计算平方价
calc(){
  const reg = this.data.value_matcde.search('^[0-9a-zA-Z]+');
  if(reg == -1) {
     dd.arlt({content: '配方格式不对'});
     return;
  }

 this.calcPrice(); //参考平方价
  
},
//异步计算平方价
async calcPrice(){

    //调用配方计算接口
  const res1 = await dd.httpRequest({
    headers: {
      "Content-Type": "application/json"
    },
    url: 'http://183.247.199.200:8081/api/Papers/Calc',
    method: 'POST',

    // 需要手动调用JSON.stringify将数据进行序列化
      data: JSON.stringify({
        matcde: this.data.value_matcde,
        crrcde: this.data.crrcdeArray[this.data.crrIndex].name,
        loss: this.data.value_lssrat,
        processCost: this.data.value_strprc,
        profit: this.data.value_inrate
      }),
    dataType: 'json',

    success: function(res) {
      
      console.log({content: '计算成功'});
              
          
      
    },
    fail: function(res) {
      dd.alert({content: JSON.stringify(res)});
    },
    complete: function(res) {
   
    }

  });

  console.log(JSON.stringify(res1.data.price));
 
  this.setData({
    value_price: res1.data.price,
  });

},

//保存配方价格
async save(){
  console.log('保存按钮');
  console.log(this.data.value_matcde.length.toString() + this.data.crrcdeArray[this.data.crrIndex].name);
  var str = this.data.value_matcde.toString();
  if(str.length<2){
    dd.alert({content: '材质长度不对'});
    return;
  }

  if(this.data.value_cbprice == null || this.data.value_cbprice == 0){
    
    dd.alert({content: '金额不对'});

    return;
  }
  
 const res = await dd.confirm({
    title: '',
    content: "确定保存吗？\n配方:" + this.data.value_matcde + "\n瓦 楞：" + this.data.crrcdeArray[this.data.crrIndex].name + "\n价 格：" + this.data.value_cbprice.toString() + ' 元/m2' ,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    success({ confirm }) {
         

    },
    fail() {
      console.log('fail');
    },
    complete() {
      // console.log('complete');
    },

});

console.log(JSON.stringify(res));

if(res.confirm){

      dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://183.247.199.200:8081/api/PaperBoards/save',
        method: 'POST',
      
        // 需要手动调用JSON.stringify将数据进行序列化
          data: JSON.stringify({
            orgcde: this.data.objectArray[this.data.arrIndex].code,
            matcde: this.data.value_matcde,
            crrcde: this.data.value_matcde.length.toString() + this.data.crrcdeArray[this.data.crrIndex].name,
            prices: this.data.value_cbprice,
            status: 'Y' ,
            updatedby: app.globalData.mobile       
          }),
        dataType: 'json',
      
        success: function(res) {
          
          console.log({content: 'sucess'});
          dd.alert({content: '保存成功'});
              
          
        },
        fail: function(res) {
          dd.alert({content: JSON.stringify(res)});
        },
        complete: function(res) {
      
        }
      
      });

}





} ,
//查询配方价格
select(){
  console.log('查询按钮');
  this.getdata();
},
//异步查询数据
async getdata(){

  //调用配方查询接口
  const res1 = await dd.httpRequest({
    headers: {
      "Content-Type": "application/json"
    },
    url: 'http://183.247.199.200:8081/api/PaperBoards/select',
    method: 'POST',

    // 需要手动调用JSON.stringify将数据进行序列化
      data: JSON.stringify({
        matcde: this.data.value_matcde,
        crrcde: this.data.crrcdeArray[this.data.crrIndex].name

      }),
    dataType: 'json',

    success: function(res) {
      
      // console.log({content: 'sucess'});
              
          
      
    },
    fail: function(res) {
      dd.alert({content: JSON.stringify(res)});
    },
    complete: function(res) {
   
    }

  });

 
  this.setData({
    tableData: {
      data: res1.data,  //绑定数据
    }
  });

  // console.log(JSON.stringify(res1.data));

},
//配方失效
setoff(){
  console.log("配方失效按钮");
  var str = this.data.value_matcde.toString();
  if(str.length<2){
    dd.alert({content: '材质长度不对'});
    return;
  }

  dd.httpRequest({
    headers: {
      "Content-Type": "application/json"
    },
    url: 'http://183.247.199.200:8081/api/PaperBoards/SetOff',
    method: 'POST',
  
    // 需要手动调用JSON.stringify将数据进行序列化
      data: JSON.stringify({
        orgcde: this.data.objectArray[this.data.arrIndex].code,
        matcde: this.data.value_matcde,
        crrcde: this.data.value_matcde.length.toString() + this.data.crrcdeArray[this.data.crrIndex].name,
        // prices: this.data.value_cbprice,
        status: 'N' ,
        updatedby: app.globalData.mobile       
      }),
    dataType: 'json',
  
    success: function(res) {
      
      console.log({content: 'sucess'});
      dd.alert({content: '配方失效成功'});
          
      
    },
    fail: function(res) {
      dd.alert({content: JSON.stringify(res)});
    },
    complete: function(res) {
  
    }
  
  });



}



});
