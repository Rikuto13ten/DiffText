import React from 'react';

type Props = {
  text: String;
  setText: React.Dispatch<React.SetStateAction<String>>;
  color: String;
};

const DiffTextarea = ({ text, setText, color }: Props) => {
  return (
    <div className="textarea_container">
      <div className={`textarea_header bg-${color}-200`}>text</div>
      <textarea
        autoCapitalize="none"
        className="textarea_style"
        maxLength={20}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default DiffTextarea;
