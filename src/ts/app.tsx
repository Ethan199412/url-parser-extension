import * as React from "react";
import "./app.less";
import { mult, pow } from "../utils";
import axios from "axios";

axios.defaults.withCredentials = true;

// @ts-ignore
global.mode = mode

// 需要放 index.d.ts 文件到根目录并在 tsconfig
// includes 里引入才能解决 vscode 报错

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    console.log("[p1.0]", global.mode);
    if(global.mode === "development") {
      console.log('[p1.1]',{location})
    }
  }

  handleClick = () => {
    console.log("click triggered");
  };

  render() {
    return (
      <div className="App">
        <h1> This is a building Tool designed by Ethan, Welcome for using. </h1>
        <button onClick={this.handleClick}>fetch</button>
      </div>
    );
  }
}

export default App;
