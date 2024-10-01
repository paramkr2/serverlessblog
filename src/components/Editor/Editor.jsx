import React, { useEffect, useRef } from 'react';
import { useEditor , EditorContent,BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Document from '@tiptap/extension-document'

import './Editor.css'; // Import CSS for custom styles


const CustomDocument = Document.extend({
  content: 'heading block*',
})


const Editor = ({ content, setContent }) => {
  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Write your title here...'; // Placeholder for title
          }
          return 'Write more...'; // Placeholder for content
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });
  

  useEffect(() => {
    editor.commands.setContent(content); // Set initial content
  }, []);

  return (
    <div className="editor-container">
      {editor && 
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              Strike
            </button>
          </div>
        </BubbleMenu>
      }

      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
