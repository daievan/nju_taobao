
<template>
  <div class="xtx-goods-page">
    <div class="container">
      <div class="info-container">
        <div>
          
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <div class="spec-preview">
                <img v-bind:src="item.imageUrl1" />
                <div class="event" @mousemove="handler"></div>
                <div class="big">
                  <img v-bind:src="item.imageUrl1"  ref="big" />
                </div>
                <!-- 遮罩层 -->
                <div class="mask" ref="mask"></div>
              </div>
              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p> 5000+ </p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p> 2000+ </p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p> 3000+ </p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p> 10+ </p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>

            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name"> {{ item.char1 }}{{item.char2}} </p>
              <img src="https://img.alicdn.com/imgextra/i4/O1CN017Htaw91fIilbli3Lw_!!6000000003984-0-tps-480-40.jpg" alt="">
              <p class="g-price">
                <span>{{ item.sell }}</span>
                <span> {{ (parseFloat(item.sell) * 1.2).toFixed(1) }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>优惠</dt>
                  <dd>618每满30减50,淘金币可抵5.4元起</dd>
                </dl>
                <dl>
                  <dt>保障</dt>
                  <dd>
                    <span>假一赔四</span>
                    <span>极速退款</span>
                    <span>七天无理由</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <!-- <XtxSku :goods="goods" @change="skuChange" />-->

              <el-input-number v-model="count" :min="1" @change="countChange" />  
              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn" @click="addCart">
                  加入购物车
                </el-button>
              </div>
              
            </div>
          </div>
          
          <div class="goods-footer">
            <div  class="goods-article">
              <p>宝贝评价</p>
              <div v-for="item in CommentStore.commentList">
                <ul>
                  <li class="list-item">
                    <div class="ccontainer">
                      <div class="top-section">
                          <div class="top-left">
                              <img :src="item.imageUrl" alt="图片">
                          </div>
                          <div class="top-right">
                            <p>{{item.name}}</p>
                            <div class="bottom-right">
                              <span>{{item.date}}</span>
                            </div>
                          </div>
                          
                      </div>
                      <div class="bottom-section">
                          <p>{{item.text1}}</p>
                      </div>
                      <div class="bottom-sssection">
                        <p>{{item.text2}}</p>
                      </div>
                      <div class="bottom-ssection">
                        <p>{{item.times}}</p>
                    </div>
                    </div>
                  </li>
                </ul>
              </div>
              
            </div>
          </div> 
          <div>
            <textarea id="message" name="message" class="textArea" rows="6" cols="130" placeholder="请输入您的评价"></textarea>
          </div>
          <div class="Butt">
            <button id="cancelBtn" @click="cancel">取消</button>
            <button id="confirmBtn" @click="addComment">确定</button>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { reactive, ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useCommentStore } from '@/stores/commentStore'
//const cartStore = useCartStore()
const goodlist = [
  {
    id: 1,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i1/220403978/O1CN0173wwRV1fFyEEfsyfT_!!220403978.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "小米米家水离子护",
    char2: "发吹风机pH500家用大风量",
    sell: "899"
  },
  {
    id: 2,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i3/679318614/O1CN01Zaswws2DVGVQXCqOc_!!0-item_pic.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i1/O1CN01rHZjwm1kc1MDCvBIO_!!6000000004703-2-tps-38-20.png",
    char1: "游泳速干吸水",
    char2: "浴巾女便携儿童沙滩可用",
    sell: "13.9"
  },
  {
    id: 3,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i1/18645371/O1CN01ULOCKN1pXy63mpeSm_!!0-saturn_solar.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "MRS Studios春夏搭配",
    char2: "B入立体显瘦垂感浪漫长裙",
    sell: "599"
  },
  {
    id: 4,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i1/42976212/O1CN01Tph5Km1vl9Cqc6MYo_!!42976212-0-picasso.jpg_300x300q90.jpg_.webp",       
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "日本进口小零食扇雀饴",
    char2: "星星糖水果味硬糖糖果",
    sell: "9.9"
  },
  {
    id: 5,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i2/24884330/O1CN01V5nCp21hrBo8DhW8s_!!0-saturn_solar.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "ADAMF国潮复古重磅",
    char2: "260gt恤男夏天短袖潮牌",
    sell: "59"
  },
  {
    id: 6,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i3/3042715583/O1CN01F4232C1r742n3BQAz_!!0-item_pic.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "宏源仔仔棒80支棒棒",
    char2: "糖网红爆款六一儿童糖果散装",
    sell: "3.9"
  },
  {
    id: 7,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i2/1777552687/O1CN01vE1XW71Vih34ZCHvf_!!0-item_pic.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "HALLS荷氏0糖暴风薄",
    char2: "荷味糖果缤纷水果味小冰珠",
    sell: "9.9"
  },
  {
    id: 8,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i2/3573567793/O1CN01jh5T5x27RFJFY5qvC_!!0-item_pic.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "修正生物素多种B族维生",
    char2: "素片复合维生素b b1 b2 b6",
    sell: "29.9"
  },
  {
    id: 9,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i4/127421232/O1CN01Hdr0uV1KyIk4xu0aa_!!0-saturn_solar.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "现代简约白色实木床",
    char2: "1.8米家用卧室1.5m单双人床",
    sell: "1189"
  },
  {
    id: 10,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i3/711442725/O1CN017hl2kJ1W063mfr7AW_!!711442725.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "正宗山西大同浑源",
    char2: "凉粉特产即食广灵豆腐干",
    sell: "18"
  },
  {
    id: 11,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i1/26774936/O1CN01xbH0sI1mKjp56SiWn_!!0-saturn_solar.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "珂莱蒂尔商场同款2023",
    char2: "年时尚气质系带领减龄",
    sell: "1999"
  },
  {
    id: 12,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i2/674302274/O1CN01LidSNI1SfXUt0jDFi_!!674302274.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "美的烧水壶家用大容量",
    char2: "开水壶电热水壶不锈钢全自动",
    sell: "145"
  },
  {
    id: 13,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i1/3937219703/O1CN01kyh3IN2LY1rz1kUmQ_!!3937219703-0-C2M.jpg_300x300q90.jpg_.webp",       
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "蜜桃白桃乌龙茶包",
    char2: "花果袋泡茶叶组合水果茶",
    sell: "8.9"
  },
  {
    id: 14,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i1/2204848223344/O1CN015ZSqTC1aZbFyQ83pI_!!0-item_pic.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "胖大海正品罗汉果菊",
    char2: "花慢咽茶炎性养生茶叶利咽",
    sell: "15.3"
  },
  {
    id: 15,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i4/113484015/O1CN01fMOtMd1fWv1RwJY0d_!!0-saturn_solar.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "【鞋匠女王×限量返",
    char2: "场】一字带水钻凉鞋女士细跟",
    sell: "538.88"
  },
  {
    id: 16,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i4/1612756142/O1CN01ugkP6U1vF5TUiCfrN_!!1612756142.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "【屈臣氏热卖】矮身材",
    char2: "告别小个子摆脱烦恼8到48岁",
    sell: "68"
  },
  {
    id: 17,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded///asearch.alicdn.com/bao/uploaded/O1CN01Kg8uN42MNmay2Jgw4_!!35199816.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "戎美【TX0212443】",
    char2: "含桑蚕丝长袖T恤打底衫",
    sell: "85"
  },
  {
    id: 18,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i2/2200817857369/O1CN01euYgEf24J3RtHiRl7_!!0-item_pic.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "女孩子生日礼物儿童",
    char2: "8至12网红9女童4一5小女生",
    sell: "18"
  },
  {
    id: 19,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded///asearch.alicdn.com/bao/uploaded/O1CN018bKDH51MWTsjvUsbc_!!1074951442.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "国际大牌真丝连衣裙女",
    char2: "2023年新款高级感桑蚕丝长裙",
    sell: "185"
  },
  {
    id: 20,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i2/1082911428/O1CN01UTCRv31MQ4PorpWw8_!!1082911428.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "三星Neo G7奥德赛G832",
    char2: "英寸4K165HZ曲屏mini显示器",
    sell: "5299"
  },
  {
    id: 21,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i2/129721014/O1CN01zTmccz1JMSSLrm4ib_!!0-saturn_solar.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "BODYDREAM潮牌短袖男",
    char2: "重磅t恤oversize美式纯棉",
    sell: "149"
  },
  {
    id: 22,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i1/110197389/O1CN01x5YB8324SDNMlr45T_!!0-saturn_solar.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "【立即抢购】滴露消毒",
    char2: "液1.2L*2家用杀菌衣物洗衣",
    sell: "150"
  },
  {
    id: 23,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i1/152920030/O1CN01TPkStW1C5miGgvtFN_!!0-saturn_solar.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "Champion冠军情侣纯棉",
    char2: "T恤夏季美式圆领绿色上衣",
    sell: "219"
  },
  {
    id: 24,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded///asearch.alicdn.com/bao/uploaded/O1CN014MP9rv24xogcY6guQ_!!2211856507458.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "日式实木床1米35薄床",
    char2: "头齐边床小户型省空间双人床",
    sell: "2450"
  },
  {
    id: 25,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i3/55637671/O1CN01Nkx1ie26XN3rBKuCM_!!55637671.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "Steam Deck国内",
    char2: "现货steam掌机steamdeck",
    sell: "3200"
  },
  {
    id: 26,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i1/3806089612/O1CN01d17QBu2KsLpDpWFQr_!!0-saturn_solar.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "实木床白色现代简约",
    char2: "双人主卧静音婚床家用小户型",
    sell: "1499"
  },
  {
    id: 27,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i2/3333948378/O1CN01dlnQB52BlB4I6kBUY_!!3333948378.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "2023年新款设计感两件",
    char2: "套时尚显瘦修身印花连帽套",
    sell: "228"
  },
  {
    id: 28,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i3/1113422430/O1CN0126fQIL1TozDGGWkpV_!!0-item_pic.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "驴打滚正宗糯米糍粑",
    char2: "打糕东北特产手工麻薯",
    sell: "15.9"
  },
  {
    id: 29,
    imageUrl1: "https://gw.alicdn.com/imgextra/i3/2210228979227/O1CN01zE8yda2I21L6dTr83_!!2210228979227-0-alimamacc.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "徕芬SE高速吹风机筒家",
    char2: "用大功率风力低噪速干负离子",
    sell: "600"
  },
  {
    id: 30,
    imageUrl1: "https://gw.alicdn.com/bao/uploaded/i4/126420335/O1CN01XhdflA1ELTW9klkdu_!!0-saturn_solar.jpg_300x300q90.jpg_.webp",
    imageUrl2: "https://img.alicdn.com/imgextra/i2/O1CN01l6ErCs1EBOnxCs2Xa_!!6000000000313-2-tps-128-42.png",
    char1: "t恤男夏季日系宽松纯棉",
    char2: "字母印花体恤重磅280g新款",
    sell: "59.8"
  },]
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
      item: {},
      count:1,
      messageContent:'',
      

    };
  },
  setup() {
    const cartStore = useCartStore();
    const CommentStore=useCommentStore();
    return {
      CommentStore,
      cartStore,
    };
  },
  computed: {
    ImageList() {
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  mounted() {
    //全局事件总线获取兄弟组件传递过来的索引值
    // this.$bus.$on("getIndex", (index) => {
    //   this.currentIndex = index;
    // });
     // 根据路由参数获取当前点击的id
    const itemId = this.$route.params.id;
    // 根据id从数组中获取相应的图片和文字信息
    this.item = goodlist.find(obj => obj.id == itemId);

  },
  methods: {
    cancel() {
      const textarea = document.getElementById('message');
      textarea.value = ''; // 清空textarea内的文字
      this.messageContent = ''; // 清空记录的内容
    },
  //这里是放大方法的主要处理逻辑
    handler(event) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      //约束范围
      if (left <= 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top <= 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
      //console.log(left);
    },
    // count
//const count = ref(1)
countChange(count) {
  console.log(count)
},
//   AddCart() {
//   //console.log(this.item.sell)
// },
// 添加购物车
addCart() {
    //console.log(this.item.id)
    //console.log(cartStore.addCart)
    //规则已经选择  触发action
    this.cartStore.addCart({
      name: this.item.char1+this.item.char2,
      picture: this.item.imageUrl1,
      price: this.item.sell,
      count: this.count,
      skuId: this.item.id,
      attrsText: "618特卖",
      selected: true
    })
},

addComment() {
    const textarea = document.getElementById('message');
    this.messageContent = textarea.value; // 记录textarea内的内容
    if(this.messageContent!==""){
      this.CommentStore.addComment({
        imageUrl: "http://img.alicdn.com/tps/TB1l6dkOXXXXXXEXVXXXXXXXXXX-210-210.png_70x70.jpg",
        name: "NJUer",
        date: "刚刚",
        text1: this.messageContent,
        text2: "",
        times: "浏览1次",
    })
    }
    //this.CommentStore.commentList.splice(4, 1);
}


  },
};

</script>


<style scoped lang='scss'>
.xtx-goods-page {
  .container {
    background-color: #f5f5f5;
    margin-left:130px;
    padding-bottom:100px;
    margin-bottom:50px;
  }
  .goods-info {
    border-bottom: 1px solid #D8D8D8;
    background-color: #f5f5f5;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 140px;
    }
    .spec {
      flex: 1;
      padding: 30px 30px 30px 0px;
    }
  }
  .textArea {
    margin-top:50px;
    margin-left:140px;
    resize: none;
  }
  .Butt {
    margin-left:900px;
    button {
      width:60px;
      height:40px;
      margin-right:5px;
      font-size: 13px;
      color:white;
      background-color: rgb(255, 106, 0);
      border: 1px solid black;
    }
  }
  .goods-footer {
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    p {
      font-size:30px;
    }
    .list-item {
      border-bottom:1px solid #D8D8D8;
    }
    .goods-article {
      width: 940px;
      margin-left: 140px;
      margin-top: 0px;
      .ccontainer {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .top-section {
        display: flex;
        align-items: flex-start;
    }

    .top-left {
        margin-top: 30px;
        margin-right: 10px;
    }

    .top-left img {
      width: 50px; /* 根据需要设置图片的宽度 */
      height: auto; /* 根据需要设置图片的高度 */
    }
    .top-right {
      margin-top: 20px;
      margin-right: 10px;
      .bottom-right {
        color:#7A7A7A
      }
  }
    .bottom-section {
        margin-top: 20px;
        margin-bottom: 20px;
        p {
          font-size:25px;
        }
    }
    .bottom-ssection {
      margin-top: 10px;
      margin-bottom: 10px;
      p {
        font-size:15px;
        color:#7A7A7A
      }
  }
  .bottom-sssection {
    margin-top: 5px;
    margin-bottom: 5px;
    p {
      font-size:15px;
      color:#7A7A7A
    }
}
    }
    .goods-comment {
      width: 940px;
      margin-left: 40px;
      margin-top: 0px;
    }
    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
    font-family: "黑体";
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    width:480px;
    height:100px;
    padding-top: 20px;
    padding-left:10px;
    background-color: #fff2E8;
    span {
      &::before {
        content: "¥";
        font-size: 20px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 40px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 20px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      >span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;

}

.bread-container {
  padding: 25px 0;
}
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(171, 250, 171, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>