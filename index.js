// import html builder
import $, { utils } from './$.js'

// import tailwindcss
import './browser@4.js' 

// custom component - button
function navButton(label){
    return $().class('hover:bg-[#DDD] px-2 cursor-pointer rounded-sm').slot(label)
}

// custom component - hr
function hr(){
    return $().class('bg-[#EEE] h-[1px] my-5')
}

// html builder
let result = $().class('bg-[#CCC]').slot([
    $('header').class('h-[40px]').slot([
        $('nav').class('flex justify-between items-center bg-[#EEE] p-2 shadow-lg').slot([
            $().slot('HTMLWeaver'),
            $().class('flex').slot([
                navButton('home').id('home'),
                navButton('demo').id('demo'),
                navButton('doc')
            ]),
        ]),
    ]),
    $('main').id('main').class('bg bg-fixed text-[14px] p-5 min-h-[calc(100dvh-40px-30px)]').slot([

        // title
        $().class('my-5 font-bold text-[50px]').slot('Learn in 5 Minutes'),

        // subtitle
        $().class('my-2 text-[24px]').slot('The Dynamic HTML Builder'),

        hr(),

        // 用途
        $().class('grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10').slot([
            $().slot([
                $().class('my-2 text-[24px]').slot('用途'),
                $().class('my-2 text-[16px]').slot('⚡︎ 交付切版 html 設計稿'),
                $().class('my-2 text-[16px]').slot('⚡︎ 簡易互動原型製作'),
                $().class('my-2 text-[16px]').slot('⚡︎ GitPage 開發'),
                $().class('my-2 text-[16px]').slot('⚡︎ 延伸可開發線上網頁編輯器（如電商平台 / 部落格 / WebApp）'),
            ]),    
            $().slot([
                $().class('my-2 text-[24px]').slot('特色'),
                $().class('my-2 text-[16px]').slot('⚡︎ 非常好上手，近 0 學習成本'),
                $().class('my-2 text-[16px]').slot('⚡︎ 鏈式 API 與樹狀結構設計，目前僅 7 個 API'),
                $().class('my-2 text-[16px]').slot('⚡︎ 可採用不同 css 框架進行切版開發'),
                $().class('my-2 text-[16px]').slot('⚡︎ 模組式開發覆用元件，加快開發速度'),
            ]),
        ]),

        hr(),
        
        // code compare
        $().class('my-5 font-bold text-[16px]').slot('code compare'),
        $('pre').class('overflow-auto shadow-lg mb-5 text-[13px] bg-[#EEE] p-5').slot(`
        <span class="text-[green]">// 🟢 It's new way to build html, and you can create reuse-components and bind events easily</span>
        import $, { utils } from './$.js'
        let navButton = (label) => $().class('hover:bg-[#DDD] px-2 cursor-pointer rounded-sm').slot(label)
        let builder = $().slot([
            $().class('text-[24px] font-bold').slot('line1'),
            $().slot('line2'),
            navButton('component').id('navB'),
        ])
        document.body.innerHTML = builder.html() <span class="text-[green]">// method 1</span>
        document.body.appendChild(builder.tag()) <span class="text-[green]">// method 2</span>
        let ids = utils.getIds(builder) <span class="text-[green]">// get all ids which you set in builder</span>
        ids.navB.tag().onclick=()=> alert('test clicked') <span class="text-[green]">// easily add event</span>
        `.trim().replaceAll('        ','')),
        $('pre').class('overflow-auto shadow-lg mb-5 text-[13px] bg-[#EEE] p-5').slot(`
        <span class="text-[green]">// 🟠 old approach 1, only support component that bulid with string & it's not easy to add events on elements</span>
        let navButton2 = (label) => \`&lt;div class="hover:bg-[#DDD] px-2 cursor-pointer rounded-sm"&gt;\${label}&lt;/div&gt;\`
        document.body.innerHTML = \`
        &lt;div&gt;
            &lt;div class="text-[24px] font-bold"&gt;line1&lt;/div&gt;
            &lt;div&gt;line2&lt;/div&gt;
            \${navButton2('component')}
        &lt;/div&gt;\`
        `.trim().replaceAll('        ','')),
        $('pre').class('overflow-auto shadow-lg mb-5 text-[13px] bg-[#EEE] p-5').slot(`
        <span class="text-[green]">// 🟠 old approach 2, it's not easy to maintain the code</span>
        let dOuter = document.createElement('div')
        let dInnerLine1 = document.createElement('div')
        dInnerLine1.className = 'text-[24px] font-bold'
        dInnerLine1.innerHTML = 'line1'
        let dInnerLine2 = document.createElement('div')
        dInnerLine2.innerHTML = 'line2'
        let navButton3 = (label)=> {
            let b = document.createElement('div')
            b.className = 'hover:bg-[#DDD] px-2 cursor-pointer rounded-sm'
            b.innerHTML = label
            return b
        }
        dOuter.appendChild(dInnerLine1)
        dOuter.appendChild(dInnerLine2)
        dOuter.appendChild(navButton3('component'))
        document.body.innerHTML = dOuter.outerHTML
        `.trim().replaceAll('        ','')),

        hr(),

        // API
        $().class('my-5 font-bold text-[16px]').slot('API list'),
        $().slot('$() : create div tag, and return builder instance. $(\'p\') / $(\'span\') / $(\'footer\')'),
        $().slot('$().slot(content) : the content can be string or builder instance array'),
        $().slot('$().class(cssClasses) : css classes'),
        $().slot('$().style(cssStyles) : css styles'),
        $().slot('$().id(id) : set id'),
        $().slot('$().tag() : get tag from builder'),
        $().slot('$().html() : get html string from builder'),  

    ]),
    $('footer').class('flex justify-center items-center bg-[#DDD] h-[30px] shadow-lg text-[12px]').slot('HTMLWeaver powered by William$$ © 2025 all rights reservved'),
])

// find all ids and assign event
let ids = utils.getIds(result)
// console.log(ids) // {home: Base, demo: Base, main: Base}
ids.home.tag().onclick=()=> alert('home button')
ids.demo.tag().onclick=()=> alert('demo button')

// mount & render
document.body.appendChild(result.tag())