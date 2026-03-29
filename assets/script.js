(function () {
  const btn = document.getElementById('get');
  const img = document.getElementById('result');
  const code = document.getElementById('code');
  const loadingEl = document.getElementById('loading');
  const themeToggle = document.getElementById('theme-toggle');

  const elements = {
    name: document.getElementById('name'),
    theme: document.getElementById('theme'), // hidden input
    padding: document.getElementById('padding'),
    offset: document.getElementById('offset'),
    align: document.getElementById('align'),
    scale: document.getElementById('scale'),
    pixelated: document.getElementById('pixelated'),
    darkmode: document.getElementById('darkmode'),
    count: document.getElementById('count'),
    prefix: document.getElementById('prefix'),
    crop: document.getElementById('crop')
  };

  const sizeSelect = document.getElementById('size-select');
  const sizeCustom = document.getElementById('size-custom');

  // =========================
  // Custom Theme Dropdown
  // =========================
  const dropdown = document.getElementById('theme-dropdown');
  const dropdownSelected = document.getElementById('theme-selected');
  const dropdownList = document.getElementById('theme-list');
  const themeInput = elements.theme;

  // Load dropdown preview images eagerly (they are tiny with size=20)
  function loadDropdownPreviews() {
    const imgs = dropdownList.querySelectorAll('.dropdown-preview[data-src]');
    imgs.forEach(img => {
      if (!img.src || img.src === window.location.href) {
        img.src = img.getAttribute('data-src');
      }
    });
  }

  // Toggle dropdown open/close
  dropdownSelected.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    if (isOpen) loadDropdownPreviews();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  // Item selection
  dropdownList.addEventListener('click', (e) => {
    const item = e.target.closest('.custom-dropdown-item');
    if (!item) return;

    const value = item.getAttribute('data-value');
    const text = item.querySelector('span').textContent;

    // Update selected
    dropdownSelected.querySelector('.selected-text').textContent = text;
    themeInput.value = value;

    // Update active class
    dropdownList.querySelectorAll('.custom-dropdown-item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');

    // Close dropdown
    dropdown.classList.remove('open');

    // Trigger generate
    throttledGenerate();
  });

  // Helper: select a theme in the custom dropdown by value
  function selectThemeByValue(value) {
    const items = dropdownList.querySelectorAll('.custom-dropdown-item');
    items.forEach(item => {
      if (item.getAttribute('data-value') === value) {
        const text = item.querySelector('span').textContent;
        dropdownSelected.querySelector('.selected-text').textContent = text;
        themeInput.value = value;
        dropdownList.querySelectorAll('.custom-dropdown-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
      }
    });
  }

  // "Use This Theme" button in modal
  const useThemeBtn = document.getElementById('theme-modal-use');
  const modalUrl = document.getElementById('theme-modal-url');

  if (useThemeBtn) {
    useThemeBtn.addEventListener('click', () => {
      const title = document.getElementById('theme-modal-title');
      if (!title) return;
      const themeName = title.textContent;
      selectThemeByValue(themeName);

      // Animation
      if (typeof party !== 'undefined') {
        party.confetti(useThemeBtn, { count: party.variation.range(40, 60) });
      }

      // Close modal
      setTimeout(() => {
        document.getElementById('theme-modal').classList.remove('open');
        document.body.style.overflow = '';
        // Scroll to generator
        const genSection = document.querySelector('.tool');
        if (genSection) genSection.scrollIntoView({ block: 'start', behavior: 'smooth' });
        throttledGenerate();
      }, 300);
    });
  }

  if (modalUrl) {
    modalUrl.addEventListener('click', (e) => {
      const text = e.target.textContent;
      navigator.clipboard.writeText(text).then(() => {
        if (typeof party !== 'undefined') {
          party.sparkles(e.target, { count: party.variation.range(20, 30) });
        }
        const original = e.target.textContent;
        // Visual feedback
        e.target.textContent = '✨ Copied to clipboard!';
        setTimeout(() => { e.target.textContent = original; }, 1500);
      });
    });
  }

  // Global functions for inline pug calls
  window.showThemeModal = function(name) {
    const modal = document.getElementById('theme-modal');
    const img = document.getElementById('theme-modal-img');
    const title = document.getElementById('theme-modal-title');
    const url = document.getElementById('theme-modal-url');
    if (!modal || !img || !title || !url) return;

    title.textContent = name;
    img.src = `${__global_data.site}/@demo?theme=${name}`;
    url.textContent = `${__global_data.site}/@:name?theme=${name}`;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (typeof party !== 'undefined') {
      party.sparkles(modal.querySelector('.theme-modal-content'), { count: party.variation.range(30, 50) });
    }
  };

  window.closeThemeModal = function(e) {
    const modal = document.getElementById('theme-modal');
    if (e && e.target !== modal && !e.target.classList.contains('theme-modal-close')) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  // =========================
  // Dark/Light Theme Toggle
  // =========================
  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('aadish-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  const savedTheme = localStorage.getItem('aadish-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
    if (typeof party !== 'undefined') {
      party.sparkles(themeToggle, { count: 15 });
    }
  });

  // =========================
  // Size Dropdown
  // =========================
  sizeSelect.addEventListener('change', () => {
    if (sizeSelect.value === 'custom') {
      sizeCustom.style.display = 'inline-block';
      sizeCustom.focus();
    } else {
      sizeCustom.style.display = 'none';
      sizeCustom.value = '';
    }
  });

  function getSizeValue() {
    if (sizeSelect.value === 'custom') return sizeCustom.value || '0';
    return sizeSelect.value || '0';
  }

  // =========================
  // Advanced Options — only toggle on button click
  // =========================
  const advancedDetails = document.getElementById('advanced-details');
  const advancedSummary = document.getElementById('advanced-summary');
  if (advancedDetails && advancedSummary) {
    advancedSummary.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = advancedDetails.hasAttribute('open');
      if (isOpen) {
        advancedDetails.removeAttribute('open');
      } else {
        advancedDetails.setAttribute('open', '');
        if (typeof party !== 'undefined') party.sparkles(advancedSummary, { count: 10 });
      }
    });
  }

  // =========================
  // Event Listeners
  // =========================
  const throttledGenerate = throttle(handleButtonClick, 600);

  btn.addEventListener('click', (e) => {
    throttledGenerate();
  });

  code.addEventListener('click', selectCodeText);

  // Auto-generate on dropdown/checkbox changes (NOT text inputs)
  [elements.padding, elements.crop, elements.pixelated,
   elements.darkmode, elements.align, sizeSelect].forEach(el => {
    if (el) el.addEventListener('change', throttledGenerate);
  });

  if (sizeCustom) sizeCustom.addEventListener('blur', throttledGenerate);

  const mainTitle = document.querySelector('#main_title');
  const themesDetails = document.querySelector('#themes');
  const moreTheme = document.querySelector('#more_theme');

  if (mainTitle) {
    mainTitle.addEventListener('click', throttle(() => {
      if (typeof party !== 'undefined') party.sparkles(document.documentElement, { count: party.variation.range(40, 100) });
    }, 1000));
  }
  if (moreTheme) {
    moreTheme.addEventListener('click', () => {
      if (themesDetails && !themesDetails.hasAttribute('open')) {
        if (typeof party !== 'undefined') party.sparkles(moreTheme, { count: party.variation.range(20, 40) });
        setTimeout(() => themesDetails.scrollIntoView({ block: 'start', behavior: 'smooth' }), 100);
      }
    });
  }

  // =========================
  // Generate
  // =========================
  function handleButtonClick() {
    const { name, theme, padding, count, crop, offset, align, scale, pixelated, darkmode, prefix } = elements;
    const nameValue = name.value.trim();
    
    if (!nameValue) {
      if (loadingEl) {
        loadingEl.textContent = '⚠️ Please enter a unique name/ID first!';
        loadingEl.style.display = 'block';
        loadingEl.style.backgroundColor = 'var(--accent-red)';
        loadingEl.style.color = '#fff';
      }
      name.focus();
      name.style.borderColor = 'var(--accent-red)';
      setTimeout(() => { name.style.borderColor = ''; }, 2000);
      return;
    }

    if (loadingEl) {
      loadingEl.style.backgroundColor = ''; // Reset
      loadingEl.style.color = '';
    }

    let finalCount = count.value;
    if (finalCount === '') {
      finalCount = '123456789';
      count.value = finalCount;
    }

    const params = {
      theme: theme.value || 'moebooru',
      padding: padding.value || '7',
      count: finalCount,
      crop: crop.checked ? 'true' : 'false'
    };

    const sizeVal = getSizeValue();
    if (sizeVal && sizeVal !== '0') params.size = sizeVal;
    if (offset && offset.value && offset.value !== '0') params.offset = offset.value;
    if (scale && scale.value && scale.value !== '1') params.scale = scale.value;
    if (align && align.value && align.value !== 'top') params.align = align.value;
    if (pixelated && !pixelated.checked) params.pixelated = '0';
    if (darkmode && darkmode.value && darkmode.value !== 'auto') params.darkmode = darkmode.value;
    if (prefix && prefix.value !== '' && prefix.value !== '-1') params.prefix = prefix.value;

    const query = new URLSearchParams(params).toString();
    const imgSrc = `${__global_data.site}/@${nameValue}?${query}`;

    if (loadingEl) {
      loadingEl.textContent = '🔄 Generating...';
      loadingEl.style.display = 'block';
    }
    img.style.display = 'none';
    btn.setAttribute('disabled', '');

    img.onload = () => {
      if (loadingEl) loadingEl.style.display = 'none';
      img.style.display = 'block';
      img.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      code.textContent = imgSrc;
      code.style.display = 'block';
      btn.removeAttribute('disabled');
      if (typeof party !== 'undefined') {
        party.confetti(btn, { count: party.variation.range(20, 40) });
      }
    };

    img.onerror = async () => {
      if (loadingEl) { loadingEl.textContent = '❌ Failed to load'; loadingEl.style.display = 'block'; }
      btn.removeAttribute('disabled');
      try { const res = await fetch(imgSrc); if (!res.ok) { const d = await res.json(); if (d.message && loadingEl) loadingEl.textContent = `❌ ${d.message}`; } } catch(e) {}
    };

    img.src = `${imgSrc}&_=${Date.now()}`;
  }

  // =========================
  // Helpers
  // =========================
  function selectCodeText(e) {
    e.preventDefault();
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(e.target);
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      navigator.clipboard.writeText(e.target.textContent).then(() => {
        if (typeof party !== 'undefined') party.sparkles(e.target, { count: 10 });
      });
    } catch(err) {}
  }

  function throttle(fn, threshold = 250) {
    let last, deferTimer;
    return function (...args) {
      const now = Date.now();
      if (last && now < last + threshold) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(() => { last = now; fn.apply(this, args); }, threshold);
      } else {
        last = now;
        fn.apply(this, args);
      }
    };
  }
})();

