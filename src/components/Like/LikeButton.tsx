import React, { useState } from 'react';
import axios from 'axios';

type Props = {
  postId: string;
  userId: string; // Add userId prop
  isLiked: boolean;
  onLike: (postId: string) => void;
  onUnlike: (postId: string) => void;
};

const LikeButton = ({ postId, userId, isLiked, onLike, onUnlike }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLikeClick = async () => {
    setLoading(true);
    try {
      if (!isLiked) {
        await axios.post('/api/likes', { postId, userId });
        onLike(postId);
      } else {
        await axios.delete('/api/likes', { data: { postId, userId } });
        onUnlike(postId);
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`flex items-center px-2 py-1 rounded-md ${isLiked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
      onClick={handleLikeClick}
      disabled={loading}
    >
      {loading ? 'Loading...' : (isLiked ? 'Liked' : 'Like')}
    </button>
  );
};

export default LikeButton;
