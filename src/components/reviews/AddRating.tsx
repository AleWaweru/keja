import React, { useState } from 'react';
import axios from 'axios';

type AddRatingProps = {
  postId: string;
  onRatingAdded: (rating: Review) => void;
};

type Review = {
  id: string;
  username: string;
  rating: number;
  comment: string;
  postId: string;
};

const AddRating = ({ postId, onRatingAdded }: AddRatingProps) => {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/reviews', {
        username,
        rating,
        comment,
        postId,
      });

      onRatingAdded(response.data); // form clearing
      setUsername('');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Your name"
        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        required
      />
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        required
      >
        <option value={0} disabled>
          Select a rating
        </option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} Star{num > 1 ? 's' : ''}
          </option>
        ))}
      </select>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your review"
        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        rows={4}
        required
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
        Submit Review
      </button>
    </form>
  );
};

export default AddRating;
