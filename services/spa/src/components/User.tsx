import reactlogo from '../assets/react.svg';

interface UserProps {
  name: string;
  username: string;
  user_id: number;
  onDetailsClick: () => void;
}

function User({ name, username, user_id, onDetailsClick }: UserProps) {
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
      <button onClick={onDetailsClick} className="details-btn">
        Узнать больше
      </button>
    </div>
  );
}

export default User;
