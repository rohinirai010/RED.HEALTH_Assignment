import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import CommentCard from './CommentCard';
import { CommentWithUser } from '../types';

type SortOrder = 'newest' | 'oldest';

interface CommentListProps {
  comments: CommentWithUser[];
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, sortOrder, setSortOrder }) => {
  return (
    <div className=" ">
      {/* Header with Sort */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 border-b border-gray-200">
        <h2 className="text-[15px] sm:text-[20px] tracking-wide font-bold text-gray-900">
          Comments ({comments.length})
        </h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => setSortOrder('newest')}
            className={`inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11.5px] sm:text-[13px] rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
              sortOrder === 'newest'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            Newest
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11.5px] sm:text-[13px] rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
              sortOrder === 'oldest'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            Oldest
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-6 sm:py-12 text-gray-500">
            <p className="text-[15px] sm:text-lg">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map(comment => (
            <CommentCard 
              key={comment.id} 
              comment={comment} 
              user={comment.user}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;