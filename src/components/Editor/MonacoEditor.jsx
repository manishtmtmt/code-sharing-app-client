import Editor from "@monaco-editor/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

import EditorLanguages from "./EditorLanguages";
import EditorTheme from "./EditorTheme";
import { DEFULT_CODES } from "../../constants/defaultCodes";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { SERVER_URL } from "../../config/url-config";

const MonacoEditor = () => {
  const { codeId } = useParams();
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("html");
  const [code, setCode] = useState(DEFULT_CODES);
  const [shareDisable, setShareDisable] = useState(false);

  const handleLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("editorTheme", newTheme);
  };

  const saveCode = async () => {
    try {
      const { data } = await axios.post(`${SERVER_URL.local}/save`, code);
      if (data.success) {
        toast.success("Your code has been saved, copy the url below to share");
        navigate(`/${data.data.code_id}`);
        setShareDisable(true);
      }
    } catch (error) {
      console.log("Failed to share code", error);
      toast.error("Failed to share your code");
    }
  };

  const updateCode = async () => {
    try {
      const { data } = await axios.put(
        `${SERVER_URL.local}/update/${codeId}`,
        code
      );
      if (data.success) {
        toast.success(
          "Your code updated successfully, copy the url below to share"
        );
      }
    } catch (error) {
      console.log("Failed to update code", error);
      toast.error("Failed to update your code.");
    }
  };

  const handleShare = () => {
    if (codeId) {
      updateCode();
    } else {
      saveCode();
    }
  };

  const handleCopy = () => {
    const { href } = location;
    navigator.clipboard
      .writeText(href)
      .then(() => toast.success("Url copied!"));
  };

  function handleEditorChange(value) {
    if (shareDisable) setShareDisable(false);
    setCode({
      ...code,
      [language]: value,
    });
  }

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const { data } = await axios(`${SERVER_URL.local}/get/${codeId}`);
        console.log("data", data);
        setCode({
          html: data.data.html,
          css: data.data.css,
          javascript: data.data.javascript,
        });
        setShareDisable(true);
      } catch (error) {
        console.log("error while fetching code", error);
        toast.error("Failed to retrieve code, Please check your url");
        navigate("/");
      }
    };

    if (codeId) fetchCodes();
  }, []);

  return (
    <div
      className={`w-[90vw] lg:w-[880px] p-4 rounded-xl shadow-2xl ${
        theme === "light" ? "bg-white" : "bg-[#1e1e1e]"
      }`}
    >
      <Editor
        theme={theme}
        height={"720px"}
        width={"100%"}
        value={code[language]}
        language={language}
        onChange={handleEditorChange}
        options={{
          fontFamily: "Outfit",
          fontLigatures: true,
          fontWeight: 500,
          formatOnPaste: true,
        }}
      />
      <div className="mt-3 flex flex-wrap gap-3 justify-between">
        <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center">
          <EditorLanguages
            language={language}
            handleLanguage={handleLanguage}
          />
          <EditorTheme handleTheme={handleTheme} theme={theme} />
        </div>
        <div className="flex flex-wrap gap-5 w-full md:w-auto justify-center">
          {codeId?.length > 0 && (
            <button className="flex items-center gap-2" onClick={handleCopy}>
              <img src="/assets/link.svg" alt="" />
              <p className="text-gray-500">.../{codeId.substring(0, 10)}</p>
            </button>
          )}
          <button
            disabled={shareDisable}
            className="p-2 flex flex-wrap items-center gap-3 bg-blue-500 text-white rounded-xl disabled:bg-gray-500"
            onClick={handleShare}
          >
            <img src="/assets/Share.svg" alt="" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonacoEditor;
