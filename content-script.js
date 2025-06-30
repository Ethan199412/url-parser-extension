
 
// 监听 hashchange 事件（适用于单页应用）
window.addEventListener('hashchange',  () => {
  sendInfo()
});
 
// 监听 popstate 事件（适用于浏览器导航）
window.addEventListener('popstate',  () => {
  sendInfo()
});
 
// 统一处理路由信息 
function sendInfo() {
  chrome.runtime.sendMessage({
    location
  });
}

function main(){
    sendInfo()
}

main()

 