let s_config = {}
async function getConfigBySid(sid) {
  try {

    res = await fetch("https://api.kualiu.com/AdminKuajingShop/getShopConfigBySid", {
      method: "POST",
      body: new URLSearchParams({
        sid: sid,

      })
    })

    const resJson = await res.json()

    if (resJson.code == 0) {
      console.log(resJson.data)
      s_config = resJson.data
      init(s_config)
    }
  } catch (r) {
    console.log(r)
  }

}


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

const Opt = {
  default: '0',
  page: '1',
  browser: '2',
  domain: '3',

  localhost: '10',
  proxy: '11',
}

const Item = {
  language: 0,
  platform: 1,
  hardwareConcurrency: 2,
  appVersion: 3,
  userAgent: 4,

  height: 10,
  width: 11,
  colorDepth: 12,
  pixelDepth: 13,
  newCanvas: 30,
  GPU:31,
  languages: 20,
  canvas: 21,
  timezone: 22,
  audio: 23,
  webgl: 24,
  webrtc: 25,
}

/**
 * 各标签页的通知内容
 */
const notify = {}

const init = async function (s_config) {
  // get data
  console.log("init", s_config)
  const data = await chrome.storage.local.get();

  console.log("data1", data)
  chrome.storage.local.set({
    "canvasSeed": s_config.canvas_seed
  });
  // enable
  data[Mode.enable] = true;
  // seed
  data[Mode.seed] = Math.floor(Math.random() * 100000);
  // control
  data[Mode.config] = Object.assign({
    [Control.navigator]: true,
    [Control.screen]: true,
  }, data[Mode.config])
  // basic
  data[Mode.basic] = {
    [Item.language]: { select: 0, value: Opt.default },
    [Item.platform]: { select: 1, value: s_config.uAgent },
    [Item.hardwareConcurrency]: { select: 0, value: Opt.default },
    [Item.appVersion]: { select: 0, value: Opt.browser },
    [Item.userAgent]: { select: 1, value: s_config.ua },
    [Item.height]: { select: 1, value: s_config.height },
    [Item.width]: { select: 1, value: s_config.width },
    [Item.colorDepth]: { select: 0, value: Opt.default },
    [Item.pixelDepth]: { select: 0, value: Opt.default },
    [Item.newCanvas]: { select: 1, value: s_config.canvas_seed },
    [Item.GPU]: { select: 1, value: s_config.GPU },
  }, data[Mode.basic]
  // spacial
  data[Mode.special] = {
    [Item.languages]: Opt.default,
    [Item.canvas]: Opt.page,
    [Item.audio]: Opt.page,
    [Item.webgl]: Opt.page,
    [Item.timezone]: -1,
    [Item.webrtc]: Opt.proxy,
  }, data[Mode.special]
  // 获取ip
  rePubIP()
  // save
  console.log("data2", data)
  chrome.storage.local.set(data);

}

/**
 * 初次启动扩展时触发（浏览器更新、扩展更新也触发）
 * @param {'install' || 'update' || 'chrome_update' } reason 操作
 * @param {string} previousVersion 上个版本号
 */
chrome.runtime.onInstalled.addListener(({ reason, previousVersion }) => {
  // init(previousVersion);

});

/**
 * 重启浏览器触发
 */
chrome.runtime.onStartup.addListener(() => {
  // seed
  chrome.storage.local.set({
    [Mode.seed]: Math.floor(Math.random() * 100000)
  });

  // 获取ip
  // rePubIP()
});
chrome.runtime.onSuspend.addListener(() => {
  alert("close")
});

let isGettingIP = false
/**
 * 重新获取公网ip并存储
 */
const rePubIP = function () {
  if (isGettingIP) return
  isGettingIP = true
  fetch('https://api.ipify.org?format=json', { method: 'GET', })
    .then(response => response.json())
    .then((data) => {
      if (!data.ip) return
      chrome.storage.local.set({
        [Mode.ip]: data.ip
      });
    })
    .finally(() => {
      isGettingIP = false
    })
}

/**
 * tab每次加载触发
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'loading') {
    // notify
    // delete notify[tabId];
    // chrome.action.setBadgeText({ tabId, text: '' });
  }
});

/**
 * 监听tab关闭
 */
chrome.tabs.onRemoved.addListener((tabId) => {
  delete notify[tabId];
})

/**
 * 监听扩展消息
 */
chrome.runtime.onMessage.addListener((data, sender) => {
  switch (data.type) {
    case 'notify':
      handleNotify(sender.tab.id, data.value)
      break
    case 'getConfigBySid':

      getConfigBySid(data.value)
      break
    case 're-ip':
      rePubIP()
      break
    default: return
  }
})

const bgColorMap = {
  'low': '#7FFFD4',
  'high': '#F4A460',
}
const fontColorMap = {
  'record': '#FFF',
}

 
const handleNotify = function (tabId, data) {
  
 
}