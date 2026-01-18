import axios from "axios";
import Card from "./Card";
import type { Content } from "../../utility";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../config";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const SpecifiedContent = () => {
  const [data, setData] = useState([]);
  const contentType = useParams();

  useEffect(() => {
    const ContentRequest = async () => {
      const url = `${BACKEND_URL}/api/v1/content/${contentType.type}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("jwt_token"),
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
    };
    ContentRequest();
  }, []);

  return (
    <div className="m-5 ">
      <ul className="flex flex-wrap gap-10">
        {data?.map((each: Content) => (
          <Card
            key={each._id}
            link={each.link}
            title={each.title}
            type={each.type}
          />
        ))}
      </ul>
    </div>
  );
};

export default SpecifiedContent;
