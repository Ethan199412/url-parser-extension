import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";

console.log("index.js 加载");

function getUrlParams(url: string): Record<string, string> {
  const str = new URL(url).search || "";
  const paramsStr = str.split("?")[1] || "";
  const routeParams: Record<string, string> = {};
  paramsStr.split("&").forEach((pair) => {
    if(!pair) return;
    const [key, value] = pair.split("=");
    routeParams[key] = decodeURIComponent(decodeURIComponent(value));
  });
  return routeParams;
}

function getHashParams(url: string): Record<string, string> {
  const hash = url.split("#")[1] || "";
  const str = hash.split("?")[1] || "";
  const hashParams: Record<string, string> = {};
  str.split("&").forEach((pair) => {
    if(!pair) return;
    const [key, value] = pair.split("=");
    hashParams[key] = decodeURIComponent(decodeURIComponent(value));
  });
  return hashParams;
}

function getFilePath(url: string): string {
  const hash = url.split("#")[1] || '';
  const pureHash = hash.split("?")[0] || "";
  let route = new URL(url).pathname.replace('.html', '');
  if(route === '/'){
    route = '/index'
  }
  return 'views' + route + pureHash + ".mpx";
}
// 等参数准备好再渲染 App
if (chrome?.tabs?.query) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    const routeParams = getUrlParams(url);
    const hashParams = getHashParams(url);
    const filePath = getFilePath(url)
    window.params = {
      routeParams,
      hashParams,
      filePath,
    };
    console.log("[p1.3] window.params", window.params);

    ReactDOM.render(<App />, document.getElementById("root"));
  });
}
else{
    ReactDOM.render(<App />, document.getElementById("root"));
}
