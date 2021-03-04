<template>
  <div class="over">
    <div class="message">
      <!-- <span>您好!感谢您完成线上入职的手续。</span> -->
      <span>您好！感谢您完成了入职网签第一步流程。</span>
      <br />
      <!-- <span>您的资料已经提交进入审核中，请您本周内注意收听我们员服的电话或短信；祝您工作顺利！北京晨达咨询有限公司，联系电话：18518099901/18518099881</span> -->
      <span>稍后您会接到一条带有链接的短信，请您点击该链接，完成最后一步网签手续。如遇到问题，请您登录“北京晨达外包”公众号，咨询人工客服。祝您工作顺利！</span>
    </div>
    <div class="bg">
      <img src="../../.././static/entryFlow/over.png"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "over"
};
</script>

<style type="text/less" lang="less" scoped>
.over {
  width: 100%;
  height: 100%;
  padding: 100px 80px;
  .message {
    color: #333333;
    font-size: 36px;
  }
  .bg {
    bottom: 20%;
    height: 30%;
    margin-top: 50%;
    img{
      width: 100%;
    }
  }
}
</style>
