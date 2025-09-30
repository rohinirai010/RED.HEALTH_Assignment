import React from "react";
import { Comment, User } from "../types";

// Utility function to get initials
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

interface CommentCardProps {
  comment: Comment;
  user?: User;
}

// Comment Card Component (this component is memoized for performance optimization)
const CommentCard = React.memo<CommentCardProps>(({ comment, user }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 px-3 sm:px-5 py-3.5 sm:py-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2 sm:gap-4 flex-1">
          {/* Avatar */}
          <div className="w-7.5 sm:w-10 h-7.5 sm:h-10 text-[12px] sm:text-[15px] rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold flex-shrink-0">
            {getInitials(comment.name)}
          </div>

          {/* Comment Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-[12.5px] sm:text-[17px]">
              {comment.name}
            </h3>
            <p className="text-[10px] sm:text-[13.5px] text-gray-500 mb-2">{comment.email}</p>
            <p className="text-gray-700  text-[11.5px] sm:text-[14.5px] sm:tracking-wide">
              {comment.body}
            </p>
          </div>
        </div>

        {/* Company Name */}
        <div className="hidden sm:block text-[11px] sm:text-sm text-gray-500 ml-4 flex-shrink-0">
          {user?.company?.name || "Unknown Company"}
        </div>
      </div>
    </div>
  );
});

CommentCard.displayName = "CommentCard";

export default CommentCard;
