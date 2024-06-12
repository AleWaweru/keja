"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePost from '../Post/CreatePost';
import AddRating from '../reviews/AddRating';
import Modal from '../Modal/Modal';
import { useRouter } from 'next/navigation';

type User = {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} | undefined;

type Post = {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
};

type Review = {
  id: string;
  username: string;
  rating: number;
  comment: string;
  postId: string;
};

type Props = {
  user: User;
  pagetype: string;
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
};

const UserCard = ({ user, pagetype }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const getReviewsByPostId = async (postId: string) => {
    try {
      const response = await axios.get(`/api/reviews?postId=${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  };

  const getPosts = async () => {
    try {
      const postsResponse = await axios.get('/api/post');
      const posts = postsResponse.data;
  
      const postsWithReviews = await Promise.all(
        posts.map(async (post: Post) => {
          const reviews = await getReviewsByPostId(post.id);
          return {
            ...post,
            reviews,
          };
        })
      );
  
      setPosts(postsWithReviews);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleRatingAdded = async (postId: string, newRating: Review) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, reviews: [...post.reviews, newRating] } : post));
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for 500ms before redirecting
    router.push('/');
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="flex flex-col items-center">
      {pagetype === "dashboard" && (
        <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
          <CreatePost onPostCreated={handlePostCreated} />
        </div>
      )}

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title or location"
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-white p-4 shadow-md w-[400px] rounded-md cursor-pointer" onClick={() => handlePostClick(post)}>
              <img
                src={post.image}
                alt={post.title}
                className="h-[250px] w-full object-cover mb-2 rounded-md"
              />
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-2">{post.location}</p>
              <p className="text-gray-800">{post.description}</p>
              <div className="mt-4">
                {post.reviews.length > 0 ? (
                  post.reviews.map((review, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-sm font-semibold">{review.username}</p>
                      <StarRating rating={review.rating} />
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No reviews yet</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No posts found</p>
        )}
      </div>

      {selectedPost && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-50 object-cover mb-4 rounded-md"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>
            <p className="text-gray-600 mb-2">{selectedPost.location}</p>
            <p className="text-gray-800 mb-4">{selectedPost.description}</p>
            <div className="mt-4">
              {selectedPost.reviews.length > 0 ? (
                selectedPost.reviews.map((review, index) => (
                  <>
                  <div key={index} className="mb-2">
                    <p className="text-sm font-semibold">{review.username}</p>
                    <StarRating rating={review.rating} />
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                  </>
                ))
              ) : (
                <p className="text-gray-600">No reviews yet</p>
              )}
            </div>
            <AddRating postId={selectedPost.id} onRatingAdded={(newRating) => handleRatingAdded(selectedPost.id, newRating)} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserCard;
