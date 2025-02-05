import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Spinner } from 'flowbite-react'
import { Button } from 'flowbite-react'
import '../index.css'
import PostCard from '../components/PostCard'
const PostPage = () => {
    const { postSlug } = useParams()
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);
    const[post, setPost] = useState(null);
    const[recentPosts, setRecentPosts] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            try{
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return ;
                }
                // console.log("data", data);

                if(res.ok){
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            }
            catch(error){
               
                setError(true);
                setLoading(false);
            }
        }
        fetchPost();
        },[postSlug]);

    useEffect(()=>{
          try{
            const fetchRecentPosts = async ()=>{
              const res = await fetch('/api/post/getposts?limit=6');
              const data = await res.json();
              if(res.ok){
                setRecentPosts(data.posts);
                // console.log(data.posts);
                // console.log("rece", recentPosts);
              }
            };
            fetchRecentPosts();

            }
            catch(error){
              console.log(error);
            }
        },[])




        if(loading){
            return <div
            className='flex justify-center items-center min-h-screen'
            >
                <Spinner size='xl'/>
            
            </div>
        }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-5xl'>{post&& post.title}</h1>
        <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category} 
        </Button>
      </Link>
      
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] rounded-2xl w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-4xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-4xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-4xl mt-8'>Recent Posts</h1>
        <div className='flex flex-wrap gap-5 mt-8 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  )
}

export default PostPage