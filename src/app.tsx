import * as React from "react";
import "./app.less";
import { Button } from "antd";
import { Space, Table, message } from "antd";
import type { TableProps } from "antd";
import "./types/global.ts";

global.window.params = {
  routeParams: { a: 1, b: 2 },
  hashParams: { c: 3, d: 4 },
  filePath: "views/index/order.mpx",
};

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      routeColumns: [],
      routeData: [],
      hashColumns: [],
      hashData: [],
      filePath: "",
    };
  }

  componentDidMount(): void {
    const id = setInterval(() => {
      if (window.params) {
        this.init();
        clearInterval(id);
      } else {
        console.warn("window.params is not defined yet");
      }
    },1000)
  }

  init = () => {
    const { routeParams, hashParams, filePath } = window.params;

    const columns = [
      { key: "key", title: "Key", dataIndex: "key" },
      { key: "value", title: "Value", dataIndex: "value" },
      { key: "action", title: "Action", dataIndex: "action", render: (_, record) => {
        return <a onClick={()=>this.handleClickCopy(record)}>copy</a>
      }},
    ];

    this.setState({
      routeColumns: columns,
      hashColumns: columns,
      routeData: Object.keys(routeParams).map((key) => {
        const value = routeParams[key];
        return {
          key,
          value,

        };
      }),
      hashData: Object.keys(hashParams).map((key) => {
        const value = hashParams[key];
        return {
          key,
          value,
        };
      }),
      filePath,
    });
  };

  handleClickCopy = async (record) => {
    console.log('[p1.3] record', record)
    await navigator.clipboard.writeText(record.value);
    message.info(`已复制: ${record.value}`);
  }

  render() {
    const { routeColumns, routeData, hashColumns, hashData, filePath } =
      this.state;
    return (
      <div className="App">
        <>
          <h1>Route Parameters</h1>
          <Table columns={routeColumns} dataSource={routeData} />
        </>
        <>
          <h1>Hash Parameters</h1>
          <Table columns={hashColumns} dataSource={hashData} />
        </>
        <>
          <h1>文件路径</h1>
          <div>{filePath}</div>
        </>
      </div>
    );
  }
}

function getUrlParams(url) {
  const str = new URL(url).search || '';
  const paramsStr = str.split("?")[1] || "";
  console.log("[p1.3] params",url, paramsStr);
  const routeParams = {};
  paramsStr.split("&").forEach((pair) => {
    const [key, value] = pair.split("=");

    routeParams[key] = decodeURIComponent(decodeURIComponent(value));
    console.log("[p1.0] value", routeParams[key]);
  });
  return routeParams;
}

function getHashParams(url) {
  const hash = url.split("#")[1] || "";
  const str = hash.split("?")[1] || "";

  if (!str) {
    return {};
  }

  const hashParams = {};
  str.split("&").forEach((pair) => {
    const [key, value] = pair.split("=");

    hashParams[key] = decodeURIComponent(decodeURIComponent(value));
    console.log("[p1.0] value", hashParams[key]);
  });
  return hashParams;
}

chrome?.tabs?.query({ active: true, currentWindow: true }, function (tabs) {
  const url = tabs[0].url;
  console.log("[p1.1] url", url, tabs);
  const routeParams = getUrlParams(url) || {};
  const hashParams = getHashParams(url) || {};
  window.params = {
    routeParams: routeParams,
    hashParams: hashParams,
    filePath: url.split("/").pop() || "",
  };
  console.log("[p1.2] window.params", window.params);
  // document?.getElementById('params').innerText = paramsText + '\n' + JSON.stringify(hashParams);
});

export default App;
