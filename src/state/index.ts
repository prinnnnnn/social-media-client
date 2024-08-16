import { createSlice } from '@reduxjs/toolkit'
import { Post, User } from '../common/types';

export interface State {
    mode: "light" | "dark",
    user: User | null,
    token: string | null,
    posts: Post[],
}

const initialState: State = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("User' freinds non-existent :(");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id)
                    return action.payload.post
            })
            state.posts = updatedPosts;
        }    
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export const authReducers = authSlice.reducer;