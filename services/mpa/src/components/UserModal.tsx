import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface UserModalProps {
  userId: number;
  onClose: () => void;
}

export default function UserModal({ userId, onClose }: UserModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8002/users/${userId}`);
        if (!response.ok) throw new Error('Пользователь не найден');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Произошла неизвестная ошибка');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {loading && <div>Загрузка...</div>}
        {error && <div className="error">Ошибка: {error}</div>}
        {user && (
          <>
            <h2>{user.name}</h2>
            <p>
              <strong>Никнейм:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Телефон:</strong> {user.phone}
            </p>
            <p>
              <strong>Сайт:</strong> {user.website}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
