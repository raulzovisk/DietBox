<p align="center">
  <img src="https://img.icons8.com/fluency/96/grocery-bag.png" width="80" alt="NutriSystem Logo"/>
</p>

<h1 align="center">🥗 NutriSystem</h1>

<p align="center">
  <strong>Sistema de Gerenciamento de Dietas e Nutrição</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel"/>
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
</p>

<p align="center">
  Plataforma completa para nutricionistas gerenciarem dietas personalizadas<br/>
  e pacientes acompanharem sua alimentação diária.
</p>

---

## ✨ Funcionalidades

### 👨‍⚕️ Para Nutricionistas
- 📋 **Criação de Dietas** - Monte dietas personalizadas com refeições por dia da semana
- 🍎 **Banco de Alimentos** - Cadastre e gerencie alimentos com informações nutricionais
- 🔄 **Alimentos Alternativos** - Defina opções de substituição para cada alimento
- 👥 **Gestão de Pacientes** - Vincule dietas aos usuários e acompanhe o progresso
- ⚡ **Ativação/Desativação** - Controle quais dietas estão ativas para cada paciente

### 🥗 Para Pacientes
- 📱 **Minha Dieta** - Visualize sua dieta organizada por dias da semana
- 🔔 **Notificações em Tempo Real** - Receba alertas quando sua dieta for atualizada
- 🌙 **Modo Escuro** - Interface adaptável para melhor conforto visual
- 📊 **Informações Nutricionais** - Veja calorias, proteínas, carboidratos e gorduras

### 🔐 Para Administradores
- 👤 **Gestão de Usuários** - Crie e gerencie nutricionistas e pacientes
- 🛡️ **Controle de Acesso** - Sistema de roles (Admin, Nutricionista, Paciente)
- 📝 **Logs de Atividade** - Acompanhe alterações realizadas no sistema

---

## 🚀 Tecnologias

| Camada | Tecnologia |
|--------|------------|
| **Backend** | Laravel 12, PHP 8.2+ |
| **Frontend** | React 18, Inertia.js 2 |
| **Estilização** | TailwindCSS 3, Lucide Icons |
| **Banco de Dados** | MySQL / PostgreSQL / SQLite |
| **Autenticação** | Laravel Breeze |

---

## 📦 Instalação

### Pré-requisitos
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL ou outra base de dados compatível

### Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/diet-management.git
cd diet-management

# Instale dependências
composer install
npm install

# Configure o ambiente
cp .env.example .env
php artisan key:generate

# Configure o banco de dados no .env e execute
php artisan migrate --seed

# Inicie o servidor de desenvolvimento
composer dev
```

O sistema estará disponível em `http://localhost:8000`

---

## 🖥️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `composer dev` | Inicia servidor, queue, logs e Vite simultaneamente |
| `composer setup` | Instalação completa do projeto |
| `composer test` | Executa os testes automatizados |
| `npm run dev` | Inicia o Vite para desenvolvimento |
| `npm run build` | Compila assets para produção |

---

## 📸 Screenshots

<p align="center">
  <em>Dashboard do Nutricionista</em>
</p>

> 🎨 Interface moderna com dark mode, cards informativos e navegação intuitiva

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com ❤️ para uma alimentação mais saudável
</p>
