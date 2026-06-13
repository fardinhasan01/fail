import{y as u,z as f,r as l,at as g,j as e,A as h,K as b,T as o,B as v,S as w,au as c}from"./index-CPKYwynN.js";import{F as j}from"./file-text-ByrrdwuE.js";import{L as y}from"./layers-DGfQkfQ_.js";import{D as N}from"./download-BrPGe0Ha.js";import{S as k}from"./share-2-Bngw9u7V.js";function D(){const s=u(),t=f(),[r,d]=l.useState([]);l.useEffect(()=>{const a=g(s.profile.uid,d);return()=>{typeof a=="function"?a():a?.()}},[s.profile.uid]);const i=l.useMemo(()=>[{id:"quiz-excellence",title:"Quiz score > 80%",description:"High accuracy on the fullscreen quiz game unlocks an excellence certificate.",active:r.some(a=>a.title.includes("Certificate of Excellence"))},{id:"lesson-milestone",title:"10 lessons completed",description:"Reach the lesson milestone and create a class progress certificate.",active:t.lessonsCompleted>=10},{id:"streak-win",title:"Winning streaks",description:"Sustained streak performance unlocks recognition badges and a streak certificate.",active:t.streak>=7}],[r,t.lessonsCompleted,t.streak]),m=async()=>{await c({userId:s.profile.uid,userName:s.profile.name,classLevel:t.class,title:`Certificate of Progress in Class ${t.class}`,subject:"Class progress",score:t.lessonsCompleted,total:10})},p=async()=>{await c({userId:s.profile.uid,userName:s.profile.name,classLevel:t.class,title:"Certificate of Streak Excellence",subject:"Learning streak",score:t.streak,total:7})};return e.jsx(h,{children:e.jsxs("div",{className:"px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6",children:[e.jsxs("header",{className:"glass-strong rounded-[2rem] p-6 md:p-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]",children:[e.jsx(b,{className:"h-3.5 w-3.5 text-brand-orange"})," achievements"]}),e.jsx("h1",{className:"text-3xl md:text-5xl font-bold",children:"Automatic certificates"}),e.jsx("p",{className:"max-w-2xl text-sm md:text-base text-muted-foreground",children:"Quiz score, lesson milestones, and streak achievements are stored in Firebase and can be downloaded or shared as a print-ready PDF."})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 min-w-[240px]",children:[e.jsx(x,{label:"Records",value:r.length.toString()}),e.jsx(x,{label:"Eligible",value:i.filter(a=>a.active).length.toString()})]})]}),e.jsxs("section",{className:"grid gap-4 lg:grid-cols-[1.05fr_0.95fr]",children:[e.jsxs("div",{className:"glass-strong rounded-[2rem] p-6 space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"text-2xl font-bold flex items-center gap-2",children:[e.jsx(o,{className:"h-5 w-5 text-brand-orange"})," Generate milestones"]}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Use the buttons below to generate manual milestone certificates."})]}),e.jsx(j,{className:"h-5 w-5 text-primary"})]}),e.jsx("div",{className:"grid gap-3 md:grid-cols-3",children:i.map(a=>e.jsxs("div",{className:`rounded-3xl p-5 ${a.active?"bg-brand-green/10 border border-brand-green/20":"bg-muted/50"}`,children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(v,{className:`h-4 w-4 ${a.active?"text-brand-green":"text-muted-foreground"}`}),e.jsx("h3",{className:"font-semibold",children:a.title})]}),e.jsx("p",{className:"mt-2 text-sm text-muted-foreground",children:a.description}),e.jsx("div",{className:"mt-4",children:e.jsx("span",{className:`rounded-full px-3 py-1 text-xs font-semibold ${a.active?"bg-brand-green text-white":"bg-muted text-muted-foreground"}`,children:a.active?"Unlocked":"Locked"})})]},a.id))}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsxs("button",{type:"button",onClick:()=>{m()},className:"inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 font-semibold text-white shadow-soft",children:[e.jsx(w,{className:"h-4 w-4"}),"Lesson certificate"]}),e.jsxs("button",{type:"button",onClick:()=>{p()},className:"inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70",children:[e.jsx(o,{className:"h-4 w-4"}),"Streak certificate"]})]})]}),e.jsxs("div",{className:"glass rounded-[2rem] p-6 space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Your certificates"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Click any card to download or share."})]}),e.jsx(y,{className:"h-5 w-5 text-primary"})]}),e.jsx("div",{className:"space-y-3",children:r.length?r.map(a=>e.jsx(C,{record:a},a.id)):e.jsx("div",{className:"rounded-3xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground",children:"No certificates yet. Complete a quiz with 80%+ or create a milestone certificate."})})]})]})]})})}function C({record:s}){const t=new Date(s.issuedAt).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}),r=async()=>{const i=window.open("","_blank","width=1200,height=900");i&&(i.document.write($(s,t)),i.document.close(),i.focus())},d=async()=>{const i={title:s.title,text:`${s.userName} earned ${s.title} in E-পাঠশালা.`};if(navigator.share){await navigator.share(i).catch(()=>{});return}await navigator.clipboard.writeText(`${i.title}
${i.text}`).catch(()=>{})};return e.jsxs("div",{className:"rounded-3xl border border-border bg-background/90 p-5 shadow-soft",children:[e.jsxs("div",{className:"flex items-start justify-between gap-3",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-xs uppercase tracking-[0.2em] text-muted-foreground",children:"Certificate"}),e.jsx("h3",{className:"mt-1 text-lg font-bold",children:s.title})]}),e.jsxs("span",{className:"rounded-full bg-brand-orange/15 px-3 py-1 text-xs font-semibold text-brand-orange",children:[s.score,"/",s.total]})]}),e.jsxs("p",{className:"mt-2 text-sm text-muted-foreground",children:[s.userName," · Class ",s.classLevel," · ",s.subject]}),e.jsxs("p",{className:"mt-1 text-xs text-muted-foreground",children:["Issued ",t]}),e.jsxs("div",{className:"mt-4 flex flex-wrap gap-2",children:[e.jsxs("button",{type:"button",onClick:()=>{r()},className:"inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-2.5 text-sm font-semibold text-white shadow-soft",children:[e.jsx(N,{className:"h-4 w-4"}),"Download PDF"]}),e.jsxs("button",{type:"button",onClick:()=>{d()},className:"inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted/70",children:[e.jsx(k,{className:"h-4 w-4"}),"Share"]})]})]})}function x({label:s,value:t}){return e.jsxs("div",{className:"rounded-3xl bg-background/80 p-4 shadow-soft border border-border",children:[e.jsx("div",{className:"text-xs uppercase tracking-[0.2em] text-muted-foreground",children:s}),e.jsx("div",{className:"mt-1 text-2xl font-bold",children:t})]})}function $(s,t){return`<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${n(s.title)}</title>
      <style>
        @page { size: A4 landscape; margin: 0; }
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
        body {
          font-family: system-ui, sans-serif;
          background: linear-gradient(135deg, #fff5da 0%, #dff7ff 50%, #f3e8ff 100%);
          color: #1b1b1b;
        }
        .sheet {
          box-sizing: border-box;
          width: 100vw;
          height: 100vh;
          padding: 44px;
        }
        .card {
          height: 100%;
          border: 12px solid rgba(255,255,255,0.8);
          border-radius: 36px;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(10px);
          padding: 48px;
          box-shadow: 0 40px 80px rgba(54, 78, 120, 0.18);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .eyebrow { letter-spacing: 0.28em; font-size: 12px; text-transform: uppercase; color: #6b7280; }
        h1 { font-size: 52px; margin: 12px 0 8px; line-height: 1.02; }
        .name { font-size: 48px; font-weight: 800; color: #7c3aed; margin: 8px 0; }
        .desc { font-size: 20px; line-height: 1.6; max-width: 900px; color: #374151; }
        .meta { display: flex; gap: 18px; flex-wrap: wrap; font-size: 18px; color: #374151; }
        .footer { display: flex; justify-content: space-between; align-items: end; gap: 16px; font-size: 16px; color: #4b5563; }
        .badge { padding: 10px 16px; border-radius: 999px; background: #111827; color: white; font-weight: 700; }
        .stamp { width: 160px; height: 160px; border-radius: 50%; border: 8px solid rgba(124,58,237,0.35); display: grid; place-items: center; color: #7c3aed; font-weight: 800; transform: rotate(-8deg); }
      </style>
    </head>
    <body>
      <div class="sheet">
        <div class="card">
          <div>
            <div class="eyebrow">E-পাঠশালা</div>
            <h1>Certificate of Excellence</h1>
            <p class="desc">This certificate is proudly awarded to</p>
            <div class="name">${n(s.userName)}</div>
            <p class="desc">for outstanding achievement in <strong>${n(s.title)}</strong> with a score of <strong>${s.score}/${s.total}</strong>.</p>
            <div class="meta" style="margin-top: 20px;">
              <span class="badge">Class ${s.classLevel}</span>
              <span class="badge">${n(s.subject)}</span>
              <span class="badge">Issued ${t}</span>
            </div>
          </div>
          <div class="footer">
            <div>
              <div style="font-weight: 700;">E-পাঠশালা</div>
              <div>National learning ecosystem</div>
            </div>
            <div class="stamp">Awarded</div>
          </div>
        </div>
      </div>
      <script>
        window.addEventListener('load', () => setTimeout(() => window.print(), 300));
      <\/script>
    </body>
  </html>`}function n(s){return s.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]??t)}export{D as component};
