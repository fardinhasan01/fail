import{e as u,aF as f,r,aG as v,aH as b,i as j,p as N,b as y,l as w,j as e,A as S,L as $,d as m,f as k,v as C,B as I}from"./index-C-nAPIw-.js";import{Q as R,a as L}from"./browser-neSpuR7I.js";import{A as Q}from"./arrow-left-BlH78Gda.js";import{S as V}from"./shield-alert-CDEQhb5j.js";import{D}from"./download-CEDTQrEg.js";function _(){u();const{studentId:t}=f.useParams(),[s,o]=r.useState(()=>v(t)),[i,c]=r.useState(()=>s?b(s.schoolId):null),l=j(t),[x,h]=r.useState(()=>N(l));r.useEffect(()=>y(a=>o(a.find(d=>d.studentId===t||d.id===t)??null)),[t]),r.useEffect(()=>{if(!s){c(null);return}return w(a=>{c(a.find(d=>d.id===s.schoolId||d.schoolCode===s.schoolCode)??null)})},[s]),r.useEffect(()=>{let a=!0;return R.toDataURL(l,{errorCorrectionLevel:"M",margin:1,width:240}).then(d=>{a&&h(d)}),()=>{a=!1}},[l]);const g=()=>{if(!s)return;const a=window.open("","_blank","width=1200,height=900");a&&(a.document.write(z(s,i,x,l)),a.document.close(),a.focus())};return e.jsx(S,{children:e.jsxs("div",{className:"mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8",children:[e.jsxs($,{to:"/students",className:"inline-flex items-center gap-2 text-sm font-semibold text-primary",children:[e.jsx(Q,{className:"h-4 w-4"})," নিবন্ধনে ফিরুন"]}),s?e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"glass-strong rounded-[2rem] p-6 md:p-8",children:e.jsxs("div",{className:"flex flex-wrap items-start justify-between gap-4",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green",children:[e.jsx(m,{className:"h-3.5 w-3.5"})," যাচাই পাতা"]}),e.jsx("h1",{className:"mt-3 text-3xl font-bold md:text-5xl",children:s.fullName}),e.jsxs("p",{className:"mt-1 text-sm text-muted-foreground",children:["শিক্ষার্থী আইডি: ",s.studentId," ·"," ",s.status==="Valid Student"?"যাচাইকৃত শিক্ষার্থী":s.status]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsx(n,{label:"শ্রেণি",value:s.classLevel.toString()}),e.jsx(n,{label:"রোল",value:s.roll}),e.jsx(n,{label:"শাখা",value:s.section}),e.jsx(n,{label:"রক্ত",value:s.bloodGroup})]})]})}),e.jsxs("section",{className:"grid gap-4 lg:grid-cols-[1fr_0.95fr]",children:[e.jsxs("div",{className:"rounded-[2.2rem] bg-[linear-gradient(135deg,#0f172a_0%,#0ea5e9_60%,#22c55e_100%)] p-6 text-white shadow-soft",children:[e.jsxs("div",{className:"flex items-start justify-between gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-xs uppercase tracking-[0.25em] opacity-80",children:"Smart ID Card"}),e.jsx("h2",{className:"mt-2 text-2xl font-bold",children:s.fullName}),e.jsx("div",{className:"mt-1 text-sm opacity-90",children:s.schoolName})]}),e.jsx("div",{className:"grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white/15 text-4xl backdrop-blur",children:p(s.photo)?e.jsx("img",{src:s.photo,alt:s.fullName,className:"h-full w-full object-cover"}):s.photo})]}),e.jsxs("div",{className:"mt-5 grid grid-cols-[1fr_auto] gap-4",children:[e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("p",{children:[e.jsx("span",{className:"opacity-70",children:"স্কুল কোড:"})," ",s.schoolCode]}),e.jsxs("p",{children:[e.jsx("span",{className:"opacity-70",children:"শ্রেণি:"})," ",s.classLevel]}),e.jsxs("p",{children:[e.jsx("span",{className:"opacity-70",children:"শাখা:"})," ",s.section]}),e.jsxs("p",{children:[e.jsx("span",{className:"opacity-70",children:"রোল:"})," ",s.roll]}),e.jsxs("p",{children:[e.jsx("span",{className:"opacity-70",children:"স্ট্যাটাস:"})," ",s.status==="Valid Student"?"যাচাইকৃত শিক্ষার্থী":s.status]})]}),e.jsx("img",{src:x,alt:"QR code",className:"h-32 w-32 rounded-2xl bg-white p-2"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"glass rounded-[2rem] p-6",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(k,{className:"h-5 w-5 text-primary"}),e.jsx("h2",{className:"text-xl font-bold",children:"স্কুল যাচাই"})]}),e.jsx("div",{className:"mt-4 text-sm leading-6 text-muted-foreground",children:i?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-semibold text-foreground",children:i.schoolName}),e.jsxs("p",{children:[i.schoolCode," ·"," ",i.verificationStatus==="Verified Institution"?"যাচাইকৃত প্রতিষ্ঠান":"অপেক্ষমাণ"]}),e.jsx("p",{children:i.address})]}):e.jsx("p",{children:"স্কুল পাওয়া যায়নি।"})})]}),e.jsxs("div",{className:"glass rounded-[2rem] p-6",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(C,{className:"h-5 w-5 text-brand-orange"}),e.jsx("h2",{className:"text-xl font-bold",children:"অর্জন ও ইতিহাস"})]}),e.jsxs("div",{className:"mt-4 space-y-2",children:[s.achievements.map(a=>e.jsx("div",{className:"rounded-2xl bg-brand-orange/10 px-3 py-2 text-sm",children:a},a)),s.competitionHistory.map(a=>e.jsx("div",{className:"rounded-2xl bg-brand-blue/10 px-3 py-2 text-sm",children:a},a))]})]}),e.jsxs("div",{className:"glass rounded-[2rem] p-6",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(I,{className:"h-5 w-5 text-brand-green"}),e.jsx("h2",{className:"text-xl font-bold",children:"স্ট্যাটাস চেক"})]}),e.jsxs("div",{className:"mt-4 flex items-center gap-2 rounded-3xl bg-brand-green/10 px-4 py-3 text-sm font-semibold",children:[e.jsx(m,{className:"h-4 w-4"}),s.status==="Valid Student"?"যাচাইকৃত শিক্ষার্থী":s.status]}),s.status==="Suspended"?e.jsxs("div",{className:"mt-3 flex items-center gap-2 rounded-2xl bg-destructive/10 px-4 py-3 text-sm",children:[e.jsx(V,{className:"h-4 w-4"})," স্থগিত অ্যাকাউন্ট প্রশাসনিক পর্যালোচনা চায়।"]}):null]})]})]}),e.jsxs("section",{className:"glass-strong rounded-[2rem] p-6",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-sm uppercase tracking-[0.2em] text-muted-foreground",children:"QR verification"}),e.jsx("h2",{className:"text-2xl font-bold",children:"প্রোফাইল যাচাই পাতা"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"QR কোড সরাসরি এই যাচাই পাতায় খুলবে।"})]}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsxs("button",{type:"button",onClick:g,className:"inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-2.5 text-sm font-semibold text-white shadow-soft",children:[e.jsx(D,{className:"h-4 w-4"})," PDF ডাউনলোড"]}),e.jsxs("a",{href:l,className:"inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted/70",children:[e.jsx(L,{className:"h-4 w-4"})," লিংক"]})]})]}),e.jsxs("div",{className:"mt-4 rounded-3xl border border-border bg-background/80 p-4 text-sm text-muted-foreground",children:["যাচাই URL: ",e.jsx("span",{className:"font-semibold text-foreground",children:l})]})]})]}):e.jsx("div",{className:"glass-strong rounded-[2rem] p-8 text-sm text-muted-foreground",children:"Student not found."})]})})}function n({label:t,value:s}){return e.jsxs("div",{className:"rounded-3xl border border-white/70 bg-white/80 p-4 text-center shadow-soft backdrop-blur",children:[e.jsx("div",{className:"text-xs uppercase tracking-[0.2em] text-muted-foreground",children:t}),e.jsx("div",{className:"mt-1 text-lg font-bold",children:s})]})}function p(t){return/^data:image\//i.test(t)||/^https?:\/\//i.test(t)}function z(t,s,o,i){return`<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${t.fullName}</title>
      <style>
        @page { size: A4 portrait; margin: 0; }
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; font-family: system-ui, sans-serif; }
        body { background: #e8f3ff; }
        .sheet { width: 100vw; min-height: 100vh; padding: 32px; box-sizing: border-box; }
        .card {
          min-height: calc(100vh - 64px);
          border-radius: 28px;
          overflow: hidden;
          color: white;
          background: linear-gradient(135deg, #0f172a 0%, #0ea5e9 60%, #22c55e 100%);
          box-shadow: 0 16px 40px rgba(0,0,0,.14);
          padding: 28px;
        }
        .row { display: flex; justify-content: space-between; gap: 16px; }
        .photo { width: 84px; height: 84px; display: grid; place-items: center; background: rgba(255,255,255,.15); border-radius: 22px; font-size: 40px; overflow: hidden; }
        .photo img { width: 100%; height: 100%; object-fit: cover; }
        img { width: 124px; height: 124px; border-radius: 18px; background: white; padding: 6px; }
        .badge { display: inline-flex; align-items: center; gap: 8px; border-radius: 999px; padding: 6px 12px; background: rgba(255,255,255,.14); font-size: 12px; }
        .panel { margin-top: 22px; border-radius: 24px; background: rgba(255,255,255,.12); padding: 20px; }
      </style>
    </head>
    <body>
      <div class="sheet">
        <div class="card">
          <div class="badge">Verified Student</div>
          <div class="row" style="margin-top:18px">
            <div>
              <div style="font-size:30px;font-weight:800">${t.fullName}</div>
              <div style="margin-top:6px;opacity:.9">${t.schoolName}</div>
              <div style="margin-top:4px;opacity:.8">Student ID: ${t.studentId}</div>
            </div>
            <div class="photo">${p(t.photo)?`<img src="${t.photo}" alt="${t.fullName}" />`:t.photo}</div>
          </div>
          <div class="row panel" style="align-items:center">
            <div style="font-size:15px;line-height:1.8">
              <div><span style="opacity:.75">School Code:</span> ${t.schoolCode}</div>
              <div><span style="opacity:.75">Class:</span> ${t.classLevel}</div>
              <div><span style="opacity:.75">Section:</span> ${t.section}</div>
              <div><span style="opacity:.75">Roll:</span> ${t.roll}</div>
              <div><span style="opacity:.75">Status:</span> ${t.status}</div>
              ${s?`<div><span style="opacity:.75">Institution:</span> ${s.verificationStatus}</div>`:""}
            </div>
            <img src="${o}" alt="QR code" />
          </div>
          <div class="panel" style="font-size:13px;line-height:1.7">
            <div><strong>Guardian:</strong> ${t.guardianName}</div>
            <div><strong>Guardian Phone:</strong> ${t.guardianPhone}</div>
            <div><strong>Blood Group:</strong> ${t.bloodGroup}</div>
            <div><strong>Verification URL:</strong> ${i}</div>
          </div>
        </div>
      </div>
    </body>
  </html>`}export{_ as component};
