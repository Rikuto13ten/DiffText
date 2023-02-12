import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api';
import DiffTextarea from './diff_textarea';

const DiffInput = () => {
  const [originalText, setOriginalText] = useState<String>('');
  const [changeText, setChangeText] = useState<String>('');
  const [leftResult, setLeftResult] = useState<String>('');
  const [rightResult, setRightResult] = useState<String>('');

  const originString = async () => {
    console.log(originalText);
    setLeftResult(
      await invoke('diff_left', { left: originalText, right: changeText })
    );
    setRightResult(
      await invoke('diff_right', { left: originalText, right: changeText })
    );
  };

  const clearText = () => {
    location.reload();
  };

  function resultsText(beforeResultText: String) {
    let split = beforeResultText.split('');
    const array = [];

    for (let i = 0; i < split.length; i++) {
      switch (split[i]) {
        case '+':
          array.push(
            <React.Fragment key={i}>
              <span className="bg-green-700">{split[i + 1]}</span>
            </React.Fragment>
          );
          i++;
          break;
        case '-':
          array.push(
            <React.Fragment key={i}>
              <span className="bg-red-600">{split[i + 1]}</span>
            </React.Fragment>
          );
          i++;
          break;
        default:
          array.push(<span key={i}>{split[i]}</span>);
          break;
      }
    }
    return <div className="font-mono">{array}</div>;
  }

  return (
    <>
      <div className="flex font-mono gap-4 h-96">
        <DiffTextarea
          text={originalText}
          setText={setOriginalText}
          color={'green'}
        />
        <DiffTextarea text={changeText} setText={setChangeText} color={'red'} />
      </div>
      <div className="button_container">
        <button className="diff_button" onClick={originString}>
          diffuse
        </button>
        <button className="clear_button" onClick={clearText}>
          clear
        </button>
      </div>
      <div>
        <div className="result_container">
          <div className="result_div">{resultsText(leftResult)}</div>
          <div className="result_div">{resultsText(rightResult)}</div>
        </div>
      </div>
    </>
  );
};

export default DiffInput;
