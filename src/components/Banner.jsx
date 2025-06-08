import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image:
      "https://cdn.thuvienphapluat.vn/uploads/tintuc/2022/09/17/phap-luat-la-gi.jpg",
    title: "Tư vấn pháp luật chuyên nghiệp",
    description: "Đội ngũ luật sư giàu kinh nghiệm, tận tâm với khách hàng",
  },
  {
    id: 2,
    image:
      "https://nplaw.vn/upload/images/tu-van-luat-..-min.png",
    title: "Giải pháp pháp lý toàn diện",
    description: "Hỗ trợ khách hàng trong mọi vấn đề pháp lý",
  },
  {
    id: 3,
    image:
      "https://img.lsvn.vn/resize/th/upload/2024/11/24/tessstresult-22100909.jpg",
    title: "Dịch vụ pháp lý uy tín",
    description: "Cam kết bảo vệ quyền lợi khách hàng tốt nhất",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-800 bg-opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <motion.h1
                key={slides[currentSlide].title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0 }}
                className="text-4xl md:text-5xl font-bold mb-4 font-serif text-white"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                key={slides[currentSlide].description}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl md:text-2xl text-white"
              >
                {slides[currentSlide].description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
