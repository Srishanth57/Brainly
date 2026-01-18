import { Book } from "../icons/Book";
import SidebarList from "./SidebarList";

interface ContentProps {
  title: string;
}

const content: ContentProps[] = [{ title: "X" }, { title: "Youtube" }];

export const SideBar = () => {
  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block w-72 border-r border-gray-200/60 bg-white h-screen sticky top-0">
        <div className="p-6">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
              <Book />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Second Brain
            </h1>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Content Types
            </p>
            <ul className="space-y-1">
              {content.map((each: ContentProps) => (
                <SidebarList key={each.title} title={each.title} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Top Navigation - Visible only on mobile */}
      <div className="lg:hidden bg-white border-b border-gray-200/60 sticky top-0 z-40">
        <div className="px-4 py-3">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                <Book />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Second Brain
              </h1>
            </div>
          </div>

          {/* Horizontal Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {content.map((each: ContentProps) => (
              <SidebarList key={each.title} title={each.title} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};
