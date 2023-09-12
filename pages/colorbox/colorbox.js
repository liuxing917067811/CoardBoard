const app = getApp();

Page({
  data: {

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
    crrIndex: 0,
    value_tiscde: "E", //面纸
    value_piecde: "314D",//纸板
    value_inncde: "",//里纸
    value_tisrat: 1.0085,
    value_pierat: 1.007,
    value_innrat: 0,
    value_gulprc: 0.2,//裱胶加工费
    value_strprc: 350,//合并起做费

    tableData: {
      data: [],  //查询纸板价格  
    }, 
  },
  onLoad() {},



  //面纸
  handle_tiscde(e){
    let tmp = e.detail.value.trim().toUpperCase();
    console.log(tmp);
    this.setData({
      value_tiscde: tmp,
    });
  },
  //纸板
  handle_piecde(e){
    let tmp = e.detail.value.trim().toUpperCase();
    console.log('材质输入：',tmp);
    this.setData({
      value_piecde: tmp,
    });
    
    if(tmp.length < 4 && tmp.length>0){
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
        value_strprc: 245,

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
        value_strprc: 480,
   
      });
    }else if(tmp.length == 0){
      this.setData(
        {
          crrcdeArray: [{
            id: 0,
            name: '',
          }
        ],
          crrIndex: 0,
          value_strprc: 0,
        }
      );
    }else
    {
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
        value_strprc: 350,
     
      });
    }
    
  },
//里纸
  handle_inncde(e){
    let tmp = e.detail.value.trim().toUpperCase();
    console.log(tmp);
    this.setData({
      value_inncde: tmp,
    });
  },
  //面纸损耗

  handle_tisrat(e){
    console.log(e.detail.value);
    this.setData({
      value_tisrat: e.detail.value,
    });
  },
  //纸板损耗
  handle_pierat(e){
    console.log(e.detail.value);
    this.setData({
      value_pierat: e.detail.value,
    });
  },
  //里纸损耗
  handle_innrat(e){
    console.log(e.detail.value);
    this.setData({
      value_innrat: e.detail.value,
    });
  },
  //裱胶加工费
  handle_gulprc(e){
    console.log(e.detail.value);
    this.setData({
      value_gulprc: e.detail.value,
    });
  },
    //合并起做费
    handle_strprc(e){
      console.log(e.detail.value);
      this.setData({
        value_strprc: e.detail.value,
      });
    },
    //保存彩印配方
    async save(){
      console.log('保存按钮');
      
      var str = this.data.value_tiscde.toString();
      if(str.length<1){
        dd.alert({content: '面纸空'});
        return;
      }
          
     const res = await dd.confirm({
        title: '',
        content: "确定保存吗？\n面纸:" + this.data.value_tiscde + "\n纸板:" + this.data.value_piecde + "\n瓦 楞：" + this.data.crrcdeArray[this.data.crrIndex].name ,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success({ confirm }) {

        },
        fail() {
          console.log('fail');
        },
        complete() {

        },
    
    });
    
    // console.log(JSON.stringify(res));
    
    if(res.confirm){
    
          dd.httpRequest({
            headers: {
              "Content-Type": "application/json"
            },
            url: 'http://183.247.199.200:8081/api/ColorBoxs/Save',
            method: 'POST',
          
            // 需要手动调用JSON.stringify将数据进行序列化
              data: JSON.stringify({
                tiscde: this.data.value_tiscde,
                piecde: this.data.value_piecde,
                crrcde: this.data.crrcdeArray[this.data.crrIndex].name,
                inncde: this.data.value_inncde,
                tisrat: this.data.value_tisrat,
                pierat: this.data.value_pierat,
                innrat: this.data.value_innrat,
                strprc: this.data.value_strprc,
                gulprc: this.data.value_gulprc,
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
// 配方失效
  setoff(){
      console.log("配方失效");
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://183.247.199.200:8081/api/ColorBoxs/save',
        method: 'POST',
      
        // 需要手动调用JSON.stringify将数据进行序列化
          data: JSON.stringify({
            tiscde: this.data.value_tiscde,
            piecde: this.data.value_piecde,
            crrcde: this.data.crrcdeArray[this.data.crrIndex].name,
            inncde: this.data.value_inncde,
            // tisrat: this.data.value_tisrat,
            // pierat: this.data.value_pierat,
            // innrat: this.data.value_innrat,
            // strprc: this.data.value_strprc,
            // gulprc: this.data.value_gulprc,
            status: 'N' ,
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

      
  },
//查询
select(){
  console.log("查询按钮");
  this.getdata();

},
//异步查询数据
async getdata(){

  //调用配方查询接口
  const res1 = await dd.httpRequest({
    headers: {
      "Content-Type": "application/json"
    },
    url: 'http://183.247.199.200:8081/api/ColorBoxs/Select',
    method: 'POST',

    // 需要手动调用JSON.stringify将数据进行序列化
      data: JSON.stringify({
        tiscde: this.data.value_tiscde,
        piecde: this.data.value_piecde,
        crrcde: this.data.crrcdeArray[this.data.crrIndex].name,
        inncde: this.data.value_inncde

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
//

});
