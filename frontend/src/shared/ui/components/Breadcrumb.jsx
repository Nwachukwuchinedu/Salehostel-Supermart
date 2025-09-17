import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = ({
  items = [],
  separator = <ChevronRight className="w-4 h-4" />,
  showHome = true,
  className = "",
  ...props
}) => {
  const allItems = showHome
    ? [{ label: "Home", href: "/", icon: Home }, ...items]
    : items;

  return (
    <nav
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="flex items-center space-x-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="text-gray-400 mx-2">{separator}</span>
              )}

              {isLast ? (
                <span className="flex items-center gap-1 text-gray-900 font-medium">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
