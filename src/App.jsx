import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  Home,
  Map,
  Video,
  Heart,
  MessageCircle,
  Send,
  User,
  Calendar,
  BarChart2,
  Trophy,
  ArrowRight,
  LogOut,
  ShieldCheck,
  Mail,
  Lock,
} from 'lucide-react';

// Mock de vídeos para a seção FINTA
const fintaVideos = [
  {
    id: 1,
    user: {
      name: 'Renata Atleta',
      avatar: 'https://placehold.co/40x40/facc15/1f2937?text=R',
    },
    videoUrl:
      'https://static.videezy.com/system/resources/previews/000/043/279/original/female-soccer-player-dribbling.mp4',
    caption: 'Trabalhando no controle de bola! ⚽️ #futebolfeminino',
    likes: 1245,
    comments: 89,
  },
  {
    id: 2,
    user: {
      name: 'Julia Goleira',
      avatar: 'https://placehold.co/40x40/4ade80/1f2937?text=J',
    },
    videoUrl:
      'https://static.videezy.com/system/resources/previews/000/043/276/original/goal-keeper-on-the-goal-line.mp4',
    caption: 'Foco total no treino de hoje! 🧤',
    likes: 2310,
    comments: 150,
  },
  {
    id: 3,
    user: {
      name: 'Bia Zagueira',
      avatar: 'https://placehold.co/40x40/f87171/1f2937?text=B',
    },
    videoUrl:
      'https://static.videezy.com/system/resources/previews/000/052/934/original/slow-motion-of-a-female-soccer-player-running-and-kicking-the-ball-in-a-stadium-at-night.mp4',
    caption: 'Aquele chute de longe pra testar a mira! 🎯',
    likes: 987,
    comments: 65,
  },
];

// Componente para um post de vídeo na seção FINTA
const VideoPost = ({ videoData }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(videoData.likes);
  const videoRef = useRef(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current
            ?.play()
            .catch((error) => console.log('Video play failed:', error));
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 },
    );

    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }

    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full snap-start flex-shrink-0 bg-black">
      <video
        ref={videoRef}
        src={videoData.videoUrl}
        loop
        playsInline
        muted // Autoplay usually requires the video to be muted
        className="h-full w-full object-cover"
      ></video>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center mb-2">
          <img
            src={videoData.user.avatar}
            alt={videoData.user.name}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <p className="ml-3 font-semibold">{videoData.user.name}</p>
        </div>
        <p className="text-sm">{videoData.caption}</p>
      </div>
      <div className="absolute right-2 bottom-24 flex flex-col items-center space-y-4 text-white">
        <button onClick={handleLike} className="flex flex-col items-center">
          <Heart
            size={32}
            className={`transition-all ${
              isLiked ? 'text-[#b554b5] fill-[#b554b5]' : 'text-white'
            }`}
          />
          <span className="text-xs font-semibold">{likes}</span>
        </button>
        <button className="flex flex-col items-center">
          <MessageCircle size={32} />
          <span className="text-xs font-semibold">{videoData.comments}</span>
        </button>
        <button className="flex flex-col items-center">
          <Send size={32} />
        </button>
      </div>
    </div>
  );
};

// Componente para a seção FINTA (feed de vídeos)
const FintaPage = () => {
  return (
    // Em telas maiores, centralizamos o feed com uma largura máxima
    <div className="h-full w-full bg-black flex justify-center">
      <div className="h-full w-full md:max-w-md bg-neutral-900 overflow-y-auto snap-y snap-mandatory">
        {fintaVideos.map((video) => (
          <VideoPost key={video.id} videoData={video} />
        ))}
      </div>
    </div>
  );
};

