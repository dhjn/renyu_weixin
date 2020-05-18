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
              @change="UpLoadFile($event, item.id)"
              accept="image/*"
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
      <button @click="submitEntryFlow">完成入职</button>
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

export default {
  name: "uploadMsg",
  data() {
    return {
      uploadArr: [],
      uploadMaskShow: false,
      uploadFileImage: {
        "6135": [],
        "6132": [],
        "6133": [],
        "6149": [],
        "6150": [],
        "6136": []
      },
      uploadList: [
        {
          title: "彩色白底证件照片1寸照片四张",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "彩色照片",
          id: 6135
        },
        {
          title: "身份证复印件4份正反面在一张纸上",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "身份证",
          id: 6132
        },
        {
          title: "户口本户主页及本人页在一张纸上",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "户口本",
          id: 6133
        },
        {
          title: "健康证-验明原件留复印件一份,并填表",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "健康证",
          id: 6149
        },
        {
          title: "与前一家单位劳动关系终止/解除证明信-原件",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "劳动关系终止",
          id: 6150
        },
        {
          title: "招商银行银行卡复印件",
          iconImg: require("../../../static/entryFlow/entry_18.png"),
          rename: "招商银行银行卡复印件",
          id: 6136
        }
      ],
      uploadMaskSrc: "",
      isloading:false
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
          this.$alert("只能上传一份", "提示");
          return;
        }
      } else {
        this.$alert("格式上传不正确", "提示");
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
      t.uploadFileImage[id].push(fileNameKey);
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
      let formData = new FormData();
      if(this.uploadArr.length===0){
        this.$alert("该流程已过", "提示");
        return
      }
      for (let key in this.uploadFileImage) {
        this.uploadArr.forEach(ele => {
          if (ele.dtid === Number(key)) {
            formData.append("type", JSON.stringify(ele));
            this.uploadFileImage[key].forEach((item, index) => {
              formData.append(item.id, item.file);
            });
          }
        });
      }
      // for (var value of formData.values()) {
      //   console.log(value);
      // }
      t.isloading = true
      let headers = { "content-Type": "multipart/form-data" };
      this.http
        .post("/api/filesupload", formData, {
          headers: headers
        })
        .then(res => {
          if (res.data.errcode == 0) {
            t.$store.commit("entryFlow/setEntryDataBlock", "01rejectOffer");
            let obj = {
              writeMsg: "",
              uploadMsg: ""
            };
            t.$store.commit("entryFlow/setOfferListShow", obj);
          }
          t.isloading = false
          this.$alert(res.data.msg, "提示");
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
    }
  },
  mounted() {
    const t = this;
    t.getUploadParams();
  },
  created() {},
  computed: {}
};
</script>
<style scoped lang="less" type="text/less">
/deep/ .material-icons {
  vertical-align: middle;
}
.upload_msg {
  width: 100%;
  height: calc(100% - 320px);
  overflow-y: scroll;
  background: rgba(244, 246, 250, 1);
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
        font-size: 0.3rem;
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
