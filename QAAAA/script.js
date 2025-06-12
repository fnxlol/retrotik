
document.addEventListener('DOMContentLoaded', function() {
    // Check user authentication status
    const savedUser = localStorage.getItem('retrotik_user');
    const loginNavBtn = document.getElementById('loginNavBtn');
    
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        
        // Update login button to show user info
        loginNavBtn.innerHTML = `
            <span class="btn-icon">${userData.avatar}</span>
            <span>${userData.username}</span>
        `;
        loginNavBtn.style.background = 'linear-gradient(45deg, #00c851, #00ff41)';
        
        // Show user status in header
        const userStatus = document.getElementById('userStatus');
        if (userStatus) {
            userStatus.style.display = 'block';
            userStatus.querySelector('.status-text').innerHTML = `
                ${userData.avatar} ${userData.username} • Online
            `;
        }
        
        // Add logout functionality
        loginNavBtn.addEventListener('click', function() {
            const confirmLogout = confirm('Deseja sair da sua conta?');
            if (confirmLogout) {
                localStorage.removeItem('retrotik_user');
                location.reload();
            }
        });
        
        console.log(`👋 Usuário logado: ${userData.username} via ${userData.loginMethod}`);
    } else {
        // User not logged in, keep original login button
        loginNavBtn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
    
    const videoCards = document.querySelectorAll('.video-card');
    const navBtns = document.querySelectorAll('.nav-btn');
    const blogBtn = document.getElementById('blogBtn');
    const profileBtn = document.getElementById('profileBtn');
    const actionBtns = document.querySelectorAll('.action-btn');
    const uploadBtn = document.getElementById('uploadBtn');
    
    // Video card interactions
    videoCards.forEach((card, index) => {
        const video = card.querySelector('.retro-video');
        const videoContainer = card.querySelector('.video-container');
        
        if (video) {
            // Set up video for autoplay when active
            video.addEventListener('loadeddata', function() {
                if (card.classList.contains('active')) {
                    video.play().catch(e => console.log('Autoplay blocked:', e));
                }
            });
            
            video.addEventListener('click', function() {
                // Remove active class from all cards
                videoCards.forEach(c => {
                    c.classList.remove('active');
                    const otherVideo = c.querySelector('.retro-video');
                    if (otherVideo && otherVideo !== video) {
                        otherVideo.pause();
                    }
                });
                
                // Add active class to clicked card
                card.classList.add('active');
                
                // Toggle play/pause
                if (video.paused) {
                    video.play().catch(e => console.log('Play failed:', e));
                } else {
                    video.pause();
                }
                
                // Add retro glitch effect
                video.style.filter = 'saturate(1.2) contrast(1.1) hue-rotate(180deg)';
                setTimeout(() => {
                    video.style.filter = 'saturate(1.2) contrast(1.1)';
                }, 200);
            });
            
            // Add video event listeners
            video.addEventListener('play', function() {
                card.classList.add('playing');
                // Update all other videos to pause
                document.querySelectorAll('.retro-video').forEach(v => {
                    if (v !== video) v.pause();
                });
            });
            
            video.addEventListener('pause', function() {
                card.classList.remove('playing');
            });
            
            // Error handling
            video.addEventListener('error', function() {
                console.log('Erro ao carregar vídeo, usando placeholder');
                video.style.display = 'none';
                const placeholder = card.querySelector('.video-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'flex';
                }
            });
        }
        
        // Fallback for cards without video or when video fails to load
        const videoPlaceholder = card.querySelector('.video-placeholder');
        if (videoPlaceholder) {
            const playIcon = card.querySelector('.play-icon');
            let isPlaying = false;
            let playInterval = null;
            
            // Hide placeholder if video is working
            const video = card.querySelector('.retro-video');
            if (video) {
                video.addEventListener('loadeddata', function() {
                    videoPlaceholder.style.display = 'none';
                });
                
                video.addEventListener('error', function() {
                    videoPlaceholder.style.display = 'flex';
                });
            }
            
            videoPlaceholder.addEventListener('click', function() {
                // If there's a video, try to play it instead
                if (video && video.style.display !== 'none') {
                    video.click();
                    return;
                }
                
                videoCards.forEach(c => {
                    c.classList.remove('active');
                    const otherIcon = c.querySelector('.play-icon');
                    if (otherIcon) otherIcon.textContent = '▶';
                });
                
                card.classList.add('active');
                
                if (!isPlaying) {
                    // Start "playing"
                    isPlaying = true;
                    playIcon.textContent = '⏸️';
                    
                    // Add playing animation
                    videoPlaceholder.style.animation = 'pulse 2s infinite';
                    
                    // Simulate video playing with color changes
                    let colorIndex = 0;
                    const colors = [
                        'linear-gradient(135deg, #667eea, #764ba2)',
                        'linear-gradient(135deg, #ff6b6b, #feca57)',
                        'linear-gradient(135deg, #48dbfb, #0abde3)',
                        'linear-gradient(135deg, #ff9ff3, #f368e0)',
                        'linear-gradient(135deg, #54a0ff, #2e86de)'
                    ];
                    
                    playInterval = setInterval(() => {
                        if (isPlaying) {
                            videoPlaceholder.style.background = colors[colorIndex % colors.length];
                            colorIndex++;
                        }
                    }, 1000);
                } else {
                    // Pause
                    isPlaying = false;
                    playIcon.textContent = '▶';
                    videoPlaceholder.style.animation = '';
                    if (playInterval) {
                        clearInterval(playInterval);
                        playInterval = null;
                    }
                    videoPlaceholder.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                }
                
                // Glitch effect
                videoPlaceholder.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    videoPlaceholder.style.filter = 'none';
                }, 200);
            });
        }
    });
    
    // Navigation functionality
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.id === 'blogBtn') {
                window.location.href = 'blog.html';
                return;
            }
            
            if (this.id === 'profileBtn') {
                if (!savedUser) {
                    alert('❌ Você precisa estar logado para ver o perfil!');
                    window.location.href = 'login.html';
                    return;
                }
                window.location.href = 'profile.html';
                return;
            }
            
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Add some feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }, 100);
        });
    });
    
    // Action buttons (like, comment, share)
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const countSpan = this.querySelector('span');
            let currentCount = parseInt(countSpan.textContent.replace('k', '000').replace('.', ''));
            
            if (this.classList.contains('like-btn')) {
                if (this.style.color === 'rgb(255, 0, 110)') {
                    // Unlike
                    currentCount -= 1;
                    this.style.color = '';
                } else {
                    // Like
                    currentCount += 1;
                    this.style.color = '#ff006e';
                    
                    // Heart animation
                    const heart = document.createElement('div');
                    heart.innerHTML = '💜';
                    heart.style.position = 'absolute';
                    heart.style.fontSize = '2em';
                    heart.style.animation = 'heartFloat 1s ease-out forwards';
                    heart.style.pointerEvents = 'none';
                    heart.style.zIndex = '1000';
                    
                    this.style.position = 'relative';
                    this.appendChild(heart);
                    
                    setTimeout(() => {
                        heart.remove();
                    }, 1000);
                }
            } else {
                currentCount += 1;
            }
            
            // Update count display
            if (currentCount >= 1000) {
                countSpan.textContent = (currentCount / 1000).toFixed(1) + 'k';
            } else {
                countSpan.textContent = currentCount;
            }
            
            // Button press animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Upload button functionality
    uploadBtn.addEventListener('click', function() {
        // Check if user is logged in
        if (!savedUser) {
            alert('❌ Você precisa estar logado para postar vídeos!');
            window.location.href = 'login.html';
            return;
        }
        
        // Create file input for video upload
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'video/*';
        fileInput.style.display = 'none';
        
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            
            if (!file) {
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('video/')) {
                alert('❌ Por favor, selecione apenas arquivos de vídeo!');
                return;
            }
            
            // Validate file size (max 50MB)
            const maxSize = 50 * 1024 * 1024; // 50MB
            if (file.size > maxSize) {
                alert('❌ O arquivo é muito grande! Máximo de 50MB permitido.');
                return;
            }
            
            // Show upload progress
            const uploadModal = createUploadModal();
            document.body.appendChild(uploadModal);
            
            // Simulate upload process
            const progressBar = uploadModal.querySelector('.progress-fill');
            const progressText = uploadModal.querySelector('.progress-text');
            let progress = 0;
            
            const uploadInterval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 100) progress = 100;
                
                progressBar.style.width = progress + '%';
                progressText.textContent = Math.round(progress) + '%';
                
                if (progress >= 100) {
                    clearInterval(uploadInterval);
                    
                    // Create URL for the video file
                    const videoURL = URL.createObjectURL(file);
                    
                    // Add new video to feed
                    addNewVideoToFeed(file, videoURL);
                    
                    // Close modal
                    setTimeout(() => {
                        uploadModal.remove();
                        alert('✅ Vídeo postado com sucesso! 🎬');
                    }, 1000);
                }
            }, 200);
        });
        
        // Request storage access and trigger file picker
        if (navigator.storage && navigator.storage.persist) {
            navigator.storage.persist().then(granted => {
                if (granted) {
                    console.log('✅ Acesso ao armazenamento concedido');
                } else {
                    console.log('⚠️ Acesso ao armazenamento não concedido');
                }
                fileInput.click();
            });
        } else {
            fileInput.click();
        }
        
        document.body.appendChild(fileInput);
        
        // Add rainbow effect to button
        this.style.background = 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #ff006e)';
        this.style.backgroundSize = '400% 400%';
        this.style.animation = 'gradientShift 0.5s ease';
        
        setTimeout(() => {
            this.style.background = 'linear-gradient(45deg, #ff006e, #8338ec)';
            this.style.animation = '';
            fileInput.remove();
        }, 500);
    });
    
    // Function to create upload modal
    function createUploadModal() {
        const modal = document.createElement('div');
        modal.className = 'upload-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>📤 Fazendo upload do seu vídeo...</h3>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="progress-text">0%</div>
                </div>
                <p>🎬 Preparando seu conteúdo retrô para a comunidade!</p>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = `
            .upload-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                backdrop-filter: blur(10px);
            }
            
            .modal-content {
                background: rgba(0, 0, 0, 0.9);
                border: 2px solid #ff006e;
                border-radius: 15px;
                padding: 30px;
                text-align: center;
                max-width: 400px;
                color: #fff;
                font-family: 'Courier New', monospace;
            }
            
            .modal-content h3 {
                margin-bottom: 20px;
                color: #ff006e;
            }
            
            .progress-container {
                margin: 20px 0;
            }
            
            .progress-bar {
                width: 100%;
                height: 20px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                overflow: hidden;
                margin-bottom: 10px;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(45deg, #ff006e, #8338ec);
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .progress-text {
                font-weight: bold;
                color: #ff006e;
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = modalStyles;
        document.head.appendChild(styleElement);
        
        return modal;
    }
    
    // Function to add new video to feed
    function addNewVideoToFeed(file, videoURL) {
        const userData = JSON.parse(savedUser);
        const videoFeed = document.getElementById('videoFeed');
        
        const newVideoCard = document.createElement('div');
        newVideoCard.className = 'video-card';
        newVideoCard.innerHTML = `
            <div class="video-container">
                <video class="retro-video" controls>
                    <source src="${videoURL}" type="${file.type}">
                </video>
            </div>
            <div class="video-info">
                <div class="user-info">
                    <div class="avatar">${userData.avatar}</div>
                    <span class="username">${userData.username}</span>
                </div>
                <p class="video-description">Meu novo vídeo retrô! #retro #gaming #nostalgia</p>
                <div class="video-actions">
                    <button class="action-btn like-btn">💜 <span>0</span></button>
                    <button class="action-btn comment-btn">💬 <span>0</span></button>
                    <button class="action-btn share-btn">📤 <span>0</span></button>
                </div>
            </div>
        `;
        
        // Insert at the beginning of the feed
        videoFeed.insertBefore(newVideoCard, videoFeed.firstChild);
        
        // Add event listeners to new video
        const video = newVideoCard.querySelector('.retro-video');
        const actionBtns = newVideoCard.querySelectorAll('.action-btn');
        
        video.addEventListener('click', function() {
            document.querySelectorAll('.video-card').forEach(c => c.classList.remove('active'));
            newVideoCard.classList.add('active');
            
            document.querySelectorAll('.retro-video').forEach(v => {
                if (v !== video) v.pause();
            });
        });
        
        // Add action button functionality
        actionBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const countSpan = this.querySelector('span');
                let currentCount = parseInt(countSpan.textContent);
                
                if (this.classList.contains('like-btn')) {
                    if (this.style.color === 'rgb(255, 0, 110)') {
                        currentCount -= 1;
                        this.style.color = '';
                    } else {
                        currentCount += 1;
                        this.style.color = '#ff006e';
                    }
                } else {
                    currentCount += 1;
                }
                
                countSpan.textContent = currentCount;
                
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
        
        // Make it active
        document.querySelectorAll('.video-card').forEach(c => c.classList.remove('active'));
        newVideoCard.classList.add('active');
        
        // Scroll to new video
        newVideoCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Add heart float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartFloat {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-50px) scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Auto-scroll effect for video feed
    let currentVideoIndex = 0;
    setInterval(() => {
        if (videoCards.length > 0) {
            const nextIndex = (currentVideoIndex + 1) % videoCards.length;
            videoCards[currentVideoIndex].classList.remove('active');
            videoCards[nextIndex].classList.add('active');
            currentVideoIndex = nextIndex;
            
            // Smooth scroll to active video
            videoCards[nextIndex].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }, 10000); // Change video every 10 seconds
    
    
    
    console.log('🎉 RetroTik carregado com sucesso! Bem-vindo aos anos 80/90! 📼');
});