// Lazy Load
(() => {
  function lazyLoad(options = {}) {
    const { selector = 'img[data-src]:not([src])', loading = '', failed = '', rootMargin = '500px', threshold = 0.01 } = options;
    const images = document.querySelectorAll(selector);
    if (!('IntersectionObserver' in window)) { images.forEach(img => { img.src = img.getAttribute('data-src'); }); return; }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          obs.unobserve(img);
          img.onerror = failed ? () => { img.src = failed; img.setAttribute('data-failed', ''); } : null;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-loading');
        }
      });
    }, { rootMargin, threshold });
    images.forEach(img => { if (loading) { img.src = loading; img.setAttribute('data-loading', ''); } observer.observe(img); });
  }
  const opts = { selector: 'img[data-src]:not([src])', loading: `${__global_data.site}/img/loading.svg`, failed: `${__global_data.site}/img/failed.svg`, rootMargin: '500px', threshold: 0.01 };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => lazyLoad(opts)) : lazyLoad(opts);
})();

// Back to top
(() => {
  let isShow = false, lock = false;
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (lock) return;
    const st = document.body.scrollTop || document.documentElement.scrollTop;
    if (st >= 800) { if (!isShow) { btn.classList.add('load'); isShow = true; } }
    else if (isShow) { btn.classList.remove('load'); isShow = false; }
  });
  btn.addEventListener('click', () => {
    lock = true; btn.classList.add('ani-leave');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => { btn.classList.remove('ani-leave'); btn.classList.add('leaved'); }, 390);
    setTimeout(() => btn.classList.add('ending'), 120);
    setTimeout(() => btn.classList.remove('load'), 1500);
    setTimeout(() => { lock = false; isShow = false; btn.classList.remove('leaved', 'ending'); }, 2000);
  });
})();

(() => { document.addEventListener('gesturestart', e => e.preventDefault()); })();
