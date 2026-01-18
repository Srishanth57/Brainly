import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../../config";
import Button from "./Button";
import { Dialog } from "./Dialog";
import Cookies from 'js-cookie'

import { useState } from "react";
import {  toast, ToastContainer } from "react-toastify";

const TopBar = () => {
  const [share, setShare] = useState<boolean>(true);
  const toggleShareableLink = async () => {
    const options = {
      headers: {
        token: Cookies.get("jwt_token"),
      },
    };
    const url = `${BACKEND_URL}/api/v1/brain/share`;
    const content = {
      share: share,
    };

    const response = await axios.post(url, content, options);
    if (response.statusText == "OK") {
      const data = await response.data;
      console.log(data.message);
      navigator.clipboard.writeText(`${FRONTEND_URL}/user/${data.hash}`);
      if (share) {
        console.log("toast")
        toast("Shareable link copied to clipboard");
      } else {
        toast("Shareable removed ");
      }
    } else {
      console.log("Error caused while creating a shareable link in frontend ");
    }
    setShare(!share);
  };
  return (
    <div className="mx-5 my-5 flex justify-end gap-3 max-w-screen border-b px-3 py-5">
      <ToastContainer/>
      <Button onClick={toggleShareableLink} variant="primary" text="Share" />
      <Dialog />
     
    </div>
  );
};

export default TopBar;
