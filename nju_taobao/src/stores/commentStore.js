// 封装评论模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
export const useCommentStore = defineStore('comment', () => {
    const commentList =ref([
        {
          imageUrl:"http://img.alicdn.com/tps/TB1l6dkOXXXXXXEXVXXXXXXXXXX-210-210.png_70x70.jpg",
          name:"t**8",
          date:"21天前",
          text1:"宝贝已经收到，太感动了：商家送了很多。",
          text2:"回复：谢谢您的评价，我们由衷的希望您在我们这里的每一次购物都是一种享受，真诚期待您的下次光临哦~",
          times:"浏览1585次",
        },
        {
          imageUrl:"http://sns.m.taobao.com/avatar/sns/user/flag/sns_logo?type=taobao&kn=wwc_tb_11&bizCode=taobao_avatar&userFlag=RAzN83923zmuymAxzN5cB6St6mY6T9PJHTwWQgjKw3WUk2fCYoG8p49wqSJYamHMoCKYyq7w9RoBbRQon47aBt79MxuEjG9uzQrPUNAfodeUHf6XfmNrAJB6atbQ",
          name:"t**5",
          date:"17天前",
          text1:"是正品 宝贝不错 参加活动，买的套餐~送了好多赠品 感觉挺实惠的",
          text2:"回复：一份坚守，一份努力，一份承诺，一份收获，能得到您的支持与肯定就是我们的最大收获。 欢迎亲们选购产品时咨询在线客服~",
          times:"浏览1078次",
        },
        {
          imageUrl:"http://sns.m.taobao.com/avatar/sns/user/flag/sns_logo?type=taobao&kn=wwc_tb_11&bizCode=taobao_avatar&userFlag=RAzN84GK7wS8eNQFM5mYf83Lp5eg4zt7nNcqopwpD3dLoaAN16N9pNCQqWTwvushnmui599ATLN4RLU8LKMzn3tizgr3G1BKufU75gd8m7zNVLACMnY12FjjyEHSkJKX9grL8kptqZHocVKU9QbjLG45jL3arXM3KoD4KBP",
          name:"t**4",
          date:"15天前",
          text1:"一直都在用的，用很久了，真的好用不多说",
          text2:"回复：谢谢您给予我们的支持与信任，您满意的话语是我们不断前进的动力，有您的陪伴，我们会更好哦~",
          times:"浏览972次",
        },
        {
          imageUrl:"http://sns.m.taobao.com/avatar/sns/user/flag/sns_logo?type=taobao&kn=wwc_tb_11&bizCode=taobao_avatar&userFlag=RAzN83923zmuym8oCyYMYVVVoSREbj1cFcwomARETpoyR4Qwy66PMxpUjE8oSAriGySRak9EjKze9T1QtBPNpryDEGcctn326p6V54CGihHUYuwRY7gVTZPY4FWX",
          name:"t**6",
          date:"9天前",
          text1:"设计高级 用起来舒服~",
          text2:"回复：得此美言甚欢喜，如沐春风在心间！我们将再接再厉，为您提供物美价廉的宝贝，您对我们的支持，我们会铭记在心，记得常回来看看",
          times:"浏览583次",
        },
    ])
    const addComment =  (comment) => {
        commentList.value.push(comment)
    }

  return {
    commentList,
    addComment,
  }
}, {
  persist: true,
})