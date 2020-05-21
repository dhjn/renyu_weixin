<template>
  <div class="messageAll">
    <mu-form ref="form" :model="form" class="mu-demo-form" auto-validate  v-loading="isloading">
      <div class="message">
        <div class="messOne">
          <span>出生地</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="birthloc" :rules="birthloc">
              <mu-text-field
                placeholder="请填写"
                v-model="form.birthloc"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>民族</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="nation" :rules="nation">
              <mu-text-field
                placeholder="请选择"
                v-model="nationName"
                readonly="readonly"
                @focus="focus(1)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>政治面貌</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="polstatus" :rules="polstatus">
              <mu-text-field
                placeholder="请选择"
                v-model="polstatusName"
                readonly="readonly"
                @focus="focus(2)"
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
                @focus="focus(3)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>户籍性质</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="hukou" :rules="hukou">
              <mu-text-field
                placeholder="请选择"
                readonly="readonly"
                v-model="hukouName"
                @focus="focus(4)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>户籍所在地</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="hkdf" :rules="hkdf">
              <mu-text-field
                placeholder="请填写"
                v-model="form.hkdf"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>户籍所在地邮政编码</span>
          <span>
            <mu-form-item prop="hkpostcode">
              <mu-text-field
                placeholder="请填写"
                v-model="form.hkpostcode"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>子女状况</span>
          <span class="point">*</span>
          <span style="display: inline-block;width: 3rem;padding-top:6px;">
            <mu-form-item prop="childstatus" :rules="childstatus">
              <mu-radio
                v-model="form.childstatus"
                value="0"
                label="无"
              ></mu-radio>
              <mu-radio
                v-model="form.childstatus"
                value="1"
                label="有"
              ></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>有效法律文件邮寄地址</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="effloc" :rules="effloc">
              <mu-text-field
                placeholder="请填写"
                v-model="form.effloc"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>有效法律文件邮寄邮政编码</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="effpostcode" :rules="effpostcode">
              <mu-text-field
                placeholder="请填写"
                v-model="form.effpostcode"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>现在居住地址</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="residence" :rules="residence">
              <mu-text-field
                placeholder="请填写"
                v-model="form.residence"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>现居住地邮政编码</span>
          <span>
            <mu-form-item prop="resdpostcode">
              <mu-text-field
                placeholder="请填写"
                v-model="form.resdpostcode"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>首次参加工作日期</span>
          <span>
            <mu-form-item prop="firstwkdate">
              <mu-text-field
                v-model="form.firstwkdate"
                placeholder="请选择"
                readonly="readonly"
                @focus="firstwkdate(1)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>电子邮件</span>
          <span>
            <mu-form-item prop="email">
              <mu-text-field
                placeholder="请填写"
                v-model="form.email"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>婚育状况</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="marital" :rules="marital">
              <mu-text-field
                placeholder="请选择"
                readonly="readonly"
                v-model="maritalName"
                @focus="focus(5)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>婚育状况备注</span>
          <span>
            <mu-form-item prop="marremark">
              <mu-text-field
                placeholder="请填写"
                v-model="form.marremark"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>前期就业状态</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="preempstat" :rules="preempstat">
              <mu-text-field
                placeholder="请选择"
                readonly="readonly"
                v-model="preempstatName"
                @focus="focus(6)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>是否原单位仍保持劳动关系</span>
          <span class="point">*</span>
          <span style="display: inline-block;width: 3rem;padding-top:6px;">
            <mu-form-item prop="keeplabor" :rules="keeplabor">
              <mu-radio
                v-model="form.keeplabor"
                value="p_withold"
                label="是"
              ></mu-radio>
              <mu-radio
                v-model="form.keeplabor"
                value="p_withoutold"
                label="否"
              ></mu-radio>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>档案所在地</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="recordloc" :rules="recordloc">
              <mu-text-field
                placeholder="请选择"
                v-model="recordlocName"
                readonly="readonly"
                @focus="focus(7)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>紧急联系人</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="mpct" :rules="mpct">
              <mu-text-field
                placeholder="请填写"
                v-model="form.mpct"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>紧急联系人关系</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="mprelation" :rules="mprelation">
              <mu-text-field
                placeholder="请填写"
                v-model="form.mprelation"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>紧急联系人电话</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="mpphone" :rules="mpphone">
              <mu-text-field
                placeholder="请填写"
                v-model="form.mpphone"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>健康证的录入</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="ifjkz" :rules="ifjkz">
              <mu-text-field
                placeholder="请填写"
                v-model="form.ifjkz"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>健康证开始时间</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="jkzsdate" :rules="jkzsdate">
              <mu-text-field
                v-model="form.jkzsdate"
                readonly="readonly"
                placeholder="请选择"
                @focus="firstwkdate(2)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>健康证到期时间</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="jkzedate" :rules="jkzedate">
              <mu-text-field
                v-model="form.jkzedate"
                placeholder="请选择"
                readonly="readonly"
                @focus="firstwkdate(3)"
              ></mu-text-field>
            </mu-form-item>
          </span>
        </div>
      </div>
      <div class="message">
        <div class="messOne">
          <span>身份证到期日期</span>
          <span class="point">*</span>
          <span>
            <mu-form-item prop="idendate" :rules="idendate">
              <mu-text-field
                v-model="form.idendate"
                placeholder="请选择"
                readonly="readonly"
                @focus="firstwkdate(4)"
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
import moment from "moment"; // 格式化时间
import Bus from "../../../lib/bus";
import scrollPicker from "@/components/scrollPicker";
import { Toast } from "mint-ui";
import nationData from "./js/data";
import dataArr from "./js/data2";
import validate from '../../../lib/pub_valid'
export default {
  name: "memberBase",
  data() {
    return {
      startDate: new Date("1970-01-01"),
      endDate: new Date(),
      pickerValue: new Date(),
      nationOptions: [],
      nationName: "",
      polstatusOptions: [],
      polstatusName: "",
      educationOptions: [],
      educationName: "",
      hukouOptions: [],
      hukouName: "",
      maritalOptions: [],
      maritalName: "",
      preempstatOptions: [],
      preempstatName: "",
      recordlocOptions: [],
      recordlocName: "",
      typeNum: "",
      value: "0",
      form: {
        birthloc: "",
        nation: "",
        polstatus: "",
        education: "",
        hukou: "",
        hkdf: "",
        hkpostcode: "",
        childstatus: "",
        effloc: "",
        effpostcode: "",
        residence: "",
        resdpostcode: "",
        firstwkdate: "",
        email: "",
        marital: "",
        marremark: "",
        preempstat: "",
        keeplabor: "",
        recordloc: "",
        mpct: "",
        mprelation: "",
        mpphone: "",
        ifjkz: "",
        jkzsdate: "",
        jkzedate: "",
        idendate: ""
      },
      birthloc: [{ validate: val => !!val, message: "出生地不能为空" }],
      nation: [{ validate: val => !!val, message: "民族不能为空" }],
      polstatus: [{ validate: val => !!val, message: "政治面貌不能为空" }],
      education: [{ validate: val => !!val, message: "最高学历不能为空" }],
      hukou: [{ validate: val => !!val, message: "户籍性质不能为空" }],
      hkdf: [{ validate: val => !!val, message: "户籍所在地不能为空" }],
      childstatus: [{ validate: val => !!val, message: "子女状况不能为空" }],
      effloc: [
        { validate: val => !!val, message: "有效法律文件邮寄地址不能为空" }
      ],
      effpostcode: [
        { validate: val => !!val, message: "有效法律文件邮寄邮政编码不能为空" }
      ],
      residence: [{ validate: val => !!val, message: "现在居住地址不能为空" }],
      marital: [{ validate: val => !!val, message: "婚育状况不能为空" }],
      preempstat: [{ validate: val => !!val, message: "前期就业状态不能为空" }],
      keeplabor: [{ validate: val => !!val, message: "该项不能为空" }],
      recordloc: [{ validate: val => !!val, message: "档案所在地不能为空" }],
      mpct: [{ validate: val => !!val, message: "紧急联系人不能为空" }],
      mprelation: [
        { validate: val => !!val, message: "紧急联系人关系不能为空" }
      ],
      mpphone: [
        { validate: val => !!val, message: "紧急联系人电话不能为空" },
        { validate: val => validate.val_phone(this.form.mpphone), message: "紧急联系人电话输入有误" },
      ],
      ifjkz: [{ validate: val => !!val, message: "健康证录入项不能为空" }],
      jkzsdate: [
        { validate: val => !!val, message: "健康证开始时间不能为空" },
        {
          validate: val =>
            this.judgeDate(this.form.jkzsdate, this.form.jkzedate),
          message: "健康证开始时间不能大于到期时间"
        }
      ],
      jkzedate: [
        { validate: val => !!val, message: "健康证到期时间不能为空" },
        {
          validate: val =>
            this.judgeDate(this.form.jkzsdate, this.form.jkzedate),
          message: "健康证到期时间不能小于开始时间"
        }
      ],
      idendate: [{ validate: val => !!val, message: "身份证到期日期不能为空" }],
      scrollPickerShow: false,
      scrollType: "",
      maps: [],
      map: {},
      isloading:false
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
          let userId = localStorage.getItem('userId')
          let data = Object.assign({}, t.form);
          data.type = "1";
          data.userId = userId
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
                t.$store.commit("entryFlow/SetUserInfo", true);
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
    focus(type) {
      const t = this;
      let data = [];
      if (type === 1) {
        data = t.nationOptions;
        t.scrollType = "nationality";
      } else if (type === 2) {
        data = t.polstatusOptions;
        t.scrollType = "polstatus";
      } else if (type === 3) {
        data = t.educationOptions;
        t.scrollType = "education";
      } else if (type === 4) {
        data = t.hukouOptions;
        t.scrollType = "hukou";
      } else if (type === 5) {
        data = t.maritalOptions;
        t.scrollType = "marital";
      } else if (type === 6) {
        data = t.preempstatOptions;
        t.scrollType = "preempstat";
      } else if (type === 7) {
        data = t.recordlocOptions;
        t.scrollType = "recordloc";
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
        case "polstatus":
          t.form.polstatus = this.map.paramCode;
          t.polstatusName = this.map.paramInfoName;
          break;
        case "education":
          t.form.education = this.map.paramCode;
          t.educationName = this.map.paramInfoName;
          break;
        case "nationality":
          t.form.nation = this.map.paramCode;
          t.nationName = this.map.paramInfoName;
          break;
        case "hukou":
          t.form.hukou = this.map.paramCode;
          t.hukouName = this.map.paramInfoName;
          break;
        case "marital":
          t.form.marital = this.map.paramCode;
          t.maritalName = this.map.paramInfoName;
          break;
        case "preempstat":
          t.form.preempstat = this.map.paramCode;
          t.preempstatName = this.map.paramInfoName;
          break;
        case "recordloc":
          t.form.recordloc = this.map.paramCode;
          t.recordlocName = this.map.paramInfoName;
          break;
      }
      t.maps = [];
      t.clear();
    },
    firstwkdate(num) {
      this.typeNum = num;
      this.pickerValue = new Date()
      if(num===1){
        this.endDate = new Date()
      } else {
        this.endDate = new Date('2050-12-31')
      }
      this.$refs.picker.open();
    },
    handleConfirm(data) {
      const t = this;
      let date = moment(data).format("YYYY-MM-DD");
      if (t.typeNum == 1) {
        t.$set(t.form, "firstwkdate", date);
      } else if (t.typeNum === 2) {
        t.$set(t.form, "jkzsdate", date);
      } else if (t.typeNum === 3) {
        t.$set(t.form, "jkzedate", date);
      } else {
        t.$set(t.form, "idendate", date);
      }
      t.clear();
    },
    clear() {
      this.$refs.form.clear();
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
    document.body.style.overflow= "scroll";
    t.nationOptions = t.generateArr(nationData.data[0]); // 转换民族数据
    t.polstatusOptions = t.generateArr(dataArr.polstatus); // 转换政治面貌数据
    t.educationOptions = t.generateArr(dataArr.education); // 转换最高学历数据
    t.hukouOptions = t.generateArr(dataArr.hukou); // 转换户籍性质数据
    t.maritalOptions = t.generateArr(dataArr.marital); // 转换婚育状况数据
    t.preempstatOptions = t.generateArr(dataArr.preempstat); // 转换就业状态数据
    t.recordlocOptions = t.generateArr(dataArr.recordloc); // 转换档案所在地数据
    for (let dat1 in t.formData) {
      for (let dat2 in t.form) {
        if (dat1 === dat2) {
          t.form[dat1] = t.formData[dat1];
        }
      }
    }
    for (let key in t.nationOptions) {
      if (t.form.nation === t.nationOptions[key].id) {
        t.nationName = t.nationOptions[key].name;
      }
    }
    for (let key in t.polstatusOptions) {
      if (t.form.polstatus === t.polstatusOptions[key].id) {
        t.polstatusName = t.polstatusOptions[key].name;
      }
    }
    for (let key in t.educationOptions) {
      if (t.form.education === t.educationOptions[key].id) {
        t.educationName = t.educationOptions[key].name;
      }
    }
    for (let key in t.hukouOptions) {
      if (t.form.hukou === t.hukouOptions[key].id) {
        t.hukouName = t.hukouOptions[key].name;
      }
    }
    for (let key in t.maritalOptions) {
      if (t.form.marital === t.maritalOptions[key].id) {
        t.maritalName = t.maritalOptions[key].name;
      }
    }
    for (let key in t.preempstatOptions) {
      if (t.form.preempstat === t.preempstatOptions[key].id) {
        t.preempstatName = t.preempstatOptions[key].name;
      }
    }
    for (let key in t.recordlocOptions) {
      if (t.form.recordloc === t.recordlocOptions[key].id) {
        t.recordlocName = t.recordlocOptions[key].name;
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
.messageAll{
  height: 110%;
}
.message .messOne .point {
  position: absolute;
  left: 0.266667rem;
  color: red;
  height: 100%;
  line-height: 2;
  font-size: inherit;
}
.message .messOne {
  margin: 0.8rem 0;
}
/deep/ .mu-loading-wrap{
  position:fixed;
}
/deep/ .message .messOne .mu-input {
  width: 3rem;
}
/deep/ .mu-form{
  position: relative;
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
  height: 21px;
  line-height: 1;
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
.messageAll{
  height: auto; 
}
</style>
