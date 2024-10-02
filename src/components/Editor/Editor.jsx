import React, { useEffect,useState, useRef } from 'react';
import { useEditor , EditorContent,BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Document from '@tiptap/extension-document'
import BubbleMenuBar from './BubbleMenu.jsx'
import './Editor.css'; // Import CSS for custom styles
import FloatingMenuBar from './FloatingMenu';

const CustomDocument = Document.extend({
  content: 'heading block*',
})


const Editor = ({ content, setContent }) => {
	const [isUploading, setIsUploading] = useState(false);
	  const [showLinkSelector, setShowLinkSelector] = useState(false);
	  const [showBubbleMenu, setShowBubbleMenu] = useState(true);
	  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
	  const [showPlusButton, setShowPlusButton] = useState(false);



  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
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
      {editor && (<BubbleMenuBar 
	      editor={editor} 
	      showBubbleMenu={showBubbleMenu} 
	      showLinkSelector={showLinkSelector} 
	      setShowLinkSelector={setShowLinkSelector} 
	    />)}

      {editor && (<FloatingMenuBar 
	      editor={editor}
	      showPlusButton={showPlusButton}
	      showFloatingMenu={showFloatingMenu}
	      setShowFloatingMenu={setShowFloatingMenu}
	      isUploading={isUploading}
	      setIsUploading={setIsUploading}
	    />)}

      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
