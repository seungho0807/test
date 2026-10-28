/**
 * MEGA MGC COFFEE - Main JavaScript
 * Tech Stack: Vanilla JS + Lenis.js + GSAP & ScrollTrigger + Swiper.js + Lucide Icons
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = initSmoothScroll();

  // 2. Initialize Swiper Carousels
  const { heroSwiper, menuSwiper } = initCarousels();

  // 3. Initialize GSAP ScrollTrigger Animations
  initScrollAnimations(lenis);

  // 4. Initialize Header & Mobile Drawer
  initHeaderAndDrawer(lenis);

  // 5. Initialize Menu Category Tabs
  initMenuFilter(menuSwiper);

  // 6. Initialize Interactive Modals & Actions
  initModals(lenis);

  // 7. Initialize Event Section Expansion
  initEventSection();

  // 8. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* ==========================================================================
   1. Lenis Smooth Scroll Setup
   ========================================================================== */
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis library not found. Falling back to default scroll.');
    return null;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.8,
  });

  // Synchronize Lenis with GSAP ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  return lenis;
}

/* ==========================================================================
   2. Swiper.js Sliders Setup
   ========================================================================== */
function initCarousels() {
  let heroSwiper = null;
  let menuSwiper = null;

  // Hero Banner Swiper
  if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
    heroSwiper = new Swiper('.hero-swiper', {
      loop: true,
      speed: 900,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.hero-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.hero-next-btn',
        prevEl: '.hero-prev-btn',
      },
    });
  }

  // MEGA MENU Swiper
  if (typeof Swiper !== 'undefined' && document.querySelector('.menu-swiper')) {
    menuSwiper = new Swiper('.menu-swiper', {
      slidesPerView: 1.35,
      spaceBetween: 16,
      speed: 550,
      grabCursor: true,
      navigation: {
        nextEl: '#next-menu-btn',
        prevEl: '#prev-menu-btn',
      },
      breakpoints: {
        480: {
          slidesPerView: 1.8,
          spaceBetween: 18,
        },
        640: {
          slidesPerView: 2.4,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
      on: {
        init: function () {
          updateMenuNavButtons(this);
        },
        slideChange: function () {
          updateMenuNavButtons(this);
        },
      },
    });
  }

  return { heroSwiper, menuSwiper };
}

function updateMenuNavButtons(swiper) {
  const prevBtn = document.getElementById('prev-menu-btn');
  const nextBtn = document.getElementById('next-menu-btn');
  if (!prevBtn || !nextBtn) return;

  if (swiper.isBeginning) {
    prevBtn.classList.add('opacity-40', 'cursor-not-allowed');
  } else {
    prevBtn.classList.remove('opacity-40', 'cursor-not-allowed');
  }

  if (swiper.isEnd) {
    nextBtn.classList.add('opacity-40', 'cursor-not-allowed');
  } else {
    nextBtn.classList.remove('opacity-40', 'cursor-not-allowed');
  }
}

/* ==========================================================================
   3. GSAP & ScrollTrigger Animations
   ========================================================================== */
function initScrollAnimations(lenis) {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Section Headers Reveal
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach((header) => {
    gsap.from(header.children, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });
  });

  // MEGA ORDER Visual Animation
  const orderVisual = document.querySelector('.order-visual-container');
  if (orderVisual) {
    gsap.from(orderVisual, {
      scrollTrigger: {
        trigger: orderVisual,
        start: 'top 80%',
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  }

  // MEGA EVENT Visible Cards Reveal
  const visibleEventCards = document.querySelectorAll('#mega-event .grid:not(#hidden-events) .event-card');
  if (visibleEventCards.length > 0) {
    gsap.from(visibleEventCards, {
      scrollTrigger: {
        trigger: '#mega-event',
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }

  // Refresh ScrollTrigger after all page assets load
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });

  // Floating Scroll-To-Top Button
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
        scrollTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
        scrollTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

/* ==========================================================================
   4. Header & Mobile Drawer Navigation
   ========================================================================== */
function initHeaderAndDrawer(lenis) {
  const header = document.getElementById('main-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerNavLinks = document.querySelectorAll('.drawer-nav-link');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 15) {
      header.classList.add('scrolled', 'shadow-md');
    } else {
      header.classList.remove('scrolled', 'shadow-md');
    }
  });

  // Mobile Drawer Toggle
  const openDrawer = () => {
    drawerBackdrop.classList.remove('hidden');
    setTimeout(() => {
      drawerBackdrop.classList.add('opacity-100');
      mobileDrawer.classList.remove('translate-x-full');
    }, 10);
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };

  const closeDrawer = () => {
    drawerBackdrop.classList.remove('opacity-100');
    mobileDrawer.classList.add('translate-x-full');
    setTimeout(() => {
      drawerBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }, 300);
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        closeDrawer();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          setTimeout(() => {
            if (lenis) {
              lenis.scrollTo(targetEl, { offset: -70, duration: 1 });
            } else {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          }, 350);
        }
      }
    });
  });

  // Desktop smooth anchor scroll
  document.querySelectorAll('header nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -70, duration: 1 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // Escape key closes drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!mobileDrawer.classList.contains('translate-x-full')) {
        closeDrawer();
      }
    }
  });
}

