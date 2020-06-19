<!--一条为一行-->
<template>
  <div class="messageAll" v-loading="isloading">
    <mu-form ref="form" :model="form" class="mu-demo-form">
      <div class="message">
        <div class="messOne">
          <span>姓名</span>
          <span>
            <mu-form-item prop="name">
              <mu-text-field
                placeholder="请填写"
                oninput="this.value=this.value.replace(/[\d]/g,'');"
                v-model="form.name"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>身份证号码</span>
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
          <span>最高学历</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="education" :rules="education">
              <mu-text-field
                placeholder="请选择"
                readonly="readonly"
                v-model="educationName"
                @focus="focus()"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>所学专业</span>
          <span>
            <mu-form-item prop="major">
              <mu-text-field
                placeholder="请填写"
                v-model="form.major"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>证明人</span>
          <span>
            <mu-form-item prop="prove">
              <mu-text-field
                placeholder="请填写"
                oninput="this.value=this.value.replace(/[\d]/g,'');"
                v-model="form.prove"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>证明人联系方式</span>
          <span>
            <mu-form-item prop="proPhone" :rules="proPhone">
              <mu-text-field
                placeholder="请填写"
                v-model="form.proPhone"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>毕业院校开始时间</span>
          <span>
            <mu-form-item prop="gstart" :rules="gstart">
              <mu-text-field
                v-model="form.gstart"
                placeholder="请选择"
                readonly="readonly"
                @focus="gstarts(1)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>毕业院校结束时间</span>
          <span>
            <mu-form-item prop="gend" :rules="gend">
              <mu-text-field
                v-model="form.gend"
                placeholder="请选择"
                readonly="readonly"
                @focus="gends(2)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>毕业院校</span>
          <span>
            <mu-form-item prop="graduation">
              <mu-text-field
                placeholder="请填写"
                max-length="16"
                v-model="form.graduation"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div @click="submit" class="submit">
        保存
      </div>
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
import { DatetimePicker } from "mint-ui";
import dataArr from "./js/data2";
import scrollPicker from "@/components/scrollPicker";
import moment from "moment"; // 格式化时间
import { Toast } from "mint-ui";
export default {
  name: "educationMessage",
  data() {
    return {
      typeNum: "",
      startDate: new Date("2000-01-01"),
      endDate: new Date(),
      pickerValue: new Date(),
      educationOptions: [],
      educationName: "",
      form: {
        name: "",
        identity: "",
        education: "",
        major: "",
        prove: "",
        proPhone: "",
        gstart: "",
        gend: "",
        graduation: ""
      },
      identity: [
        {
          validate: val => this.val_IdCard(this.form.identity),
          message: "身份证格式有误"
        }
      ],
      gstart: [
        {
          validate: val => this.judgeDate(this.form.gstart, this.form.gend),
          message: "毕业院校开始时间不能大于结束时间"
        }
      ],
      gend: [
        {
          validate: val => this.judgeDate(this.form.gstart, this.form.gend),
          message: "毕业院校结束时间不能小于开始时间"
        }
      ],
      education: [{ validate: val => !!val, message: "最高学历不能为空" }],
      proPhone: [
        {
          validate: val => this.val_mobile(this.form.proPhone),
          message: "手机号格式有误"
        }
      ],
      isloading: false,
      scrollPickerShow: false,
      maps: [],
      map: {}
    };
  },
  components: {
    scrollPicker
  },
  methods: {
    submit() {
      const t = this;
      t.$refs.form.validate().then(result => {
        if (result) {
          let Token = localStorage.getItem("token");
          let userId = localStorage.getItem("userId");
          let data = Object.assign({}, t.form);
          data.type = "4";
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
                t.$store.commit("entryFlow/SetEductionInfo", true);
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
    //手机格式 204 必须以数字开头，除数字外，可含有-
    val_mobile(str) {
      let rtn = false;
      if (str === "") {
        rtn = true;
      } else {
        let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (str.match(reg)) {
          rtn = true;
        }
      }
      return rtn;
    },
    //身份证号
    val_IdCard: id => {
      let REGEX_ID_CARD = /(^\d{15}$)|bai(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (id === "") {
        return true;
      } else {
        if (REGEX_ID_CARD.test(id)) {
          return true;
        }
        return false;
      }
    },
    gstarts(num) {
      this.typeNum = num;
      this.pickerValue = new Date();
      this.endDate = new Date();
      this.$refs.picker.open();
    },
    gends(num) {
      this.typeNum = num;
      this.pickerValue = new Date();
      this.endDate = new Date("2050-12-31");
      this.$refs.picker.open();
    },
    handleConfirm(data) {
      const t = this;
      let date = moment(data).format("YYYY-MM-DD");
      if (t.typeNum == 1) {
        t.form.gstart = date;
      }
      if (t.typeNum == 2) {
        t.form.gend = date;
      }
      t.clear();
    },
    clear() {
      this.$refs.form.clear();
    },
    judgeDate(start, end) {
      if (start === "" || end === "") {
        return true;
      } else {
        if (start >= end) {
          return false;
        } else {
          return true;
        }
      }
    },
    scrollCancel() {
      this.maps = [];
      this.scrollPickerShow = false;
    },
    scrollSure() {
      const t = this;
      t.scrollPickerShow = false;
      t.form.education = this.map.paramCode;
      t.educationName = this.map.paramInfoName;
      t.maps = [];
      t.clear();
    },
    focus() {
      const t = this;
      let data = [];
      data = t.educationOptions;
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
    generateArr(obj) {
      let arr = [];
      for (let v in obj) {
        arr.push({
          id: v,
          name: obj[v]
        });
      }
      return arr;
    }
  },
  mounted() {
    const t = this;
    window.scrollTo(0, 0);
    t.educationOptions = t.generateArr(dataArr.education); // 转换最高学历数据
    for (let dat1 in t.formData) {
      for (let dat2 in t.form) {
        if (dat1 === dat2) {
          t.form[dat1] = t.formData[dat1];
        }
      }
      t.educationOptions.forEach(item => {
        if (item.id === this.form.education) {
          this.educationName = item.name;
        }
      });
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
/deep/ .picker-item{
  font-size: .64rem !important;
}
/deep/ .picker-item.picker-selected{
  color: #3a72ed;
}
/deep/ .mu-input-help {
  display: none;
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
