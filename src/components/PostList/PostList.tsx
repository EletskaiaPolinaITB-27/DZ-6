import type { IPost } from "../../type"
import styles from "./styles.module.css"

interface Props {
  posts: IPost[]
}


export const PostList = ({ posts }: Props) => {
  return (

    <div className={styles.wrapper}>
      {posts.map(post => (
        <div key={post.id} className={styles.post}>
          {post.title}
        </div>


      ))}

    </div>
  )
}
