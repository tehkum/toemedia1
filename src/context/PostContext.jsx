import { createContext, useEffect, useReducer, useState } from "react";
import { ProductReducer } from "../reducers";
import axios from "axios";
import { toast } from "react-toastify";

export const usePost = createContext();

export function PostProvider({children}){
    const [ postData, setPost ] = useState([]); 
    const [ userPost, setUserPost ] = useState({content:""});
    const [ thisPost, setThisPost ] = useState({});
    const [ loaders, setLoaders ] = useState(false)
    const [postCheck, setCheck] = useState(false)

    const [ productState, productDispatch ] = useReducer(ProductReducer, {
    productData: [],
})

    const fetchData = async () => {
        try {
            setLoaders(true);
            const res = await axios.get("/api/posts");
            setLoaders(false);
            setPost([...res.data.posts].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              ))
        } catch (error) {
            console.log(error);
        }
    }

    const getPost = async (postId) => {
        try {
            const res = await axios.get(`/api/posts/${postId}`);
            setThisPost(res.data.post);
        } catch (error) {
            console.log(error)
        } 
    }

    const newPost = async (userPost) => {
        try {
            const res = await axios.post("/api/posts",{postData: {...userPost}},{
                headers: {
                  authorization: localStorage.getItem("encodedToken"),
                },
              })
              if(res.status===200 || res.status === 201){
                setUserPost({content:""})
                setCheck(!postCheck)
              }
              console.log(res)
            toast.success("New post added")

            
        } catch (error) {
            console.log(error)
        } 
    }

    const deletePost = async (postId) => {
        try {
            const res = await axios.delete(`/api/posts/${postId}`,{
                headers: {
                  authorization: localStorage.getItem("encodedToken"),
                },
              })
              console.log(res)
              setCheck(!postCheck)
            toast.success("Post Deleted Successfully")

        } catch (error) {
            console.log(error)
        }
    }

    const editPost = async (postId, postData) => {
        try {
            const res = await axios.post(`/api/posts/edit/${postId}`, {postData} ,{
                headers: {
                  authorization: localStorage.getItem("encodedToken"),
                },
              })
              console.log(res)
              setCheck(!postCheck)
              toast.success("Edited Successfully")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchData();
    },[postCheck])

    return <usePost.Provider value={{ productState, loaders, productDispatch, postData, newPost, setUserPost, userPost, deletePost, editPost, getPost, thisPost }}>{children}</usePost.Provider>;
}
