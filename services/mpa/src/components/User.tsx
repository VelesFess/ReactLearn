import { useNavigate } from 'react-router-dom';
import reactlogo from '../assets/react.svg';

interface UserProps {
  name: string;
  username: string;
  user_id: number;
}

function User({ name, username, user_id }: UserProps) {
  const navigate = useNavigate();
  return (
    <div className="user">
      <img
        className="user-img"
        src={reactlogo}
        alt="Заглушка для пользователя"
      />
      <p>{name}</p>
      <p>{username}</p>
      <p>{user_id}</p>
      <button
        onClick={() => navigate(`/users/${user_id}`)}
        className="details-btn"
      >
        Узнать больше
      </button>
    </div>
  );
}

export default User;
