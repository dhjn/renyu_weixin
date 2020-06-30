<!--app-->
<template>
  <div style="width: 100%;height: 100%;background: white">
    <div class="entryFlow">
      <div class="submit">
        <h3 id="h3">{{ flowTitle }}</h3>
        <div class="phone">
          <div>
            <img src="../../../static/entryFlow/zh.png" alt="" />
          </div>
          <div>
            <input
              type="number"
              placeholder="手机号"
              v-model="formMain.gzhMobile"
              pattern="\d*"
            />
          </div>
        </div>
        <div class="phone">
          <div>
            <img src="../../../static/entryFlow/mm.png" alt="" />
          </div>
          <div>
            <input
              type="password"
              placeholder="密码"
              v-model="formMain.pwd"
              pattern="\d*"
            />
          </div>
        </div>
        <div class="password"></div>
      </div>
      <div class="sub_fotter">
        <button @click="GzhLogin">登 录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import qs from "qs";
import JsCookie from "js-cookie";
export default {
  name: "appLink",
  data() {
    return {
      flowTitle: "",
      openId: "",
      formMain: {
        gzhMobile: "",
        pwd: ""
      }
    };
  },
  components: {},
  created() {},
  methods: {
    GzhLogin() {
      const t = this;
      let data = {
        openId: t.openId,
        gzhMobile: t.formMain.gzhMobile,
        pwd: t.formMain.pwd
      };
      this.http
        .post("/api/loginservlet", qs.stringify(data))
        .then(res => {
          if (res.data.errcode === 0) {
            localStorage.clear();
            localStorage.setItem("isLogin", true);
            localStorage.setItem("token", res.data.data.Token);
            localStorage.setItem("userId", res.data.data.userId);
            localStorage.setItem("isEditted", res.data.data.isEditted);
            JsCookie.set("token", res.data.data.Token);
            JsCookie.set("userId", res.data.data.userId);
            let flag = JSON.parse(localStorage.getItem("isEditted"));
            if (!flag) {
              t.$router.push({ path: "/over" });
            } else {
              t.getData();
            }
          } else {
            Toast({
              message: res.data.msg,
              position: "middle",
              duration: 2000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData() {
      const t = this;
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");
      let params = {
        token: token,
        userId: userId
      };
      this.http
        .get("/api/getuserinfo", { params })
        .then(res => {
          localStorage.setItem("formData", JSON.stringify(res.data.data));
          t.$store.commit("entryFlow/setFormData", res.data.data);
          t.$store.commit("entryFlow/setInfoMsgShow", {});
          t.$router.push({ path: "/entryFlowOffer" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {},
  mounted() {
    const t = this;
    t.flowTitle = "入职办理";
    t.openId = this.$route.query.openId;
  }
};
</script>
<style scoped lang="less" type="text/less">
@import "../css/common_inform";
.a {
  font-size: 40px;
}
.entryFlow {
  width: 100%;
  height: 100%;
  background-image: url("../../../static/entryFlow/login.png");
  background-repeat: no-repeat;
  background-size: 100% 480px;
  position: relative;
  .submit {
    width: 90%;
    background: white;
    position: absolute;
    top: 385px;
    left: 5%;
    border-radius: 20px;
    box-shadow: 0px 2px 2px #f6f6f6;
    padding-top: 100px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 0.5px rgba(0, 10, 0, 0.1);
    h3 {
      width: 100%;
      text-align: center;
      margin-bottom: 50px;
      font-size: 36px;
    }
    .phone {
      width: 80%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 2px solid #ccc;
      margin-bottom: 80px;
      div:nth-of-type(1) {
        width: 30px;
        margin-right: 20px;
        img {
          width: 30px;
          height: 36px;
        }
      }
      div:nth-of-type(2) {
        flex: 1;
        input {
          width: 100%;
          border: 0;
          outline: none;
          font-size: 32px;
        }
      }
    }
    .password {
      width: 80%;
    }
  }
  .sub_fotter {
    width: 80%;
    height: 100px;
    position: absolute;
    top: 930px;
    left: 10%;
    border-radius: 20px;
    overflow: hidden;
    button {
      width: 100%;
      outline: none;
      background: #3399ff;
      height: 100%;
      border-top-style: none;
      border-right-style: none;
      border-bottom-style: none;
      border-left-style: none;
      font-size: 30px;
      color: white;
    }
  }
}
</style>
