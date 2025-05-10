import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQItem({ question, answer, category }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-primary-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 text-left focus:outline-none"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded-full mb-2">
              {category}
            </span>
            <h3 className="text-lg font-semibold text-primary-800">
              {question}
            </h3>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="text-primary-600"
          >
            ▼
          </motion.span>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-primary-600">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
