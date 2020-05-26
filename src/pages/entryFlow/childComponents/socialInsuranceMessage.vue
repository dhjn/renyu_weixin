<!--一条为一行-->
<template>
  <div class="messageAll" v-loading="isloading">
    <mu-form ref="form" :model="form" class="mu-demo-form">
      <div class="message">
        <div class="messOne">
          <span>是否在本市缴纳过社保</span>
          <span class="point">*</span>
          <span style="display: inline-block;width: 4rem;padding-top:6px;">
            <mu-form-item prop="ispaysb" :rules="ispaysb">
              <mu-radio v-model="form.ispaysb" value="0" label="否"></mu-radio>
              <mu-radio v-model="form.ispaysb" value="1" label="是"></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <!-- <div class="message">
        <div class="messOne">
          <span>是否在本市缴纳过公积金</span>
          <span class="point">*</span>
          <span style="display: inline-block;width: 4rem;padding-top:6px;">
            <mu-form-item prop="ispaygjj" :rules="ispaygjj">
              <mu-radio v-model="form.ispaygjj" value="0" label="否"></mu-radio>
              <mu-radio v-model="form.ispaygjj" value="1" label="是"></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div> -->
      <div class="message">
        <div class="messOne">
          <span>是否有医保存折</span>
          <span class="point">*</span>
          <span style="display: inline-block;width: 4rem;padding-top:6px;">
            <mu-form-item prop="medpsbook" :rules="medpsbook">
              <mu-radio
                v-model="form.medpsbook"
                value="0"
                label="否"
              ></mu-radio>
              <mu-radio
                v-model="form.medpsbook"
                value="1"
                label="是"
              ></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>是否有社保卡</span>
          <span class="point">*</span>
          <span style="display: inline-block;width: 4rem;padding-top:6px;">
            <mu-form-item prop="sbcard" :rules="sbcard">
              <mu-radio v-model="form.sbcard" value="0" label="否"></mu-radio>
              <mu-radio v-model="form.sbcard" value="1" label="是"></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>是否需要办理异地就医</span>
          <span class="point">*</span>
          <span style="display: inline-block;width:4rem;padding-top:6px;">
            <mu-form-item prop="remotemed" :rules="remotemed">
              <mu-radio
                v-model="form.remotemed"
                value="0"
                label="否"
              ></mu-radio>
              <mu-radio
                v-model="form.remotemed"
                value="1"
                label="是"
              ></mu-radio>
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
import valid from "@/lib/pub_valid";
import { Toast } from "mint-ui";
export default {
  name: "socialInsuranceMessage",
  data() {
    return {
      form: {
        ispaysb: "",
        ispaygjj: "",
        medpsbook: "",
        sbcard: "",
        remotemed: ""
      },
      ispaysb: [{ validate: val => !!val, message: "该项必选" }],
      ispaygjj: [{ validate: val => !!val, message: "该项必选" }],
      medpsbook: [{ validate: val => !!val, message: "该项必选" }],
      sbcard: [{ validate: val => !!val, message: "该项必选" }],
      remotemed: [{ validate: val => !!val, message: "该项必选" }],
      isloading:false
    };
  },
  methods: {
    submit() {
      const t = this;
      t.$refs.form.validate().then(result => {
        if (result) {
          let Token = localStorage.getItem("token");
          let userId = localStorage.getItem('userId')
          let data = Object.assign({}, t.form);
          data.type = "2";
          data.userId = userId 
          t.isloading = true 
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
                t.isloading = false
                t.$store.commit("entryFlow/SetSocialInsranceInfo", true);
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
            message: "请填必选项",
            position: "middle",
            duration: 2000
          });
        }
      });
    },
    clear() {
      this.$refs.form.clear();
    }
  },
  mounted() {
    const t = this;
    window.scrollTo(0,0)
    for (let dat1 in t.formData) {
      for (let dat2 in t.form) {
        if (dat1 === dat2) {
          t.form[dat1] = t.formData[dat1];
        }
      }
    }
  },
  computed: {
    formData() {
      if (Object.keys(this.$store.state.entryFlow.formData).length == 0) {
        this.$store.dispatch("entryFlow/getFormData");
      }
      return this.$store.state.entryFlow.formData;
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
  //   height: 100%;
}
/deep/ .mu-select-content {
  height: 100%;
  /deep/ .mu-select-input {
    height: 100%;
    border-bottom: 0 !important;
  }
}
/deep/ .mu-form-item-content {
  //   height: 100%;
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
  min-width: 65%;
}
/deep/ .mu-item .mu-item-title {
  font-size: 0.4rem;
}
</style>
