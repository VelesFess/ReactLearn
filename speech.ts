import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Code, Zap, Globe, Layers } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

// Симуляция роутера для демонстрации
const useRouter = () => {
  const [currentRoute, setCurrentRoute] = useState('/');
  
  const navigate = (path: string) => {
    setCurrentRoute(path);
  };
  
  return { currentRoute, navigate };
};

const ReactConceptsGuide = () => {
  const [activeSection, setActiveSection] = useState<string>('components');
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedCode, setExpandedCode] = useState<string>('');
  const { currentRoute, navigate } = useRouter();

  // Пример useEffect для загрузки данных
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Симуляция API запроса
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers([
          { id: 1, name: 'Иван Петров', email: 'ivan@example.com', username: 'ivan_p' },
          { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', username: 'maria_s' }
        ]);
        setTodos([
          { id: 1, title: 'Изучить React компоненты', completed: true },
          { id: 2, title: 'Разобрать хуки', completed: false },
          { id: 3, title: 'Создать SPA приложение', completed: false }
        ]);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === 'api') {
      fetchData();
    }
  }, [activeSection]);

  const sections = [
    { id: 'components', title: '🧩 Компоненты', icon: <Layers className="w-5 h-5" /> },
    { id: 'state', title: '📦 State и хуки', icon: <Zap className="w-5 h-5" /> },
    { id: 'routing', title: '🛣️ Маршрутизация', icon: <Globe className="w-5 h-5" /> },
    { id: 'api', title: '🔌 REST API', icon: <Code className="w-5 h-5" /> }
  ];

  const toggleCode = (codeId: string) => {
    setExpandedCode(expandedCode === codeId ? '' : codeId);
  };

  const renderComponentsSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-600">🧩 React Компоненты</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Функциональные компоненты (современный подход)</h3>
        <button 
          onClick={() => toggleCode('functional')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-2"
        >
          {expandedCode === 'functional' ? <ChevronDown /> : <ChevronRight />}
          Показать код
        </button>
        
        {expandedCode === 'functional' && (
          <pre className="bg-gray-800 text-green-300 p-4 rounded text-sm overflow-x-auto">
{`// Функциональный компонент с TypeScript
interface UserCardProps {
  name: string;
  email: string;
  isOnline?: boolean; // опциональный prop
}

const UserCard: React.FC<UserCardProps> = ({ name, email, isOnline = false }) => {
  return (
    <div className="border p-4 rounded">
      <h3>{name}</h3>
      <p>{email}</p>
      <span className={\`status \${isOnline ? 'online' : 'offline'}\`}>
        {isOnline ? '🟢 Онлайн' : '🔴 Оффлайн'}
      </span>
    </div>
  );
};

// Использование компонента
<UserCard 
  name="Иван Петров" 
  email="ivan@example.com" 
  isOnline={true} 
/>`}
          </pre>
        )}
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📝 Ключевые моменты:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Props</strong> - данные, передаваемые в компонент</li>
          <li><strong>TypeScript интерфейсы</strong> - типизация props для безопасности</li>
          <li><strong>Деструктуризация</strong> - удобное извлечение props</li>
          <li><strong>Условный рендеринг</strong> - показ контента по условию</li>
          <li><strong>React.FC</strong> - типизация функционального компонента</li>
        </ul>
      </div>
    </div>
  );

  const renderStateSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-600">📦 State и React хуки</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">useState - локальное состояние</h3>
          <div className="space-y-2">
            <p className="text-sm">Счетчик: <span className="font-bold text-lg">{users.length}</span></p>
            <button 
              onClick={() => setUsers([...users, { 
                id: Date.now(), 
                name: 'Новый пользователь', 
                email: 'new@example.com', 
                username: 'new_user' 
              }])}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Добавить пользователя
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">useEffect - побочные эффекты</h3>
          <p className="text-sm mb-2">Автоматически загружает данные при смене секции</p>
          {loading && <div className="text-blue-600">⏳ Загрузка...</div>}
        </div>
      </div>

      <button 
        onClick={() => toggleCode('hooks')}
        className="flex items-center gap-2 text-green-600 hover:text-green-800"
      >
        {expandedCode === 'hooks' ? <ChevronDown /> : <ChevronRight />}
        Показать код хуков
      </button>
      
      {expandedCode === 'hooks' && (
        <pre className="bg-gray-800 text-green-300 p-4 rounded text-sm overflow-x-auto">
{`// useState для управления состоянием
const [count, setCount] = useState<number>(0);
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState<boolean>(false);

// Обновление состояния
setCount(prev => prev + 1); // функциональное обновление
setUsers([...users, newUser]); // добавление в массив

// useEffect для побочных эффектов
useEffect(() => {
  // Выполняется после каждого рендера
  console.log('Компонент обновился');
  
  // Cleanup функция (аналог componentWillUnmount)
  return () => {
    console.log('Очистка ресурсов');
  };
}, [dependency]); // массив зависимостей

// useEffect с пустым массивом = componentDidMount
useEffect(() => {
  fetchData();
}, []); // выполнится только один раз

// useEffect без массива зависимостей
useEffect(() => {
  // Выполняется после каждого рендера - ОСТОРОЖНО!
});`}
        </pre>
      )}
    </div>
  );

  const renderRoutingSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-600">🛣️ React Router</h2>
      
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Демо навигации</h3>
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => navigate('/')}
            className={`px-3 py-1 rounded ${currentRoute === '/' ? 'bg-purple-500 text-white' : 'bg-white'}`}
          >
            Главная
          </button>
          <button 
            onClick={() => navigate('/users')}
            className={`px-3 py-1 rounded ${currentRoute === '/users' ? 'bg-purple-500 text-white' : 'bg-white'}`}
          >
            Пользователи
          </button>
          <button 
            onClick={() => navigate('/about')}
            className={`px-3 py-1 rounded ${currentRoute === '/about' ? 'bg-purple-500 text-white' : 'bg-white'}`}
          >
            О нас
          </button>
        </div>
        <div className="p-3 bg-white rounded border">
          <strong>Текущий маршрут:</strong> {currentRoute}
        </div>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg">        
        <button 
          onClick={() => toggleCode('routing')}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-4"
        >
          {expandedCode === 'routing' ? <ChevronDown /> : <ChevronRight />}
          Показать код роутинга
        </button>
        
        {expandedCode === 'routing' && (
          <pre className="bg-gray-800 text-green-300 p-4 rounded text-sm overflow-x-auto">
{`// npm install react-router-dom @types/react-router-dom

import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams,
  useNavigate 
} from 'react-router-dom';

// Главный App компонент
function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Главная</Link>
        <Link to="/users" className="nav-link">Пользователи</Link>
        <Link to="/about" className="nav-link">О нас</Link>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

// Компонент с параметрами маршрута
function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <div>
      <h2>Пользователь ID: {id}</h2>
      <button onClick={() => navigate(-1)}>
        ← Назад
      </button>
      <button onClick={() => navigate('/users')}>
        К списку пользователей
      </button>
    </div>
  );
}

// Программная навигация
function SomeComponent() {
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    // логика отправки формы
    navigate('/success'); // редирект после успеха
  };
}`}
          </pre>
        )}
        
        <div className="mt-4 p-3 bg-white rounded border-l-4 border-purple-400">
          <h4 className="font-semibold">🎯 Основные концепции:</h4>
          <ul className="list-disc list-inside text-sm space-y-1 mt-2">
            <li><strong>BrowserRouter</strong> - оборачивает приложение</li>
            <li><strong>Routes & Route</strong> - определяют маршруты</li>
            <li><strong>Link</strong> - навигация без перезагрузки страницы</li>
            <li><strong>useParams</strong> - получение параметров URL</li>
            <li><strong>useNavigate</strong> - программная навигация</li>
            <li><strong>Nested routes</strong> - вложенные маршруты</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderApiSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-orange-600">🔌 Работа с REST API</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Пользователи {loading && '⏳'}</h3>
          <div className="space-y-2">
            {users.map(user => (
              <div key={user.id} className="bg-white p-2 rounded border">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Todo список</h3>
          <div className="space-y-2">
            {todos.map(todo => (
              <div key={todo.id} className="flex items-center gap-2">
                <span className={todo.completed ? 'text-green-600' : 'text-gray-600'}>
                  {todo.completed ? '✅' : '⭕'}
                </span>
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                  {todo.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={() => toggleCode('api')}
        className="flex items-center gap-2 text-orange-600 hover:text-orange-800"
      >
        {expandedCode === 'api' ? <ChevronDown /> : <ChevronRight />}
        Показать код API
      </button>
      
      {expandedCode === 'api' && (
        <pre className="bg-gray-800 text-green-300 p-4 rounded text-sm overflow-x-auto">
{`// Типы для TypeScript
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface ApiError {
  message: string;
  status?: number;
}

// Функция для работы с API
const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
};

// POST запрос для создания пользователя
const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  
  return await response.json();
};

// Кастомный хук для API
const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await fetchUsers();
      setUsers(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return { users, loading, error, refetch: loadUsers };
};

// Использование в компоненте
const UsersComponent: React.FC = () => {
  const { users, loading, error, refetch } = useUsers();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  
  return (
    <div>
      <button onClick={refetch}>Обновить</button>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};`}
        </pre>
      )}
      
      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🛠️ Лучшие практики для API:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><strong>Обработка ошибок</strong> - всегда проверяй response.ok</li>
          <li><strong>Loading states</strong> - показывай состояние загрузки</li>
          <li><strong>Типизация</strong> - используй TypeScript интерфейсы</li>
          <li><strong>Кастомные хуки</strong> - выноси логику API в отдельные хуки</li>
          <li><strong>Abort controller</strong> - отменяй запросы при unmount</li>
        </ul>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'components': return renderComponentsSection();
      case 'state': return renderStateSection();
      case 'routing': return renderRoutingSection();
      case 'api': return renderApiSection();
      default: return renderComponentsSection();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          React + TypeScript + Vite
        </h1>
        <p className="text-gray-600">Ключевые концепции для создания SPA приложений</p>
      </div>

      {/* Навигация по секциям */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeSection === section.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section.icon}
            {section.title}
          </button>
        ))}
      </div>

      {/* Основной контент */}
      <div className="bg-white rounded-lg border p-6">
        {renderContent()}
      </div>

      {/* Следующие шаги */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">🚀 Готов создать SPA приложение?</h3>
        <p className="text-gray-700 mb-4">
          Теперь у тебя есть база! Давай создадим полноценное приложение, применив все эти концепции.
        </p>
        <div className="text-sm text-gray-600">
          <strong>Что будем делать дальше:</strong> Todo-менеджер с маршрутизацией, API и современным UI
        </div>
      </div>
    </div>
  );
};

export default ReactConceptsGuide;