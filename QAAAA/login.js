
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('retrotik_user');
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        const loginTime = new Date(userData.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        // Keep login for 24 hours
        if (hoursDiff < 24) {
            showNotification(`✅ Bem-vindo de volta, ${userData.username}!`, 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            return;
        } else {
            // Clear expired login
            localStorage.removeItem('retrotik_user');
        }
    }
    
    const loginBtn = document.getElementById('loginBtn');
    const replitBtn = document.getElementById('replitBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const inputs = document.querySelectorAll('input');
    const socialBtns = document.querySelectorAll('.social-btn');
    
    // Input focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
    
    // Login button functionality
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!username || !password) {
            showNotification('❌ Por favor, preencha todos os campos!', 'error');
            return;
        }
        
        // Add loading state
        this.classList.add('loading');
        this.disabled = true;
        
        // Simulate login process
        setTimeout(() => {
            this.classList.remove('loading');
            this.disabled = false;
            
            // Demo login - in real app, validate credentials
            if (username === 'demo' && password === '123456') {
                // Save login state
                localStorage.setItem('retrotik_user', JSON.stringify({
                    username: 'Usuario Demo',
                    email: 'demo@retrotik.com',
                    loginMethod: 'demo',
                    loginTime: new Date().toISOString(),
                    avatar: '👤'
                }));
                
                showNotification('✅ Login realizado com sucesso!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showNotification('❌ Usuário ou senha incorretos!', 'error');
                
                // Shake animation for error
                this.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            }
        }, 2000);
    });
    
    // Signup functionality
    const signupLink = document.getElementById('signupLink');
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSignupForm();
    });
    
    // Google login functionality
    const googleBtn = document.querySelector('.google-btn');
    googleBtn.addEventListener('click', function() {
        showNotification('🌐 Entrando com Google...', 'info');
        
        // Add loading state
        this.style.background = 'linear-gradient(45deg, #db4437, #ea4335)';
        this.disabled = true;
        
        // Simulate Google auth and redirect
        setTimeout(() => {
            // Save login state
            localStorage.setItem('retrotik_user', JSON.stringify({
                username: 'Usuario Google',
                email: 'usuario@gmail.com',
                loginMethod: 'google',
                loginTime: new Date().toISOString(),
                avatar: '🌐'
            }));
            
            showNotification('✅ Login com Google realizado!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }, 2000);
        
        // Ripple effect
        createRipple(this, event);
    });
    
    // Facebook login functionality
    const facebookBtn = document.querySelector('.facebook-btn');
    facebookBtn.addEventListener('click', function() {
        showNotification('📘 Entrando com Facebook...', 'info');
        
        // Add loading state
        this.style.background = 'linear-gradient(45deg, #4267B2, #365899)';
        this.disabled = true;
        
        // Simulate Facebook auth and redirect
        setTimeout(() => {
            // Save login state
            localStorage.setItem('retrotik_user', JSON.stringify({
                username: 'Usuario Facebook',
                email: 'usuario@facebook.com',
                loginMethod: 'facebook',
                loginTime: new Date().toISOString(),
                avatar: '📘'
            }));
            
            showNotification('✅ Login com Facebook realizado!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }, 2000);
        
        // Ripple effect
        createRipple(this, event);
    });
    
    // Other social buttons
    socialBtns.forEach(btn => {
        if (btn !== googleBtn && btn !== facebookBtn) {
            btn.addEventListener('click', function() {
                showNotification('🚀 Funcionalidade em desenvolvimento!', 'info');
                // Ripple effect
                createRipple(this, event);
            });
        }
    });
    
    // Signup form functionality
    function showSignupForm() {
        const loginCard = document.querySelector('.login-card');
        
        loginCard.innerHTML = `
            <div class="logo-section">
                <h1 class="logo">RetroTik</h1>
                <p class="tagline">Crie sua conta e reviva os momentos épicos!</p>
            </div>
            
            <div class="login-form">
                <div class="input-group">
                    <input type="text" id="signupUsername" placeholder=" " required>
                    <label for="signupUsername">👤 Nome de usuário</label>
                </div>
                
                <div class="input-group">
                    <input type="email" id="signupEmail" placeholder=" " required>
                    <label for="signupEmail">📧 Email</label>
                </div>
                
                <div class="input-group">
                    <input type="password" id="signupPassword" placeholder=" " required>
                    <label for="signupPassword">🔒 Senha</label>
                </div>
                
                <div class="input-group">
                    <input type="password" id="confirmPassword" placeholder=" " required>
                    <label for="confirmPassword">🔒 Confirmar senha</label>
                </div>
                
                <button class="login-btn" id="signupBtn">
                    <span class="btn-text">Criar Conta</span>
                    <div class="btn-loader"></div>
                </button>
                
                <div class="signup-section">
                    <p>Já tem uma conta? <a href="#" class="signup-link" id="backToLogin">Entrar</a></p>
                </div>
            </div>
        `;
        
        // Add event listeners for signup form
        const signupBtn = document.getElementById('signupBtn');
        const backToLogin = document.getElementById('backToLogin');
        const signupInputs = document.querySelectorAll('#signupUsername, #signupEmail, #signupPassword, #confirmPassword');
        
        // Input effects
        signupInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
        
        // Signup button
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('signupUsername').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            
            if (!username || !email || !password || !confirmPassword) {
                showNotification('❌ Por favor, preencha todos os campos!', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('❌ As senhas não coincidem!', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('❌ A senha deve ter pelo menos 6 caracteres!', 'error');
                return;
            }
            
            // Add loading state
            this.classList.add('loading');
            this.disabled = true;
            
            // Simulate signup process
            setTimeout(() => {
                this.classList.remove('loading');
                this.disabled = false;
                
                // Save user data
                localStorage.setItem('retrotik_user', JSON.stringify({
                    username: username,
                    email: email,
                    loginMethod: 'custom',
                    loginTime: new Date().toISOString(),
                    avatar: '👤'
                }));
                
                showNotification('✅ Conta criada com sucesso!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }, 2000);
        });
        
        // Back to login
        backToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            location.reload();
        });
    }
    
    // Enter key functionality
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Styles for notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '50px',
            color: '#fff',
            fontWeight: 'bold',
            zIndex: '10000',
            animation: 'slideIn 0.3s ease-out',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        });
        
        // Type-specific colors
        if (type === 'success') {
            notification.style.background = 'linear-gradient(45deg, #00c851, #00ff41)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(45deg, #ff4444, #ff6b6b)';
        } else {
            notification.style.background = 'linear-gradient(45deg, #33b5e5, #0099cc)';
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Ripple effect for buttons
    function createRipple(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .input-group.focused input {
            border-color: #ff006e;
            box-shadow: 0 0 20px rgba(255, 0, 110, 0.3);
        }
        
        .input-group.has-value label {
            top: -10px;
            left: 25px;
            font-size: 0.8em;
            color: #ff006e;
            background: rgba(0, 0, 0, 0.8);
            padding: 0 10px;
            border-radius: 10px;
        }
    `;
    document.head.appendChild(style);
    
    console.log('🔐 RetroTik Login carregado! Use demo/123456 para testar!');
});
