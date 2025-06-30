import * as React from "react";
import "./app.less";
import { Button } from "antd";
import { Space, Table, message } from "antd";
import type { TableProps } from "antd";
import "./types/global.ts";

if (mode === "development") {
  window.params = {
    routeParams: { a: 1, b: 2 },
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
      { key: "value", title: "Value", dataIndex: "value", width: 150 },
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

  render() {
    const { routeColumns, routeData, hashColumns, hashData, filePath } =
      this.state;
    const hasRoute = routeData.length > 0;
    const hasHash = hashData.length > 0;

    return (
      <div className="App">
        <div className='table-container'>
          <h3>Route Parameters</h3>
          {hasRoute && <Table columns={routeColumns} dataSource={routeData} pagination={false}/>}
          {!hasRoute && <div>无 Route 参数</div>}
        </div>
        <div className='table-container'>
          <h3>Hash Parameters</h3>
          {hasHash && <Table columns={hashColumns} dataSource={hashData} pagination={false}/>}
          {!hasHash && <div>无 Hash 参数</div>}
        </div>
        <>
          <h3>文件路径</h3>
          <div>{filePath}</div>
        </>
      </div>
    );
  }
}


export default App;
