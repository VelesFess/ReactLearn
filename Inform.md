Вот четкие определения ключевых концепций React с примерами:

### 1. Компоненты

**Определение**: Независимые переиспользуемые "строительные блоки" UI.

**Функциональный компонент** (современный):

```jsx
function Button({ label }) {
  return <button>{label}</button>;
}
```

**Классовый компонент** (устаревший):

```jsx
class Button extends React.Component {
  render() {
    return <button>{this.props.label}</button>;
  }
}
```

### 2. Состояние (State)

**Определение**: Внутренние данные компонента, которые могут изменяться и вызывать ререндер.

**Классовый компонент**:

```jsx
class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
}
```

**Функциональный компонент** (с useState):

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };
}
```

### 3. Жизненный цикл (Lifecycle)

**Определение**: Методы, вызываемые в разные моменты "жизни" классового компонента.

**Пример**:

```jsx
class Timer extends React.Component {
  componentDidMount() {
    // После монтирования
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    // Перед удалением
    clearInterval(this.timer);
  }

  tick = () => {
    this.setState({ time: new Date() });
  };
}
```

### 4. Хуки (Hooks)

**Определение**: Функции, позволяющие "подключаться" к возможностям React из функциональных компонентов.

**useState**:

```jsx
function Form() {
  const [name, setName] = useState('');

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

**useEffect**:

```jsx
function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData);
  }, []); // Пустой массив = только при монтировании
}
```

### 5. Контекст (Context)

**Определение**: Способ передачи данных через дерево компонентов без пропсов.

**Пример**:

```jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Текущая тема: {theme}</div>;
}
```

### 6. Виртуальный DOM

**Определение**: Легковесная копия реального DOM, используемая для оптимизации обновлений.

**Как работает**:

1. React создает виртуальное представление UI
2. При изменениях сравнивает с предыдущей версией (diffing)
3. Обновляет только изменившиеся части реального DOM

### 7. JSX

**Определение**: Синтаксическое расширение, позволяющее писать HTML-подобный код в JavaScript.

**Пример**:

```jsx
const element = <h1 className="title">Hello!</h1>;

// Компилируется в:
React.createElement('h1', { className: 'title' }, 'Hello');
```

### 8. Односторонний поток данных

**Определение**: Данные в React передаются только сверху вниз (от родителя к ребенку).

**Пример**:

```jsx
function Parent() {
  const [value, setValue] = useState('');

  return <Child value={value} onChange={setValue} />;
}

function Child({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}
```

Эти концепции образуют фундамент React. Современная разработка преимущественно использует функциональные компоненты с хуками, как более простой и выразительный подход.
