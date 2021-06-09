<!--app-->
<template>
  <div class="upload_msg" v-loading="isloading">
    <!-- <div style="height: 1.5rem;line-height: 1.5rem;padding: 0rem 0.4rem;">
      <a
        ref="a"
        href="../../.././static/material/下载文件.zip"
        download="download"
        class="link"
      >
        <img src="../../.././static/material/download.png" />下载资源文件
      </a>
    </div> -->
    <div class="upload_all" v-for="(item, index) in uploadList" :key="index">
      <div class="upload_all_tit">
        <img :src="item.iconImg" alt="" />
        <span style="color: #1C3F5A">{{ item.title }}</span>
      </div>
      <div class="upload_all_con">
        <div class="upload_all_con_one">
          <div class="upload_all_con_one_t">
            <input
              type="file"
              :ref="item.id"
              class="file"
              @change="UpLoadFile($event, item.id)"
              accept="image/*"
              capture="camera"
            />
            <img
              src="../../.././static/entryFlow/entry_14.png"
              alt=""
              class="Image"
            />
          </div>
        </div>
        <div class="upload_all_con_two">
          <div class="upload_all_con_two_t_a">
            <div
              class="upload_all_con_two_t"
              v-for="(item1, index1) in uploadFileImage[item.id]"
              v-if="item1.type === '1'"
              style="position: relative"
            >
              <img
                :src="item1.url"
                alt=""
                class="Image"
                @click="btnUploadMaskSrc(item1.url)"
              />
              <img
                src="../../../static/main/remove.png"
                alt=""
                class="removeImage"
                @click="removeImage(item.id, index1)"
              />
            </div>
          </div>
          <div
            class="upload_all_con_two_c"
            v-for="(item1, index1) in uploadFileImage[item.id]"
            v-if="item1.type === '0'"
            style="position: relative"
          >
            <a
              href="javascript:"
              @click="downloadDocs(item1.url, item1.fileName)"
              >{{ item1.fileName }}</a
            >
            <img
              src="../../../static/main/remove.png"
              alt=""
              class="removeTxt"
              @click="removeImage(item.id, index1)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="sub_fotter">
      <button @click="acceptOfferOne">上一步</button>
      <button @click="submitEntryFlow">完成个人信息填写</button>
    </div>
    <div class="upload_mask" v-show="uploadMaskShow">
      <img :src="uploadMaskSrc" alt="" class="upload_mask_img1" />
      <img
        src="../../.././static/main/cc.png"
        alt=""
        class="upload_mask_img2"
        @click="uploadMaskShow = false"
      />
    </div>
  </div>
