<template>
  <div class="messageAll">
    <mu-form ref="form" :model="form" class="mu-demo-form">
      <div class="message">
        <div class="messOne">
          <span>雇员姓名</span>
          <!-- <span class="point">*</span> -->
          <span>
            <mu-form-item prop="name" :rules="name">
              <mu-text-field
                placeholder="请填写"
                v-model="form.name"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>证件号码</span>
          <!-- <span class="point">*</span> -->
          <span>
            <mu-form-item prop="identity" :rules="identity">
              <mu-text-field
                placeholder="请填写"
                v-model="form.identity"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>手机号</span>
          <!-- <span class="point">*</span> -->
          <span>
            <mu-form-item prop="phone" :rules="phone">
              <mu-text-field
                placeholder="请填写"
                v-model="form.phone"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>工作省</span>
          <!-- <span class="point">*</span> -->
          <span>
            <mu-form-item prop="province" :rules="province">
              <mu-text-field
                placeholder="请选择"
                readonly="readonly"
                v-model="provinceName"
                @focus="focus(1)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>工作城市</span>
          <!-- <span class="point">*</span> -->
          <span>
            <mu-form-item prop="city" :rules="city">
              <mu-text-field
                placeholder="请选择"
                readonly="readonly"
                v-model="cityName"
                @focus="focus(2)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>店面名称</span>
          <!-- <span class="point">*</span> -->
          <span>
            <mu-form-item prop="shopname" :rules="shopname">
              <mu-text-field
                placeholder="请选择"
                readonly="readonly"
                v-model="shopName"
                @focus="focus(3)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>店面地址</span>
          <!-- <span class="point">*</span> -->
          <span>
            <mu-form-item prop="shopaddr" :rules="shopaddr">
              <mu-text-field
                placeholder="请填写"
                v-model="form.shopaddr"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>出生日期</span>
          <!-- <span class="point">*</span> -->
          <span>
            <mu-form-item prop="birth" :rules="birth">
              <mu-text-field
                v-model="form.birth"
                placeholder="请选择"
                readonly="readonly"
                @focus="births()"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>性别</span>
          <!-- <span class="point">*</span> -->
          <span style="display: inline-block;width: 5.3rem;">
            <mu-form-item prop="gender" :rules="gender">
              <mu-radio v-model="form.gender" value="p_01male" label="男"></mu-radio>
              <mu-radio v-model="form.gender" value="p_02female" label="女"></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <!-- <div @click="submit" class="submit">
        保存
      </div> -->
      <mt-datetime-picker
        type="date"
        ref="picker"
        v-model="pickerValue"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm"
        :startDate="startDate"
        :endDate="endDate"
      >
      </mt-datetime-picker>
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
import { isSuccess, deepCopy } from "@/lib/util";
import { DatetimePicker, Toast } from "mint-ui";
import scrollPicker from "@/components/scrollPicker";
import moment from "moment"; // 格式化时间
import valid from "@/lib/pub_valid";
export default {
  data() {
    return {
      startDate: new Date("1970-01-01"),
      endDate: new Date(),
      pickerValue:new Date(),
      scrollPickerShow: false,
      provinceOptions: [], // 省份数组
      cityOptions: [], // 城市数组
      shopOptions: [],
      provinceName: "",
      cityName: "",
      shopName: "",
      form: {
        name: "",
        identity: "",
        phone: "",
        province: "",
        city: "",
        shopname: "",
        shopaddr: "",
        birth: "",
        gender: ""
      },
      name: [{ validate: val => !!val, message: "雇员姓名不能为空" }],
      identity: [
        { validate: val => !!val, message: "证件号码不能为空" },
        {
          validate: val => valid.val_IdCard(this.form.identity),
          message: "证件号码格式有误"
        }
      ],
      phone: [
        { validate: val => !!val, message: "手机号码不能为空" },
        {
          validate: val => valid.val_mobile(this.form.phone),
          message: "手机号格式有误"
        }
      ],
      province: [{ validate: val => !!val, message: "工作省份不能为空" }],
      city: [{ validate: val => !!val, message: "工作城市不能为空" }],
      shopname: [{ validate: val => !!val, message: "店面名称不能为空" }],
      shopaddr: [{ validate: val => !!val, message: "店面地址不能为空" }],
      birth: [{ validate: val => !!val, message: "出生日期不能为空" }],
      gender: [{ validate: val => !!val, message: "性别不能为空" }],
      map: {},
      maps: []
    };
  },
  components: {
    scrollPicker
  },
  methods: {
    // 提交信息
    // submit() {
    //   const t = this;
    //   t.$refs.form.validate().then(result => {
    //     if (result) {
    //       let openId = localStorage.getItem("openId");
    //       let data = Object.assign({}, t.form);
    //       data.openId = openId;
    //       this.http
    //         .post("/api/REC_WEIXIN/returntoguwen", data)
    //         .then(res => {
    //           if (res.data.errcode === 0) {
    //             Toast({
    //               message: res.data.msg,
    //               position: "middle",
    //               duration: 2000
    //             });
    //             t.$router.push({ path: "/entryFlow" });
    //           } else {
    //             Toast({
    //               message: res.data.msg,
    //               position: "middle",
    //               duration: 2000
    //             });
    //           }
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         });
    //     }
    //   });
    // },
    focus(type) {
      const t = this;
      let data = [];
      if (type === 1) {
        data = t.provinceOptions;
        t.scrollType = "province";
      } else if (type === 2) {
        if (t.form.province !== "") {
          data = t.cityOptions;
        } else {
          Toast({
            message: "请先选择省份",
            position: "middle",
            duration: 2000
          });
          return;
        }
        t.scrollType = "city";
      } else {
        data = t.shopOptions;
        t.scrollType = "shopname";
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
    scrollCancel() {
      this.maps = [];
      this.scrollPickerShow = false;
    },
    scrollSure() {
      const t = this;
      t.scrollPickerShow = false;
      switch (t.scrollType) {
        case "province":
          t.form.province = this.map.paramCode;
          t.provinceName = this.map.paramInfoName;
          t.form.city = "";
          t.cityName = "";
          t.getData('city',t.form.province);
          break;
        case "city":
          t.form.city = this.map.paramCode;
          t.cityName = this.map.paramInfoName;
          break;
        case "shopname":
          t.form.shopname = this.map.paramCode;
          t.shopName = this.map.paramInfoName;
          break;
      }
      t.maps = [];
      t.clear();
    },
    births() {
      this.pickerValue = new Date()
      this.$refs.picker.open();
    },
    handleConfirm(data) {
      const t = this;
      let date = moment(data).format("YYYY-MM-DD");
      t.form.birth = date;
      t.clear();
    },
    clear() {
      this.$refs.form.clear();
    },
    getData(type,pid){
      const t = this;
      let arr = []
      let params = {
        type: type,
        userId:localStorage.getItem('userId'),
        Token:localStorage.getItem('token')
      };
      if(type==="city"){
        params.pid = pid
      }
      this.http
        .get("/api/getbaseinfo", { params })
        .then(res => {
          let data = res.data.data;
          for (let i in data) {
            arr.push({ id: i, name: data[i] });
          }
          if(type==='province'){
            t.provinceOptions = arr
            t.provinceOptions.forEach((item, index) => {
              if (t.form.province === item.id) {
                t.provinceName = item.name;
              }
            });
            if (t.form.province) {
              t.getData('city',t.form.province);
            }
          } else if(type==='city'){
            t.cityOptions = arr
            t.cityOptions.forEach((item, index) => {
              if (t.form.city === item.id) {
                t.cityName = item.name;
              }
            });
          } else {
            t.shopOptions = arr
            t.shopOptions.forEach((item, index) => {
              if (t.form.shopname === item.id) {
                t.shopname = item.name;
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
    Object.assign(this.form, this.formData);
    this.getData('province');
    this.getData('shopname')
  },
  computed: {
    formData() {
      if (Object.keys(this.$store.state.entryFlow.formData).length == 0) {
        this.$store.dispatch("entryFlow/getFormData");
      }
      return this.$store.state.entryFlow.formData;
    },
  }
};
</script>

<style type="text/less" lang="less" scoped>
@import "../css/scrollPicker";
@import "./childComponents/css/entry";
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
  height: 100%;
}
/deep/ .mu-select-content {
  height: 100%;
  /deep/ .mu-select-input {
    height: 100%;
    border-bottom: 0 !important;
  }
}
/deep/ .mu-form-item-content {
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
}
/deep/ .mu-text-field-input {
  height: 100%;
}
.message .messOne span:nth-of-type(1) {
  line-height: 2;
}
/deep/ .mu-item .mu-item-title {
  font-size: 0.4rem;
}
</style>
