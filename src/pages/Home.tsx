import { useState, useEffect } from "react";
import "./Home.css";
import Sapato from "../assets/Sapato.png";
import Logo from "../assets/logo.png";

function Home() {
  // Estados para controlar os valores dos inputs
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Estados para controlar as mensagens de erro
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  // Estado para controlar o loading do botão
  const [isLoading, setIsLoading] = useState(false);

  // Estado para o checkbox "Lembrar-me"
  const [lembreMe, setLembreMe] = useState(false);

  // Estado para erro global de login (API)
  const [authError, setAuthError] = useState('');

  // useEffect: Executa assim que o componente é montado (página abre)
  useEffect(() => {
    const emailSalvo = localStorage.getItem('userEmail');
    if (emailSalvo) {
      setEmail(emailSalvo);
      setLembreMe(true); // Se tem e-mail salvo, marcamos o checkbox automaticamente
    }
  }, []); // [] vazio significa: execute apenas UMA VEZ ao carregar

  // Função para validar o email
  const validateEmail = (emailValue: string): boolean => {
    // Regex para validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailValue) {
      setEmailError('O email é obrigatório');
      return false;
    } else if (!emailRegex.test(emailValue)) {
      setEmailError('Digite um email válido');
      return false;
    } else {
      setEmailError(''); // Limpa o erro se estiver tudo certo
      return true;
    }
  };
  // Função para validar a senha
  const validateSenha = (senhaValue: string): boolean => {
    if (!senhaValue) {
      setSenhaError('A senha é obrigatória');
      return false;
    } else if (senhaValue.length < 12) {
      setSenhaError('A senha deve ter pelo menos 12 caracteres');
      return false;
    } else {
      setSenhaError(''); // Limpa o erro se estiver tudo certo
      return true;
    }
  };

  // Função para simular o login
  const handleLogin = () => { 
    // Limpa erros anteriores
    setAuthError('');

    // Primeiro validamos os campos e pegamos o resultado na hora
    const isEmailValid = validateEmail(email);
    const isSenhaValid = validateSenha(senha);

    // Se algum campo estiver inválido, paramos aqui
    if (!isEmailValid || !isSenhaValid) return;

    setIsLoading(true);

    // Na gaveta no localStorage baseado no checkbox
    if (lembreMe) {
      localStorage.setItem('userEmail', email);
    } else {
      localStorage.removeItem('userEmail');
    }

    // Simula uma demora de 1.5 segundos (como se fosse uma API)
    setTimeout(() => {
      setIsLoading(false);
      
      // NOSSA API MOCKADA:
      // Usuário correto: admin@nike.com / senha: 123456
      if (email === 'admin@nike.com' && senha === '123456') {
        alert('Login realizado com sucesso! Bem-vindo, Admin.');
      } else {
        setAuthError('E-mail ou senha incorretos. Tente novamente.');
      }
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="brand">
          <img src={Logo} alt="Kike Logo" />

          <h1>NIKE</h1>
        </div>

        <div className="product-image">
          <img src={Sapato} style={{ width: "300px" }} alt="Tênis Nike" />
        </div>
      </div>

      <h2>Entrar</h2>

      {/* Mensagem de erro de autenticação */}
      {authError && <p className="auth-error">{authError}</p>}

      <div className="input-email">
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z'/%3E%3C/svg%3E"
          width={24}
          height={24}
          alt="Ícone de email"
        />
        <input 
          type="email" 
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateEmail(email)}
        />
        {emailError && <p className="error-message">{emailError}</p>}
      </div>

      <div className="input-password">
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='4.5' y='11' width='15' height='12' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E"
          width={24}
          height={24}
          alt="Ícone de cadeado"
        />
        <input 
          type={showPassword ? "text" : "password"}
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onBlur={() => validateSenha(senha)}
          maxLength={12}
        />
        <button 
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            // Ícone de olho fechado (senha visível)
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            // Ícone de olho aberto (senha oculta)
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
        {senhaError && <p className="error-message">{senhaError}</p>}
      </div>
      <div className="form-actions">
        <label className="remember-me">
          <input 
            type="checkbox" 
            checked={lembreMe}
            onChange={(e) => setLembreMe(e.target.checked)}
          />
          Lembrar-me
        </label>
        <a href="#">Esqueceu a senha?</a>
      </div>

      <div className="container-acess">
        <button 
          className="button-acess" 
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? <div className="spinner"></div> : 'Acessar'}
        </button>
      </div>

      <div className="divider">
        <p>OU</p>
      </div>

      <div className="container-google">
        <button className="button-google">
          <div className="icon-google">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 128 128"
            >
              <path
                fill="#fff"
                d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
              />
              <path
                fill="#e33629"
                d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
              />
              <path
                fill="#f8bd00"
                d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"
              />
              <path
                fill="#587dbd"
                d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"
              />
              <path
                fill="#319f43"
                d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"
              />
            </svg>
          </div>
          <span>Entrar com Google</span>
        </button>
      </div>

      <div className="login-footer">
        <p>
          Ainda não possui uma conta? <a href="#">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

export default Home;
