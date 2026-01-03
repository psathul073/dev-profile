import { useToast } from "d9-toast";
import React, { useCallback, useState, useRef } from "react";
import Svg from "../components/Svg";

const useConfirmModel = () => {
  const { showToast, removeToast } = useToast();
  const toastIdRef = useRef(null);

  const ConfirmModalComponent = React.memo(
    ({ title, name, onConfirm, onCancel }) => {
      const [key, setKey] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const uniqueKey = `DELETE ${name?.toUpperCase()?.trim()}`;

      const handleConfirm = async () => {
        // Validation: key must match AND not be empty.
        if (!key || key !== uniqueKey) {
          // console.log("Validation failed - keys don't match");
          return;
        }

        setIsLoading(true);
        try {
          await onConfirm();
          if (toastIdRef.current) {
            removeToast(toastIdRef.current);
          }
        } catch (error) {
          console.error("Delete failed:", error);
          setIsLoading(false);
        }
      };

      return (
        <div className="p-2">
          <h3 className="font-semibold text-base">Delete {title}</h3>
          <p className="text-sm !my-2">
            Are you sure you want to delete "{name?.toUpperCase()}"? This action
            cannot be undone.
          </p>
          {/* Verification */}
          <p className="!my-2">
            To verify, please type
            <strong> DELETE {name?.toUpperCase()}</strong> below:
          </p>
          <input
            className="w-full p-2 rounded-lg outline-0 border border-gray-300 dark:border-gray-700"
            type="text"
            id="key"
            name="key"
            placeholder={`DELETE ${name?.toUpperCase()}`}
            value={key}
            onChange={(e) => setKey(e.target.value?.trim()?.toUpperCase())}
          />

          {/* Show validation error */}
          {key && key !== uniqueKey && (
            <p className="!text-red-500 !text-xs !mt-1.5">
              Text must match exactly : DELETE {name?.toUpperCase()}
            </p>
          )}

          {/* Actions */}
          <div className="my-2 pt-2 flex items-center justify-end gap-3.5">
            <button
              className="bg-gray-100 dark:bg-gray-500 font-semibold !px-2 !py-1.5 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className={`bg-red-600 !text-white font-semibold inline-flex justify-center items-center gap-1 !px-2 !py-1.5 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                key !== uniqueKey ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleConfirm}
              disabled={isLoading || key !== uniqueKey}
            >
              <Svg
                name={isLoading ? "loading" : "delete"}
                className="text-xs"
              />
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      );
    }
  );

  const confirmModel = useCallback(
    (title = "Project", name, deleteCallback) => {
      // Close any existing toast first
      if (toastIdRef.current) {
        removeToast(toastIdRef.current);
      }

      const handleCancel = () => {
        if (toastIdRef.current) {
          removeToast(toastIdRef.current);
          toastIdRef.current = null;
        }
      };

      const model = (
        <ConfirmModalComponent
          title={title}
          name={name}
          onConfirm={deleteCallback}
          onCancel={handleCancel}
        />
      );

      const id = showToast({
        message: model,
        position: "center",
        autoClose: false,
        title: false,
        className:
          "dark:!bg-gray-800 dark:!text-white !rounded-xl dark:!border-gray-800",
      });

      toastIdRef.current = id;
    },
    [showToast, removeToast]
  );

  return { confirmModel };
};

export default useConfirmModel;
