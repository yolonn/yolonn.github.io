(() => {
  document.documentElement.classList.add('js-ready');
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('wnalyping-theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) root.dataset.theme = 'dark';
  toggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if (next === 'dark') root.dataset.theme = 'dark'; else delete root.dataset.theme;
    localStorage.setItem('wnalyping-theme', next);
  });
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const progress = document.querySelector('#scroll-progress');
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const updateScrollState = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    let current = sections[0]?.id;
    sections.forEach((section) => { if (window.scrollY + 180 >= section.offsetTop) current = section.id; });
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  const revealItems = [...document.querySelectorAll('.reveal, .reveal-child')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add('is-visible'));

  const filterButtons = [...document.querySelectorAll('.filter-chip')];
  const stories = [...document.querySelectorAll('[data-category]')];
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    stories.forEach((story) => { story.hidden = filter !== 'all' && story.dataset.category !== filter; });
  }));

  const articles = {
    'article-01': { kicker: 'FIELD NOTE / THINKING', title: '为什么每个人都应该拥有一个属于自己的角落', meta: '2026.09.21  ·  Thinking  ·  8 min read', body: '<p>网站不只是名片。它更像一个长期容器，让零散的想法、作品和生活经验慢慢长出自己的形状。</p><h3>一个不必解释的地方</h3><p>社交平台要求我们快速表达，简历要求我们压缩自己，而个人网站可以慢一点。它允许你保留过程、保留犹豫，也保留还没有完成的东西。</p><h3>从一页开始</h3><p>不必先想清楚全部的栏目。先放上一段文字、一件作品，或者一个正在做的实验。重要的不是一次完成，而是给自己一个可以回来的地方。</p><p><strong>拥有自己的空间，也是在练习如何定义自己。</strong></p>' },
    'article-02': { kicker: 'FIELD NOTE / AI', title: '我如何把 AI 放进每天的工作流', meta: '2026.09.13  ·  AI  ·  12 min read', body: '<p>我不把 AI 当成一个替我完成所有事情的按钮，而更愿意把它当作一个随时可以讨论的协作者。</p><h3>先从问题开始</h3><p>真正有效的工作流不是收集更多工具，而是把模糊的问题写出来，再决定哪些部分值得交给机器协助。</p><h3>留下判断</h3><p>AI 可以帮忙整理、比较、生成选项，但最后的取舍仍然应该回到人的经验、偏好和责任上。</p>' },
    'article-03': { kicker: 'FIELD NOTE / DESIGN', title: '好的个人网站，应该留下什么', meta: '2026.09.02  ·  Design  ·  6 min read', body: '<p>我越来越喜欢那些不急着证明自己的个人网站。它们不把所有经历都做成奖杯，而是留下正在发生的事情。</p><h3>少一点包装</h3><p>真实的更新、还在进行的项目、偶尔改变的想法，都是比口号更有力量的内容。</p><h3>让人看见你的节奏</h3><p>一个好网站不一定要信息很多，但应该让人感受到：这里确实有人在生活、工作和思考。</p>' },
    'article-04': { kicker: 'FIELD NOTE / LIFE', title: '给未来自己的一个小小更新', meta: '2026.08.23  ·  Life  ·  5 min read', body: '<p>写给未来的记录，不是为了证明自己一直在进步，而是为了在回头的时候知道，那些日子并没有凭空消失。</p><h3>记下小事</h3><p>今天完成的一段代码、一场散步、一个终于想明白的问题，都值得被保存。</p><p>慢慢来。持续留下痕迹，本身就是一种方向。</p>' }
  };
  const dialog = document.querySelector('#article-dialog');
  const dialogTitle = document.querySelector('#dialog-title');
  const dialogKicker = document.querySelector('#dialog-kicker');
  const dialogMeta = document.querySelector('#dialog-meta');
  const dialogContent = document.querySelector('#dialog-content');
  const openArticle = (id) => {
    const article = articles[id];
    if (!article || !dialog) return;
    dialogKicker.textContent = article.kicker; dialogTitle.textContent = article.title; dialogMeta.textContent = article.meta; dialogContent.innerHTML = article.body;
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  };
  document.querySelectorAll('[data-article]').forEach((trigger) => trigger.addEventListener('click', () => openArticle(trigger.dataset.article)));
  document.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
})();
