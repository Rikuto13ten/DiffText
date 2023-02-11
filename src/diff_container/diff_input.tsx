import { event } from '@tauri-apps/api';
import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api';

const DiffInput = () => {
  const [originalText, setOriginalText] = useState<String>('sssss');
  const [changeText, setChangeText] = useState<String>('sssffff');
  const [leftResult, setLeftResult] = useState<String>('+sss+l');
  const [rightResult, setRightResult] = useState<String>('');

  const originString = async () => {
    setLeftResult(
      await invoke('diff_left', { left: originalText, right: changeText })
    );
    setRightResult(
      await invoke('diff_right', { left: originalText, right: changeText })
    );
    console.log(leftColored());
  };

  function leftColored() {
    let split = leftResult.split('');
    const array = [];

    for (let i = 0; i < split.length; i++) {
      if (split[i] === '+') {
        array.push(
          <React.Fragment key={i}>
            <span className="bg-green-600">{split[i + 1]}</span>
          </React.Fragment>
        );
        i++;
      } else {
        array.push(<span key={i}>{split[i]}</span>);
      }
    }
    return <div className="font-mono">{array}</div>;
  }

  function rightColored() {
    let split = rightResult.split('');
    const array = [];

    for (let i = 0; i < split.length; i++) {
      if (split[i] === '-') {
        array.push(
          <React.Fragment key={i}>
            <span className="bg-red-600">{split[i + 1]}</span>
          </React.Fragment>
        );
        i++;
      } else {
        array.push(<span key={i}>{split[i]}</span>);
      }
    }
    return <div className="font-mono">{array}</div>;
  }

  return (
    <>
      <div className="flex flex-grow font-mono gap-4 max-h-screen ">
        <input
          className="flex-auto"
          onChange={(e) => setOriginalText(e.target.value)}
        />
        <input
          className="flex-auto"
          onChange={(e) => setChangeText(e.target.value)}
        />
      </div>
      <div>
        <button className="bg-blue-600" onClick={originString}>
          diff
        </button>
        <div className="text-left font-mono">
          <div className="text-left">{leftColored()}</div>
          <div className="text-left">{rightColored()}</div>
        </div>
      </div>
    </>
  );
};

export default DiffInput;
