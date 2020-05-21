<!--app-->
<template>
  <div class="write_msg">
    <div class="msg_one">
      <div class="msg_one_top">
        <div class="msg_one_title">
          <img
            class="Image1"
            src="../../../static/entryFlow/个人信息.png"
            alt=""
          />
          <span>个人信息</span>
        </div>
        <div>
          <router-link to="/entryFlowOffer/InformMation" tag="div">
            <img
              src="../../../static/entryFlow/entry_13.png"
              alt=""
              class="Image1"
              v-show="!userInfoShow"
            />
            <img
              class="Image1"
              src="../../../static/entryFlow/entry_12.png"
              alt=""
              v-show="userInfoShow"
            />
          </router-link>
        </div>
      </div>
    </div>

    <div class="msg_one">
      <div class="msg_one_top">
        <div class="msg_one_title">
          <img
            class="Image1"
            src="../../../static/entryFlow/联系地址信息.png"
            alt=""
          />
          <span>社保信息</span>
        </div>
        <div>
          <router-link to="/entryFlowOffer/socialInsuranceMessage" tag="div">
            <img
              src="../../../static/entryFlow/entry_13.png"
              alt=""
              class="Image1"
              v-show="!socialInsranceInfoShow"
            />
            <img
              class="Image1"
              src="../../../static/entryFlow/entry_12.png"
              alt=""
              v-show="socialInsranceInfoShow"
            />
          </router-link>
        </div>
      </div>
    </div>

    <div class="msg_one">
      <div class="msg_one_top">
        <div class="msg_one_title">
          <img
            class="Image1"
            src="../../../static/entryFlow/银行卡信息.png"
            alt=""
          />
          <span>工资信息</span>
        </div>
        <div>
          <router-link to="/entryFlowOffer/salaryMessage" tag="div">
            <img
              src="../../../static/entryFlow/entry_13.png"
              alt=""
              class="Image1"
              v-show="!salaryInfoShow"
            />
            <img
              class="Image1"
              src="../../../static/entryFlow/entry_12.png"
              alt=""
              v-show="salaryInfoShow"
            />
          </router-link>
        </div>
      </div>
    </div>

    <div class="msg_one">
      <div class="msg_one_top">
        <div class="msg_one_title">
          <img
            class="Image1"
            src="../../../static/entryFlow/entry_21.png"
            alt=""
          />
          <span>最高学历</span>
        </div>
        <div>
          <router-link to="/entryFlowOffer/educationMessage" tag="div">
            <img
              src="../../../static/entryFlow/entry_13.png"
              alt=""
              class="Image1"
              v-show="!eductionInfoShow"
            />
            <img
              class="Image1"
              src="../../../static/entryFlow/entry_12.png"
              alt=""
              v-show="eductionInfoShow"
            />
          </router-link>
        </div>
      </div>
    </div>

    <div class="msg_one">
      <div class="msg_one_top">
        <div class="msg_one_title">
          <img
            class="Image1"
            src="../../../static/entryFlow/工作经历.png"
            alt=""
          />
          <span>工作经历信息</span>
        </div>
        <div>
          <!-- <img
            class="Image1"
            src="../../../static/entryFlow/entry_12.png"
            alt=""
            v-show="workInfoShow"
            @click="to(1)"
          />
          <img
            src="../../../static/entryFlow/entry_13.png"
            alt=""
            class="Image1"
            @click="to(2)"
          /> -->
          <router-link to="/entryFlowOffer/workExperience" tag="div">
            <img
              src="../../../static/entryFlow/entry_13.png"
              alt=""
              class="Image1"
              v-show="!workInfoShow"
            />
            <img
              class="Image1"
              src="../../../static/entryFlow/entry_12.png"
              alt=""
              v-show="workInfoShow"
            />
          </router-link>
        </div>
      </div>
    </div>

    <div class="sub_fotter">
      <button @click="acceptOfferOne">上一步</button>
      <button @click="acceptOfferTwo">下一步</button>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "rejectOffer",
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {
    acceptOfferOne() {
      this.$store.commit("entryFlow/setEntryDataBlock", "01rejectOffer");
      let obj = {
        writeMsg: "",
        uploadMsg: ""
      };
      this.$store.commit("entryFlow/setOfferListShow", obj);
    },
    acceptOfferTwo() {
      const t = this;
      if (t.checkFlow()) {
        t.$store.commit("entryFlow/setEntryDataBlock", "03uploadMsg");
        let obj = {
          writeMsg: "",
          uploadMsg: "1"
        };
        t.$store.commit("entryFlow/setOfferListShow", obj);
      }
    },
    checkFlow() {
      // 填写信息第二部 判断是否让他点击第三步
      const t = this;
      if (t.userInfoShow !== true) {
        Toast({
          message: "请完善个人信息才能走下一步",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      if (t.socialInsranceInfoShow !== true) {
        Toast({
          message: "请完善社保信息才能走下一步",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      if (t.eductionInfoShow !== true) {
        Toast({
          message: "请完善学历信息才能走下一步",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      if (t.salaryInfoShow !== true) {
        Toast({
          message: "请完善工资卡信息才能走下一步",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      if (t.workInfoShow !== true) {
        Toast({
          message: "请完善工作经历信息才能走下一步",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      return true;
    }
  },
  mounted() {
    document.body.style.overflow= "scroll";
  },
  computed: {
    userInfoShow() {
      return this.$store.state.entryFlow.infoMsgShow.userInfo;
    },
    socialInsranceInfoShow() {
      return this.$store.state.entryFlow.infoMsgShow.socialInsranceInfo;
    },
    eductionInfoShow() {
      return this.$store.state.entryFlow.infoMsgShow.eductionInfo;
    },
    salaryInfoShow() {
      return this.$store.state.entryFlow.infoMsgShow.salaryInfo;
    },
    workInfoShow() {
      return this.$store.state.entryFlow.infoMsgShow.workInfo;
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
.write_msg {
  width: 100%;
  height: calc(100% - 320px);
  overflow-y: scroll;
  background: rgba(244, 246, 250, 1);
  .msg_one {
    width: 100%;
    padding: 30px;
    position:relative;
    background: white;
    font-size: 34px;
    margin-bottom: 20px;
    .msg_one_top,
    .msg_one_footer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 60px;
      .msg_one_title {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(20, 57, 84, 1);
      }
    }
    .msg_one_top {
      margin-bottom: 36px;
    }
    .msg_one_footer {
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .msg_one_middle {
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .msg_one_middle_one {
      margin-bottom: 10px;
    }
    .msg_one_middle_two {
      margin-top: 10px;
    }
    .work-img{
      display: flex;
      flex-wrap: wrap;
      width:35px; 
      margin-right: 20px;
      max-height: 40px;
    }
    .Image1 {
      margin-right: 20px;
    }
    img {
      width: 35px;
      height: 100%;
      vertical-align: middle;
    }
  }
  .sub_fotter {
    width: 100%;
    height: 100px;
    border-radius: 10px;
    display: flex;
    padding: 0 20px;
    justify-content: space-around;
    background: white;
    button:nth-of-type(1) {
      width: 40%;
      outline: none;
      background: white;
      color: #3399ff;
      height: 98%;
      font-size: 30px;
      border: 2px solid #3399ff;
      border-radius: 20px;
    }
    button:nth-of-type(2) {
      width: 40%;
      outline: none;
      background: white;
      color: #3399ff;
      height: 98%;
      font-size: 30px;
      border: 2px solid #3399ff;
      border-radius: 20px;
    }
  }
}
</style>
