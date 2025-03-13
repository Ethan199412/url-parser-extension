// 接收路由数据
const routeHistory = [];
chrome.runtime.onMessage.addListener((message) => {
  console.log("[p1.4]", { message });
  routeHistory.push(message)
  if (message.type === "ROUTE_UPDATE") {
    document.getElementById("currentRoute").textContent =
      message.data.currentRoute;
    document.getElementById("urlParams").textContent = JSON.stringify(
      message.data.params,
      null,
      2
    );
    document.getElementById("routeHistory").textContent =
      message.data.history.join("\n");
  }
});

// 复制功能实现
function copyText(elementId) {
  console.log("[p1.0]", { elementId, routeHistory });
//   const text = document.getElementById(elementId).textContent;
//   navigator.clipboard.writeText(text).then(() => {
//     alert("复制成功！");
//   });
}

const btn = document.querySelector("#btn-copy");
btn.onclick = copyText

