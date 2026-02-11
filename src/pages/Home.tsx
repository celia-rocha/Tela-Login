import { useState, useEffect } from "react";
import "./Home.css";
import Sapato from "../assets/Sapato.png";
import Logo from "../assets/logo.png";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import GoogleButton from "../components/Button/GoogleButton";

function Home() {
  // Estados para controlar os valores dos inputs
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Estados para controlar as mensagens de erro
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

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
    } else if (senhaValue.length < 6) {
      setSenhaError('A senha deve ter pelo menos 6 caracteres');
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

      <Input 
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => validateEmail(email)}
        error={emailError}
        icon="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z'/%3E%3C/svg%3E"
      />

      <Input 
        type="password"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        onBlur={() => validateSenha(senha)}
        error={senhaError}
        icon="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='4.5' y='11' width='15' height='12' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E"
        isPassword={true}
      />
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
        <Button 
          onClick={handleLogin}
          isLoading={isLoading}
        >
          Acessar
        </Button>
      </div>

      <div className="divider">
        <p>OU</p>
      </div>

      <div className="container-google">
        <GoogleButton />
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
