// SharedDashboard.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { SideBar } from "./SideBar";
import Card from "./Card";
import type { Content } from "../../utility";

const SharedDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hash = useParams();

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const url = `${BACKEND_URL}/api/v1/brain/${hash.userId}`;
        console.log(url);
        const response = await axios.get(url);
        setData(response.data.Contents);
      } catch (error) {
        console.log(error);
        setError("Failed to load shared content");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [hash.userId]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 lg:overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200/60 sticky top-0 z-30 lg:static">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Shared Dashboard
                </h1>
                {data[0]?.userId?.username && (
                  <p className="text-sm text-gray-600 mt-0.5">
                    by{" "}
                    <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {data[0].userId.username}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {loading ? (
            // Loading State
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-48 bg-gray-200 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error State
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : data.length === 0 ? (
            // Empty State
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No content shared yet
              </h3>
              <p className="text-gray-600">
                This user hasn't shared any content
              </p>
            </div>
          ) : (
            // Content Grid
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Shared Content
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {data.length} {data.length === 1 ? "item" : "items"} shared
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full border border-purple-200">
                    <span className="text-sm font-medium text-purple-700">
                      Read Only
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.map((each: Content) => (
                  <Card
                    key={each._id}
                    link={each.link}
                    title={each.title}
                    type={each.type}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedDashboard