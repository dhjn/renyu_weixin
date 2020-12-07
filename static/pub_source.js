const pubsource = {
	// 以下为开发环境变量配置
  // pub_getlink: 'http://192.168.21.59:8080/HRSSC_GOHR',
  pub_getlink: 'http://192.168.21.141:8080/HRSSC_GOHR',
  // pub_getlink :'http://darren.hrocloud.com:809a9/HRSSC_GOHR',
	clientId: '1000',
	clientPass: '6cc1c430aed64d3bb8516011195a5b56',
	pub_pubf_uploadlink: 'http://tgdev-filegw.hrocloud.com/upload?groupId=0',
  pub_prvf_uploadlink: 'http://tgdev-filegw.hrocloud.com/upload?groupId=1',
	// pub_prvf_uploadlink: 'http://darren.hrocloud.com:9709/upload?groupId=1',
	pub_pubf_downlink: 'http://tgdev-publicfile.hrocloud.com/',
  pub_prvf_downlink: 'http://tgdev-filegw.hrocloud.com/file?',
	// pub_prvf_downlink: 'http://darren.hrocloud.com:9709/file?',
	webSocketURL: 'ws://192.168.11.69:3048/ws',
  // webSocketURL: 'ws://192.168.11.z75:3048/ws',
  // webSocketURL: 'ws://192.168.12.39:3048/ws',

	// 以下为测试环境变量配置，新变量请同开发增加
  /*  以下为12网段测试环境
  pub_getlink : "http://demo.hrocloud.com:6601/api/v6",
	clientId : "1000",
	clientPass : "6cc1c430aed64d3bb8516011195a5b56",
	pub_pubf_uploadlink : "http://demo.hrocloud.com:6602/upload?groupId=0",
	pub_prvf_uploadlink : "http://demo.hrocloud.com:6602/upload?groupId=1",
	pub_pubf_downlink : "http://demo.hrocloud.com:6603/",
	pub_prvf_downlink : "http://demo.hrocloud.com:6602/file?",
	webSocketURL: 'ws://demo.hrocloud.com:3048/ws',
  */

  /* 以下为11网段演示环境
  pub_getlink : "http://sscapigw.hrocloud.com:8012/api/v6",
  clientId : "1000",
  clientPass : "6cc1c430aed64d3bb8516011195a5b56",
  pub_pubf_uploadlink : "http://sscfgw.hrocloud.com:8013/upload?groupId=0",
  pub_prvf_uploadlink : "http://sscfgw.hrocloud.com:8013/upload?groupId=1",
  pub_pubf_downlink : "http://sscpfile.hrocloud.com:8015/",
  pub_prvf_downlink : "http://sscfgw.hrocloud.com:8013/file?",
  webSocketURL: 'ws://sscws.hrocloud.com:8017/ws',
  */

	// 以下为生产环境变量配置，新变量请同开发增加
  /*
	pub_getlink : "https://apigw.hrocloud.com/api/v9",
	clientId : "1000",
	clientPass : "6cc1c430aed64d3bb8516011195a5b56",
	pub_pubf_uploadlink : "https://filegw.hrocloud.com/upload?groupId=0",
	pub_prvf_uploadlink : "https://filegw.hrocloud.com/upload?groupId=1",
	pub_pubf_downlink : "https://pubfile.hrocloud.com/",
	pub_prvf_downlink : "https://filegw.hrocloud.com/file?",
	webSocketURL: 'ws://192.168.11.63:3048/ws',
  */

	// 以下为该变量收尾，新增的请放到该变量前面
  webSocketDevice: 'weixin',
  applicationId: '70',
  applicationGzhId: '71',
  companyId: '1000',
  corpId: 'wwce608d73697f42d2',
  appSecret: '2qKxvpzR7codeE1sj7lbRh-RtuWpr3E5GW2StdbIewY',
  ddcorpId: 'ding208f99eb9c0d69ca',
  pub_pubsources_end: '该变量收尾，新增的请放到该变量前面',
};
