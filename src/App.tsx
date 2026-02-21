import { useEffect, useState } from "react"
import { BASE_URL } from "./contacts"
import type { IPost } from "./type"
import type { IUser } from "./type"
import { UserCard } from "./components/UserCard/UserCard"
import { PostList } from "./components/PostList/PostList"
import styles from "./app.module.css"



function App() {
  const [users, setUsers] = useState<IUser[]>([])
  const [posts, setPosts] = useState<IPost[]>([])
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`)
        if (!response.ok) {
          throw new Error("Ошибка")
        }
        const data: IUser[] = await response.json()
        setUsers(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [])


  
  const fetchPostsByUser = async (userId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/posts?userId=${userId}`)
      if (!response.ok) {
        throw new Error("Ошибка при получении постов")
      }
      const data: IPost[] = await response.json()
      setPosts(data)
      setSelectedUserId(userId)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Users</h1>

      <div className={styles.users}>
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onClick={fetchPostsByUser}
          />
        ))}
      </div>

      {selectedUserId && (
        <>
          <h2>Posts of user #{selectedUserId}</h2>
          <PostList posts={posts} />
        </>
      )}
    </div>
  )

}




export default App
