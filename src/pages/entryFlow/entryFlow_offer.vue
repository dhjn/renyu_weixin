<!--app-->
<template>
  <div
    style="width: 100%;height: 100%;background: white;display:flex;flex-direction:column;"
  >
    <div class="entryFlow">
      <div class="entry_order">
        <ul>
          <li>
            <img
              src="../../../static/entryFlow/entry_6.png"
              alt=""
              @click="acceptOfferOne"
            />
            <span>确认信息</span>
          </li>
          <li class="arrows">
            <img src="../../../static/entryFlow/entry_7.png" alt="" />
          </li> 
          <li>
            <img
              src="../../../static/entryFlow/entry_8.png"
              alt=""
              v-if="offerListShow.writeMsg === '1'"
            />
            <img
              src="../../../static/entryFlow/entry_8_1.png"
              alt=""
              v-if="offerListShow.writeMsg === ''"
              @click="acceptOfferTwo"
            />
            <span>填写信息</span>
          </li>
          <li class="arrows">
            <img src="../../../static/entryFlow/entry_7.png" alt="" />
          </li>
          <li>
            <img
              src="../../../static/entryFlow/entry_9.png"
              alt=""
              v-if="offerListShow.uploadMsg === '1'"
            />
            <img
              src="../../../static/entryFlow/entry_9_1.png"
              alt=""
              v-if="offerListShow.uploadMsg === ''"
              @click="acceptOfferThree"
            />
            <span>上传资料</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="entryDataBlock === '01rejectOffer'" style="flex:1">
      <div class="submit">
        <div class="div1">
          尊敬的<span>{{ formData.name }}</span>
          <span v-if="formData.gender === '男'">先生</span>
          <span v-if="formData.gender === '女'">女士</span>
        </div>
        <div class="div2">热烈祝贺你<span>通过</span>我公司面试</div>
        <div class="div3">
          <ul>
            <li>
              <span>雇员姓名 :</span> <span> {{ formData.name }}</span>
            </li>
            <li>
              <span>证件号码 :</span>
              <span> {{ formData.identity }}</span>
            </li>
            <li>
              <span>手机号 :</span>
              <span class="span1"> {{ formData.phone }}</span>
            </li>
            <!-- <li>
              <span>工作省 :</span>
              <span class="span1"> {{ formData.province }}</span>
            </li> -->
          </ul>
        </div>
        <!-- <div class="div4" @click="uploadFile()">
          查看offer >>
        </div> -->
      </div>
      <div
        style="position: absolute;top: 10rem;width: 100%;"
      >
        <!-- <div class="sub_msg">
          <img
            src="../../../static/entryFlow/entry_5.png"
            alt=""
          />本次登陆密码有效期为<span>24</span>小时，超过时限将自动失效
        </div> -->
        <div class="sub_fotter">
          <button
            @click="acceptOffer('02writeMsg')"
            v-if="offerListShow.writeMsg == ''"
          >
            确认信息 下一步
          </button>
        </div>
      </div>
    </div>
    <writeMsg v-if="entryDataBlock === '02writeMsg'"></writeMsg>
    <uploadMsg v-else-if="entryDataBlock === '03uploadMsg'"></uploadMsg>
    <router-view></router-view>
  </div>
