<template>
  <div class="over">
    <div class="message">
      <!-- <span>您好!感谢您完成线上入职的手续。</span> -->
      <span>您好！感谢您完成了微信端个人资料的填写。</span>
      <br />
      <!-- <span>您的资料已经提交进入审核中，请您本周内注意收听我们员服的电话或短信；祝您工作顺利！北京晨达咨询有限公司，联系电话：18518099901/18518099881</span> -->
      <span>接下来，您会在3个小时内，收到一条带有链接的短信，请您点击该链接进入网签手续；如您一个工作日内没有收到短信或，请您登陆“北京晨达外包”公众号在线客服，咨询人工客服。祝好！</span>
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
