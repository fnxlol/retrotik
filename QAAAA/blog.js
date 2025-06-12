
document.addEventListener('DOMContentLoaded', function() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const homeBtn = document.getElementById('homeBtn');
    const profileBtn = document.getElementById('profileBtn');
    
    // Navigation functionality
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.id === 'homeBtn') {
                window.location.href = 'index.html';
                return;
            }
            
            if (this.id === 'profileBtn') {
                const savedUser = localStorage.getItem('retrotik_user');
                if (!savedUser) {
                    alert('❌ Você precisa estar logado para ver o perfil!');
                    window.location.href = 'login.html';
                    return;
                }
                window.location.href = 'profile.html';
                return;
            }
            
            // Add some feedback for current page
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }, 100);
        });
    });
    
    // Images are now static - parallax effect removed for better stability
    
    // Add hover effects to blog posts
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(255, 0, 110, 0.5)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });
    
    // Add retro glitch effect on image click
    images.forEach(img => {
        img.addEventListener('click', function() {
            this.style.filter = 'hue-rotate(180deg) saturate(2)';
            setTimeout(() => {
                this.style.filter = 'none';
            }, 300);
        });
    });
    
    // Animate curiosity items on scroll
    const curiosityItems = document.querySelectorAll('.curiosity-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    curiosityItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    console.log('📝 Blog do RetroTik carregado! Nostalgia em pixels! 🎮');
});