/* ==========================================================================
   5. MEGA MENU Category Filter
   ========================================================================== */
function initMenuFilter(menuSwiper) {
  const tabs = document.querySelectorAll('.menu-category-tab');
  const slides = document.querySelectorAll('.menu-swiper .swiper-slide');

  if (!tabs.length || !slides.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('bg-gray-900', 'text-white', 'border-gray-900', 'active');
        t.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
      });

      tab.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
      tab.classList.add('bg-gray-900', 'text-white', 'border-gray-900', 'active');

      const category = tab.dataset.category;

      slides.forEach((slide) => {
        const itemCategory = slide.dataset.category;
        if (category === 'all' || itemCategory === category) {
          slide.style.display = '';
        } else {
          slide.style.display = 'none';
        }
      });

      if (menuSwiper) {
        menuSwiper.update();
        menuSwiper.slideTo(0, 400);
      }
    });
  });
}

/* ==========================================================================
   6. Interactive Modals & Actions
   ========================================================================== */
function initModals(lenis) {
  const openModal = (backdropId, modalId) => {
    const backdrop = document.getElementById(backdropId);
    const modal = document.getElementById(modalId);
    if (!backdrop || !modal) return;

    backdrop.classList.remove('hidden');
    modal.classList.remove('hidden');

    setTimeout(() => {
      backdrop.classList.add('opacity-100');
      modal.classList.add('opacity-100', 'scale-100');
      modal.classList.remove('scale-95');
    }, 10);

    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };

  const closeModal = (backdropId, modalId) => {
    const backdrop = document.getElementById(backdropId);
    const modal = document.getElementById(modalId);
    if (!backdrop || !modal) return;

    backdrop.classList.remove('opacity-100');
    modal.classList.remove('opacity-100', 'scale-100');
    modal.classList.add('scale-95');

    setTimeout(() => {
      backdrop.classList.add('hidden');
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }, 250);
  };

  // Helper to attach modal open/close listeners
  const setupModalPair = (openButtonsSelector, backdropId, modalId, closeButtonId) => {
    const openBtns = document.querySelectorAll(openButtonsSelector);
    const backdrop = document.getElementById(backdropId);
    const closeBtn = document.getElementById(closeButtonId);

    openBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(backdropId, modalId);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(backdropId, modalId));
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => closeModal(backdropId, modalId));
    }
  };

  // 1) Store Modal
  setupModalPair('.open-store-modal', 'store-backdrop', 'store-modal', 'close-store-modal');

  // Store Search Filtering inside Store Modal
  const storeSearchInput = document.getElementById('store-search-input');
  const storeItems = document.querySelectorAll('.store-item');
  if (storeSearchInput && storeItems.length) {
    storeSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      storeItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // Store select item clicks
  storeItems.forEach((item) => {
    item.addEventListener('click', () => {
      const storeName = item.querySelector('.store-name')?.textContent || '선택한 매장';
      showToast(`📍 '${storeName}'이(가) 주문 매장으로 지정되었습니다.`);
      closeModal('store-backdrop', 'store-modal');
    });
  });

  // 2) Order Modal
  setupModalPair('.open-order-modal', 'order-backdrop', 'order-modal', 'close-order-modal');

  // 3) Seasonal Detail Modal
  setupModalPair('#season-detail-btn, .open-season-modal', 'season-backdrop', 'season-modal', 'close-season-modal');

  // 4) Drink Quick Details Modal
  const drinkCards = document.querySelectorAll('.menu-card');
  drinkCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked a specific child button with its own action
      const title = card.querySelector('h3')?.textContent || '메가커피 메뉴';
      const price = card.querySelector('.menu-price')?.textContent || '2,000원';
      const desc = card.querySelector('.menu-desc')?.textContent || '메가MGC커피 시그니처 메뉴';
      const imgSrc = card.querySelector('img')?.getAttribute('src') || '';
      const tag = card.querySelector('.menu-tag')?.textContent || 'HOT/ICE';

      openDrinkDetailModal({ title, price, desc, imgSrc, tag });
    });
  });

  // Global ESC key to close all active modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ['store', 'order', 'season', 'drink'].forEach((type) => {
        const backdrop = document.getElementById(`${type}-backdrop`);
        if (backdrop && !backdrop.classList.contains('hidden')) {
          closeModal(`${type}-backdrop`, `${type}-modal`);
        }
      });
    }
  });
}

