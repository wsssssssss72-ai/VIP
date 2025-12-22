// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('quantumPreloader');
  
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
      checkVerification();
    }, 800);
  }, 2000);
});

// ===== VERIFICATION SYSTEM =====
function checkVerification() {
  const KEY = 'madxraj_quantum_access';
  const VALIDITY = 24 * 60 * 60 * 1000; // 24 hours
  
  const params = new URLSearchParams(window.location.search);
  
  // Auto-verify if ?quantum-access is present
  if (params.has('quantum-access')) {
    localStorage.setItem(KEY, Date.now().toString());
    history.replaceState({}, '', location.pathname);
    showMainContent();
    return;
  }
  
  const lastAccess = localStorage.getItem(KEY);
  
  if (lastAccess) {
    const diff = Date.now() - parseInt(lastAccess);
    if (diff < VALIDITY) {
      showMainContent();
      return;
    }
  }
  
  // Show verification portal
  setTimeout(() => {
    document.getElementById('verificationPortal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }, 500);
}

function showMainContent() {
  document.getElementById('mainContent').style.display = 'block';
  initializePage();
}

document.getElementById('quantumVerifyBtn').addEventListener('click', () => {
  localStorage.setItem('madxraj_quantum_access', Date.now().toString());
  document.getElementById('verificationPortal').classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(showMainContent, 300);
});

// ===== INITIALIZE PAGE =====
function initializePage() {
  // Navigation scroll effect
  const nav = document.querySelector('.quantum-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  });
  
  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Explore batches button
  document.getElementById('exploreBatches').addEventListener('click', () => {
    document.getElementById('batches').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
  
  // ===== SIMPLE CARD CLICK SYSTEM =====
  // When user clicks any card:
  // 1. Show loading (5 seconds)
  // 2. Then redirect to the card's link
  
  document.querySelectorAll('.batch-card').forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent immediate redirect
      
      const link = this.getAttribute('href');
      const title = this.getAttribute('data-title') || 'Course Content';
      
      if (!link) return;
      
      // Show loading overlay
      const loading = document.getElementById('quantumLoading');
      const loadingPercent = document.getElementById('loadingPercent');
      const loadingProgress = document.getElementById('loadingProgress');
      const loadingTitle = document.getElementById('loadingTitle');
      
      loadingTitle.textContent = `Opening: ${title}`;
      loadingPercent.textContent = '0%';
      loadingProgress.style.width = '0%';
      loading.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Simulate loading progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1;
        loadingPercent.textContent = `${progress}%`;
        loadingProgress.style.width = `${progress}%`;
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // Hide loading and redirect after a short delay
          setTimeout(() => {
            loading.classList.remove('active');
            
            // Redirect to the link (opens in same tab)
            window.location.href = link;
            // OR open in new tab: window.open(link, '_blank');
            
            // Restore scrolling after redirect
            setTimeout(() => {
              document.body.style.overflow = '';
            }, 100);
          }, 300);
        }
      }, 50); // 5 seconds total (100 steps * 50ms)
    });
  });
  
  // Initialize Three.js visualizer
  initHeroVisualizer();
  initParticles();
  
  // Card hover effects
  document.querySelectorAll('.batch-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = ((x - centerX) / centerX) * 5;
      const rotateX = ((centerY - y) / centerY) * 5;
      
      card.style.transform = `
        perspective(1000px) 
        translateY(-15px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(1.02)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) translateY(-15px) rotateX(0) rotateY(0) scale(1.02)';
    });
  });
}

// ===== THREE.JS HERO VISUALIZER =====
function initHeroVisualizer() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || !window.THREE) return;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    canvas, 
    alpha: true, 
    antialias: true 
  });
  
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  camera.position.z = 5;
  
  // Create quantum structure
  const group = new THREE.Group();
  
  // Central nucleus
  const nucleusGeometry = new THREE.IcosahedronGeometry(0.8, 3);
  const nucleusMaterial = new THREE.MeshStandardMaterial({
    color: 0x6C63FF,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x2D5BFF,
    emissiveIntensity: 0.3
  });
  const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
  group.add(nucleus);
  
  // Orbiting electrons
  const electronCount = 6;
  const electrons = [];
  
  for (let i = 0; i < electronCount; i++) {
    const electronGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const electronMaterial = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? 0x00F7FF : 0x00FF9D,
      metalness: 0.9,
      roughness: 0.1,
      emissive: i % 2 === 0 ? 0x00F7FF : 0x00FF9D,
      emissiveIntensity: 0.5
    });
    
    const electron = new THREE.Mesh(electronGeometry, electronMaterial);
    electrons.push(electron);
    group.add(electron);
  }
  
  // Energy field
  const fieldGeometry = new THREE.IcosahedronGeometry(2, 2);
  const fieldMaterial = new THREE.MeshBasicMaterial({
    color: 0x6C63FF,
    transparent: true,
    opacity: 0.05,
    wireframe: true
  });
  const energyField = new THREE.Mesh(fieldGeometry, fieldMaterial);
  group.add(energyField);
  
  scene.add(group);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const pointLight1 = new THREE.PointLight(0x6C63FF, 2, 20);
  pointLight1.position.set(3, 3, 3);
  scene.add(pointLight1);
  
  const pointLight2 = new THREE.PointLight(0x00F7FF, 1.5, 20);
  pointLight2.position.set(-3, -3, 3);
  scene.add(pointLight2);
  
  // Animation
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    
    // Rotate nucleus
    nucleus.rotation.x = time * 0.3;
    nucleus.rotation.y = time * 0.5;
    
    // Pulsing effect
    nucleus.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    
    // Animate electrons
    electrons.forEach((electron, i) => {
      const angle = time * 0.5 + (i / electronCount) * Math.PI * 2;
      const radius = 2 + Math.sin(time + i) * 0.2;
      electron.position.x = Math.cos(angle) * radius;
      electron.position.y = Math.sin(angle * 1.5) * 0.5;
      electron.position.z = Math.sin(angle) * radius;
      
      // Electron spin
      electron.rotation.x = time * 2;
      electron.rotation.y = time * 2;
    });
    
    // Rotate energy field
    energyField.rotation.x = time * 0.1;
    energyField.rotation.y = time * 0.15;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle resize
  window.addEventListener('resize', () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  });
}

// ===== FLOATING PARTICLES =====
function initParticles() {
  const canvas = document.getElementById('floatingParticles');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 100;
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: Math.random() > 0.5 ? '#6C63FF' : '#00F7FF',
      opacity: Math.random() * 0.5 + 0.1
    });
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
      
      // Draw connections
      particles.forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = particle.color;
          ctx.globalAlpha = particle.opacity * (1 - distance / 100) * 0.3;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    });
    
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
  
  // Handle resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
