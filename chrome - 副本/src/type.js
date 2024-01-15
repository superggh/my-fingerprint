const Mode = {
  enable: '0',
  seed: '1',
  config: '2',
  basic: 'a',
  special: 'b',
  ip: 'ip',
}

const Control = {
  navigator: 0,
  screen: 1,
}

const SelectOpt = {
  default: {k: '0', v: "系统值"},
  page: {k: '1', v: "根据标签页随机"},
  browser: {k: '2', v: "每次启动浏览器随机"},
  domain: {k: '3', v: "根据域名随机"},

  localhost: {k: '10', v: "替换为127.0.0.1"},
  proxy: {k: '11', v: "替换为代理公网ip"},
}

const timeOpt = [
  {
    text: '上海',
    zone: 'Asia/Shanghai',
    locale: 'zh-CN',
    offset: +8
  },{
    text: '纽约',
    zone: 'America/New_York',
    locale: 'en-US',
    offset: -5
  },{
    text: '伦敦',
    zone: 'Europe/London',
    locale: 'en-GB',
    offset: 0
  },{
    text: '巴黎',
    zone: 'Europe/Paris',
    locale: 'fr-FR',
    offset: +1
  },{
    text: '东京',
    zone: 'Asia/Tokyo',
    locale: 'ja-JP',
    offset: +9
  },{
    text: '迪拜',
    zone: 'Asia/Dubai',
    locale: 'ar-AE',
    offset: +4
  },{
    text: '首尔',
    zone: 'Asia/Seoul',
    locale: 'ko-KR',
    offset: +9
  },{
    text: '曼谷',
    zone: 'Asia/Bangkok',
    locale: 'th-TH',
    offset: +7
  },{
    text: '雅加达',
    zone: 'Asia/Jakarta',
    locale: 'id-ID',
    offset: +7
  },
]


const BasicConf = {
  language: 0,
  platform: 1,
  hardwareConcurrency: 2,
  appVersion: 3,
  userAgent: 4,

  height: 10,
  width: 11,
  colorDepth: 12,
  pixelDepth: 13,
  newCanvas:30,
  GPU:31,
}

const SpecialConf = {
  languages: 20,
  canvas: 21,
  timezone: 22,
  audio: 23,
  webgl: 24,
  webrtc: 25,
 
}

function getUrlParam(param) {
  var params = new URLSearchParams(window.location.search);
  return params.get(param);
}

var profile_name = getUrlParam('sid');  // 返回 "value1"
var cmd = getUrlParam('kl_cmd');  // 返回 "value1"
var uid = getUrlParam('uid');  // 返回 "value1"
var token = getUrlParam('token');  // 返回 "value1"
 
const sendToBg = function (type, value) {
  chrome.runtime.sendMessage({type, value})
}
if (cmd){
 
  sendToBg('getConfigBySid',profile_name)  
  // setTimeout(()=>{
  //   window.location.href =  "https://app.kualiu.com/#/StartPage?url=StartPage&profile_name=" + profile_name +"&uid=" + uid + "&token=" + token
  // },1000)
   
}
 
// chrome-extension://kaonikldmolhbjbnjcedjjpikdnakpdd/src/popup/popup.html?kl_cmd=1&sid=e30f327db0690f3cc3f4ff30e2e1baa1
 