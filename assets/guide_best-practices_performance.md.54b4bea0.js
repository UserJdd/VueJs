import{_ as s,o as a,c as e,a as l}from"./app.8d30a6c9.js";const n=JSON.parse('{"title":"性能优化","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"概述","slug":"overview","link":"#overview","children":[]},{"level":2,"title":"分析选项","slug":"profiling-options","link":"#profiling-options","children":[]},{"level":2,"title":"页面加载优化","slug":"page-load-optimizations","link":"#page-load-optimizations","children":[{"level":3,"title":"选用正确的架构","slug":"choosing-the-right-architecture","link":"#choosing-the-right-architecture","children":[]},{"level":3,"title":"包体积与 Tree-shaking 优化","slug":"bundle-size-and-tree-shaking","link":"#bundle-size-and-tree-shaking","children":[]},{"level":3,"title":"代码分割","slug":"code-splitting","link":"#code-splitting","children":[]}]},{"level":2,"title":"更新优化","slug":"update-optimizations","link":"#update-optimizations","children":[{"level":3,"title":"Props 稳定性","slug":"props-stability","link":"#props-stability","children":[]},{"level":3,"title":"v-once","slug":"v-once","link":"#v-once","children":[]},{"level":3,"title":"v-memo","slug":"v-memo","link":"#v-memo","children":[]}]},{"level":2,"title":"通用优化","slug":"general-optimizations","link":"#general-optimizations","children":[{"level":3,"title":"大型虚拟列表","slug":"virtualize-large-lists","link":"#virtualize-large-lists","children":[]},{"level":3,"title":"减少大型不可变数据的响应性开销","slug":"reduce-reactivity-overhead-for-large-immutable-structures","link":"#reduce-reactivity-overhead-for-large-immutable-structures","children":[]},{"level":3,"title":"避免不必要的组件抽象","slug":"avoid-unnecessary-component-abstractions","link":"#avoid-unnecessary-component-abstractions","children":[]}]}],"relativePath":"guide/best-practices/performance.md"}'),o={name:"guide/best-practices/performance.md"},p=[l('<h1 id="performance" tabindex="-1">性能优化 <a class="header-anchor" href="#performance" aria-hidden="true">#</a></h1><h2 id="overview" tabindex="-1">概述 <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>Vue 在大多数常见场景下性能都是很优秀的，通常不需要手动优化。然而，总会有一些具有挑战性的场景需要进行针对性的微调。在本节中，我们将讨论用 Vue 开发的应用在性能方面该注意些什么。</p><p>首先，让我们区分一下 web 应用性能的两个主要方面：</p><ul><li><p><strong>页面加载性能</strong>：首次访问时，应用展示出内容与达到可交互状态的速度。这通常会用 Google 所定义的一系列 <a href="https://web.dev/vitals/#core-web-vitals" target="_blank" rel="noreferrer">Web 指标</a> (Web Vitals) 来进行衡量，如<a href="https://web.dev/lcp/" target="_blank" rel="noreferrer">最大内容绘制</a> (Largest Contentful Paint，缩写为 LCP) 和<a href="https://web.dev/fid/" target="_blank" rel="noreferrer">首次输入延迟</a> (First Input Delay，缩写为 FID)。</p></li><li><p><strong>更新性能</strong>：应用响应用户输入更新的速度。比如当用户在搜索框中输入时结果列表的更新速度，或者用户在一个单页面应用 (SPA) 中点击链接跳转页面时的切换速度。</p></li></ul><p>虽然最理想的情况是将两者都最大化，但是不同的前端架构往往会影响到在这些方面是否能达到更理想的性能。此外，你所构建的应用的类型极大地影响了你在性能方面应该优先考虑的问题。因此，优化性能的第一步是为你的应用类型确定合适的架构：</p><ul><li><p>查看<a href="/guide/extras/ways-of-using-vue.html">使用 Vue 的多种方式</a>这一章看看如何用不同的方式围绕 Vue 组织架构。</p></li><li><p>Jason Miller 在 <a href="https://jasonformat.com/application-holotypes/" target="_blank" rel="noreferrer">Application Holotypes</a> 一文中讨论了 Web 应用的类型以及它们各自的理想实现/交付方式。</p></li></ul><h2 id="profiling-options" tabindex="-1">分析选项 <a class="header-anchor" href="#profiling-options" aria-hidden="true">#</a></h2><p>为了提高性能，我们首先需要知道如何衡量它。在这方面，有一些很棒的工具可以提供帮助：</p><p>用于生产部署的负载性能分析：</p><ul><li><a href="https://pagespeed.web.dev/" target="_blank" rel="noreferrer">PageSpeed Insights</a></li><li><a href="https://www.webpagetest.org/" target="_blank" rel="noreferrer">WebPageTest</a></li></ul><p>用于本地开发期间的性能分析：</p><ul><li><a href="https://developer.chrome.com/docs/devtools/evaluate-performance/" target="_blank" rel="noreferrer">Chrome 开发者工具“性能”面板</a><ul><li><a href="/api/application.html#app-config-performance"><code>app.config.performance</code></a> 将会开启 Vue 特有的性能标记，标记在 Chrome 开发者工具的性能时间线上。</li></ul></li><li><a href="/guide/scaling-up/tooling.html#browser-devtools">Vue 开发者扩展</a>也提供了性能分析的功能。</li></ul><h2 id="page-load-optimizations" tabindex="-1">页面加载优化 <a class="header-anchor" href="#page-load-optimizations" aria-hidden="true">#</a></h2><p>页面加载优化有许多跟框架无关的方面 - 这份 <a href="https://web.dev/fast/" target="_blank" rel="noreferrer">web.dev 指南</a>提供了一个全面的总结。这里，我们将主要关注和 Vue 相关的技巧。</p><h3 id="choosing-the-right-architecture" tabindex="-1">选用正确的架构 <a class="header-anchor" href="#choosing-the-right-architecture" aria-hidden="true">#</a></h3><p>如果你的用例对页面加载性能很敏感，请避免将其部署为纯客户端的 SPA，而是让服务器直接发送包含用户想要查看的内容的 HTML 代码。纯客户端渲染存在首屏加载缓慢的问题，这可以通过<a href="/guide/extras/ways-of-using-vue.html#fullstack-ssr">服务器端渲染 (SSR)</a> 或<a href="/guide/extras/ways-of-using-vue.html#jamstack-ssg">静态站点生成 (SSG)</a> 来缓解。查看 <a href="/guide/scaling-up/ssr.html">SSR 指南</a>以了解如何使用 Vue 实现 SSR。如果应用对交互性要求不高，你还可以使用传统的后端服务器来渲染 HTML，并在客户端使用 Vue 对其进行增强。</p><p>如果你的主应用必须是 SPA，但还有其他的营销相关页面 (落地页、关于页、博客等)，请单独部署这些页面！理想情况下，营销页面应该是包含尽可能少 JS 的静态 HTML，并用 SSG 方式部署。</p><h3 id="bundle-size-and-tree-shaking" tabindex="-1">包体积与 Tree-shaking 优化 <a class="header-anchor" href="#bundle-size-and-tree-shaking" aria-hidden="true">#</a></h3><p>一个最有效的提升页面加载速度的方法就是压缩 JavaScript 打包产物的体积。当使用 Vue 时有下面一些办法来减小打包产物体积：</p><ul><li><p>尽可能地采用构建步骤</p><ul><li><p>如果使用的是相对现代的打包工具，许多 Vue 的 API 都是可以被 <a href="https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking" target="_blank" rel="noreferrer">tree-shake</a> 的。举例来说，如果你根本没有使用到内置的 <code>&lt;Transition&gt;</code> 组件，它将不会被打包进入最终的产物里。Tree-shaking 也可以移除你源代码中其他未使用到的模块。</p></li><li><p>当使用了构建步骤时，模板会被预编译，因此我们无须在浏览器中载入 Vue 编译器。这在同样最小化加上 gzip 优化下会相对缩小 <strong>14kb</strong> 并避免运行时的编译开销。</p></li></ul></li><li><p>在引入新的依赖项时要小心包体积膨胀！在现实的应用中，包体积膨胀通常因为无意识地引入了过重的依赖导致的。</p><ul><li><p>如果使用了构建步骤，应当尽量选择提供 ES 模块格式的依赖，它们对 tree-shaking 更友好。举例来说，选择 <code>lodash-es</code> 比 <code>lodash</code> 更好。</p></li><li><p>查看依赖的体积，并评估与其所提供的功能之间的性价比。如果依赖对 tree-shaking 友好，实际增加的体积大小将取决于你从它之中导入的 API。像 <a href="https://bundlejs.com/" target="_blank" rel="noreferrer">bundlejs.com</a> 这样的工具可以用来做快速的检查，但是根据实际的构建设置来评估总是最准确的。</p></li></ul></li><li><p>如果你只在渐进式增强的场景下使用 Vue，并想要避免使用构建步骤，请考虑使用 <a href="https://github.com/vuejs/petite-vue" target="_blank" rel="noreferrer">petite-vue</a> (只有 <strong>6kb</strong>) 来代替。</p></li></ul><h3 id="code-splitting" tabindex="-1">代码分割 <a class="header-anchor" href="#code-splitting" aria-hidden="true">#</a></h3><p>代码分割是指构建工具将构建后的 JavaScript 包拆分为多个较小的，可以按需或并行加载的文件。通过适当的代码分割，页面加载时需要的功能可以立即下载，而额外的块只在需要时才加载，从而提高性能。</p><p>像 Rollup (Vite 就是基于它之上开发的) 或者 webpack 这样的打包工具可以通过分析 ESM 动态导入的语法来自动进行代码分割：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// lazy.js 及其依赖会被拆分到一个单独的文件中</span></span>\n<span class="line"><span style="color:#676E95;">// 并只在 `loadLazy()` 调用时才加载</span></span>\n<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">loadLazy</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">import</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./lazy.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>懒加载对于页面初次加载时的优化帮助极大，它帮助应用暂时略过了那些不是立即需要的功能。在 Vue 应用中，这可以与 Vue 的<a href="/guide/components/async.html">异步组件</a>搭配使用，为组件树创建分离的代码块：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">defineAsyncComponent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// 会为 Foo.vue 及其依赖创建单独的一个块</span></span>\n<span class="line"><span style="color:#676E95;">// 它只会按需加载</span></span>\n<span class="line"><span style="color:#676E95;">//（即该异步组件在页面中被渲染时）</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineAsyncComponent</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./Foo.vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>\n<span class="line"></span></code></pre></div><p>对于使用了 Vue Router 的应用，强烈建议使用异步组件作为路由组件。Vue Router 已经显性地支持了独立于 <code>defineAsyncComponent</code> 的懒加载。查看<a href="https://router.vuejs.org/zh/guide/advanced/lazy-loading.html" target="_blank" rel="noreferrer">懒加载路由</a>了解更多细节。</p><h2 id="update-optimizations" tabindex="-1">更新优化 <a class="header-anchor" href="#update-optimizations" aria-hidden="true">#</a></h2><h3 id="props-stability" tabindex="-1">Props 稳定性 <a class="header-anchor" href="#props-stability" aria-hidden="true">#</a></h3><p>在 Vue 之中，一个子组件只会在其至少一个 props 改变时才会更新。思考以下示例：</p><div class="language-vue-html"><button title="Copy Code" class="copy"></button><span class="lang">template</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ListItem</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">v-for</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;"> in </span><span style="color:#A6ACCD;">list</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">  :</span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">  :</span><span style="color:#C792EA;">active-id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">activeId</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"></span></code></pre></div><p>在 <code>&lt;ListItem&gt;</code> 组件中，它使用了 <code>id</code> 和 <code>activeId</code> 两个 props 来确定它是否是当前活跃的那一项。虽然这是可行的，但问题是每当 <code>activeId</code> 更新时，列表中的<strong>每一个</strong> <code>&lt;ListItem&gt;</code> 都会跟着更新！</p><p>理想情况下，只有活跃状态发生改变的项才应该更新。我们可以将活跃状态比对的逻辑移入父组件来实现这一点，然后让 <code>&lt;ListItem&gt;</code> 改为接收一个 <code>active</code> prop：</p><div class="language-vue-html"><button title="Copy Code" class="copy"></button><span class="lang">template</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ListItem</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">v-for</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;"> in </span><span style="color:#A6ACCD;">list</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">  :</span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">  :</span><span style="color:#C792EA;">active</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;"> === </span><span style="color:#A6ACCD;">activeId</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"></span></code></pre></div><p>现在，对于大多数的组件来说，<code>activeId</code> 改变时，它们的 <code>active</code> prop 都会保持不变，因此它们无需再更新。总结一下，这个技巧的核心思想就是让传给子组件的 props 尽量保持稳定。</p><h3 id="v-once" tabindex="-1"><code>v-once</code> <a class="header-anchor" href="#v-once" aria-hidden="true">#</a></h3><p><code>v-once</code> 是一个内置的指令，可以用来渲染依赖运行时数据但无需再更新的内容。它的整个子树都会在未来的更新中被跳过。查看它的 <a href="/api/built-in-directives.html#v-once">API 参考手册</a>可以了解更多细节。</p><h3 id="v-memo" tabindex="-1"><code>v-memo</code> <a class="header-anchor" href="#v-memo" aria-hidden="true">#</a></h3><p><code>v-memo</code> 是一个内置指令，可以用来有条件地跳过某些大型子树或者 <code>v-for</code> 列表的更新。查看它的 <a href="/api/built-in-directives.html#v-memo">API 参考手册</a>可以了解更多细节。</p><h2 id="general-optimizations" tabindex="-1">通用优化 <a class="header-anchor" href="#general-optimizations" aria-hidden="true">#</a></h2><blockquote><p>以下技巧能同时改善页面加载和更新性能。</p></blockquote><h3 id="virtualize-large-lists" tabindex="-1">大型虚拟列表 <a class="header-anchor" href="#virtualize-large-lists" aria-hidden="true">#</a></h3><p>所有的前端应用中最常见的性能问题就是渲染大型列表。无论一个框架性能有多好，渲染成千上万个列表项<strong>都会</strong>变得很慢，因为浏览器需要处理大量的 DOM 节点。</p><p>但是，我们并不需要立刻渲染出全部的列表。在大多数场景中，用户的屏幕尺寸只会展示这个巨大列表中的一小部分。我们可以通过<strong>列表虚拟化</strong>来提升性能，这项技术使我们只需要渲染用户视口中能看到的部分。</p><p>要实现列表虚拟化并不简单，幸运的是，你可以直接使用现有的社区库：</p><ul><li><a href="https://github.com/Akryum/vue-virtual-scroller" target="_blank" rel="noreferrer">vue-virtual-scroller</a></li><li><a href="https://github.com/rocwang/vue-virtual-scroll-grid" target="_blank" rel="noreferrer">vue-virtual-scroll-grid</a></li><li><a href="https://github.com/07akioni/vueuc" target="_blank" rel="noreferrer">vueuc/VVirtualList</a></li></ul><h3 id="reduce-reactivity-overhead-for-large-immutable-structures" tabindex="-1">减少大型不可变数据的响应性开销 <a class="header-anchor" href="#reduce-reactivity-overhead-for-large-immutable-structures" aria-hidden="true">#</a></h3><p>Vue 的响应性系统默认是深度的。虽然这让状态管理变得更直观，但在数据量巨大时，深度响应性也会导致不小的性能负担，因为每个属性访问都将触发代理的依赖追踪。好在这种性能负担通常这只有在处理超大型数组或层级很深的对象时，例如一次渲染需要访问 100,000+ 个属性时，才会变得比较明显。因此，它只会影响少数特定的场景。</p><p>Vue 确实也为此提供了一种解决方案，通过使用 <a href="/api/reactivity-advanced.html#shallowref"><code>shallowRef()</code></a> 和 <a href="/api/reactivity-advanced.html#shallowreactive"><code>shallowReactive()</code></a> 来绕开深度响应。浅层式 API 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理。这使得对深层级属性的访问变得更快，但代价是，我们现在必须将所有深层级对象视为不可变的，并且只能通过替换整个根状态来触发更新：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> shallowArray </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">shallowRef</span><span style="color:#A6ACCD;">([</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">/* 巨大的列表，里面包含深层的对象 */</span></span>\n<span class="line"><span style="color:#A6ACCD;">])</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// 这不会触发更新...</span></span>\n<span class="line"><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#A6ACCD;">(newObject)</span></span>\n<span class="line"><span style="color:#676E95;">// 这才会触发更新</span></span>\n<span class="line"><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> newObject]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// 这不会触发更新...</span></span>\n<span class="line"><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value[</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>\n<span class="line"><span style="color:#676E95;">// 这才会触发更新</span></span>\n<span class="line"><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value[</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">foo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">]</span></span>\n<span class="line"></span></code></pre></div><h3 id="avoid-unnecessary-component-abstractions" tabindex="-1">避免不必要的组件抽象 <a class="header-anchor" href="#avoid-unnecessary-component-abstractions" aria-hidden="true">#</a></h3><p>有些时候我们会去创建<a href="/guide/components/slots.html#renderless-components">无渲染组件</a>或高阶组件 (用来渲染具有额外 props 的其他组件) 来实现更好的抽象或代码组织。虽然这并没有什么问题，但请记住，组件实例比普通 DOM 节点要昂贵得多，而且为了逻辑抽象创建太多组件实例将会导致性能损失。</p><p>需要提醒的是，只减少几个组件实例对于性能不会有明显的改善，所以如果一个用于抽象的组件在应用中只会渲染几次，就不用操心去优化它了。考虑这种优化的最佳场景还是在大型列表中。想象一下一个有 100 项的列表，每项的组件都包含许多子组件。在这里去掉一个不必要的组件抽象，可能会减少数百个组件实例的无谓性能消耗。</p>',54)];const t=s(o,[["render",function(s,l,n,o,t,r){return a(),e("div",null,p)}]]);export{n as __pageData,t as default};
