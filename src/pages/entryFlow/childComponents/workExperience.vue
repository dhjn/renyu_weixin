<!--一条为一行-->
<template>
  <div class="messageAll" style="z-index: 100">
    <mu-form ref="form" :model="form" class="mu-demo-form" v-loading="isloading">
      <div class="message">
        <div class="messOne">
          <span>工作履历开始时间</span>
          <span>
            <mu-form-item prop="wstart">
              <mu-text-field
                v-model="form.wstart"
                @focus="focus(1)"
                placeholder="请选择"
                readonly="readonly"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>工作履历结束时间</span>
          <span>
            <mu-form-item prop="wend">
              <mu-text-field
                class="inpt"
                v-model="form.wend"
                @focus="focus(2)"
                placeholder="请选择"
                readonly="readonly"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>月薪</span>
          <span>
            <mu-form-item prop="befsalary">
              <mu-text-field
                v-model="form.befsalary"
                placeholder="请填写"
                type="number"
                @keyup.native="changeNumber"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>工作单位</span>
          <span>
            <mu-form-item prop="workplace">
              <mu-text-field
                v-model="form.workplace"
                placeholder="请填写"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>工作内容及岗位</span>
          <span>
            <mu-form-item prop="content">
              <mu-text-field
                v-model="form.content"
                placeholder="请填写"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>离职原因</span>
          <span>
            <mu-form-item prop="reason">
              <mu-text-field
                v-model="form.reason"
                placeholder="请填写"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne" style="display:grid;">
          <span>是否有传染病、精神病及任何慢性病史?</span>
          <span class="point">*</span>
          <span style="display: inline-block;width: 4rem;padding-top:6px;">
            <mu-form-item prop="issick" :rules="issick">
              <mu-radio v-model="form.issick" value="0" label="否" disabled></mu-radio>
              <mu-radio v-model="form.issick" value="1" label="是" disabled></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne" style="display:grid;">
          <span>是否与其它公司签订过"竞业禁止"协议?</span>
          <span class="point">*</span>
          <span style="display: inline-block;width: 4rem;padding-top:6px;">
            <mu-form-item prop="poc" :rules="poc">
              <mu-radio v-model="form.poc" value="0" label="否" disabled></mu-radio>
              <mu-radio v-model="form.poc" value="1" label="是" disabled></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne" style="display:grid;">
          <span>是否曾因个人行为不检而被其它公司解雇?</span>
          <span class="point">*</span>
          <span style="display: inline-block;width: 4rem;padding-top:6px;">
            <mu-form-item prop="pbehaivor" :rules="pbehaivor">
              <mu-radio
                v-model="form.pbehaivor"
                value="0"
                label="否"
                disabled
              ></mu-radio>
              <mu-radio
                v-model="form.pbehaivor"
                value="1"
                label="是"
                disabled
              ></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne" style="display:grid;">
          <span>是否愿意接受公司对该岗位执行的工时制度?</span>
          <span class="point">*</span>
          <span style="display: inline-block;width: 4rem;padding-top:6px;">
            <mu-form-item prop="whsystem" :rules="whsystem">
              <mu-radio v-model="form.whsystem" value="0" label="否" disabled></mu-radio>
              <mu-radio v-model="form.whsystem" value="1" label="是" disabled></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne" style="display:grid;">
          <span>是否愿意接受我公司一切规章制度?</span>
          <span class="point">*</span>
          <span style="display: inline-block;width:4rem;padding-top:6px;">
            <mu-form-item prop="rar" :rules="rar">
              <mu-radio v-model="form.rar" value="0" label="否" disabled></mu-radio>
              <mu-radio v-model="form.rar" value="1" label="是" disabled></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne" style="display:grid;">
          <span>是否与其他单位存在劳动关系?(请出具相关证明)</span>
          <span class="point">*</span>
          <span style="display: inline-block;width:4rem;padding-top:6px;">
            <mu-form-item prop="labor" :rules="labor">
              <mu-radio v-model="form.labor" value="0" label="否" disabled></mu-radio>
              <mu-radio v-model="form.labor" value="1" label="是" disabled></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne" style="display:grid;">
          <span>是否有过犯罪记录?</span>
          <span class="point">*</span>
          <span style="display: inline-block;width:4rem;padding-top:6px;">
            <mu-form-item prop="critical" :rules="critical">
              <mu-radio v-model="form.critical" value="0" label="否" disabled></mu-radio>
              <mu-radio v-model="form.critical" value="1" label="是" disabled></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne" style="display:grid;">
          <span>是否在以往工作中因违纪而受到过记档处分?</span>
          <span class="point">*</span>
          <span style="display: inline-block;width:4rem;padding-top:6px;">
            <mu-form-item prop="disaction" :rules="disaction">
              <mu-radio
                v-model="form.disaction"
                value="0"
                label="否"
                disabled
              ></mu-radio>
              <mu-radio
                v-model="form.disaction"
                value="1"
                label="是"
                disabled
              ></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne" style="display:grid;">
          <span>是否有妨碍工作的身体障碍或疾病?</span>
          <span class="point">*</span>
          <span style="display: inline-block;width:4rem;padding-top:6px;">
            <mu-form-item prop="hinderwork" :rules="hinderwork">
              <mu-radio
                v-model="form.hinderwork"
                value="0"
                label="否"
                disabled
              ></mu-radio>
              <mu-radio
                v-model="form.hinderwork"
                value="1"
                label="是"
                disabled
              ></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne" style="display:grid;">
          <span>是否有兼职?</span>
          <span class="point">*</span>
          <span style="display: inline-block;width:4rem;padding-top:6px;">
            <mu-form-item prop="parttime" :rules="parttime">
              <mu-radio v-model="form.parttime" value="0" label="否" disabled></mu-radio>
              <mu-radio v-model="form.parttime" value="1" label="是" disabled></mu-radio>
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
import { DatetimePicker, Toast } from "mint-ui";
import moment from "moment"; // 格式化时间
import Bus from "../../../lib/bus";
import valid from "@/lib/pub_valid";

