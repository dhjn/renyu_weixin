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
                @focus="focus('city')"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>开户银行</span>
          <!-- <span class="point">*</span> -->
          <span>
            <mu-form-item prop="bank">
              <mu-text-field
                placeholder="请选择"
                readonly="readonly"
                v-model="bankName"
                @focus="focus('bank')"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>开户行全称(重要)</span>
          <!-- <span class="point">*</span> -->
          <span>
            <mu-form-item prop="bankname">
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
      <div class="scrollPicker" v-if="pickerShow">
        <div class="scrollPickerChild">
          <div class="selectBtn">
            <div style="color: #3a72ed;" @click="cancel">取消</div>
            <div style="color: #3a72ed;" @click="sure">确定</div>
          </div>
          <mt-picker
            :slots="slots"
            value-Key="name"
            :show-toolbar="true"
            @change="onValuesChange"
          ></mt-picker>
        </div>
      </div>
    </mu-form>
  </div>
</template>

<script>
import { Toast, Picker } from "mint-ui";
import qs from "qs";
import axios from "axios";
export default {
  name: "salaryMessage",
  data() {
    return {
      cityArr: [],
      provinceArr: [],
      bcardcityOptions: [],
      bcardcityName: "",
      provinceOptions: [], // 省份数组加id
      province: "", // 省份
      bankOptions: [],
      bankName: "",
      form: {
        bcardcity: "",
        bank: "",
        bankname: "",
        bcard: ""
      },
      bcardcity: [{ validate: val => !!val, message: "开户城市不能为空" }],
      // bank: [{ validate: val => !!val, message: "开户银行不能为空" }],
      // bankname: [{ validate: val => !!val, message: "开户银行全称不能为空" }],
      bcard: [{ validate: val => !!val, message: "银行卡号不能为空" }],
      scrollType: "",
      pickerShow: false,
      isloading: false,
      slots: [],
      slots1: [
        {
          flex: 1,
          values: ["请选择"],
          className: "slot1",
          textAlign: "right"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: ["请选择"],
          className: "slot3",
          textAlign: "left"
        }
      ],
      slots2: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      resultArr: []
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
          let userId = localStorage.getItem("userId");
          let data = Object.assign({}, t.form);
          data.type = "3";
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
    cancel() {
      this.pickerShow = false;
    },
    sure() {
      if(this.scrollType==='bank'){
        this.bankName = this.resultArr[0];
        this.bankOptions.forEach(item => {
          if (this.bankName === item.name) {
            this.form.bank = item.id;
          }
        });
      } else {
        this.bcardcityName = this.resultArr[1];
        this.bcardcityOptions.forEach(item => {
          if (this.bcardcityName === item.name) {
            this.form.bcardcity = item.id;
          }
        });
      }
      this.pickerShow = false;
    },
    focus(type) {
      let t = this;
      if (type === "bank") {
        let arr = [];
        t.bankOptions.forEach(item => {
          arr.push(item.name);
        });
        t.slots2[0].values = arr;
        t.scrollType = "bank";
        t.slots = t.slots2;
      } else {
        t.scrollType = "city";
        t.slots = t.slots1;
      }
      t.pickerShow = true;
    },
    // 获取城市、开户行的公共方法
    getData(type, id) {
      const t = this;
      let Token = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");
      let arr = [];
      let params = {
        type: type,
        userId: userId,
        Token: Token
      };
      if (id) {
        params.pid = id;
      }
      t.http
        .get("/api/getbaseinfo", { params })
        .then(res => {
          console.log(type);
          let data = res.data.data;
          for (let i in data) {
            arr.push({ id: i, name: data[i] });
          }
          if (type === "province") {
            t.provinceOptions = arr;
            t.provinceOptions.forEach(item => {
              t.provinceArr.push(item.name);
            });
            t.slots1[0].values = t.provinceArr;
          } else if (type === "city") {
            t.bcardcityOptions = arr;
            t.bcardcityOptions.forEach((item, index) => {
              if (t.form.bcardcity === item.id) {
                t.bcardcityName = item.name;
              }
            });
          } else {
            t.bankOptions = arr;
            t.bankOptions.forEach((item, index) => {
              if (t.form.bank === item.id) {
                t.bankName = item.name;
              }
            });
          }
          console.log(type);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onValuesChange(picker, values) {
      let t = this;
      if (t.scrollType === "city") {
        let arr = [];
        let id = "";
        t.provinceOptions.forEach(item => {
          if (values[0] === item.name) {
            id = item.id;
          }
        });
        t.area(id).then(function(data) {
          data.forEach(item => {
            arr.push(item.name);
          });
          picker.setSlotValues(1, arr);
        });
      }
      this.resultArr = picker.getValues();
    },
    area(id) {
      let t = this;
      let Token = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");
      let arr = [];
      let promise = new Promise(function(resolve, reject) {
        let params = {
          type: "city",
          pid: id,
          userId: userId,
          Token: Token
        };
        t.http
          .get("/api/getbaseinfo", { params })
          .then(function(res) {
            let data = res.data.data;
            for (let i in data) {
              arr.push({ id: i, name: data[i] });
            }
            resolve(arr);
          })
          .catch(function(error) {
            console.log(error);
          });
      });
      return promise;
    },
    async init() {
      await this.getData("province");
      await this.getData("city");
      await this.getData("bank");
    }
  },
  mounted() {
    const t = this;
    window.scrollTo(0, 0);
    for (let dat1 in t.formData) {
      for (let dat2 in t.form) {
        if (dat1 === dat2) {
          t.form[dat1] = t.formData[dat1];
        }
      }
    }
    t.init();
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
/deep/ .picker-item {
  font-size: 36px;
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
