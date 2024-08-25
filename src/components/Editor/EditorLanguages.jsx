import React from "react";

const options = [
  { value: "html", content: "HTML" },
  { value: "css", content: "CSS" },
  { value: "javascript", content: "Javascript" },
];

const EditorLanguages = ({ handleLanguage, language }) => {
  return (
    <select
      className="p-2 outline-none focus:ring-2 focus:ring-blue-500 bg-[#CED6E1] text-black text-sm rounded-lg"
      name="theme"
      value={language}
      onChange={(info) => {
        const { value } = info.target;
        handleLanguage(value);
      }}
    >
      {options.map(({ value, content }) => (
        <option key={value} value={value}>
          {content}
        </option>
      ))}
    </select>
  );
};

export default EditorLanguages;
