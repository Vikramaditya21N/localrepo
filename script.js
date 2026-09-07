/* ==========================================================================
   VIKRAMADITYA KUMAR - PORTFOLIO INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Load initial data
  let portfolioData = JSON.parse(document.getElementById('portfolio-initial-data').textContent);

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Theme & Accent System ---
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check stored theme
  const savedDarkMode = localStorage.getItem('portfolio-dark-mode');
  const savedThemeColor = localStorage.getItem('portfolio-theme-color');

  if (savedDarkMode !== null) {
    if (savedDarkMode === 'true') {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }

  if (savedThemeColor) {
    body.setAttribute('data-theme-color', savedThemeColor);
    document.querySelectorAll('.color-dot').forEach(dot => {
      dot.classList.toggle('active', dot.dataset.color === savedThemeColor);
    });
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-theme');
    if (isDark) {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      localStorage.setItem('portfolio-dark-mode', 'false');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      localStorage.setItem('portfolio-dark-mode', 'true');
    }
    if (window.lucide) window.lucide.createIcons();
  });

  // Color dots handler
  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const color = dot.dataset.color;
      body.setAttribute('data-theme-color', color);
      localStorage.setItem('portfolio-theme-color', color);
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  // --- Mouse Glow Movement ---
  const mouseGlow = document.getElementById('mouse-glow');
  window.addEventListener('mousemove', (e) => {
    if (mouseGlow) {
      mouseGlow.style.left = `${e.clientX}px`;
      mouseGlow.style.top = `${e.clientY}px`;
    }
  });

  // --- Mobile Menu Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const openMenuIcon = document.querySelector('.open-menu-icon');
  const closeMenuIcon = document.querySelector('.close-menu-icon');

  menuToggle?.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    if (openMenuIcon && closeMenuIcon) {
      openMenuIcon.style.display = isActive ? 'none' : 'block';
      closeMenuIcon.style.display = isActive ? 'block' : 'none';
    }
  });

  // Close mobile menu on click link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      if (openMenuIcon && closeMenuIcon) {
        openMenuIcon.style.display = 'block';
        closeMenuIcon.style.display = 'none';
      }
    });
  });

  // --- Hero Typing Effect ---
  const roles = [
    'Full Stack Developer',
    'MERN Stack Specialist',
    'Python & REST API Builder',
    'Algorithmic Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typing-text');

  function typeEffect() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // --- Render Dynamic Content ---
  function renderAll() {
    renderProfile();
    renderEducation();
    renderAchievements();
    renderSkills();
    renderExperience();
    renderProjects('all');
    renderSocialLinks();
    populateCustomizerInputs();
    if (window.lucide) window.lucide.createIcons();
  }

  function renderProfile() {
    const p = portfolioData.profile;
    document.getElementById('hero-name').textContent = p.name;
    document.getElementById('hero-tagline').textContent = p.tagline;
    document.getElementById('about-summary-text').textContent = p.aboutSummary;
    document.getElementById('about-location').textContent = p.location;
    document.getElementById('about-email').textContent = p.email;
    document.getElementById('stat-dsa').textContent = p.dsaSolved;
    document.getElementById('footer-name').textContent = p.name;
    
    // Contact panel
    document.getElementById('contact-email-text').textContent = p.email;
    document.getElementById('contact-email-link').href = `mailto:${p.email}`;
    document.getElementById('contact-phone-text').textContent = p.phone;
    document.getElementById('contact-phone-link').href = `tel:${p.phone.replace(/\s+/g, '')}`;
    document.getElementById('contact-location-text').textContent = p.location;

    // Resume button
    const resumeBtn = document.getElementById('resume-download-btn');
    if (resumeBtn && p.resumeUrl) {
      resumeBtn.href = p.resumeUrl;
    }
  }

  function renderEducation() {
    const container = document.getElementById('education-list');
    if (!container) return;
    container.innerHTML = portfolioData.education.map(edu => `
      <div class="edu-item">
        <h4>${edu.institution}</h4>
        <div class="degree">${edu.degree}</div>
        <div class="meta">${edu.duration} | ${edu.detail}</div>
      </div>
    `).join('');
  }

  function renderAchievements() {
    const container = document.getElementById('achievements-list');
    if (!container) return;
    container.innerHTML = portfolioData.achievements.map(ach => `
      <li>${ach}</li>
    `).join('');
  }

  function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    // Category icons mapping
    const icons = {
      'Languages': 'code-2',
      'Frontend': 'layout',
      'Backend': 'server',
      'Databases': 'database',
      'Database': 'database',
      'Tools & Cloud': 'cloud',
      'Tools/Libraries': 'wrench'
    };

    container.innerHTML = portfolioData.skills.map(cat => {
      const icon = icons[cat.category] || 'sparkles';
      return `
        <div class="skill-category-card">
          <div class="skill-cat-header">
            <div class="skill-cat-icon"><i data-lucide="${icon}"></i></div>
            <h3>${cat.category}</h3>
          </div>
          <div class="skill-tags">
            ${cat.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderExperience() {
    const container = document.getElementById('experience-timeline');
    if (!container) return;
    container.innerHTML = portfolioData.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <div>
              <h3 class="timeline-title">${exp.role}</h3>
              <div class="timeline-company">${exp.company}</div>
            </div>
            <div class="timeline-meta">
              <span><i data-lucide="map-pin"></i> ${exp.location}</span>
              <span><i data-lucide="calendar"></i> ${exp.duration}</span>
            </div>
          </div>
          <ul class="timeline-points">
            ${exp.points.map(pt => `<li>${pt}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  function renderProjects(filter = 'all') {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const filtered = filter === 'all' 
      ? portfolioData.projects 
      : portfolioData.projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    container.innerHTML = filtered.map(proj => `
      <div class="project-card">
        <div class="project-header">
          <h3 class="project-title">${proj.title}</h3>
          <div class="project-links">
            ${proj.liveLink ? `<a href="${proj.liveLink}" target="_blank" class="project-link-icon" title="Live Demo"><i data-lucide="external-link"></i></a>` : ''}
            ${proj.githubLink ? `<a href="${proj.githubLink}" target="_blank" class="project-link-icon" title="Source Code"><i data-lucide="github"></i></a>` : ''}
          </div>
        </div>
        <div class="project-tagline">${proj.tagline}</div>
        <p class="project-desc">${proj.description}</p>
        <div class="project-stack">
          ${proj.stack.map(s => `<span class="stack-badge">${s}</span>`).join('')}
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function renderSocialLinks() {
    const container = document.getElementById('social-links-container');
    if (!container) return;
    const p = portfolioData.profile;
    container.innerHTML = `
      ${p.github ? `<a href="${p.github}" target="_blank" class="social-btn" title="GitHub"><i data-lucide="github"></i></a>` : ''}
      ${p.linkedin ? `<a href="${p.linkedin}" target="_blank" class="social-btn" title="LinkedIn"><i data-lucide="linkedin"></i></a>` : ''}
      <a href="mailto:${p.email}" class="social-btn" title="Email"><i data-lucide="mail"></i></a>
    `;
  }

  // --- Project Filter Tabs ---
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });

  // --- Contact Form ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = 'Sending... <i data-lucide="loader"></i>';
    submitBtn.disabled = true;
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      formStatus.textContent = '✨ Message sent successfully! Vikramaditya will get back to you soon.';
      formStatus.className = 'form-status success';
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    }, 1200);
  });

  // --- Resume Modal Logic ---
  const resumeModal = document.getElementById('resume-modal');
  const resumeModalOverlay = document.getElementById('resume-modal-overlay');
  const resumeModalClose = document.getElementById('resume-modal-close');

  function openResumeModal() {
    resumeModal?.classList.add('active');
    resumeModalOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
    resumeModal?.classList.remove('active');
    resumeModalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.trigger-resume-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  resumeModalClose?.addEventListener('click', closeResumeModal);
  resumeModalOverlay?.addEventListener('click', closeResumeModal);

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResumeModal();
      closeCustomizer();
    }
  });

  // --- Portfolio Customizer Drawer Logic ---
  const customizerDrawer = document.getElementById('customizer-drawer');
  const customizerOverlay = document.getElementById('customizer-overlay');
  const customizerToggle = document.getElementById('customizer-toggle');
  const floatingSettingsBtn = document.getElementById('floating-settings-btn');
  const customizerClose = document.getElementById('customizer-close');

  function openCustomizer() {
    customizerDrawer.classList.add('active');
    customizerOverlay.classList.add('active');
  }

  function closeCustomizer() {
    customizerDrawer.classList.remove('active');
    customizerOverlay.classList.remove('active');
  }

  customizerToggle?.addEventListener('click', openCustomizer);
  floatingSettingsBtn?.addEventListener('click', openCustomizer);
  customizerClose?.addEventListener('click', closeCustomizer);
  customizerOverlay?.addEventListener('click', closeCustomizer);

  // Customizer Drawer Tabs
  document.querySelectorAll('.drawer-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.drawer-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(`tab-${tab.dataset.tab}`);
      if (panel) panel.classList.add('active');
    });
  });

  function populateCustomizerInputs() {
    const p = portfolioData.profile;
    // Profile inputs
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
    setVal('edit-name', p.name);
    setVal('edit-title', p.title);
    setVal('edit-tagline', p.tagline);
    setVal('edit-dsa-count', p.dsaSolved);
    setVal('edit-resume-url', p.resumeUrl);
    setVal('edit-email', p.email);
    setVal('edit-phone', p.phone);
    setVal('edit-location', p.location);
    setVal('edit-linkedin', p.linkedin);
    setVal('edit-github', p.github);
    setVal('edit-about-text', p.aboutSummary);

    // Live update profile listeners
    const bindLive = (id, key) => {
      const el = document.getElementById(id);
      if (el) {
        el.oninput = (e) => {
          portfolioData.profile[key] = e.target.value;
          renderProfile();
        };
      }
    };
    bindLive('edit-name', 'name');
    bindLive('edit-tagline', 'tagline');
    bindLive('edit-dsa-count', 'dsaSolved');
    bindLive('edit-resume-url', 'resumeUrl');
    bindLive('edit-email', 'email');
    bindLive('edit-phone', 'phone');
    bindLive('edit-location', 'location');
    bindLive('edit-linkedin', 'linkedin');
    bindLive('edit-github', 'github');
    bindLive('edit-about-text', 'aboutSummary');

    renderSkillsEditor();
    renderExperienceEditor();
    renderProjectsEditor();
  }

  function renderSkillsEditor() {
    const container = document.getElementById('edit-skills-list');
    if (!container) return;
    container.innerHTML = portfolioData.skills.map((skill, idx) => `
      <div class="edit-card">
        <div class="edit-card-header">
          <span class="edit-card-title">Category #${idx + 1}</span>
          <button class="delete-btn" onclick="deleteSkill(${idx})"><i data-lucide="trash-2"></i></button>
        </div>
        <div class="form-group" style="margin-bottom: 10px;">
          <label>Category Name</label>
          <input type="text" value="${skill.category}" oninput="updateSkillCategory(${idx}, this.value)">
        </div>
        <div class="form-group">
          <label>Items (comma-separated)</label>
          <input type="text" value="${skill.items.join(', ')}" oninput="updateSkillItems(${idx}, this.value)">
        </div>
      </div>
    `).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  window.updateSkillCategory = (idx, val) => {
    portfolioData.skills[idx].category = val;
    renderSkills();
  };

  window.updateSkillItems = (idx, val) => {
    portfolioData.skills[idx].items = val.split(',').map(s => s.trim()).filter(Boolean);
    renderSkills();
  };

  window.deleteSkill = (idx) => {
    portfolioData.skills.splice(idx, 1);
    renderSkills();
    renderSkillsEditor();
  };

  document.getElementById('add-skill-btn')?.addEventListener('click', () => {
    portfolioData.skills.push({ category: 'New Category', items: ['Item 1', 'Item 2'] });
    renderSkills();
    renderSkillsEditor();
  });

  function renderExperienceEditor() {
    const container = document.getElementById('edit-experience-list');
    if (!container) return;
    container.innerHTML = portfolioData.experience.map((exp, idx) => `
      <div class="edit-card">
        <div class="edit-card-header">
          <span class="edit-card-title">Experience #${idx + 1}</span>
          <button class="delete-btn" onclick="deleteExperience(${idx})"><i data-lucide="trash-2"></i></button>
        </div>
        <div class="form-group" style="margin-bottom: 10px;">
          <label>Role</label>
          <input type="text" value="${exp.role}" oninput="updateExpField(${idx}, 'role', this.value)">
        </div>
        <div class="form-group" style="margin-bottom: 10px;">
          <label>Company</label>
          <input type="text" value="${exp.company}" oninput="updateExpField(${idx}, 'company', this.value)">
        </div>
        <div class="form-group" style="margin-bottom: 10px;">
          <label>Duration</label>
          <input type="text" value="${exp.duration}" oninput="updateExpField(${idx}, 'duration', this.value)">
        </div>
        <div class="form-group">
          <label>Points (one per line)</label>
          <textarea rows="3" oninput="updateExpPoints(${idx}, this.value)">${exp.points.join('\n')}</textarea>
        </div>
      </div>
    `).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  window.updateExpField = (idx, key, val) => {
    portfolioData.experience[idx][key] = val;
    renderExperience();
  };

  window.updateExpPoints = (idx, val) => {
    portfolioData.experience[idx].points = val.split('\n').map(s => s.trim()).filter(Boolean);
    renderExperience();
  };

  window.deleteExperience = (idx) => {
    portfolioData.experience.splice(idx, 1);
    renderExperience();
    renderExperienceEditor();
  };

  document.getElementById('add-exp-btn')?.addEventListener('click', () => {
    portfolioData.experience.push({
      role: 'Software Engineer Intern',
      company: 'Tech Company',
      location: 'City / Remote',
      duration: 'Summer 2026',
      points: ['Contributed to high performance systems.', 'Built robust APIs.']
    });
    renderExperience();
    renderExperienceEditor();
  });

  function renderProjectsEditor() {
    const container = document.getElementById('edit-projects-list');
    if (!container) return;
    container.innerHTML = portfolioData.projects.map((proj, idx) => `
      <div class="edit-card">
        <div class="edit-card-header">
          <span class="edit-card-title">Project #${idx + 1}</span>
          <button class="delete-btn" onclick="deleteProject(${idx})"><i data-lucide="trash-2"></i></button>
        </div>
        <div class="form-group" style="margin-bottom: 8px;">
          <label>Title</label>
          <input type="text" value="${proj.title}" oninput="updateProjField(${idx}, 'title', this.value)">
        </div>
        <div class="form-group" style="margin-bottom: 8px;">
          <label>Tagline</label>
          <input type="text" value="${proj.tagline}" oninput="updateProjField(${idx}, 'tagline', this.value)">
        </div>
        <div class="form-group" style="margin-bottom: 8px;">
          <label>Description</label>
          <textarea rows="2" oninput="updateProjField(${idx}, 'description', this.value)">${proj.description}</textarea>
        </div>
        <div class="form-group" style="margin-bottom: 8px;">
          <label>Tech Stack (comma-separated)</label>
          <input type="text" value="${proj.stack.join(', ')}" oninput="updateProjStack(${idx}, this.value)">
        </div>
        <div class="form-group" style="margin-bottom: 8px;">
          <label>Live URL</label>
          <input type="text" value="${proj.liveLink || ''}" oninput="updateProjField(${idx}, 'liveLink', this.value)">
        </div>
        <div class="form-group">
          <label>GitHub URL</label>
          <input type="text" value="${proj.githubLink || ''}" oninput="updateProjField(${idx}, 'githubLink', this.value)">
        </div>
      </div>
    `).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  window.updateProjField = (idx, key, val) => {
    portfolioData.projects[idx][key] = val;
    renderProjects('all');
  };

  window.updateProjStack = (idx, val) => {
    portfolioData.projects[idx].stack = val.split(',').map(s => s.trim()).filter(Boolean);
    renderProjects('all');
  };

  window.deleteProject = (idx) => {
    portfolioData.projects.splice(idx, 1);
    renderProjects('all');
    renderProjectsEditor();
  };

  document.getElementById('add-proj-btn')?.addEventListener('click', () => {
    portfolioData.projects.push({
      title: 'New Web Project',
      category: 'mern',
      tagline: 'Modern Web Application',
      description: 'Engineered a scalable full-stack application with modern architecture.',
      stack: ['React', 'Node.js', 'Express', 'MongoDB'],
      liveLink: '',
      githubLink: 'https://github.com/vikram212v'
    });
    renderProjects('all');
    renderProjectsEditor();
  });

  // --- Export / Import Config ---
  document.getElementById('btn-export-json')?.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "vikramaditya-portfolio-data.json");
    dlAnchorElem.click();
  });

  document.getElementById('import-json-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        portfolioData = JSON.parse(event.target.result);
        renderAll();
        alert('🎉 Portfolio configuration imported successfully!');
      } catch (err) {
        alert('❌ Error parsing JSON file.');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('btn-download-html')?.addEventListener('click', () => {
    // Clone current DOM with embedded updated json
    const jsonScript = document.getElementById('portfolio-initial-data');
    if (jsonScript) {
      jsonScript.textContent = JSON.stringify(portfolioData, null, 2);
    }
    const htmlContent = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vikramaditya-portfolio.html';
    a.click();
    URL.revokeObjectURL(url);
  });

  // Initial render call
  renderAll();
});