</template>
<script>
import { filterPicture } from "@/lib/util";
import valid from "@/lib/pub_valid";
import { Toast, MessageBox } from "mint-ui";
export default {
  name: "uploadMsg",
  data() {
    return {
      uploadArr: [],
      uploadMaskShow: false,
      uploadFileImage: {
        "6135": [],
        "6132": [],
        "6153": [],
        "6133": [],
        "6152": [],
        "6149": [],
        "6151": [],
        "6136": [],
        "6156": [],
        "6157": [],
        "6155": [],
        "6154": [],
      },
      uploadList: [
        {
          title: "1寸彩色证件照片或本人自拍(必传)",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "彩色照片",
          id: 6135
        },
        {
          title: "身份证正面照片(必传)",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "身份证正面",
          id: 6132
        },
        {
          title: "身份证反面照片(必传)",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "身份证反面",
          id: 6153
        },
        {
          title: "户口本首页照片(有公安局盖章页)",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "户口本照片主页",
          id: 6133
        },
        {
          title: "户口本本人页照片",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "户口本照片个人页",
          id: 6152
        },
        {
          title: "健康证照片",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "健康证照片",
          id: 6149
        },
        {
          title: "健康证附件照片",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "健康证附件照片",
          id: 6151
        },
        // {
        //   title: "与前一家单位劳动关系终止/解除证明信-原件",
        //   iconImg: require("../../../static/entryFlow/entry_18.png"),
        //   rename: "劳动关系终止",
        //   id: 6150
        // },
        {
          title: "银行卡正面照片(有卡号面——必传)",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "银行卡正面",
          id: 6136
        },
        {
          title: "结婚证正面照片",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "结婚证正面",
          id: 6156
        },
        {
          title: "退休证正面照片",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "退休证正面",
          id: 6157
        },
        {
          title: "学历证明",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "学历证明",
          id: 6155
        },
        {
          title: "40岁以上社保缴纳明细",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "40岁以上社保缴纳明细",
          id: 6154
        }
      ],
      uploadMaskSrc: "",
      isloading: false,
      formData: {}
    };
  },
  components: {},
  methods: {
    btnUploadMaskSrc(url) {
      this.uploadMaskSrc = url;
      this.uploadMaskShow = true;
    },
    removeImage(index, index1) {
      const t = this;
      t.$refs[index][0].value = "";
      let keyIndex = index + 1;
      t.uploadFileImage[index].splice(index1, 1);
    },
    UpLoadFile(event, id) {
      const t = this;
      var file = event.target.files;
      let index1 = file[0].name.lastIndexOf(".");
      let index2 = file[0].type.lastIndexOf("/");
      let fileNameVaild = file[0].name.substr(index1 + 1);
      let fileType = file[0].type.substr(index2 + 1);
      if (valid.val_photo_all(fileNameVaild) || valid.val_photo_all(fileType)) {
        if (t.uploadFileImage[id].length < 1) {
          let fileName = file[0].name;
          let url = window.webkitURL.createObjectURL(file[0]); // 获取本地的文件路径
          t.uploadFile(file[0], fileName, url, id);
        } else {
          Toast({
            message: "只能上传一份",
            position: "middle",
            duration: 2000
          });
          return;
        }
      } else {
        Toast({
          message: "格式上传不正确",
          position: "middle",
          duration: 2000
        });
      }
    },
    uploadFile(file, fileName, url, id) {
      const t = this;
      let doclink = url;
      let type = "1";
      if (filterPicture(fileName)) {
        // 如果图片格式是gif png 等  true
        type = "1";
      } else {
        type = "0";
      }
      let fileNameKey = {
        url: doclink,
        type: type,
        fileName: fileName,
        filekey: doclink,
        file: file,
        id: id
      };
      t.imgResize(fileNameKey,id,t.callback)
    },
    imgResize(fileObj,id,callback) {
      var t = this;
      var fileReader = new FileReader();
      fileReader.readAsDataURL(fileObj.file);
      fileReader.onload = function() {
        var IMG = new Image();
        IMG.src = this.result;
        IMG.onload = function() {
          var w = this.naturalWidth,
            h = this.naturalHeight,
            resizeW = 0,
            resizeH = 0;
          // maxSize 是压缩的设置，设置图片的最大宽度和最大高度，等比缩放，level是报错的质量，数值越小质量越低
          var maxSize = {
            width: 500,
            height: 500,
            level: 0.5
          };
          if (w > maxSize.width || h > maxSize.height) {
            var multiple = Math.max(w / maxSize.width, h / maxSize.height);
            resizeW = w / multiple;
            resizeH = h / multiple;
          } else {
            return callback(this.src, fileObj,id);
          }
          var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");
          // if (window.navigator.userAgent.indexOf("iPhone") > 0) {
          //   canvas.width = resizeW;
          //   canvas.height = resizeH;
          //   ctx.rotate((90 * Math.PI) / 180);
          //   ctx.drawImage(IMG, 0, -resizeH, resizeW, resizeH);
          // } else {
            canvas.width = resizeW;
            canvas.height = resizeH;
            ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
          // }
          var base64 = canvas.toDataURL("image/png",maxSize.level);
          // var str = encodeURIComponent(base64.split(",")[1])
          // t.convertBlob(decodeURIComponent(window.atob(str)), fileObj,id,callback);
          callback(base64, fileObj,id);
        };
      };
    },
    convertBlob(base64, fileObj,id,callback) {
      var buffer = new ArrayBuffer(base64.length);
      var ubuffer = new Uint8Array(buffer);
      for (var i = 0; i < base64.length; i++) {
        ubuffer[i] = base64.charCodeAt(i);
      }
      var blob;
      try {
        blob = new Blob([buffer], { type: "image/jpg" });
      } catch (e) {
        window.BlobBuilder =
          window.BlobBuilder ||
          window.WebKitBlobBuilder ||
          window.MozBlobBuilder ||
          window.MSBlobBuilder;
        if (e.name === "TypeError" && window.BlobBuilder) {
          var blobBuilder = new BlobBuilder();
          blobBuilder.append(buffer);
          blob = blobBuilder.getBlob("image/jpg");
        }
      }
      callback(blob, fileObj,id);
    },
    callback(fileResize, fileObj,id) {
      fileObj.file = fileResize
      console.log(fileResize)
      this.uploadFileImage[id].push(fileObj);
    },
    /**
     * 下载文件
     * @param url filekey
     * @param filename
     */
    downloadDocs(url, filename) {
      const t = this;
      let doclink = url;
      let link = document.createElement("a");
      link.href = doclink;
      link.download = "downloadfiletemp";
      link.click();
    },
    btnCencle() {
      this.$emit("close");
    },
    acceptOfferOne() {
      this.$store.commit("entryFlow/setEntryDataBlock", "02writeMsg");
      let obj = {
        writeMsg: "1",
        uploadMsg: ""
      };
      this.$store.commit("entryFlow/setOfferListShow", obj);
    },
    submitEntryFlow() {
      const t = this;
      t.formData = new FormData();
      if (this.uploadArr.length === 0) {
        Toast({
          message: "该流程已过",
          position: "middle",
          duration: 2000
        });
        return;
      }
      if (
        t.uploadFileImage["6135"].length === 0 ||
        t.uploadFileImage["6132"].length === 0 ||
        t.uploadFileImage["6153"].length === 0 ||
        t.uploadFileImage["6136"].length === 0
      ) {
        Toast({
          message: "请上传必传项",
          position: "middle",
          duration: 2000
        });
        return;
      }
      for (let key in this.uploadFileImage) {
        this.uploadArr.forEach(ele => {
          if (ele.dtid === Number(key)) {
            t.formData.append("type", JSON.stringify(ele));
            this.uploadFileImage[key].forEach((item, index) => {
              this.formData.append(item.id, item.file);
            });
          }
        });
      }
      for (var value of this.formData.values()) {
        console.log(value);
      }
      t.isloading = true;
      let headers = { "content-Type": "multipart/form-data" };
      this.http.defaults.headers.common["token"] = localStorage.getItem(
        "token"
      );
      this.http.defaults.headers.common["userId"] = localStorage.getItem(
        "userId"
      );
      this.http
        .post("/api/filesupload", t.formData, {
          headers: headers
        })
        .then(res => {
          if (res.data.errcode == 0) {
            t.isloading = false;
            MessageBox.alert("您的个人信息填写已完成").then(action => {
              t.$router.push({ path: "/" });
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUploadParams() {
      this.uploadArr = [];
      let data = JSON.parse(localStorage.getItem("formData"));
      data.upload.forEach(item => {
        this.uploadList.forEach(ele => {
          if (ele.id === item.dtid) {
            this.uploadArr.push(item);
          }
        });
      });
    },
    // 获取系统类型
    getIos() {
      if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return true;
      } else {
        return false;
      }
    },
    // 获取手机类型
    judgeBrand(sUserAgent) {
      var isIphone = sUserAgent.match(/iphone/i) == "iphone";
      var isHuawei = sUserAgent.match(/huawei/i) == "huawei";
      var isHonor = sUserAgent.match(/honor/i) == "honor";
      var isOppo = sUserAgent.match(/oppo/i) == "oppo";
      var isOppoR15 = sUserAgent.match(/pacm00/i) == "pacm00";
      var isVivo = sUserAgent.match(/vivo/i) == "vivo";
      var isXiaomi = sUserAgent.match(/mi\s/i) == "mi ";
      var isXiaomi2s = sUserAgent.match(/mix\s/i) == "mix ";
      var isRedmi = sUserAgent.match(/redmi/i) == "redmi";
      var isSamsung = sUserAgent.match(/sm-/i) == "sm-";
      if (isIphone) {
        return "iphone";
      } else if (isHuawei || isHonor) {
        return "huawei";
      } else if (isOppo || isOppoR15) {
        return "oppo";
      } else if (isVivo) {
        return "vivo";
      } else if (isXiaomi || isRedmi || isXiaomi2s) {
        return "xiaomi";
      } else if (isSamsung) {
        return "samsung";
      } else {
        return "default";
      }
    }
  },
  mounted() {
    const t = this;
    document.body.style.overflow = "scroll";
    t.getUploadParams();
    var file = document.getElementsByClassName("file");
    var brand = this.judgeBrand(navigator.userAgent.toLowerCase()); // 获取手机类型
    if (brand !== "huawei") {
      let files = Array.from(file);
      files.forEach(item => {
        item.removeAttribute("capture");
      });
    }
  },
  created() {},
  computed: {}
};
</script>
<style scoped lang="less" type="text/less">
/deep/ .material-icons {
  vertical-align: middle;
}
/deep/ .mu-flat-button .mu-button-wrapper {
  font-size: 14px !important;
}
/deep/ .mu-loading-wrap {
  position: fixed;
}
.upload_msg {
  width: 100%;
  // height: calc(100% - 320px);
  position: absolute;
  top: 320px;
  overflow-y: scroll;
  // background: rgba(244, 246, 250, 1);
  background: white;
  .link {
    color: rgb(28, 63, 90);
    font-size: 0.4rem;
    img {
      width: 0.5rem;
      vertical-align: middle;
    }
  }
  .upload_mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .upload_mask_img1 {
      width: 100%;
      min-height: 400px;
    }
    .upload_mask_img2 {
      position: absolute;
      right: 30px;
      top: 30px;
    }
  }
  .upload_all {
    padding: 30px 30px;
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    // margin-bottom: 30px;
    position: relative;
    .point {
      position: absolute;
      top: 50px;
      left: 0;
      color: red;
    }
    .alertNone {
      margin-top: 30px;
    }
    .upload_all_tit {
      display: flex;
      align-items: center;
      img {
        width: 35px;
        vertical-align: top;
        margin-right: 10px;
      }
      span {
        font-size: 0.4rem;
      }
    }
    .upload_all_con {
      margin-top: 20px;
      width: 100%;
      .upload_all_con_one {
        width: 1.5rem;
        height: 1.5rem;
        position: relative;
        margin: auto;
        border: 1px dashed;
        .upload_all_con_one_t {
          width: 100%;
          input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
          .Image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .upload_all_con_two {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 40px;
        .upload_all_con_two_t_a {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          .upload_all_con_two_t {
            width: 1.64rem;
            height: 1.5rem;
            position: relative;
            margin-right: 0.2rem;
            margin-bottom: 0.2rem;
            .removeImage {
              width: 40px !important;
              position: absolute;
              right: -0.2rem;
              height: 40px !important;
              top: -0.3rem;
            }
            /*img {*/
            /*width: 20px;*/
            /*height: 30px;*/
            /*vertical-align: text-bottom;*/
            /*}*/
            span {
              font-size: 26px;
              color: lightgray;
            }
            a {
              font-size: 46px;
            }

            .Image {
              width: 100%;
              height: 100%;
            }
          }
        }
        .upload_all_con_two_c {
          margin-right: 20px;
          margin-top: 20px;
          a {
            font-size: 0.1rem;
            border: 1px dashed;
          }
          .removeTxt {
            width: 40px !important;
            position: absolute;
            right: -0.2rem;
            height: 40px !important;
            top: -0.3rem;
          }
        }
      }
    }
  }
  .alert:nth-of-type(7) {
    margin-bottom: 0;
  }
  .sub_fotter {
    margin-bottom: 20px;
    width: 100%;
    height: 100px;
    border-radius: 10px;
    display: flex;
    padding: 0 20px;
    justify-content: space-around;
    background: white;
    button:nth-of-type(1) {
      width: 30%;
      outline: none;
      background: white;
      color: #3399ff;
      height: 98%;
      font-size: 30px;
      border: 2px solid #3399ff;
      border-radius: 20px;
    }
    button:nth-of-type(2) {
      width: 50%;
      outline: none;
      background: #3399ff;
      height: 98%;
      border-top-style: none;
      border-right-style: none;
      border-bottom-style: none;
      border-left-style: none;
      font-size: 30px;
      color: white;
      border-radius: 20px;
    }
    button:nth-of-type(3) {
      width: 50%;
      outline: none;
      background: lightgray;
      height: 98%;
      border-top-style: none;
      border-right-style: none;
      border-bottom-style: none;
      border-left-style: none;
      font-size: 30px;
      color: white;
      border-radius: 20px;
    }
  }
  .message2 {
    padding-left: 30px;
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    display: flex;
    font-size: 34px;
    div {
      flex: 1;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
    div:nth-of-type(1) {
      background: #3399ff;
      color: white;
      border-radius: 10px;
      margin-right: 20px;
    }
  }
}
</style>