export default {
  name: "memberBase",
  data() {
    return {
      startDate: new Date("1970-01-01"),
      endDate: new Date("2050-12-31"),
      pickerValue:new Date(),
      typeNum: "",
      form: {
        wstart: "",
        wend: "",
        befsalary:'',
        content:'',
        reason:'',
        workplace: "",
        issick: "0",
        poc: "0",
        pbehaivor: "0",
        whsystem: "1",
        rar: "1",
        labor: "0",
        critical: "0",
        disaction: "0",
        hinderwork: "0",
        parttime: "0"
      },
      issick: [{ validate: val => !!val, message: "该项必选" }],
      poc: [{ validate: val => !!val, message: "该项必选" }],
      pbehaivor: [{ validate: val => !!val, message: "该项必选" }],
      whsystem: [{ validate: val => !!val, message: "该项必选" }],
      rar: [{ validate: val => !!val, message: "该项必选" }],
      labor: [{ validate: val => !!val, message: "该项必选" }],
      critical: [{ validate: val => !!val, message: "该项必选" }],
      disaction: [{ validate: val => !!val, message: "该项必选" }],
      hinderwork: [{ validate: val => !!val, message: "该项必选" }],
      parttime: [{ validate: val => !!val, message: "该项必选" }],
      isloading: false
    };
  },
  components: {},
  methods: {
    clear() {
      this.$refs.form.clear();
    },
    submit() {
      const t = this;
      this.$refs.form.validate().then(result => {
        if (result) {
          let Token = localStorage.getItem("token");
          let userId = localStorage.getItem("userId");
          let data = Object.assign({}, t.form);
          data.type = "5";
          data.userId = userId;
          t.isloading = true
          document.body.style.overflow= "hidden";
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
                document.body.style.overflow= "scroll";
                t.$store.commit("entryFlow/SetWorkInfo", true);
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
    focus(num) {
      this.typeNum = num;
      this.pickerValue = new Date
      this.$refs.picker.open();
    },
    changeNumber() {
      this.form.befsalary = this.form.befsalary.replace(/\./, "");
    },
    handleConfirm(data) {
      const t = this;
      let date = moment(data).format("YYYY-MM-DD");
      if (t.typeNum == 1) {
        t.form.wstart = date;
      }
      if (t.typeNum == 2) {
        t.form.wend = date;
      }
      t.clear();
    }
  },
  mounted() {
    const t = this;
    document.body.style.overflow= "scroll";
    window.scrollTo(0,0)
    for (let dat1 in t.formData) {
      for (let dat2 in t.form) {
        if (dat2 === 'wstart' ) {
          t.form[dat2] = t.formData['wstart'];
        } else if(dat2==='wend') {
          t.form[dat2] = t.formData['wend'];
        } else if(dat2==='workplace'){
          t.form[dat2] = t.formData['workplace'];
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
.message .messOne div .point {
  position: absolute;
  left: 0.266667rem;
  color: red;
  height: 100%;
  line-height: 2;
  font-size: inherit;
}
/deep/ .mu-form{
  position: relative;
}
/deep/ .mu-loading-wrap{
  position:fixed;
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
.message .messOne .mu-input{
  width: auto;
}
.messageAll{
  height: auto; 
}
/deep/ .mu-radio{
  margin-right: 40px !important;
}
</style>
