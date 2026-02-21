import type { IUser } from "../../type"
import styles from "./styles.module.css"

interface Props {
  user: IUser
  onClick: (id: number) => void
}

export const UserCard = ({ user, onClick }: Props) => {
  return (
    <div className={styles.card} onClick={() => onClick(user.id)}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Company: {user.company}</p>
    </div>
  )
}
