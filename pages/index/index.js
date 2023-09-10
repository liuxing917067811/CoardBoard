import lifecycle from '/util/lifecycle';
import animModal from '/util/items';

// 修改：将canIUse放在数据内部，提高可读性，并且items中的每一项加上hidden属性
// 如果当前环境有这个API，则正常返回，否则隐藏（items里判断如果hidden代表隐藏）
function canIUse(api) {
  if (dd.canIUse(api.api)) {
    return api;
  } else {
    api.entitle = '当前设备不支持!';
    api.hidden = true;

    return api;
  }
}

Page({
  ...lifecycle,
  ...animModal.animOp,
  data: {
    pageName: 'agv/agv',
    hidden: true,
    curIndex: 0,
    ...animModal.data,
    arr: {
      onItemTap: 'onGridItemTap',
      onChildItemTap: 'onChildItemTap',
      list: [ {
        icon: '/image/api_view.png',
        title: '纸板报价',
        entitle: 'Interface',
        page: '../coardboard/coardboard'
      },
      

      ],
    }
  },
  onGridItemTap(e) {
    const curIndex = e.currentTarget.dataset.index;
    const childList = this.data.arr.list[curIndex];
    if (childList.subs) {
      this.setData({
        hidden: !this.data.hidden,
        curIndex,
      });
      this.createMaskShowAnim();
      this.createContentShowAnim();
    } else {
      const e = {
        currentTarget: {
          dataset: { page: childList.page }
        }
      };
      this.onChildItemTap(e);
    }
  },
  onChildItemTap(e) {
    const { page } = e.currentTarget.dataset;
    dd.navigateTo({ url: page });
  },
  onModalCloseTap() {
    this.createMaskHideAnim();
    this.createContentHideAnim();
    setTimeout(() => {
      this.setData({
        hidden: true,
      });
    }, 210);
  },
});
