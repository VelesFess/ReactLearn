import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css';

interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:8002/users/${id}`);
          if (!response.ok)
            throw new Error(`Ошибка загрузки: ${response.status}`);
          const data = await response.json();
          setUser(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id]);

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Повторить попытку
        </button>
      </div>
    );

  if (!user)
    return (
      <div className="not-found">
        <h2>Пользователь не найден</h2>
        <button onClick={() => window.history.back()} className="back-btn">
          Вернуться назад
        </button>
      </div>
    );

  return (
    <div className="user-details-container">
      <div className="user-card">
        <div className="user-header">
          <h2 className="user-name">{user.name}</h2>
          <span className="username">@{user.username}</span>
        </div>

        <div className="user-info">
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Телефон:</span>
            <span className="info-value">{user.phone}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Вебсайт:</span>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="website-link"
            >
              {user.website}
            </a>
          </div>
        </div>

        <div className="user-actions">
          <button
            onClick={() => window.history.back()}
            className="action-btn back-btn"
          >
            Назад к списку
          </button>
        </div>
      </div>
    </div>
  );
}
