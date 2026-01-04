import { useToast } from "d9-toast";
import React, { useCallback, useEffect, useRef, useState } from "react";

const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const fileInputRef = useRef(null);
  const { sounds, showToast } = useToast();

  const removeFile = () => {
    setFileName("No selected file");
    setFile(null);
    setFileURL(null);
    // Clear the file input value so the same file can be selected again.
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = useCallback(
    (e) => {
      e.preventDefault();

      const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2Mb in bytes
      const allowedTypes = ["image/png", "image/webp", "image/jpeg"];
      const selectedFile = e.target.files[0];
      const invalidFile = !allowedTypes.includes(selectedFile.type);

      if (!selectedFile) return; // If no file selected.

      if (selectedFile.size > MAX_FILE_SIZE) {
        showToast({
          message: "Maximum file size below 2MB",
          type: "error",
          title: false,
          position: "top-right",
          duration: 3000,
          className: "dark:!bg-gray-800 dark:!text-white dark:!border-gray-800",
          audio: {
            audioFile: sounds.warning,
          },
        });
        // Clear invalid file from input..
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      if (invalidFile) {
        showToast({
          message: "Invalid file type.",
          type: "error",
          title: false,
          position: "top-right",
          duration: 3000,
          className: "dark:!bg-gray-800 dark:!text-white dark:!border-gray-800",
          audio: {
            audioFile: sounds.error,
          },
        });
        // Clear invalid file from input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);

      // Set image preview.
      const objURL = URL.createObjectURL(selectedFile);
      setFileURL(objURL);
    },
    [showToast, sounds.error, sounds.warning]
  );

  // Revoke image blob url.
  useEffect(() => {
    return () => {
      if (fileURL) {
        URL.revokeObjectURL(fileURL);
      }
    };
  }, [fileURL]);

  return {
    handleFileChange,
    removeFile,
    file,
    fileURL,
    fileName,
    fileInputRef,
  };
};

export default useFileUpload;
