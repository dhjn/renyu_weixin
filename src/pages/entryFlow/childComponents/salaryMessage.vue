<!--一条为一行-->
<template>
  <div class="messageAll" v-loading="isloading">
    <mu-form ref="form" :model="form" class="mu-demo-form">
      <div class="message">
        <div class="messOne">
          <span>开户城市</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="bcardcity" :rules="bcardcity">
              <mu-text-field
                placeholder="请选择"
                readonly="readonly"
                v-model="bcardcityName"
                @focus="focus(1)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>开户银行</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="bank" :rules="bank">
              <mu-text-field
                placeholder="请选择"
                readonly="readonly"
                v-model="bankName"
                @focus="focus(2)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>开户行全称</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="bankname" :rules="bankname">
              <mu-text-field
                placeholder="请填写"
                v-model="form.bankname"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>银行卡卡号</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="bcard" :rules="bcard">
              <mu-text-field
                placeholder="请填写"
                v-model="form.bcard"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div @click="submit" class="submit">
        保存
      </div>
      <div class="scrollPicker" v-show="scrollPickerShow">
        <div class="scrollPickerChild">
          <div class="selectBtn">
            <div style="color: #3a72ed;" @click="scrollCancel">取消</div>
            <div style="color: #3a72ed;" @click="scrollSure">确定</div>
          </div>
          <scroll-picker :maps="maps" :map.sync="map"></scroll-picker>
        </div>
      </div>
    </mu-form>
  </div>
</template>

<script>
import scrollPicker from "@/components/scrollPicker";
import { Toast } from "mint-ui";
import qs from 'qs'
export default {
  name: "salaryMessage",
  data() {
    return {
      bcardcityOptions: [],
      bcardcityName: "",
      bankOptions: [],
      bankName: "",
      form: {
        bcardcity: "",
        bank: "",
        bankname:'',
        bcard:''
      },
      bcardcity: [{ validate: val => !!val, message: "开户城市不能为空" }],
      bank: [{ validate: val => !!val, message: "开户银行不能为空" }],
      bankname: [{ validate: val => !!val, message: "开户银行全称不能为空" }],
      bcard: [{ validate: val => !!val, message: "银行卡号不能为空" }],
      maps: [],
      map: {},
      scrollType: "",
      scrollPickerShow: false,
      isloading:false
    };
  },
  methods: {
    clear() {
      this.$refs.form.clear();
    },
    submit() {
      const t = this;
      t.$refs.form.validate().then(result => {
        if (result) {
          let Token = localStorage.getItem("token");
          let userId = localStorage.getItem('userId')
          let data = Object.assign({}, t.form);
          data.type = "3";
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
                t.$store.commit("entryFlow/SetSalaryInfo", true);
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
            message: "请填必填项",
            position: "middle",
            duration: 2000
          });
        }
      });
    },
    scrollCancel() {
      this.maps = [];
      this.scrollPickerShow = false;
    },
    scrollSure() {
      const t = this;
      t.scrollPickerShow = false;
      switch (t.scrollType) {
        case "bcardcity":
          t.bcardcityName = this.map.paramInfoName;
          t.form.bcardcity = this.map.paramCode;
          break;
        case "bank":
          t.bankName = this.map.paramInfoName;
          t.form.bank = this.map.paramCode;
          break;
      }
      t.maps = [];
      t.clear();
    },
    focus(type) {
      const t = this;
      let data = [];
      if (type === 1) {
        data = t.bcardcityOptions;
        t.scrollType = "bcardcity";
      } else {
        data = t.bankOptions;
        t.scrollType = "bank";
      }
      data.forEach((item, index) => {
        let obj = {
          paramInfoName: item.name,
          paramCode: item.id
        };
        t.maps.push(obj);
      });
      t.map = t.maps[0];
      t.scrollPickerShow = true;
    },
    // 获取城市、开户行的公共方法
    getData(type) {
      const t = this;
      let Token = localStorage.getItem('token')
      let userId = localStorage.getItem('userId')
      let arr = [];
      let params = {
        type:type,
        userId:userId,
        Token:Token
      }
      this.http
        .get("/api/getbaseinfo",{ params }) 
        .then(res => {
          let data = res.data.data;
          for (let i in data) {
            arr.push({ id: i, name: data[i] });
          }
          if (type === "city") {
            t.bcardcityOptions = arr;
            t.bcardcityOptions.forEach((item, index) => {
              if (t.form.bcardcity === item.id) {
                t.bcardcityName = item.name;
              }
            })
          } else {
            t.bankOptions = arr;
            t.bankOptions.forEach((item, index) => {
              if (t.form.bank === item.id) {
                t.bankName = item.name;
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    const t = this;
      for (let dat1 in t.formData) {
        for (let dat2 in t.form) {
          if (dat1 === dat2) {
            t.form[dat1] = t.formData[dat1];
          }
        }
      }
    t.getData('city');
    t.getData('bank');
  },
  computed: {
    formData() {
      if (Object.keys(this.$store.state.entryFlow.formData).length == 0) {
        this.$store.dispatch("entryFlow/getFormData");
      }
      return this.$store.state.entryFlow.formData;
    }
  },
  components: {
    scrollPicker
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
  max-width: 39%;
}
/deep/ .mu-item .mu-item-title {
  font-size: 0.4rem;
}
</style>
