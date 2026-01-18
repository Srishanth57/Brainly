import axios from "axios";
import Card from "./Card";
import Cookies from 'js-cookie'
import type { Content } from "../../utility";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../config";

const Content = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ContentRequest = async () => {
      try {
        const url = `${BACKEND_URL}/api/v1/content`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            token: Cookies.get('jwt_token')
          },
        };
        const response = await axios.get(url, options);
        if (response.statusText == "OK") {
          const res = await response.data;
          setData(res.userContent);
          console.log(res);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };
    ContentRequest();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-48 bg-gray-200 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Content</h2>
        <p className="text-gray-600">Manage and organize your saved items</p>
      </div>
      
      {data.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No content yet</h3>
          <p className="text-gray-600">Start adding content to see it here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((each: Content) => (
            <Card key={each._id} link={each.link} title={each.title} type={each.type} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;