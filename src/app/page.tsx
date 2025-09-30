"use client";

import React, { useState, useMemo, useCallback } from "react";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import { Comment, User, CommentWithUser } from "./types";
import COMMENTS from "./mock/comments.json";
import USERS from "./mock/user.json";

type SortOrder = "newest" | "oldest";

export default function CommentSystem() {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [localComments, setLocalComments] = useState<Comment[]>(COMMENTS);

  // Memoized sorted comments for performance
  const sortedComments = useMemo(() => {
    const commentsWithUsers: CommentWithUser[] = localComments.map(
      (comment) => {
        const user = USERS.find((u) => u.email === comment.email);
        return { ...comment, user };
      }
    );

    return sortOrder === "newest"
      ? [...commentsWithUsers].reverse()
      : commentsWithUsers;
  }, [localComments, sortOrder]);

  // Handle form submission (function optimiztion using useCallback)
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!selectedUser || !commentText.trim()) {
        alert("Please select a user and enter a comment");
        return;
      }

      const user = USERS.find((u) => u.id === parseInt(selectedUser));
      if (!user) return;

      const newComment: Comment = {
        id: localComments.length + 1,
        postId: 1,
        name: user.name,
        email: user.email,
        body: commentText.trim(),
      };

      setLocalComments((prev) => [...prev, newComment]);
      setCommentText("");
      setSelectedUser("");
    },
    [selectedUser, commentText, localComments.length]
  );

  return (
    <div className="min-h-screen bg-gray-50 py-7 sm:py-9 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[53rem] mx-auto">
        {/* Header */}
        <div className="text-center mb-7 sm:mb-11">
          <h1 className="text-[24px] sm:text-[30px] md:text-[34px] lg:text-[36px] font-bold text-gray-900 mb-0 sm:mb-1 tracking-normal">
            Comment System
          </h1>
          <p className="text-[12px] sm:text-[19px] tracking-wide text-gray-500">
            Share your thoughts and engage with the community. Join the
            conversation below!
          </p>
        </div>

        {/* Comment Form */}
        <CommentForm
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          commentText={commentText}
          setCommentText={setCommentText}
          handleSubmit={handleSubmit}
          users={USERS as User[]}
        />

        {/* Comments Section */}
        <CommentList
          comments={sortedComments}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
    </div>
  );
}
