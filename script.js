const overlay = document.getElementById("chatOverlay");
const messages = document.getElementById("messages");
const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const progressBar = document.getElementById("progressBar");
const consent = document.getElementById("consent");
const consentCheck = document.getElementById("consentCheck");

const steps = [
  {key:"name", prompt:"Hey. I'm NOX. The city is loud tonight, so let's keep this simple. What should I call you?"},
  {key:"age", prompt:"Good to meet you, {name}. How old are you?"},
  {key:"location", prompt:"Where are you reaching me from? Just your city or general area is enough."},
  {key:"email", prompt:"If I need to get back to you, what's your email address?"},
  {key:"grievance", prompt:"Alright, {name}. No forms, no perfect wording. Tell me what happened — and what you need help with."}
];
let state = {index:0,data:{},sending:false};

function addMessage(text, who="hero"){
  const row=document.createElement("div");
  row.className=`msg ${who==="hero"?"hero-msg":"user-msg"}`;
  const bubble=document.createElement("div"); bubble.className="bubble";
  const label=document.createElement("small"); label.textContent=who==="hero"?"NOX":"YOU";
  bubble.append(label, document.createTextNode(text));
  row.appendChild(bubble); messages.appendChild(row); messages.scrollTop=messages.scrollHeight;
}
function typing(){
  const row=document.createElement("div"); row.className="msg hero-msg"; row.id="typing";
  const bubble=document.createElement("div"); bubble.className="bubble";
  const label=document.createElement("small"); label.textContent="NOX";
  const dots=document.createElement("div"); dots.className="typing"; dots.innerHTML="<i></i><i></i><i></i>";
  bubble.append(label,dots);row.appendChild(bubble);messages.appendChild(row);messages.scrollTop=messages.scrollHeight;
}
function openChat(){overlay.classList.add("active");overlay.setAttribute("aria-hidden","false");resetChat()}
function closeChat(){overlay.classList.remove("active");overlay.setAttribute("aria-hidden","true")}
function resetChat(){
  state={index:0,data:{},sending:false}; messages.innerHTML=""; consent.style.display="none";
  consentCheck.checked=false; input.disabled=false; input.value=""; form.querySelector("button").disabled=false;
  progressBar.style.width="0%"; setTimeout(()=>{addMessage(steps[0].prompt);input.focus()},180);
}
function renderPrompt(){
  progressBar.style.width=`${Math.round((state.index/steps.length)*100)}%`;
  const text=steps[state.index].prompt.replaceAll("{name}",state.data.name||"there");
  typing();
  setTimeout(()=>{document.getElementById("typing")?.remove();addMessage(text);input.focus()},420);
}
function valid(key,value){
  if(key==="name") return value.length>=2 && !/^\d+$/.test(value);
  if(key==="age") return /^\d{1,3}$/.test(value) && +value>=1 && +value<=120;
  if(key==="location") return value.length>=2;
  if(key==="email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return value.length>=5;
}
function finishUI(){
  state.sending=false; input.disabled=true; form.querySelector("button").disabled=true;
}
async function submitSignal(){
  const d=state.data, submittedAt=new Date().toLocaleString();
  const cfg=window.NOX_CONFIG||{};
  if(!consentCheck.checked){addMessage("Before I send this signal, please confirm that you're okay with sharing these details.");consent.style.display="block";return}
  state.sending=true; finishUI();
  if(!cfg.emailjsPublicKey || cfg.emailjsPublicKey.startsWith("YOUR_")){
    addMessage(`Your signal is ready, ${d.name}. The email channel is not configured yet, so this demo cannot transmit it.`);
    showToast("EmailJS still needs to be configured in config.js.");
    return;
  }
  try{
    if(!window.emailjs){
      await new Promise((resolve,reject)=>{
        const s=document.createElement("script");
        s.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
      });
    }
    emailjs.init({publicKey:cfg.emailjsPublicKey});
    await emailjs.send(cfg.emailjsServiceId,cfg.emailjsTemplateId,{
      to_email:cfg.candidateEmail, visitor_name:d.name, visitor_age:d.age,
      visitor_location:d.location, visitor_email:d.email, grievance:d.grievance, submitted_at:submittedAt
    });
    progressBar.style.width="100%";
    addMessage(`Signal received, ${d.name}. I've sent the details to the person responsible for helping you. You've taken the first step.`);
  }catch(err){
    console.error(err);
    addMessage("The signal hit a wall while transmitting. Please try again — the details are still on this page.");
    state.sending=false; input.disabled=false; form.querySelector("button").disabled=false;
  }
}
function showToast(text){
  const t=document.createElement("div");t.className="toast";t.textContent=text;document.body.appendChild(t);
  setTimeout(()=>t.remove(),4000);
}
form.addEventListener("submit",async e=>{
  e.preventDefault(); if(state.sending)return;
  const value=input.value.trim();if(!value)return;
  const key=steps[state.index].key;
  if(!valid(key,value)){
    addMessage(key==="email"?"That doesn't look like a valid email. Try again.":"Give me a little more detail so I can record this correctly.");
    input.value="";return;
  }
  state.data[key]=value;addMessage(value,"user");input.value="";
  if(key==="grievance"){consent.style.display="block";addMessage("One last thing: confirm that you're okay with me sending these details to the person handling your request.");return}
  state.index++;renderPrompt();
});
consentCheck.addEventListener("change",()=>{
  if(consentCheck.checked && state.index===steps.length-1){
    state.index++; submitSignal();
  }
});
document.getElementById("openChat").onclick=openChat;
document.getElementById("openChat2").onclick=openChat;
document.getElementById("closeChat").onclick=closeChat;
overlay.addEventListener("click",e=>{if(e.target===overlay)closeChat()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeChat()});
