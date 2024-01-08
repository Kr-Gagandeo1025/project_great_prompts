'use client'

import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import Profile from "@components/Profile"

const MyProfile = ({params}) => {
    const [posts, setposts] = useState([]);
    const {data:session} = useSession();
    const router = useRouter();
    const searchparams = useSearchParams();
    const username = searchparams.get('name');
    useEffect(()=>{
        const fetchPrompts = async () => {
            console.log(username);
          const response = await fetch(`/api/users/${params.id}/posts`);
          const data = await response.json();
    
          setposts(data);
        }
        if(params?.id){
            fetchPrompts();
        }
    },[params.id])
    const handleEdit = async(post) => {
       router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async(post) => {
      const hasConfirmed = confirm("Are you sure you want to delete your prompt?");
      if(hasConfirmed){
        try{
          await fetch(`api/prompt/${post._id.toString()}`,{
            method:"DELETE"
          });
          const filteredPosts = posts.filter((p) => p._id !== post._id);

          setposts(filteredPosts);
        }catch(error){
          console.log(error);
        }
      }
    }
  return (
    <Profile
        name = {session?.user.id === params.id ? session?.user.name : username}
        desc = {session?.user.id === params.id ? "Welcome to your personalized profile page" : `Find all the prompts uploaded by ${username}...`}
        data = {posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />
  )
}

export default MyProfile;