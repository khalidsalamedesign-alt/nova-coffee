(function(){
  var app = document.getElementById('app');
  var btn = document.getElementById('langBtn');
  var nodes = document.querySelectorAll('[data-en]');

  function setLang(l){
    var ar = l === 'ar';
    nodes.forEach(function(n){
      var v = ar ? n.getAttribute('data-ar') : n.getAttribute('data-en');
      if (v !== null) n.innerHTML = v;
    });
    app.setAttribute('dir', ar ? 'rtl' : 'ltr');
    app.setAttribute('lang', ar ? 'ar' : 'en');
    try {
      document.documentElement.setAttribute('dir', ar ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', ar ? 'ar' : 'en');
    } catch(e){}
    btn.textContent = ar ? 'EN' : 'عربي';
    btn.setAttribute('aria-label', ar ? 'Switch to English' : 'التبديل إلى العربية');
    try { localStorage.setItem('nova-lang', l); } catch(e){}
    if (typeof paintThemeBtn === 'function') paintThemeBtn();
  }

  /* ---------- theme ----------
     An unstamped root follows the device; the button stamps an explicit
     choice, which the token blocks are written to let win either way. */
  var themeBtn=document.getElementById('themeBtn');
  var mq=window.matchMedia('(prefers-color-scheme: dark)');
  function resolved(){
    var t=document.documentElement.getAttribute('data-theme');
    return t || (mq.matches?'dark':'light');
  }
  function paintThemeBtn(){
    var dark=resolved()==='dark';
    themeBtn.setAttribute('data-mode', dark?'dark':'light');
    var ar=app.getAttribute('dir')==='rtl';
    var label=dark ? (ar?'التبديل إلى الوضع الفاتح':'Switch to light mode')
                   : (ar?'التبديل إلى الوضع الداكن':'Switch to dark mode');
    themeBtn.setAttribute('aria-label',label);
    themeBtn.title=label;
  }
  try{
    var st=localStorage.getItem('nova-theme');
    if(st==='dark'||st==='light') document.documentElement.setAttribute('data-theme',st);
  }catch(e){}
  themeBtn.addEventListener('click',function(){
    var next=resolved()==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    try{localStorage.setItem('nova-theme',next);}catch(e){}
    paintThemeBtn();
  });
  if(mq.addEventListener) mq.addEventListener('change',function(){
    if(!document.documentElement.getAttribute('data-theme')) paintThemeBtn();
  });

  var saved = 'en';
  try { saved = localStorage.getItem('nova-lang') || 'en'; } catch(e){}
  setLang(saved);
  paintThemeBtn();

  btn.addEventListener('click', function(){
    setLang(app.getAttribute('dir') === 'rtl' ? 'en' : 'ar');
  });

  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
})();