// Componente para a Central de Quadras
const CourtsPage = () => {
  const championships = [
    {
      id: 1,
      name: 'Copa Delas',
      court:
        'Arena Mega Sports - R. Harry Dannenberg, 800 - Itaquera, São Paulo - SP, 08270-010',
      date: '25 SET',
      format: 'Society 7x7',
      capacity: '8/12 times',
    },
    {
      id: 2,
      name: 'Liga da ZL',
      court:
        'R9 Academy Itaquera - Av. Itaquera, 7085 - Itaquera, São Paulo - SP, 08295-000',
      date: '28 SET',
      format: 'Futsal 5x5',
      capacity: '10/16 times',
    },
    {
      id: 3,
      name: 'Copinha Churrasco de Gato',
      court:
        'SED Itaquerense - R. Antônio Soares Lara, 135 - Vila Carmosina, São Paulo - SP, 08210-060',
      date: '02 OUT',
      format: 'Campo 11x11',
      capacity: '4/8 times',
    },
    {
      id: 4,
      name: 'Rachão Valendo Coca',
      court:
        'Arena JS - R. José Alves dos Santos, 46 - Vila Campanela, São Paulo - SP, 08220-450',
      date: '02 OUT',
      format: 'Campo 11x11',
      capacity: '4/8 times',
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Central de Quadras
      </h1>

      <div className="relative h-64 lg:h-80 w-full rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-800 mb-8 shadow-lg">
        <img
          src="https://www.google.com/maps/d/u/0/thumbnail?mid=1_zzQAP0QZ_1Y9xGVchQpW2F0-l0&hl=en"
          className="w-full h-full object-cover opacity-70"
          alt="Mapa de quadras"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="text-center text-white p-4">
            <Map size={48} className="mx-auto mb-2" />
            <p className="font-semibold text-lg">Mapa interativo (simulação)</p>
            <p className="text-sm">Movimente para ver os campeonatos</p>
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-2xl mb-4 text-gray-900 dark:text-white">
        Campeonatos Próximos
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {championships.map((champ) => (
          <div
            key={champ.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg hover:border-[#b554b5] border border-transparent transition-all"
          >
            <div className="text-center bg-[#FF800080] text-orange-900 dark:text-orange-100 rounded-lg p-3">
              <p className="font-bold text-xl">{champ.date.split(' ')[0]}</p>
              <p className="text-xs font-semibold">
                {champ.date.split(' ')[1]}
              </p>
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                {champ.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {champ.court}
              </p>
              <div className="flex items-center text-xs mt-2 space-x-3">
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">
                  {champ.format}
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">
                  {champ.capacity}
                </span>
              </div>
            </div>
            <ArrowRight className="text-gray-400" size={20} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para o Hub da Atleta
const HubPage = ({ user }) => {
  const stats = [
    {
      icon: <Trophy size={24} className="text-[#b554b5]" />,
      value: '12',
      label: 'Gols',
    },
    {
      icon: <ShieldCheck size={24} className="text-[#b554b5]" />,
      value: '8',
      label: 'Assistências',
    },
    {
      icon: <Calendar size={24} className="text-[#b554b5]" />,
      value: '25',
      label: 'Jogos',
    },
  ];

  const currentChampionships = [
    { name: 'Copa Sulsanca', progress: 75 },
    { name: 'Liga da Zona Leste', progress: 40 },
  ];

  const nextGame = {
    day: '25',
    month: 'SET',
    opponent: 'Time Rivais FC',
    time: '19:30',
  };

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-full">
      <header className="mb-6">
        <p className="text-md text-gray-600 dark:text-gray-400">
          Bem-vinda de volta,
        </p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {user.name}
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Próximo Jogo */}
          <div className="bg-[#b554b5] text-white p-5 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="text-center">
              <p className="text-4xl font-bold">{nextGame.day}</p>
              <p className="text-md font-semibold">{nextGame.month}</p>
            </div>
            <div className="border-l-2 border-pink-400/50 pl-4 flex-grow">
              <p className="font-semibold">Próximo Jogo</p>
              <p className="text-xl font-bold">vs {nextGame.opponent}</p>
              <p className="text-sm">{nextGame.time}</p>
            </div>
          </div>

          {/* Meus Campeonatos */}
          <div>
            <h2 className="font-semibold text-2xl mb-3 text-gray-900 dark:text-white">
              Meus Campeonatos
            </h2>
            <div className="space-y-4">
              {currentChampionships.map((champ) => (
                <div
                  key={champ.name}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {champ.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {champ.progress}%
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-[#b554b5] h-2.5 rounded-full"
                      style={{ width: `${champ.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna Lateral (Estatísticas) */}
        <div className="lg:col-span-1">
          <h2 className="font-semibold text-2xl mb-3 text-gray-900 dark:text-white">
            Estatísticas
          </h2>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex lg:flex-row flex-col items-center lg:space-x-4 text-center lg:text-left"
              >
                {stat.icon}
                <div className="mt-2 lg:mt-0">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para a tela de Login
const LoginPage = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      onLogin(user);
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Trophy size={48} className="mx-auto text-[#b554b5]" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Acesse sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-[#b554b5] focus:border-[#b554b5] sm:text-sm"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-[#b554b5] focus:border-[#b554b5] sm:text-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#b554b5] hover:bg-[#d44b84] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b554b5]"
            >
              Entrar
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Não tem uma conta?{' '}
          <button
            onClick={() => onNavigate('register')}
            className="font-medium text-[#b554b5] hover:text-[#d44b84]"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};

// Componente para a tela de Registro
const RegisterPage = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find((u) => u.email === email)) {
      setError('Este e-mail já está em uso.');
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Cadastro realizado com sucesso! Você já pode fazer o login.');
    setTimeout(() => onNavigate('login'), 2000);
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Trophy size={48} className="mx-auto text-[#b554b5]" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Crie sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-[#b554b5] focus:border-[#b554b5] sm:text-sm"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-[#b554b5] focus:border-[#b554b5] sm:text-sm"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-[#b554b5] focus:border-[#b554b5] sm:text-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#b554b5] hover:bg-[#d44b84] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b554b5]"
            >
              Cadastrar
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Já tem uma conta?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="font-medium text-[#b554b5] hover:text-[#d44b84]"
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
};

const navItems = [
  { id: 'hub', icon: <Home />, label: 'Hub' },
  { id: 'courts', icon: <Map />, label: 'Quadras' },
  { id: 'finta', icon: <Video />, label: 'FINTA' },
];

// Componente da Barra de Navegação Inferior (Mobile)
const BottomNavBar = ({ activePage, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center md:hidden">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
            activePage === item.id
              ? 'text-[#b554b5] dark:text-pink-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-[#d44b84]'
          }`}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

// Componente da Barra de Navegação Lateral (Desktop)
const SideNavBar = ({ activePage, onNavigate, user, onLogout }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-8">
        <Trophy size={32} className="text-[#b554b5]" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          BEM-VINDA
        </h1>
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 ${
                  activePage === item.id
                    ? 'bg-pink-100/80 dark:bg-[#b554b5]/20 text-[#b554b5] dark:text-pink-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={`https://placehold.co/40x40/b554b5/FFFFFF?text=${user.name.charAt(
              0,
            )}`}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-lg font-semibold text-[#b554b5] dark:text-pink-400 hover:bg-pink-100/80 dark:hover:bg-[#b554b5]/20 transition-colors"
        >
          <LogOut />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

// Componente principal da Aplicação
export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setCurrentPage('hub');
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage('hub');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const renderPage = () => {
    if (!currentUser) {
      switch (currentPage) {
        case 'register':
          return <RegisterPage onNavigate={setCurrentPage} />;
        case 'login':
        default:
          return (
            <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />
          );
      }
    }

    switch (currentPage) {
      case 'courts':
        return <CourtsPage />;
      case 'finta':
        return <FintaPage />;
      case 'hub':
      default:
        return <HubPage user={currentUser} />;
    }
  };

  if (!currentUser) {
    return (
      <div className="w-full h-screen bg-white dark:bg-gray-900 flex items-center justify-center font-sans">
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-white dark:bg-gray-900 flex font-sans">
      <SideNavBar
        activePage={currentPage}
        onNavigate={setCurrentPage}
        user={currentUser}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto w-full h-full pb-16 md:pb-0">
          {renderPage()}
        </main>
        <BottomNavBar activePage={currentPage} onNavigate={setCurrentPage} />
      </div>
    </div>
  );
}
