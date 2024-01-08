'use client'
import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({data, handleTagClick}) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
        <PromptCard
          key = {post.id}
          post={post}
          handleTagClick = {handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [searchTimeout, setsearchTimeout] = useState(null);
  const [posts, setposts] = useState([]);

  const promptFilter = (text) =>{
    const regex = new RegExp(text,"i");
    return posts.filter(
      (item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt)

    );
  }

  const handleSearchChange = (e) =>{
    clearTimeout(searchTimeout);
    e.preventDefault();
    setsearchText(e.target.value);
    setsearchTimeout(
      setTimeout(()=>{
        const result = promptFilter(e.target.value);
        setsearchResult(result);
      },500)
    )
  }

  const handletagclick = (tagtext) => {
    // promptFilter(tagtext);
    setsearchText(tagtext);
    const result = promptFilter(tagtext);
    setsearchResult(result);
  }

  useEffect(()=>{
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setposts(data);
    }
    fetchPrompts();
  },[])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {searchText ? <PromptCardList
        data={searchResult}
        handleTagClick={()=>{}}
      /> : <PromptCardList
      data={posts}
      handleTagClick={handletagclick}
    />}


    </section>
  )
}

export default Feed