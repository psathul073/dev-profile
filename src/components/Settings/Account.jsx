import { useNavigate } from "react-router";
import { LogoutUser } from "../../api/Auth";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "d9-toast";
import { useCallback, useState } from "react";
import { profileDelete } from "../../api/Profile";
import useConfirmModel from "../../hooks/useConfirmModel";

const Account = () => {
  const [disabled, setDisabled] = useState(false);
  const { confirmModel } = useConfirmModel();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleLogout = useCallback(async () => {
    try {
      setDisabled(true);
      await LogoutUser();
      localStorage.removeItem(`projects-${user?.name}`);
      localStorage.removeItem(`cursor-${user?.name}`);
      localStorage.removeItem(`user-${user?.name}`);
      setTimeout(() => {
        showToast({
          message: "logout successfully.",
          duration: 2000,
        });
        navigate("/landing");
      }, 2000);
    } catch (error) {
      showToast({
        message: error?.message || "Logout error.",
        type: "error",
        duration: 3000,
      });
    } finally {
      setDisabled(false);
    }
  }, [navigate, showToast, user?.name]);

  const handleAccountDelete = useCallback(async () => {
    try {
      setDisabled(true);
      await profileDelete();
      localStorage.clear();
      setTimeout(() => {
        showToast({
          message: "Account delete successfully.",
          duration: 2000,
        });
        navigate("/landing");
      }, 2000);
    } catch (error) {
      showToast({
        message: error?.message || "Account delete error.",
        type: "error",
        duration: 3000,
      });
    } finally {
      setDisabled(false);
    }
  }, [navigate, showToast]);

  return (
    <div className="p-2">
      <div className=" flex justify-between items-center py-4 text-sm border-b border-gray-300 dark:border-gray-700">
        <p>Name</p>
        <span className="">{user?.name || "Unknown"}</span>
      </div>
      <div className=" flex justify-between items-center py-4 text-sm border-b border-gray-300 dark:border-gray-700">
        <p>Email address</p>
        <span className="">{user?.email || "ab*****01@gmail.com"}</span>
      </div>
      <div className=" flex justify-between items-center py-4 text-sm border-b border-gray-300 dark:border-gray-700">
        <p>Log out of all devices</p>
        <button
          disabled={disabled}
          onClick={handleLogout}
          className=" px-3.5 pt-1.5 pb-2 rounded-full text-red-400 border border-red-600 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-700/40 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          Log out
        </button>
      </div>
      <div className=" flex justify-between items-center py-4 text-sm">
        <p>Delete account</p>
        <button
          disabled={disabled}
          onClick={() =>
            confirmModel("Account", "MY ACCOUNT", handleAccountDelete)
          }
          className=" px-3.5 pt-1.5 pb-2 rounded-full text-red-400 border border-red-600 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-700/40 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Account;
