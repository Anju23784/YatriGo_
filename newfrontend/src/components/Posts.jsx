// import React from 'react'
// import Post from './Post'
// import { useSelector } from 'react-redux'

// const Posts = () => {
//   const {posts} = useSelector(store=>store.post);
//   return (
//     <div>
//         {
//             posts.map((post) => <Post key={post._id} post={post}/>)
//         }
//     </div>
//   )
// }

// export default Posts

import React from 'react'
import Post from './Post'

function Posts() {
  return (
    <div>
      {
        [1,2,3].map((item, index) => <Post key= {index}/>)
      }
    </div>
  )
}

export default Posts
