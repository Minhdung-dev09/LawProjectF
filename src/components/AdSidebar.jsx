import { motion } from "framer-motion";
import LatestNews from "./home/LatestNews";
export default function AdSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-64 bg-white rounded-lg shadow-lg p-6 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto"
    >
      <h3 className="text-xl font-bold text-primary-800 mb-4">Quảng cáo</h3>

      {/* Google AdSense Placeholder */}
      <div className="bg-primary-50 rounded-lg p-4 mb-6">
        <div className="aspect-[4/5] bg-primary-100 rounded-lg flex items-center justify-center">
          <p className="text-primary-600 text-sm">Google AdSense</p>
        </div>
      </div>

      {/* Useful Links */}
      <LatestNews />
    </motion.div>
  );
}
