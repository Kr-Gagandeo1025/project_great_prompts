import React from 'react'
import Feed from '@components/Feed'
const Home = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center">
        <h1 className='head_text text-center'>
            Discover and Share
            <br/>
            <span className='orange_gradient text-center'>AI Powered Prompts</span>
        </h1>
        <p className='desc text-center'>
           Great Prompts is an open-source AI prompting tool for modern world to discover, create and share creative prompts  
        </p>

        {/* FEED */}
        <Feed/>
    </section>
  )
}

export default Home