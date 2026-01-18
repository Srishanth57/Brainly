import { useState, useEffect, type InputEventHandler } from "react";
import Button from "./Button";
import { ContentTypes } from "../../utility";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import Cookies from 'js-cookie'

export const Dialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [selectedContentType, setSelectedContentType] = useState<string>("");
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleLinkOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const addContentType = (each: string) => {
    setSelectedContentType(each);
  };

  const handleAddContent = async (e: React.ChangeEvent<HTMLButtonElement>) => {
  
    if (!link || !title || !selectedContentType) {
      alert("Fill all the details");
      return;
    }


    const options = {
      headers: {
        token: Cookies.get("jwt_token"),
        "Content-Type": "application/json",
      },
    };
    const contentValue = {
      link,
      title,
      type : selectedContentType,
    };
    const url = `${BACKEND_URL}/api/v1/content`;

    const response = await axios.post(url, contentValue, options);
    if (response.statusText == "OK") {
      closeModal();
      console.log("Added content successful");
      return;
    }
    alert("issue adding content ");
  };
  return (
    <div>
      {/* Button trigger modal */}
      <Button onClick={openModal} variant="secondary" text="Add Content" />

      {/* Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
            onClick={closeModal}
          />

          {/* Modal Container */}
          <div
            className="fixed inset-0 z-50 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-center min-h-screen p-4 ">
              <div
                className="bg-white rounded-lg shadow-xl max-w-lg w-full transform transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Body */}
                <div className="p-4 gap-5 flex flex-col justify-center items-center">
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleOnChange}
                    className="px-5 py-3 rounded-xl border border-blue-400 w-80"
                  />
                  <input
                    type="text"
                    placeholder="link"
                    value={link}
                    onChange={handleLinkOnChange}
                    className="px-5 py-3 rounded-xl border border-blue-400 w-80"
                  />
                  <ul className="flex flex-wrap gap-3">
                    {ContentTypes.map((each) => (
                      <li key={each}>
                        <Button
                          text={each}
                          variant={
                            selectedContentType === each
                              ? "primary"
                              : "secondary"
                          }
                          onClick={() => addContentType(each)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200">
                  <Button
                    onClick={closeModal}
                    variant="secondary"
                    text="Close"
                  />
                  <Button
                    variant="primary"
                    text="Add"
                    onClick={handleAddContent}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
