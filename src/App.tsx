import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import DiffInput from "./diff_container/diff_input";
import "./App.css";

function App() {
  return (
    <div className="container">
      <DiffInput />
    </div>
  );
}

export default App;
