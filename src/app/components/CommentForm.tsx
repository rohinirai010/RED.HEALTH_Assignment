import React, { useState } from "react";
import { Send } from "lucide-react";
import { User } from "../types";

interface CommentFormProps {
  selectedUser: string;
  setSelectedUser: (value: string) => void;
  commentText: string;
  setCommentText: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  users: User[];
}

const CommentForm: React.FC<CommentFormProps> = ({
  selectedUser,
  setSelectedUser,
  commentText,
  setCommentText,
  handleSubmit,
  users,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 sm:px-6 py-4.5 sm:py-6 mb-9 sm:mb-10">
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-blue-500 flex items-center justify-center">
          <Send className="w-3.5 h-3.5 text-white" />
        </div>
        <h2 className="text-[15px] sm:text-[18px] font-semibold text-gray-800">
          Add a Comment
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* User Selection */}
        <div className="mb-4 sm:mb-5 relative">
          <label className="block text-[12px] sm:text-[13.5px] font-semibold text-gray-700 tracking-wide mb-0.5 sm:mb-1">
            Select User
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-3 py-1.5 sm:py-2 text-left text-[12px] sm:text-[13.5px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900 font-normal cursor-pointer flex items-center justify-between"
            >
              <span>
                {selectedUser
                  ? users.find((u) => String(u.id) === selectedUser)?.name
                  : "Choose a user to comment as..."}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto p-1">
                {users.map((user) => (
                  <div
                    key={String(user.id)}
                    onClick={() => {
                      setSelectedUser(String(user.id));
                      setIsDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1.5 rounded-xl cursor-pointer transition-colors ${
                      selectedUser === String(user.id)
                        ? "bg-gray-800 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <div className="w-5.5 h-5.5 p-0.5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[9.5px] sm:text-[11px] font-semibold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex flex-row gap-1 sm:gap-1.5 items-center">
                      <div className="font-semibold text-[11px] sm:text-[13.5px] truncate ">
                        {user.name}
                      </div>
                      <div
                        className={`text-[11px] sm:text-[13.5px] font-medium tracking-wide truncate ${
                          selectedUser === String(user.id)
                            ? "text-gray-300"
                            : "text-gray-700"
                        }`}
                      >
                        ({user.company.name})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comment Text */}
        <div className="mb-3">
          <label className="block text-[12px] sm:text-[13.5px] font-semibold text-gray-700 tracking-wide mb-0.5 sm:mb-1">
            Your Comment
          </label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment here..."
            rows={4}
            className="w-full px-3 py-1.5 sm:py-2 text-[12px] sm:text-[13.5px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedUser.trim()}
          className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-[12px] sm:text-[13.5px] text-white rounded-xl font-semibold transition-colors duration-200 shadow-sm ${
            !selectedUser.trim()
              ? "bg-blue-200  cursor-not-allowed"
              : "bg-blue-500  hover:bg-blue-600 cursor-pointer"
          }`}
        >
          <Send className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;