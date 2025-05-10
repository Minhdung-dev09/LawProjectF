import { Link } from "react-router-dom";
import { newsCategories } from "../../data";

export default function NewsSidebar({ selectedCategory, onCategorySelect }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-primary-800 mb-3">Danh mục</h3>
      <ul className="space-y-1">
        {newsCategories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onCategorySelect(category.slug)}
              className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
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

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-primary-800 mb-3">
          Tin tức nổi bật
        </h3>
        <div className="space-y-2">
          <Link to="/news/1" className="block group">
            <div className="bg-primary-50 rounded-md p-2 hover:bg-primary-100 transition-colors">
              <h4 className="text-sm font-medium text-primary-800 group-hover:text-primary-600 line-clamp-2">
                Những thay đổi mới trong luật doanh nghiệp 2024
              </h4>
              <p className="text-xs text-primary-600 mt-1">20/02/2024</p>
            </div>
          </Link>
          <Link to="/news/4" className="block group">
            <div className="bg-primary-50 rounded-md p-2 hover:bg-primary-100 transition-colors">
              <h4 className="text-sm font-medium text-primary-800 group-hover:text-primary-600 line-clamp-2">
                Các tội phạm về ma túy và hình phạt
              </h4>
              <p className="text-xs text-primary-600 mt-1">17/02/2024</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
