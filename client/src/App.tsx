import React, { Fragment } from "react";
import "./App.css";
import ActivityLog from "./components/activity-log";
import MockContainer from "./components/mock-container";

function App() {
  return (
    <Fragment>
      <div className="h-screen flex flex-col  overflow-auto gap-3">
        <div className="basis-52 flex">
          <MockContainer />
        </div>
        <div
          className="flex justify-center items-start"
          style={{
            flex: 1,
            maxHeight: "80%",
            marginBottom: 100,
          }}
        >
          <ActivityLog />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
