// blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Async thunks for blog operations
export const fetchBlogPosts = createAsyncThunk(
  'blogs/fetchBlogPosts',
  async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/blog`);
      if (!response.ok) {
        throw new Error(`Failed to fetch blog posts: ${response.status}`);
      }
      const data = await response.json();
     
      return data;
    } catch (error) {
      toast.error(`Error loading blog posts: ${error.message}`);
      throw error;
    }
  }
);

export const fetchBlogPostById = createAsyncThunk(
  'blogs/fetchBlogPostById',
  async (id) => {
    try {
      const response = await fetch(`${process.env.API}/admin/blog/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch blog post: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error(`Error loading blog post: ${error.message}`);
      throw error;
    }
  }
);

export const createBlogPost = createAsyncThunk(
  'blogs/createBlogPost',
  async (blogData) => {
    try {
      const response = await fetch(`${process.env.API}/admin/blog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });
      if (!response.ok) {
        throw new Error(`Failed to create blog post: ${response.status}`);
      }
      const data = await response.json();
      toast.success('Blog post created successfully!');
      return data;
    } catch (error) {
      toast.error(`Error creating blog post: ${error.message}`);
      throw error;
    }
  }
);

export const updateBlogPost = createAsyncThunk(
  'blogs/updateBlogPost',
  async ({ id, ...blogData }) => {
    try {
      const response = await fetch(`${process.env.API}/admin/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update blog post: ${response.status}`);
      }
      const data = await response.json();
      toast.success('Blog post updated successfully!');
      return data;
    } catch (error) {
      toast.error(`Error updating blog post: ${error.message}`);
      throw error;
    }
  }
);

export const deleteBlogPost = createAsyncThunk(
  'blogs/deleteBlogPost',
  async (id) => {
    try {
      const response = await fetch(`${process.env.API}/admin/blog/${id}`, { 
        method: 'DELETE' 
      });
      if (!response.ok) {
        throw new Error(`Failed to delete blog post: ${response.status}`);
      }
      toast.success('Blog post deleted successfully!');
      return id;
    } catch (error) {
      toast.error(`Error deleting blog post: ${error.message}`);
      throw error;
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    list: [],
    currentPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all blog posts
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch single blog post
      .addCase(fetchBlogPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchBlogPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create blog post
      .addCase(createBlogPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload); // Add new post at beginning
      })
      .addCase(createBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update blog post
      .addCase(updateBlogPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        if (state.currentPost?._id === action.payload._id) {
          state.currentPost = action.payload;
        }
      })
      .addCase(updateBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete blog post
      .addCase(deleteBlogPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(post => post._id !== action.payload);
        if (state.currentPost?._id === action.payload) {
          state.currentPost = null;
        }
      })
      .addCase(deleteBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentPost } = blogSlice.actions;
export default blogSlice.reducer;