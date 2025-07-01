import * as React from "react";
import "./app.less";
import { Button } from "antd";
import { Space, Table, message } from "antd";
import type { TableProps } from "antd";
import "./types/global.ts";

if (mode === "development") {
  window.params = {
    routeParams: {
      a: "11111112121221212121212121212121212asdklasjdklasjdklasjdklasjdklaskdljaskjdlakjsdlkajslkd12121212121212121",
      b: 2,
    },
    hashParams: { c: 3, d: 4 },
    filePath: "views/index/order.mpx",
  };
}
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
    this.init();
  }

  init = () => {
    const { routeParams, hashParams, filePath } = window.params;

    const columns = [
      { key: "key", title: "Key", dataIndex: "key", width: 100 },
      {
        key: "value",
        title: "Value",
        dataIndex: "value",
        width: 150,
        render: (text, record) => {
          return <div style={{ maxWidth: 150 }}>{text}</div>;
        },
      },
      {
        key: "action",
        title: "Action",
        dataIndex: "action",
        width: 50,
        render: (_, record) => {
          return <a onClick={() => this.handleClickCopy(record)}>copy</a>;
        },
      },
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

  handleClickCopy = async (record: any) => {
    console.log("[p1.3] record", record);
    await navigator.clipboard.writeText(record.value);
    message.info(`已复制: ${record.value}`);
  };

  handleCopyFilePath = async () => {
    const { filePath } = this.state;
    await navigator.clipboard.writeText(filePath);
    message.info(`已复制: ${filePath}`);
  };

  handleClearLogin=()=>{
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: "clearLogin",
        },
        (response) => {
          console.log("[p1.5] 设置成功？", response);
          message.info('success')
        }
      );
    });
  }

  render() {
    const { routeColumns, routeData, hashColumns, hashData, filePath } =
      this.state;
    const hasRoute = routeData.length > 0;
    const hasHash = hashData.length > 0;

    return (
      <div className="App">
        <Button type='primary' onClick={this.handleClearLogin}>clear login</Button>
        <div className="table-container">
          <h3>Route Parameters</h3>
          {hasRoute && (
            <Table
              scroll={{ x: 300 }}
              columns={routeColumns}
              dataSource={routeData}
              pagination={false}
            />
          )}
          {!hasRoute && <div>无 Route 参数</div>}
        </div>
        <div className="table-container">
          <h3>Hash Parameters</h3>
          {hasHash && (
            <Table
              scroll={{ x: 300 }}
              columns={hashColumns}
              dataSource={hashData}
              pagination={false}
            />
          )}
          {!hasHash && <div>无 Hash 参数</div>}
        </div>
        <>
          <h3>File Path</h3>
          <div className='flex'>
            <div className='file-path'>{filePath}</div>
            <a onClick={this.handleCopyFilePath}>copy</a>
          </div>
        </>
      </div>
    );
  }
}

export default App;
