import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";

console.log("index.js 加载");

function getUrlParams(url: string): Record<string, string> {
  const str = new URL(url).search || "";
  const paramsStr = str.split("?")[1] || "";
  const routeParams: Record<string, string> = {};
  paramsStr.split("&").forEach((pair) => {
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
    const [key, value] = pair.split("=");
    hashParams[key] = decodeURIComponent(decodeURIComponent(value));
  });
  return hashParams;
}

// 等参数准备好再渲染 App
if (chrome?.tabs?.query) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    const routeParams = getUrlParams(url);
    const hashParams = getHashParams(url);
    const filePath = url.split("/").pop() || "";

    ReactDOM.render(<App />, document.getElementById("root"));
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
