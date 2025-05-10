import { Link } from "react-router-dom";
import { newsCategories } from "../../data";

export default function NewsSidebar({ selectedCategory, onCategorySelect }) {
  return (
    <div className="w-64 bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-primary-800 mb-4">Danh mục</h3>
      <ul className="space-y-2">
        {newsCategories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onCategorySelect(category.slug)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.slug
                  ? "bg-primary-600 text-white"
                  : "text-primary-600 hover:bg-primary-50"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-primary-800 mb-4">
          Tin tức nổi bật
        </h3>
        <div className="space-y-4">
          <Link to="/news/1" className="block group">
            <div className="bg-primary-50 rounded-lg p-4 hover:bg-primary-100 transition-colors">
              <h4 className="font-medium text-primary-800 group-hover:text-primary-600">
                Những thay đổi mới trong luật doanh nghiệp 2024
              </h4>
              <p className="text-sm text-primary-600 mt-1">20/02/2024</p>
            </div>
          </Link>
          <Link to="/news/4" className="block group">
            <div className="bg-primary-50 rounded-lg p-4 hover:bg-primary-100 transition-colors">
              <h4 className="font-medium text-primary-800 group-hover:text-primary-600">
                Các tội phạm về ma túy và hình phạt
              </h4>
              <p className="text-sm text-primary-600 mt-1">17/02/2024</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
