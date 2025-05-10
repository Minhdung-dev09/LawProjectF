import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import FAQItem from "../components/faq/FAQItem";
import { faqs } from "../data/faq";

const categories = ["Tất cả", ...new Set(faqs.map((faq) => faq.category))];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredFaqs =
    selectedCategory === "Tất cả"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Helmet>
        <title>Câu hỏi thường gặp - Công ty Luật ABC</title>
        <meta
          name="description"
          content="Danh sách các câu hỏi pháp lý thường gặp và câu trả lời từ đội ngũ luật sư chuyên nghiệp của Công ty Luật ABC."
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-primary-800 mb-4">
          Câu hỏi thường gặp
        </h1>
        <p className="text-primary-600">
          Tìm hiểu thêm về các vấn đề pháp lý phổ biến và câu trả lời từ đội ngũ
          luật sư của chúng tôi
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-primary-600 text-white"
                : "bg-primary-100 text-primary-700 hover:bg-primary-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {filteredFaqs.map((faq) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            category={faq.category}
          />
        ))}
      </div>
    </div>
  );
}
