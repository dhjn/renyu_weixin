import Vue from 'vue'
import Vuex from 'vuex'
import entryFlow from '../pages/entryFlow/store/entryFlow'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //
    start:'',
    end:'',
    dateMonthShow:false,
    selectDateTimeStart:localStorage.getItem('dateTime'),
    selectDateTimeEnd:localStorage.getItem('dateTime'),
    warn:'',
    warnNum:'',
    warnType:'',
    warnTitle:'',
    InviteName:[],
    InviteCount:[],
    invPeopleAll: [],
    salaryState: '',
    detail: [],
    socialSecurity: [],
    providentFund: [],
    InfoList: {},
    dateRemove: false,
    log: '0',
    isRead: '0',
    orderState: '0',
    talentState: '0',
    superManage:{
      empdimBuspmp: '',
      empdimBuspmpDis: '',
    }
  },
  mutations: {
    dateMonthreveal(state,value) {
      state.dateMonthShow = value
    },
    selectDateTimeStart(state,value){
      state.selectDateTimeStart = value
    },
    selectDateTimeEnd(state,value){
      state.selectDateTimeEnd = value
    },
    startTime(state,value){
      state.start = value
    },
    startEnd(state,value){
      state.end = value
    },
    warn(state,value) {
      state.warn = value
    },
    warnNum(state,value) {
      state.warnNum = value
    },
    warnType(state,value) {
      state.warnType = value
    },
    warnTitle(state,value) {
      state.warnTitle = value
    },
    InviteName(state,value){
      state.InviteName = value
    },
    InviteCount(state,value){
      state.InviteCount = value
    },
    InfoList(state,value){
      state.InfoList = value
      console.log(state.InfoList)
    },
    dateRemove(state,value){
      state.dateRemove = value
    },
    InvPeopleAll(state,value){
      state.invPeopleAll = value
    },
    setLogState(state,value){
      state.log = value
    },
    setReadState(state,value){
      state.isRead = value
    },
    setOrderState(state,value){
      state.orderState = value
    },
    setTalentState(state,value){
      state.talentState = value
    },
    setSupManager(state,value) {
      state.superManage = value
    }
  },
  actions: {

  },
  getters:{

  },
  modules: {
    entryFlow
  }
});

export default store;
