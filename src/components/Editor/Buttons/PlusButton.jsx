import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import React, { forwardRef } from "react";
import styles from './plusButton.module.css'; //using modules to prevent them from applying globally 


const PlusButton = forwardRef(function PlusButton({ showFloatingMenu, setShowFloatingMenu }, ref) {
  return (
     <button
      ref={ref}
      className={`${styles.plusButton} ${showFloatingMenu ? styles.plusButtonActive : styles.plusButtonInactive}`}
      onClick={() => {
        setShowFloatingMenu(!showFloatingMenu);
      }}
    >
      <motion.div
        animate={{ rotate: showFloatingMenu ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <PlusCircle className="size-8 text-black text-opacity-[0.68]" strokeWidth={1} />
      </motion.div>
    </button>
  );
});

export default PlusButton;