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
        name: 'BC'
      },
      {
        id: 1,
        name: 'EB'
      },
      {
        id: 2,
        name: 'EE'
      },
      {
        id: 3,
        name: 'BA'
      },
      {
        id: 4,
        name: 'B'
      },
      {
        id: 5,
        name: 'E'
      },
      {
        id: 6,
        name: 'C'
      },
      {
        id: 7,
        name: 'B'
      },
      {
        id: 8,
        name: 'A'
      },
      {
        id: 9,
        name: 'BCB'
      },
      {
        id: 10,
        name: 'BBC'
      },
      {
        id: 11,
        name: 'EBC'
      },
      {
        id: 12,
        name: 'EBA'
      },
    ],

    arrIndex: 1, //厂区
    crrIndex: 0, //瓦楞
  },
  onLoad() {},

  //厂区选择事件
  bindObjPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex: e.detail.value,
    });
  },

  bindCrrPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      crrIndex: e.detail.value,
    });
  },

});
