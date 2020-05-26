<template>
  <div class="over">
    <div class="message">
      <span>您好!感谢您完成线上入职的手续。</span>
      <br />
      <span>您的资料已经提交进入审核中，请您本周内注意收听我们员服的电话或短信；祝您工作顺利！北京晨达咨询有限公司，联系电话：18518099901/18518099881</span>
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
