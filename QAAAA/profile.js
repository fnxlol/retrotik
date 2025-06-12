
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('retrotik_user');
    
    if (!savedUser) {
        alert('❌ Você precisa estar logado para ver o perfil!');
        window.location.href = 'login.html';
        return;
    }
    
    const userData = JSON.parse(savedUser);
    
    // Update profile information
    document.getElementById('profileAvatar').textContent = userData.avatar;
    document.getElementById('profileUsername').textContent = userData.username;
    document.getElementById('userEmail').textContent = userData.email;
    
    // Format login method
    let methodText = '';
    switch(userData.loginMethod) {
        case 'google':
            methodText = '🌐 Google';
            break;
        case 'facebook':
            methodText = '📘 Facebook';
            break;
        case 'custom':
            methodText = '👤 Usuário/Senha';
            break;
        case 'demo':
            methodText = '🎭 Demo';
            break;
        default:
            methodText = userData.loginMethod;
    }
    document.getElementById('loginMethod').textContent = methodText;
    
    // Format login time
    const loginTime = new Date(userData.loginTime);
    const timeString = loginTime.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('loginTime').textContent = timeString;
    
    // Navigation buttons
    document.getElementById('homeBtn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    document.getElementById('blogBtn').addEventListener('click', function() {
        alert('📝 Blog em desenvolvimento!');
    });
    
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        const confirmLogout = confirm('Tem certeza que deseja sair da sua conta?');
        if (confirmLogout) {
            localStorage.removeItem('retrotik_user');
            alert('✅ Logout realizado com sucesso!');
            window.location.href = 'login.html';
        }
    });
    
    console.log('👤 Perfil do usuário carregado:', userData.username);
});
