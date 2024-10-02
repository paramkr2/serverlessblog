import { Editor } from "@tiptap/core";
import { Check, Trash, X } from "lucide-react";
import React, {  useEffect } from "react";
import { toast } from "sonner";

//import { useOutsideClick } from "../hooks/use_outside_clicks.jsx";

import { getUrlFromString } from "../../utils/get-url-from-string";
import styles from './LinkSelector.module.css'; 

export const LinkSelector = ({ editor, showLinkSelector, setShowLinkSelector }) => {
  
  

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    
    const input = e.currentTarget[0];
    var url;
    try {
      url = getUrlFromString(input.value);
    } catch (error) {
      toast.error("Invalid URL");
      return;
    }
    url && editor.chain().focus().setLink({ href: url }).run();
    setShowLinkSelector(false);
  };



  return  (
    <div className={styles.linkSelectorContainer}>
      {showLinkSelector && (
        <form
          
          onSubmit={handleUrlSubmit}
          className={styles.linkForm}
        >
          <input
            autoFocus
            type="text"
            placeholder="Paste or type a link..."
            className={styles.linkInput}
            defaultValue={editor.getAttributes("link").href || ""}
          />
          {editor.getAttributes("link").href ? (
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setShowLinkSelector(false);
              }}
            >
              <Trash className="size-4" />
            </button>
          ) : (
            <>
              <button
                type="submit"
                className={styles.submitButton}
              >
                <Check className="size-4" />
              </button>
              <button 
                type="button"
                className={styles.cancelButton}
                onClick={() => setShowLinkSelector(false)}
              >
                <X className="size-4" />
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
};