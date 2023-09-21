import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './blog.css';

function Blog() {
  const [post, setPosts] = useState([]);
  const [blogData, setBlogData] = useState([]);
  // const [activeSection, setActiveSection] = useState('blog'); // Initialize to 'blog'
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  useEffect(() => {
    let userObj = JSON.parse(sessionStorage.getItem('userDetails'));
    console.log(userObj._id);

    axios
      .get(`https://blog-application-lnfd.onrender.com/api/posts?userId=${userObj._id}`)
      .then((response) => {
        setPosts(response.data);
        setBlogData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleLikeClick = (postId) => {
    console.log(postId);
    axios
      .post(`https://blog-application-lnfd.onrender.com/api/posts/${postId}/like`)
      .then((response) => {
        console.log('Like updated successfully', response);

        const updatedLikesCount = response.data.likes;

        const updatedBlogData = blogData.map((post) => {
          if (post._id === postId) {
            post.likes = updatedLikesCount;
          }
          return post;
        });

        setBlogData(updatedBlogData);
      })
      .catch((error) => {
        console.error('Error updating like:', error);
      });
  };
  const handleAddComment = (postId, newCommentText) => {
    // Make an API request to add the comment
    axios
      .post(`https://blog-application-lnfd.onrender.com/api/posts/${postId}/comments`, {
        text: newCommentText,
      })
      .then((response) => {
        console.log('Comment added successfully', response);
  
        // Update the local state with the new comment
        const updatedBlogData = blogData.map((post) => {
          if (post._id === postId) {
            post.comments.push(response.data); // Assuming the API returns the new comment
          }
          return post;
        });
  
        setBlogData(updatedBlogData);
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };
  

  return (
    <div className="blog-content">
      <h2 className="heading_blog">Blog Post</h2>
      {blogData.map((post, index) => (
        <div key={index} className="blog-post">
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <button
            className="like-button"
            onClick={() => handleLikeClick(post._id)}
          >
            <FontAwesomeIcon
              icon={faHeart}
              color={post.likes > 0 ? 'red' : 'gray'}
            />{' '}
            {post.likes}
          </button>
          {/* Display comments for this post */}
           <div className="comments">
           {post.comments.map((comment, commentIndex) => (
           <div key={commentIndex} className="comment">
           <p>{comment.text}</p>
        </div>
      ))}
    </div>
    <div className="comment-input">
      <input
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={handleCommentChange}
      />
      <button onClick={() => handleAddComment(post._id)}>Add Comment</button>
    </div>
        </div>
      ))}
    </div>
  );
}

export default Blog;