/* ==========================================================================
   Drink Item Detail Modal Generator
   ========================================================================== */
function openDrinkDetailModal(data) {
  const modal = document.getElementById('drink-modal');
  const backdrop = document.getElementById('drink-backdrop');
  if (!modal || !backdrop) return;

  // Fill in content
  document.getElementById('drink-modal-title').textContent = data.title;
  document.getElementById('drink-modal-desc').textContent = data.desc;
  document.getElementById('drink-modal-price').textContent = data.price;
  document.getElementById('drink-modal-tag').textContent = data.tag;
  const imgEl = document.getElementById('drink-modal-img');
  if (imgEl) imgEl.src = data.imgSrc;

  backdrop.classList.remove('hidden');
  modal.classList.remove('hidden');

  setTimeout(() => {
    backdrop.classList.add('opacity-100');
    modal.classList.add('opacity-100', 'scale-100');
    modal.classList.remove('scale-95');
  }, 10);

  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('close-drink-modal');
  const close = () => {
    backdrop.classList.remove('opacity-100');
    modal.classList.remove('opacity-100', 'scale-100');
    modal.classList.add('scale-95');
    setTimeout(() => {
      backdrop.classList.add('hidden');
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  };

  if (closeBtn) closeBtn.onclick = close;
  backdrop.onclick = close;

  // Order button inside drink modal
  const orderBtn = document.getElementById('drink-modal-order-btn');
  if (orderBtn) {
    orderBtn.onclick = () => {
      close();
      showToast(`☕ '${data.title}'이(가) 메가오더 장바구니에 담겼습니다!`);
    };
  }
}

/* ==========================================================================
   7. MEGA EVENT View More Toggle
   ========================================================================== */
function initEventSection() {
  const moreBtn = document.getElementById('more-event-btn');
  const hiddenEvents = document.getElementById('hidden-events');
  const btnText = document.getElementById('more-event-btn-text');
  const btnIcon = document.getElementById('more-event-btn-icon');

  if (!moreBtn || !hiddenEvents) return;

  moreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isHidden = hiddenEvents.classList.contains('hidden');

    if (isHidden) {
      hiddenEvents.classList.remove('hidden');
      hiddenEvents.classList.add('grid');
      btnText.textContent = '이벤트 접기';
      if (btnIcon) btnIcon.classList.add('rotate-180');

      const extraCards = hiddenEvents.querySelectorAll('.event-card');
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(
          extraCards,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
        );
      } else {
        extraCards.forEach((card) => {
          card.style.opacity = '1';
          card.style.transform = 'none';
        });
      }

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    } else {
      hiddenEvents.classList.add('hidden');
      hiddenEvents.classList.remove('grid');
      btnText.textContent = '이벤트 더보기';
      if (btnIcon) btnIcon.classList.remove('rotate-180');

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }
  });

  // Event cards click opens alert or toast
  const eventCards = document.querySelectorAll('.event-card');
  eventCards.forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3')?.textContent || '이벤트';
      showToast(`🎉 '${title}' 상세 프로모션 페이지로 이동합니다.`);
    });
  });
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-black/90 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 opacity-0 pointer-events-none translate-y-3 flex items-center gap-2 border border-yellow-400/30';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="w-2 h-2 rounded-full bg-[#FFD100]"></span><span>${message}</span>`;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-3');
  toast.classList.add('opacity-100', 'translate-y-0');

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-3');
    toast.classList.remove('opacity-100', 'translate-y-0');
  }, 3000);
}
