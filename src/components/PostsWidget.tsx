import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setPosts } from "../state/index";
import PostWidget from "./PostWidget";
import axios from "axios";
import { backendIpAddress } from "../services/url";

interface PostsWidgetProps {
    isProfile?: boolean,
}

const PostsWidget: FC<PostsWidgetProps> = ({ isProfile = false }) => {

    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.user?._id);
    const posts = useAppSelector(state => state.posts);    
    const token = useAppSelector(state => state.token); 

    const getPosts = async () => {

        try {

            const { data } = await axios.get(`${backendIpAddress}/posts/`, 
                { headers: { Authorization: `Bearer ${token}`}});
    
            dispatch(setPosts({ posts: data }));

        } catch (err) {
            console.error(err);
        }

    }

    const getUserPosts = async () => {

        const { data } = await axios.get(`${backendIpAddress}/posts/${userId}/posts`,
                                           { headers: { Authorization: `Bearer ${token}`}}
        );

        dispatch(setPosts({ posts: data }));
        
    }
    
    useEffect(() => {

        isProfile ? getUserPosts() : getPosts();

    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            {posts.map((post, i) => (
                <PostWidget
                    key={post._id}
                    index={i}
                    post={post}
                />
            ))}
        </>
    );
};

export default PostsWidget;
