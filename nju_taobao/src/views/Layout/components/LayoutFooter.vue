<template>
  <footer class="app_footer">
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <!-- 版权信息 -->
        <div class="copyright">
          <!-- 联系客服 开放平台 法律声明 廉正举报 Taobao.com版权所有 2003-现在 增值电信业务经营许可证：浙B2-20070195 浙公网安备 33010002000075号
阿里巴巴集团 | 淘宝网 | 天猫 | 聚划算 | 全球速卖通 | 阿里巴巴国际交易市场 | 1688 | 阿里妈妈 | 飞猪 | 阿里云计算 | AliOS | 阿里通信 | 高德 | UC
友盟 | 虾米 | 钉钉 | 支付宝 | 达摩院 -->
          <p>
            <a href="javascript:;">联系客服</a>
            <a href="javascript:;">开放平台</a>
            <a href="javascript:;">法律声明</a>
            <a href="javascript:;">廉正举报</a>
            <a href="javascript:;">Taobao.com版权所有</a>
            <a href="javascript:;">2003-现在</a>
            <a href="javascript:;">增值电信业务经营许可证：</a>
            <a href="javascript:;">浙公网安备</a>
            <a href="javascript:;">33010002000075号</a>
          </p>
          <p>
          <a href="javascript:;" class="spe">阿里巴巴集团</a>
          <a href="javascript:;" class="spe">淘宝网</a>
          <a href="javascript:;" class="spe">天猫</a>
          <a href="javascript:;" class="spe">聚划算</a>
          <a href="javascript:;" class="spe">全球速卖通</a>
          <a href="javascript:;" class="spe">阿里巴巴国际交易市场</a>
          <a href="javascript:;" class="spe">1688</a>
          <a href="javascript:;" class="spe">阿里妈妈</a>
          <a href="javascript:;" class="spe">飞猪</a>
          </p>
          <p>
            <a href="javascript:;" class="spe">阿里云计算</a>
            <a href="javascript:;" class="spe">AliOS</a>
            <a href="javascript:;" class="spe">阿里通信</a>
            <a href="javascript:;" class="spe">高德</a>
            <a href="javascript:;" class="spe">UC</a>
            <a href="javascript:;" class="spe">友盟</a>
            <a href="javascript:;" class="spe">虾米</a>
            <a href="javascript:;" class="spe">钉钉</a>
            <a href="javascript:;" class="spe">支付宝</a>
            <a href="javascript:;" class="spe">达摩院</a>
          </p>
          <p>CopyRight © NJU_DPZ</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang='scss'>
.app_footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;

  .contact {
    background: #fff;

    .container {
      padding: 60px 0 40px 25px;
      display: flex;
    }

    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }

    dt {
      line-height: 1;
      font-size: 18px;
    }

    .qrcode {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }

    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;

      span {
        display: block;
      }

      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: $xtxColor;
      }
    }

    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;

      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }

  .extra {
    background-color: #333;
  }

  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;

    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;

      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }

      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }

  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;

    p {
      line-height: 1;
      margin-bottom: 20px;
    }

    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      /*border-right: 1px solid #999;*/

      &:last-child {
        border-right: none;
      }
    }
    .spe {
      border-right: 1px solid #999;
    }
  }
}
</style>