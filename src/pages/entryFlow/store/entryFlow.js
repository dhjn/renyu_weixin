import Vue from "vue";
import axios from "axios";
const entryFlow = {
  namespaced: true,
  state: {
    formData: {},
    formWorkData: [],
    formFamilyData: [],
    selectValue: [], // 下拉公共参数
    entryDataBlock: "01rejectOffer", //  默认 1为接受 2为填写信息 3为上传资料  用做显示的每一块
    offerListShow: {
      writeMsg: "",
      uploadMsg: ""
    }, // 默认 1 显示接受offer为高亮 2 填写信息为高亮 3 上传资料为高亮
    uploadFile: {
      Files: [
        { fileKey: "", fileName: "" },
        { fileKey: "", fileName: "" },
        { fileKey: "", fileName: "" },
        { fileKey: "", fileName: "" },
        { fileKey: "", fileName: "" },
        { fileKey: "", fileName: "" },
        { fileKey: "", fileName: "" }
      ],
      imgUrl: [
        { uploadUrl: "", value: "", type: "1" },
        { uploadUrl: "", value: "", type: "1" },
        { uploadUrl: "", value: "", type: "1" },
        { uploadUrl: "", value: "", type: "1" },
        { uploadUrl: "", value: "", type: "1" },
        { uploadUrl: "", value: "", type: "1" },
        { uploadUrl: "", value: "", type: "1" }
      ]
    }, // 用于存上传资料的信息
    uploadFileImage: {
      "0": [],
      "1": [],
      "2": [],
      "3": [],
      "4": [],
      "5": [],
      "6": []
    },
    uploadData: {},
    infoMsgShow: {
      userInfo: false,
      socialInsranceInfo: false,
      eductionInfo: false,
      salaryInfo: false,
      workInfo: false,
      familyInfo: false,
      friendInfo: false
    }
  },
  actions: {
    getFormData({ commit }) {
      let value = localStorage.getItem("formData");
      commit("setFormData", JSON.parse(value));
    }
  },
  mutations: {
    setEntryDataBlock(state, value) {
      state.entryDataBlock = value;
    },
    setOfferListShow(state, value) {
      state.offerListShow.writeMsg = value.writeMsg;
      state.offerListShow.uploadMsg = value.uploadMsg;
    },
    setSelectValue(state, value) {
      state.selectValue = value;
    },
    setInfoMsgShow(state) {
      state.infoMsgShow = {
        userInfo: false,
        socialInsranceInfo: false,
        eductionInfo: false,
        salaryInfo: false,
        workInfo: false,
        familyInfo: false,
        friendInfo: false
      };
    },
    setFormData(state, value) {
      localStorage.setItem("formData", JSON.stringify(value));
      state.formData = value;
    },
    setformWorkData(state, value) {
      state.formWorkData = value;
    },
    setformFamilyData(state, value) {
      state.formFamilyData = value;
    },
    setUploadFile(state, value) {
      state.uploadFile.Files = value.Files;
    },
    setUploadImg(state, value) {
      state.uploadFile.imgUrl = value.imgUrl;
    },
    setuploadData(state, value) {
      state.uploadData = value;
    },
    /*
     * 替换原有的formData
     * */
    setFormDataReplace(state, value) {
      let oldData = state.formData;
      let newData = value;
      state.formData = Object.assign(oldData, newData);
    },
    /*
     * 替换原有的forWorkmData
     * */
    setFormWorkDataChange(state, value) {
      let Index = value.index;
      let newData = value.newData;
      let id = value.id;
      let data = state.formWorkData;
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          data[i] = newData;
        }
      }
      state.formWorkData = data;
    },
    /*
     * 替换原有的familymData
     * */
    setFormFamilyDataChange(state, value) {
      let Index = value.index;
      let newData = value.newData;
      let id = value.id;
      let data = state.formFamilyData;
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          data[i] = newData;
        }
      }
      state.formFamilyData = data;
    },
    /*
     * 控制填写资料 没填写时的显示隐藏
     * */
    SetUserInfo(state, value) {
      state.infoMsgShow.userInfo = value;
      localStorage.setItem("userInfo", value);
    },
    SetSocialInsranceInfo(state, value) {
      state.infoMsgShow.socialInsranceInfo = value;
      localStorage.setItem("socialInsranceInfo", value);
    },
    SetEductionInfo(state, value) {
      state.infoMsgShow.eductionInfo = value;
      localStorage.setItem("eductionInfo", value);
    },
    SetSalaryInfo(state, value) {
      state.infoMsgShow.salaryInfo = value;
      localStorage.setItem("salaryInfo", value);
    },
    SetWorkInfo(state, value) {
      state.infoMsgShow.workInfo = value;
      localStorage.setItem("workInfo", value);
    },
    SetFamilyInfo(state, value) {
      state.infoMsgShow.familyInfo = value;
      localStorage.setItem("familyInfo", value);
    },
    SetFriendInfo(state, value) {
      state.infoMsgShow.friendInfo = value;
      localStorage.setItem("friendInfo", value);
    },
    setUploadFileImage(state, value) {
      state.uploadFileImage = value;
    }
  }
};

export default entryFlow;