</template>
<script>
import writeMsg from "./write_msg.vue";
import uploadMsg from "./upload_msg.vue";
import { Toast } from "mint-ui";
export default {
  name: "entryFlowOffer",
  data() {
    return {};
  },
  components: {
    writeMsg,
    uploadMsg
  },
  created() {},
  mounted() {
    const t = this
  },
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
      this.$store.commit("entryFlow/setEntryDataBlock", "02writeMsg");
      let obj = {
        writeMsg: "1",
        uploadMsg: ""
      };
      this.$store.commit("entryFlow/setOfferListShow", obj);
    },
    acceptOfferThree() {
      const t = this;
      if (t.checkFlow()) {
        this.$store.commit("entryFlow/setEntryDataBlock", "03uploadMsg");
        let obj = {
          writeMsg: "",
          uploadMsg: "1"
        };
        this.$store.commit("entryFlow/setOfferListShow", obj);
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
      if (t.familyInfoShow !== true) {
        Toast({
          message: "请完善家庭信息才能走下一步",
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
      if (t.eductionInfoShow !== true) {
        Toast({
          message: "请完善最高学历信息才能走下一步",
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
    },
    acceptOffer(data) {
      const t = this;
      let obj = {};
      t.$store.commit("entryFlow/setEntryDataBlock", data);
      if (data === "02writeMsg") {
        obj = {
          writeMsg: "1",
          uploadMsg: ""
        };
      } else if (data === "03uploadMsg") {
        obj = {
          writeMsg: "",
          uploadMsg: "1"
        };
      } else {
        obj = {
          writeMsg: "",
          uploadMsg: ""
        };
      }
      t.$store.commit("entryFlow/setOfferListShow", obj);
    },
    // 查看offer
    uploadFile(value) {
      const t = this;
      t.$router.push({
        path: "/entryOfferPDFCont"
      });
    }
  },
  computed: {
    entryDataBlock() {
      return this.$store.state.entryFlow.entryDataBlock;
    },
    offerListShow() {
      return this.$store.state.entryFlow.offerListShow;
    },
    userInfoShow() {
      if(localStorage.getItem('userInfo')){
        this.$store.commit('entryFlow/SetUserInfo',JSON.parse(localStorage.getItem('userInfo')))
      }
      return this.$store.state.entryFlow.infoMsgShow.userInfo;
    },
    familyInfoShow() {
      if(localStorage.getItem('familyInfo')){
        this.$store.commit('entryFlow/SetFamilyInfo',JSON.parse(localStorage.getItem('familyInfo')))
      }
      return this.$store.state.entryFlow.infoMsgShow.familyInfo;
    },
    eductionInfoShow() {
      if(localStorage.getItem('eductionInfo')){
        this.$store.commit('entryFlow/SetEductionInfo',JSON.parse(localStorage.getItem('eductionInfo')))
      }
      return this.$store.state.entryFlow.infoMsgShow.eductionInfo;
    },
    salaryInfoShow() {
      if(localStorage.getItem('salaryInfo')){
        this.$store.commit('entryFlow/SetSalaryInfo',JSON.parse(localStorage.getItem('salaryInfo')))
      }
      return this.$store.state.entryFlow.infoMsgShow.salaryInfo;
    },
    workInfoShow() {
      if(localStorage.getItem('workInfo')){
        this.$store.commit('entryFlow/SetWorkInfo',JSON.parse(localStorage.getItem('workInfo')))
      }
      return this.$store.state.entryFlow.infoMsgShow.workInfo;
    },
    formData() {
      if (Object.keys(this.$store.state.entryFlow.formData).length == 0) {
        this.$store.dispatch("entryFlow/getFormData");
      }
      return this.$store.state.entryFlow.formData;
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
.span1 {
  white-space: nowrap;
  display: inline-block;
  width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1;
}
.span1:hover {
  overflow: visible;
}
@import "../css/common_inform";
.entryFlow {
  width: 100%;
  height: 280px;
  background-image: url("../../../static/entryFlow/entry_4.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  .entry_order {
    width: 100%;
    position: absolute;
    top: 90px;
    ul {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        width: 140px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        img {
          width: 60px;
          height: 60px;
        }
        span {
          font-size: 30px;
          color: white;
        }
      }
      .arrows {
        width: 120px;
        height: 20px !important;
        img {
          height: 20px !important;
        }
      }
    }
  }
}
.sub_msg {
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background: #f2fafd;
  font-size: 26px;
  line-height: 100px;
  color: #718a9d;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  img {
    width: 60px;
  }
  span {
    font-size: 32px;
    color: #000;
  }
}
.sub_fotter {
  width: 100%;
  height: 100px;
  position: absolute;
  /*left: 10%;*/
  border-radius: 10px;
  display: flex;
  padding: 0 20px;
  justify-content: space-around;
  button:nth-of-type(1) {
    width: 50%;
    outline: none;
    background: #3399ff;
    height: 100%;
    border-top-style: none;
    border-right-style: none;
    border-bottom-style: none;
    border-left-style: none;
    font-size: 30px;
    color: white;
    border-radius: 20px;
  }
}
.submit {
  width: 90%;
  height: 6rem;
  background: white;
  position: absolute;
  top: 250px;
  left: 5%;
  border-radius: 20px;
  box-shadow: 0px 2px 2px #f6f6f6;
  padding: 50px;
  box-sizing: border-box;
  .div1,
  .div2,
  .div3 {
    font-size: 32px;
    margin-bottom: 10px;
    color: #0b3251;
  }
  .div2 span {
    color: #03c088;
  }
  .div3 {
    margin-top: 40px;
    li {
      margin-bottom: 20px;
      span:nth-of-type(1) {
        color: #ccc;
      }
    }
  }
  .div4 {
    color: #3399ff;
    text-align: center;
    margin-top: 60px;
    font-size: 32px;
  }
}
</style>
