'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import Profile from "@components/Profile"

const MyProfile = () => {
    const [posts, setposts] = useState([]);
    const {data:session} = useSession();
    const router = useRouter();
    useEffect(()=>{
        const fetchPrompts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setposts(data);
        }
        if(session?.user.id){
            fetchPrompts();
        }
    },[])
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
        name = {session?.user.name}
        desc = "Welcome to your personalized profile page"
        data = {posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />
  )
}

export default MyProfile;