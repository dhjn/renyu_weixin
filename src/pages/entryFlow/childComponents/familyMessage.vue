<!--一条为一行-->
<template>
  <div class="messageAll" v-loading="isloading">
    <mu-form ref="form" :model="form" class="mu-demo-form">
      <div class="message">
        <div class="messOne">
          <span>姓名</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="familyName" :rules="familyName">
              <mu-text-field
                placeholder="请填写"
                v-model="form.familyName"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>与您的关系</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="familySay" :rules="familySay">
              <mu-text-field
                placeholder="请填写"
                v-model="form.familySay"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>年龄</span>
          <span>
            <mu-form-item prop="familyAge">
              <mu-text-field
                type="number"
                placeholder="请填写"
                v-model="form.familyAge"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>工作单位</span>
          <span>
            <mu-form-item prop="familyworkPlace">
              <mu-text-field
                placeholder="请填写"
                v-model="form.familyworkPlace"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>职务</span>
          <span>
            <mu-form-item prop="familyJobTitle">
              <mu-text-field
                placeholder="请填写"
                v-model="form.familyJobTitle"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>手机号码</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="familyPhone" :rules="familyPhone">
              <mu-text-field
                type="number"
                placeholder="请填写"
                v-model="form.familyPhone"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div @click="submit" class="submit">
        保存
      </div>
    </mu-form>
  </div>
</template>

<script>
import { isSuccess, deepCopy, getUrlKey } from "@/lib/util";
import {
  getDataLevelNone,
  getDataLevelUserLogin,
  getDataLevelNoneNew,
  getDataLevelUserLoginNewGzh
} from "@/axios/axios";
import Bus from "../../../lib/bus";
import { DatetimePicker, Toast } from "mint-ui";
import moment from "moment"; // 格式化时间
import nationData from "./js/data";
export default {
  name: "familyMessage",
  data() {
    return {
      form: {
        familyName: "",
        familySay: "",
        familyAge: "",
        familyworkPlace: "",
        familyJobTitle: "",
        familyPhone: ""
      },
      familyName: [{ validate: val => !!val, message: "姓名不能为空" }],
      familySay: [{ validate: val => !!val, message: "与您的关系不能为空" }],
      familyPhone: [
        { validate: val => !!val, message: "手机号码不能为空" },
        {
          validate: val => this.val_mobile(this.form.familyPhone),
          message: "手机号格式有误"
        }
      ],
      isloading: false
    };
  },
  components: {},
  methods: {
    clear() {
      this.$refs.form.clear();
    },
    //手机格式 204 必须以数字开头，除数字外，可含有-
    val_mobile(str) {
      let rtn = false;
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (str.match(reg)) {
        rtn = true;
      }
      return rtn;
    },
    submit() {
      const t = this;
      t.$refs.form.validate().then(result => {
        if (result) {
          let Token = localStorage.getItem("token");
          let userId = localStorage.getItem("userId");
          let data = Object.assign({}, t.form);
          data.type = "6";
          data.userId = userId;
          t.isloading = true;
          this.http
            .post(`/api/saveuserinfo?Token=${Token}`, JSON.stringify(data))
            .then(res => {
              if (res.data.errcode === 0) {
                Toast({
                  message: res.data.msg,
                  position: "middle",
                  duration: 2000
                });
                t.$store.commit(
                  "entryFlow/setFormData",
                  Object.assign(t.formData, t.form)
                );
                t.isloading = false;
                t.$store.commit("entryFlow/SetFamilyInfo", true);
                t.$router.push({ path: "/entryFlowOffer" });
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
        } else {
          Toast({
            message: "请输入必填项",
            position: "middle",
            duration: 2000
          });
        }
      });
    }
  },
  mounted() {
    const t = this;
    if (t.familyInfoShow) {
      for (let dat1 in t.formData) {
        for (let dat2 in t.form) {
          if (dat1 === dat2) {
            t.form[dat1] = t.formData[dat1];
          }
        }
      }
    }
  },
  computed: {
    formData() {
      return this.$store.state.entryFlow.formData;
    },
    familyInfoShow() {
      return this.$store.state.entryFlow.infoMsgShow.familyInfo;
    }
  }
};
</script>

<style scoped type="text/less" lang="less">
@import "../../css/scrollPicker";
@import "./css/entry";
.message .messOne .point {
  position: absolute;
  left: 0.266667rem;
  color: red;
  height: 100%;
  line-height: 2;
  font-size: inherit;
}
/deep/ .mu-form-item {
  padding: 0;
  margin: 0;
}
/deep/ .mu-select-content {
  height: 100%;
  /deep/ .mu-select-input {
    height: 100%;
    border-bottom: 0 !important;
  }
}
/deep/ .mu-form-item-content {
}
/deep/ .message .messOne .mu-input {
  width: 4.5rem;
}
/deep/ .mu-input-content {
  height: 100%;
}
/deep/ .mu-item {
  height: 0.6rem;
  .mu-item-title {
    height: 0.6rem;
    line-height: 0.6rem;
  }
}
/deep/ .mu-form-item-help {
  font-size: 0.35rem;
  bottom: -0.3rem;
  white-space: nowrap;
}
/deep/ .mu-text-field-input {
  height: 100%;
}
.message .messOne span:nth-of-type(1) {
  line-height: 2;
  max-width: 39%;
}
.message .messOne span:nth-of-type(3) {
  padding-left: 10px;
}
/deep/ .mu-item .mu-item-title {
  font-size: 0.4rem;
}
</style>
