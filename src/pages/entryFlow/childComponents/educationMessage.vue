<!--一条为一行-->
<template>
  <div class="messageAll" v-loading="isloading">
    <mu-form ref="form" :model="form" class="mu-demo-form">
      <div class="message">
        <div class="messOne">
          <span>毕业院校开始时间</span>
          <span class="point">*</span>
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
          <span class="point">*</span>
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
          <span class="point">*</span>
          <span>
            <mu-form-item prop="graduation" :rules="graduation">
              <mu-text-field
                placeholder="请填写"
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
    </mu-form>
  </div>
</template>

<script>
import { DatetimePicker } from "mint-ui";
import moment from "moment"; // 格式化时间
import { Toast } from "mint-ui";
export default {
  name: "educationMessage",
  data() {
    return {
      typeNum: "",
      startDate: new Date("2000-01-01"),
      endDate: new Date(),
      pickerValue:new Date(),
      form: {
        gstart: "",
        gend: "",
        graduation: ""
      },
      gstart: [
        { validate: val => !!val, message: "毕业院校开始时间不能为空" },
        {
          validate: val => this.judgeDate(this.form.gstart, this.form.gend),
          message: "毕业院校开始时间不能大于结束时间"
        }
      ],
      gend: [
        { validate: val => !!val, message: "毕业院校结束时间不能为空" },
        {
          validate: val => this.judgeDate(this.form.gstart, this.form.gend),
          message: "毕业院校结束时间不能小于开始时间"
        }
      ],
      graduation: [{ validate: val => !!val, message: "毕业院校不能为空" }],
      isloading:false
    };
  },
  components: {},
  methods: {
    submit() {
      const t = this;
      t.$refs.form.validate().then(result => {
        if (result) {
          let Token = localStorage.getItem("token");
          let userId = localStorage.getItem('userId')
          let data = Object.assign({}, t.form);
          data.type = "4";
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
    gstarts(num) {
      this.typeNum = num;
      this.pickerValue = new Date()
      this.endDate = new Date()
      this.$refs.picker.open();
    },
    gends(num) {
      this.typeNum = num;
      this.pickerValue = new Date()
      this.endDate = new Date('2050-12-31')
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
