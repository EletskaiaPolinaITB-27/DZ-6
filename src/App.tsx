import { useEffect, useState } from "react"
import type { IPost } from "./type"
import type { IUser } from "./type"
import { UserCard } from "./components/UserCard/UserCard"
import { PostList } from "./components/PostList/PostList"
import styles from "./app.module.css"
import { axiosApi } from "./axiosApi"



function App() {
  const [users, setUsers] = useState<IUser[]>([])
  const [posts, setPosts] = useState<IPost[]>([])
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosApi.get<IUser[]>('/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error)
      }
    }

    void fetchUsers()
  }, [])

  const fetchPostsByUser = async (userId: number) => {
    try {
      const response = await axiosApi.get<IPost[]>('/posts', {
        params: {
          userId,
        },
      })

      setPosts(response.data)
      setSelectedUserId(userId)
    } catch (error) {
      console.error('Ошибка при получении постов:', error)
    }
  }

  return (
    <div className={styles.container}>

      <div className={styles.users}>
        <h1>Users</h1>
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onClick={fetchPostsByUser}
          />
        ))}
      </div>

    <div className={styles.posts}>
      {selectedUserId && (
        <>
          <h2>Posts of user #{selectedUserId}</h2>
          <PostList posts={posts}/>
        </>
      )}

    </div>
    </div>
  )
}





export default App
