// ============================================
// KOWSIK S — PORTFOLIO SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAVBAR SCROLL STATE ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- MOBILE MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- ACTIVE SECTION INDICATOR ---------- */
  const sections = ['home','about','skills','experience','projects','certificates','contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  const navLinkEls = document.querySelectorAll('.nav-links a');

  const setActive = (id) => {
    navLinkEls.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- HERO AVATAR SLIDESHOW (continuous horizontal scroll) ---------- */
  const slideTrack = document.getElementById('avatarSlideTrack');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (slideTrack) {
    const realSlideCount = slideTrack.children.length - 1; // last child is the cloned duplicate
    if (realSlideCount > 1 && !prefersReducedMotion) {
      let slideIndex = 0;
      setInterval(() => {
        slideIndex++;
        slideTrack.style.transition = 'transform 0.9s cubic-bezier(.65,0,.35,1)';
        slideTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
        if (slideIndex === realSlideCount) {
          // after reaching the cloned first slide, snap back instantly (invisible to the eye)
          setTimeout(() => {
            slideTrack.style.transition = 'none';
            slideTrack.style.transform = 'translateX(0%)';
            slideIndex = 0;
          }, 950);
        }
      }, 3200);
    }
  }

  /* ---------- CERTIFICATE DATA ---------- */
  const certificates = [
    {
      id: 'imagecon',
      title: 'Introduction to Information Technology – Fundamental of Python',
      issuer: 'Imagecon Academy',
      date: '26-11-2024',
      certId: 'IMAFC24081917',
      desc: 'Completion of the Introduction to Information Technology (Fundamental of Python) Course.',
      thumb: 'assets/certificates/imagecon.jpg',
      full: 'assets/certificates/imagecon.jpg',
      isPdf: false
    },
    {
      id: 'pirai',
      title: 'Pirai Infotech Internship Certificate',
      issuer: 'Pirai Infotech Private Limited',
      date: '22 June 2026 – 03 July 2026',
      certId: '—',
      desc: 'Data Analysis internship. Skills: Data Analysis, Data Cleaning, Data Visualization, Excel, SQL, Power BI.',
      thumb: 'assets/certificates/pirai-infotech.jpg',
      full: 'assets/certificates/pirai-infotech.jpg',
      isPdf: false
    },
    {
      id: 'techforge',
      title: 'Techforge Data Analyst Internship',
      issuer: 'Techforge',
      date: '13-01-2026 to 03-01-2026',
      certId: '—',
      desc: 'Data Analysts Intern internship completion certificate. Dates shown exactly as printed on the certificate.',
      thumb: 'assets/certificates/techforge.jpg',
      full: 'assets/certificates/techforge.jpg',
      isPdf: false
    },
    {
      id: 'vit',
      title: 'Designing Intelligent Agents: A Hands-on Workshop on Building Agentic AI Systems',
      issuer: 'Vellore Institute of Technology, Vellore',
      date: '25 October 2025',
      certId: '—',
      desc: 'National Level Online Workshop, organized by the Departments of Analytics and Database Systems, School of Computer Science and Engineering (SCOPE), VIT Vellore.',
      thumb: 'assets/certificates/vit-thumb.jpg',
      full: 'assets/certificates/vit.pdf',
      isPdf: true
    },
    {
      id: 'kalam',
      title: 'Dr. Kalam Young Achiever Award',
      issuer: 'World Youth Federation',
      date: '22-09-2025',
      certId: '—',
      desc: 'Certificate of Participant, for the project which most demonstrates an aptitude for engineering.',
      thumb: 'assets/certificates/kalam-thumb.jpg',
      full: 'assets/certificates/kalam.pdf',
      isPdf: true
    },
    {
      id: 'codealpha',
      title: 'CodeAlpha Power BI Virtual Internship',
      issuer: 'CodeAlpha',
      date: '10 June 2026 – 10 July 2026',
      certId: 'CA/DF1/125957',
      desc: 'Active Participant, CodeAlpha Virtual Internship Program in Power BI.',
      thumb: 'assets/certificates/codealpha-thumb.jpg',
      full: 'assets/certificates/codealpha.pdf',
      isPdf: true
    }
  ];

  /* ---------- RENDER CERTIFICATE GALLERY ---------- */
  const gallery = document.getElementById('certGallery');
  certificates.forEach((cert, idx) => {
    const tile = document.createElement('button');
    tile.className = 'cert-tile reveal';
    tile.setAttribute('data-index', idx);
    tile.innerHTML = `
      <div class="cert-thumb">
        <img src="${cert.thumb}" alt="${cert.title} certificate preview" loading="lazy">
        <div class="cert-thumb-overlay"><span>View ${cert.isPdf ? '&amp; open PDF' : 'full size'}</span></div>
      </div>
      <div class="cert-info">
        <h3>${cert.title}</h3>
        <p class="cert-issuer">${cert.issuer}</p>
        <p class="cert-date">${cert.date}</p>
      </div>
    `;
    gallery.appendChild(tile);
    revealObserver.observe(tile);
  });

  /* ---------- CERTIFICATE MODAL ---------- */
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalIssuer = document.getElementById('modalIssuer');
  const modalDate = document.getElementById('modalDate');
  const modalId = document.getElementById('modalId');
  const modalDesc = document.getElementById('modalDesc');
  const modalOpenTab = document.getElementById('modalOpenTab');
  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');

  let currentIndex = 0;

  function openModal(index) {
    currentIndex = (index + certificates.length) % certificates.length;
    const cert = certificates[currentIndex];
    modalImg.src = cert.thumb;
    modalImg.alt = cert.title + ' certificate';
    modalTitle.textContent = cert.title;
    modalIssuer.textContent = cert.issuer;
    modalDate.textContent = cert.date;
    modalId.textContent = cert.certId;
    modalDesc.textContent = cert.desc;
    modalOpenTab.href = cert.full;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  gallery.addEventListener('click', (e) => {
    const tile = e.target.closest('.cert-tile');
    if (tile) openModal(parseInt(tile.getAttribute('data-index'), 10));
  });

  // Also wire "View Internship Certificate" buttons in Experience section
  document.querySelectorAll('.cert-btn[data-cert]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-cert');
      const idx = certificates.findIndex(c => c.id === key);
      if (idx > -1) openModal(idx);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  modalPrev.addEventListener('click', () => openModal(currentIndex - 1));
  modalNext.addEventListener('click', () => openModal(currentIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') openModal(currentIndex - 1);
    if (e.key === 'ArrowRight') openModal(currentIndex + 1);
  });

});
