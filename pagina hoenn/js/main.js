document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  // 1. Navbar activa según sección visible al hacer scroll
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);

    let currentId = 'inicio';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 180) {
        currentId = sec.getAttribute('id');
      }
    });

    navItems.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === currentId);
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // 2. Menú móvil / hamburguesa
  menuToggle.addEventListener('click', () => mobileDrawer.classList.toggle('open'));
  drawerLinks.forEach((link) => link.addEventListener('click', () => mobileDrawer.classList.remove('open')));

  // 3. Filtro de proyectos (TODOS / ILUSTRACION / AUDIOVISUAL / CONCEPTOS)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        card.classList.toggle('hidden-card', filter !== 'todos' && card.dataset.category !== filter);
      });
    });
  });

  // 4. Ventana Modal (Proyectos, Sobre Mí y Formulario)
  const modal = document.getElementById('cyberModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');

  const openModal = (html) => {
    modalBody.innerHTML = html;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  document.querySelectorAll('.project-card, .video-trigger').forEach((item) => {
  item.addEventListener('click', () => {
    const isVideo = item.dataset.type === 'video';
    const mediaHtml = isVideo
      ? `<video src="${item.dataset.src}" controls autoplay playsinline style="width:100%;height:100%;object-fit:cover;"></video>`
      : `<img src="${item.dataset.src}" alt="${item.dataset.title}" />`;

    openModal(`
      <p class="modal-tag">${isVideo ? '// REPRODUCCIÓN AUDIOVISUAL' : '// PIEZA VISUAL'}</p>
      <div class="modal-media">${mediaHtml}</div>
      <h3 class="modal-title">${item.dataset.title}</h3>
      <p class="modal-desc">${item.dataset.desc}</p>
    `);
  });
});

  document.getElementById('openManifestoBtn')?.addEventListener('click', () => {
    openModal(`
      <p class="modal-tag">03 // IDENTIDAD & VISIÓN</p>
      <h3 class="modal-title">DETRÁS DE HOENN</h3>
      <p class="modal-desc" style="margin-bottom: 14px;">
        HOENN es una marca personal enfocada en fusionar la narrativa de la ilustración con el ritmo del lenguaje audiovisual contemporáneo.
      </p>
      <p class="modal-desc">
        Cada pieza busca construir un universo propio donde la luz, el color y la historia hablen por sí solos.
      </p>
    `);
  });

  document.getElementById('openContactModalBtn')?.addEventListener('click', () => {
    openModal(`
      <p class="modal-tag">04 // NUEVA CONEXIÓN</p>
      <h3 class="modal-title">INICIAR PROYECTO</h3>
      <p class="modal-desc">Cuéntame tu idea de ilustración, video o dirección visual.</p>
      <form class="cyber-form" id="contactForm">
        <label>TU NOMBRE / MARCA <input type="text" required placeholder="Ej. Estudio Nova" /></label>
        <label>CORREO ELECTRÓNICO <input type="email" required placeholder="tu@correo.com" /></label>
        <label>IDEA O PROYECTO <textarea rows="3" required placeholder="Describe brevemente lo que quieres crear..."></textarea></label>
        <button type="submit" class="btn-cyber" style="justify-content: center;"><span>ENVIAR MENSAJE</span><span class="arrow">→</span></button>
      </form>
    `);

    document.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      modalBody.innerHTML = `
        <p class="modal-tag">// TRANSMISIÓN COMPLETADA</p>
        <h3 class="modal-title">MENSAJE ENVIADO</h3>
        <p class="modal-desc">Gracias por escribir a HOENN. Pronto nos ponemos en contacto.</p>
      `;
    });
  });
});