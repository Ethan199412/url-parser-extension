// 初始化路由信息 
let routeHistory = [];
let currentPath = window.location.hash  || '/';

console.log('[p1.30]')

 
// 监听 hashchange 事件（适用于单页应用）
window.addEventListener('hashchange',  () => {
  const newHash = window.location.hash; 
  updateRouteInfo(newHash);
});
 
// 监听 popstate 事件（适用于浏览器导航）
window.addEventListener('popstate',  () => {
  const newPath = window.location.pathname  + window.location.search; 
  updateRouteInfo(newPath);
});
 
// 统一处理路由信息 
function updateRouteInfo(route) {
  currentPath = route;
  routeHistory.push(route); 
  console.log('[p1.31]',{route})
  
  // 发送数据到插件面板 
  chrome.runtime.sendMessage({ 
    type: 'ROUTE_UPDATE',
    data: {
      currentRoute: currentPath,
      params: parseParams(),
      history: routeHistory.slice(-10)  // 保留最近10条历史 
    }
  });
}

function main(){
    console.log('[p1.32]',{location})
    chrome.runtime.sendMessage({
        data: location
    })
}

setInterval(()=>{
    main()
},1000)

 
// 解析 URL 参数（支持 hash 和 search 参数）
function parseParams() {
  const searchParams = new URLSearchParams(window.location.search); 
  const hashParams = new URLSearchParams(window.location.hash.split('?')[1]); 
  return Object.fromEntries([...searchParams,  ...hashParams]);
}