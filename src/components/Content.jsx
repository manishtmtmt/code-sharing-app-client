import React from 'react'
import MonacoEditor from './Editor/MonacoEditor';

const Content = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src="/assets/NoteCodeLogo.svg" alt="Logo" />
      <p className="text-2xl font-semibold">Create & Share</p>
      <p className="text-4xl font-semibold">Your Code easily</p>
      <div className="mt-3 md:mt-8 mb-20">
        <MonacoEditor />
      </div>
    </div>
  );
}

export default Content