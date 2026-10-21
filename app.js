/*
  BRUNITO · Brief estratégico de campañas (sin frameworks, listo para GitHub Pages)
  Para recibir briefs por email, pegá tu URL de Formspree en FORM_ENDPOINT.
  Ejemplo: https://formspree.io/f/abcdefgh
  Con la cadena vacía, el brief funciona pero SOLO exporta respuestas localmente.
*/
const FORM_ENDPOINT = '';
const STORAGE_KEY = 'brunito_ads_brief_v2';
const EMPTY_LABEL = 'No informado';

const has = (key, val) => Array.isArray(answers[key]) && answers[key].includes(val);
const ecommerce = () => ['Tienda online / e-commerce','Negocio mixto'].includes(answers.business_type);
const usesMeta = () => has('channels', 'Meta Ads (Facebook / Instagram)');
const usesGoogle = () => has('channels', 'Google Ads');
const hadCampaigns = () => answers.ad_history === 'Sí';

const steps = [
  {id:'negocio',nav:'El negocio',kicker:'01 / EL CONTEXTO',title:'Primero, tu negocio.',desc:'Necesitamos saber qué hacés y quién está detrás de la marca.',questions:[
    {id:'brand',label:'¿Cómo se llama tu negocio o marca?',kind:'text',required:true,placeholder:'Nombre comercial'},
    {id:'business_type',label:'¿Cómo vendés principalmente?',kind:'select',required:true,options:['Servicios / profesionales','Comercio o local físico','Tienda online / e-commerce','Negocio B2B / mayorista','Negocio mixto','Otro']},
    {id:'business_description',label:'¿Qué productos o servicios ofrecés?',kind:'textarea',required:true,wide:true,placeholder:'Contanos brevemente a qué se dedica tu negocio. Sin lenguaje técnico.'},
    {id:'contact_name',label:'¿Con quién coordinamos la campaña?',kind:'text',required:true,placeholder:'Nombre y apellido'},
    {id:'contact_email',label:'Correo electrónico de contacto',kind:'email',required:true,placeholder:'nombre@empresa.com'},
    {id:'contact_whatsapp',label:'WhatsApp de contacto',kind:'tel',placeholder:'Ej.: +54 9 351...'},
    {id:'online_presence',label:'Web, tienda online y/o redes sociales',kind:'text',wide:true,placeholder:'Enlaces de tu sitio web, Instagram o redes principales',hint:'Podés incluir varios enlaces separados por comas.'}
  ]},
  {id:'oferta',nav:'Oferta y valor',kicker:'02 / QUÉ VAMOS A VENDER',title:'Lo que realmente vendés.',desc:'La publicidad necesita una oferta clara. Y una razón concreta para elegirte.',questions:[
    {id:'focus_offer',label:'¿Qué producto o servicio querés promocionar primero?',kind:'textarea',required:true,wide:true,placeholder:'Priorizá 1 a 3 productos o servicios. No hace falta listar todo el catálogo.'},
    {id:'difference',label:'¿Por qué un cliente debería elegirte a vos?',kind:'textarea',required:true,wide:true,placeholder:'Precio, calidad, cercanía, rapidez, experiencia, garantías, financiación, etc.'},
    {id:'average_sale',label:'¿Cuál es el valor aproximado de una venta o ticket promedio?',kind:'text',placeholder:'Ej.: $45.000 ARS / USD 120',hint:'Si varía mucho, indicá un rango.'},
    {id:'allowed_cac',label:'¿Cuánto podrías invertir para conseguir una venta o cliente nuevo?',kind:'text',placeholder:'Si lo sabés, indicá un monto o margen',hint:'Es opcional. Nos ayuda a evaluar si la inversión es rentable.'},
    {id:'promotions',label:'¿Hay promociones, beneficios o condiciones especiales?',kind:'textarea',wide:true,placeholder:'Descuentos, cuotas, envío, asesoramiento, cupos, promociones o facilidades.'},
    {id:'competition',label:'¿Qué competidores o alternativas consideran tus clientes?',kind:'text',wide:true,placeholder:'Nombres, cuentas de Instagram o sitios de referencia'}
  ]},
  {id:'clientes',nav:'Clientes y mercado',kicker:'03 / A QUIÉN LE HABLAMOS',title:'El cliente correcto.',desc:'Buscamos entender a quién le resolvés un problema y dónde encontrarlo.',questions:[
    {id:'ideal_customer',label:'¿Cómo es tu cliente ideal?',kind:'textarea',required:true,wide:true,placeholder:'Ej.: familias que viven en Córdoba, dueños de comercios, personas que compran por internet...',hint:'Contá quién decide la compra. Si vendés a empresas, indicá rubro y cargo.'},
    {id:'customer_problem',label:'¿Qué necesidad o problema hace que te busquen?',kind:'textarea',required:true,wide:true,placeholder:'Qué les preocupa, qué necesitan resolver o qué desean lograr.'},
    {id:'sales_geography',label:'¿En qué zonas querés conseguir clientes?',kind:'textarea',required:true,wide:true,placeholder:'Ciudades, barrios, radio aproximado, provincias o países. ¿Enviás o atendés fuera de tu ciudad?'},
    {id:'objections',label:'¿Qué dudas o frenos suelen aparecer antes de comprar?',kind:'textarea',wide:true,placeholder:'Precio, confianza, tiempos, falta de información, comparaciones, etc.'},
    {id:'seasonality',label:'¿Tenés temporadas, horarios o fechas importantes?',kind:'text',wide:true,placeholder:'Ej.: mayor demanda en verano, atención de lun. a sáb., fechas de inscripción'},
    {id:'excluded_locations',label:'¿Hay zonas, tipos de clientes o condiciones que deberíamos excluir?',kind:'text',wide:true,placeholder:'Solo si aplica. Ej.: no enviamos fuera de Córdoba.'}
  ]},
  {id:'resultados',nav:'Objetivos e inversión',kicker:'04 / DEFINIR EL ÉXITO',title:'Qué vamos a conseguir.',desc:'Un buen objetivo no es “tener clics”: es generar resultados útiles para el negocio.',questions:[
    {id:'primary_goal',label:'¿Cuál es el objetivo comercial más importante?',kind:'radio',required:true,wide:true,options:['Más consultas por WhatsApp o mensajes','Más ventas online','Más presupuestos / formularios','Más reservas o turnos','Más llamadas','Más visitas al local','Dar a conocer mi marca'],hint:'Elegí solo uno. El resto podrá trabajarse como objetivo secundario.'},
    {id:'monthly_target',label:'¿Qué resultado mensual te gustaría alcanzar?',kind:'text',wide:true,placeholder:'Ej.: 60 consultas calificadas, 25 ventas, 15 turnos. Si no sabés, dejalo vacío.'},
    {id:'current_baseline',label:'¿Cuántas consultas o ventas recibís hoy aproximadamente?',kind:'text',wide:true,placeholder:'Ej.: 30 consultas y 8 ventas por mes; o “no lo medimos”'},
    {id:'monthly_budget',label:'¿Qué presupuesto mensual podés destinar a los anuncios?',kind:'text',required:true,placeholder:'Ej.: $180.000 ARS / USD 250',hint:'Solo inversión publicitaria; no incluye honorarios de gestión.'},
    {id:'start_date',label:'¿Cuándo querés comenzar?',kind:'select',options:['Lo antes posible','Durante las próximas 2 semanas','El mes que viene','Tengo una fecha específica','Todavía no lo definí']},
    {id:'channels',label:'¿En qué plataformas querés hacer publicidad?',kind:'checkbox',required:true,wide:true,options:['Meta Ads (Facebook / Instagram)','Google Ads','Quiero que brunito me recomiende'],hint:'Podés elegir ambas. Si todavía no sabés, elegí la opción de asesoramiento.'}
  ]},
  {id:'plataformas',nav:'Campañas y recursos',kicker:'05 / CON QUÉ CONTAMOS',title:'La base para lanzar.',desc:'Revisamos lo que ya existe y los recursos que podemos aprovechar.',questions:[
    {id:'ad_history',label:'¿Ya hiciste publicidad paga antes?',kind:'radio',required:true,wide:true,options:['Sí','No','No sé']},
    {id:'ad_learnings',label:'¿Qué funcionó y qué no en campañas anteriores?',kind:'textarea',wide:true,when:hadCampaigns,placeholder:'Resultados, inversiones, campañas, problemas. Si tenés un reporte, podés pasarlo por separado.'},
    {id:'creative_assets',label:'¿Qué material tenés disponible para hacer anuncios?',kind:'checkbox',wide:true,options:['Fotos de productos / servicios','Videos o reels','Diseños / identidad visual','Testimonios / casos de éxito','Catálogo de productos','Todavía no tengo material']},
    {id:'assets_link',label:'¿Dónde podemos ver ese material?',kind:'text',wide:true,placeholder:'Carpeta pública, sitio web, redes, etc.'},
    {id:'meta_section',kind:'section',label:'META ADS · FACEBOOK E INSTAGRAM',description:'Solo para quienes van a usar Meta.',when:usesMeta},
    {id:'meta_profiles',label:'¿Cuáles son los enlaces a tus perfiles de Instagram y Facebook?',kind:'text',wide:true,when:usesMeta,placeholder:'Instagram / Facebook'},
    {id:'meta_account',label:'¿Tenés cuenta publicitaria en Meta Business Suite?',kind:'select',when:usesMeta,options:['Sí, está funcionando','Sí, pero no sé cómo está configurada','No','No sé']},
    {id:'google_section',kind:'section',label:'GOOGLE ADS · BÚSQUEDAS',description:'Solo para quienes van a usar Google.',when:usesGoogle},
    {id:'google_account',label:'¿Tenés cuenta de Google Ads?',kind:'select',when:usesGoogle,options:['Sí, activa','Sí, pero hace tiempo que no la uso','No','No sé']},
    {id:'google_queries',label:'¿Qué buscaría en Google alguien listo para comprarte?',kind:'textarea',wide:true,when:usesGoogle,placeholder:'Escribí 3 a 5 búsquedas reales. Ej.: “herrero en Carlos Paz”, “comprar crema facial natural”.'},
    {id:'google_maps',label:'¿Tenés una ficha de negocio en Google Maps?',kind:'select',when:usesGoogle,options:['Sí','No','No sé','No aplica']},
    {id:'merchant_center',label:'¿Tenés Merchant Center / catálogo de productos para Google?',kind:'select',wide:true,when:()=>usesGoogle()&&ecommerce(),options:['Sí','No','No sé']}
  ]},
  {id:'conversion',nav:'Venta y medición',kicker:'06 / DEL CLIC AL RESULTADO',title:'Que cada clic cuente.',desc:'El anuncio atrae; la experiencia de compra, la atención y la medición completan el trabajo.',questions:[
    {id:'conversion_path',label:'¿Por dónde preferís recibir las consultas o concretar las ventas?',kind:'checkbox',required:true,wide:true,options:['WhatsApp','Mensajes de Instagram / Facebook','Formulario web','Tienda online / checkout','Llamadas','Local / Google Maps']},
    {id:'sales_response',label:'¿Quién atiende las consultas y en cuánto tiempo responde?',kind:'textarea',required:true,wide:true,placeholder:'Ej.: atiende el dueño por WhatsApp de 9 a 18 h; responde en menos de 1 hora.',hint:'Nos ayuda a definir horarios, calidad de contacto y expectativas.'},
    {id:'landing_status',label:'¿Tenés web, landing o tienda lista para recibir visitas?',kind:'select',options:['Sí, funciona correctamente','Sí, pero necesita mejoras','Está en desarrollo','No tengo web','No aplica: venderemos por mensajes']},
    {id:'tracking',label:'¿Sabés qué herramientas de medición están configuradas?',kind:'checkbox',wide:true,options:['Google Analytics 4 (GA4)','Google Tag Manager (GTM)','Meta Pixel / Conversions API','Conversiones en Google Ads','CRM o registro de clientes','No sé / ninguna'],hint:'No hace falta que lo sepas: brunito puede auditarlo antes del lanzamiento.'},
    {id:'lead_process',label:'¿Cómo seguís un contacto hasta convertirlo en cliente?',kind:'text',wide:true,placeholder:'Ej.: planilla, CRM, seguimiento por WhatsApp, sistema de ventas o todavía no lo medimos.'},
    {id:'restrictions',label:'¿Hay requisitos, restricciones o aprobaciones que debamos considerar?',kind:'textarea',wide:true,placeholder:'Normas del rubro, afirmaciones que no pueden hacerse, zonas sin servicio, horarios, autorizaciones, stock, capacidad o fechas límite.'},
    {id:'anything_else',label:'¿Hay algo importante que todavía no te preguntamos?',kind:'textarea',wide:true,placeholder:'Cualquier detalle que influya en el negocio o las campañas.'}
  ]}
];

const els = {
  nav:document.getElementById('step-nav'),content:document.getElementById('form-content'),error:document.getElementById('form-error'),
  stepLabel:document.getElementById('step-label'),stepProgress:document.getElementById('step-progress'),bar:document.getElementById('progress-fill'),
  progressbar:document.getElementById('progressbar'),prev:document.getElementById('prev-button'),next:document.getElementById('next-button'),
  save:document.getElementById('save-button'),actions:document.getElementById('form-actions'),toast:document.getElementById('toast'),footnote:document.getElementById('form-footnote')
};
let answers = {};
let stepIndex = 0;
let delivered = false;
let toastTimer;
try { const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'); if(stored && typeof stored==='object' && !Array.isArray(stored)) answers=stored; } catch(_e) {}
const escapeHTML = value => String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const active = q => typeof q.when !== 'function' || q.when();
const currentQuestions = index => steps[index].questions.filter(active).filter(q=>q.kind!=='section');
const checkedValues = key => Array.isArray(answers[key]) ? answers[key] : [];
const populated = v => Array.isArray(v) ? v.length>0 : typeof v==='string' ? v.trim().length>0 : !!v;
const normalize = value => String(value||'cliente').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,55);
const saveDraft = () => { try{localStorage.setItem(STORAGE_KEY,JSON.stringify(answers));return true}catch(_e){return false} };
const el = (tag,attributes={}) => {const element=document.createElement(tag);Object.entries(attributes).forEach(([k,v])=>element.setAttribute(k,v));return element;};
function notify(message){els.toast.textContent=message;els.toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>els.toast.classList.remove('show'),3200)}
function fieldMarkup(q){
  if(q.kind==='section')return `<div class="subsection"><div class="subsection-label"><span class="subsection-dot"></span>${escapeHTML(q.label)}</div><p class="subsection-subtitle">${escapeHTML(q.description||'')}</p></div>`;
  const id=`input-${q.id}`;
  const value=answers[q.id]||'';
  const opt = q.required ? ' <span class="req" aria-label="obligatorio">*</span>' : '<span class="optional">Opcional</span>';
  let input='';
  if(q.kind==='textarea')input=`<textarea class="field-control" id="${id}" name="${q.id}" rows="3" placeholder="${escapeHTML(q.placeholder||'')}" ${q.required?'required':''}>${escapeHTML(value)}</textarea>`;
  else if(q.kind==='select')input=`<select class="field-control" id="${id}" name="${q.id}" ${q.required?'required':''}><option value="">Seleccionar una opción</option>${q.options.map(opt=>`<option value="${escapeHTML(opt)}" ${value===opt?'selected':''}>${escapeHTML(opt)}</option>`).join('')}</select>`;
  else if(q.kind==='checkbox'||q.kind==='radio') {
    const values = q.kind==='checkbox' ? checkedValues(q.id) : [value];
    input=`${q.hint?`<p class="group-hint">${escapeHTML(q.hint)}</p>`:''}<div class="option-group">${q.options.map((option,i)=>`<label class="option-chip"><input name="${q.id}" type="${q.kind==='radio'?'radio':'checkbox'}" value="${escapeHTML(option)}" ${values.includes(option)?'checked':''} ${q.required&&i===0?'data-required="true"':''}><span>${escapeHTML(option)}</span></label>`).join('')}</div>`;
  } else input=`<input class="field-control" id="${id}" name="${q.id}" type="${q.kind}" value="${escapeHTML(value)}" placeholder="${escapeHTML(q.placeholder||'')}" ${q.required?'required':''}>`;
  const lab=q.kind==='radio'||q.kind==='checkbox' ? `<div id="label-${q.id}" class="field-label">${escapeHTML(q.label)}${opt}</div>` : `<label for="${id}" class="field-label">${escapeHTML(q.label)}${opt}</label>`;
  const hint= (q.kind==='checkbox'||q.kind==='radio') ? '' : q.hint?`<small class="field-hint">${escapeHTML(q.hint)}</small>`:'';
  return `<div class="field ${q.wide?'wide':''}" data-field="${q.id}" ${q.kind==='checkbox'||q.kind==='radio'?`role="group" aria-labelledby="label-${q.id}"`:''}>${lab}${input}${hint}</div>`;
}
function updateAnswersFromVisible(){
  if(stepIndex>=steps.length)return;
  for(const q of currentQuestions(stepIndex)){
    const controls=[...els.content.querySelectorAll(`[name="${q.id}"]`)];
    if(!controls.length)continue;
    if(q.kind==='checkbox')answers[q.id]=controls.filter(n=>n.checked).map(n=>n.value);
    else if(q.kind==='radio')answers[q.id]=controls.find(n=>n.checked)?.value||'';
    else answers[q.id]=controls[0].value.trim();
  }
  saveDraft();
}
function attachListeners(){
  els.content.querySelectorAll('input,select,textarea').forEach(input=>{
    const type=input.type;
    input.addEventListener(type==='checkbox'||type==='radio'||type==='select-one'?'change':'input',()=>{
      updateAnswersFromVisible();hideError();
      if(input.name==='ad_history')render();
    });
  });
}
function hideError(){els.error.textContent='';els.error.classList.add('hidden');els.content.querySelectorAll('.invalid').forEach(n=>n.classList.remove('invalid'))}
function validateStep(){
  updateAnswersFromVisible();hideError();
  const missing=currentQuestions(stepIndex).filter(q=>q.required&&!populated(answers[q.id]));
  if(missing.length){
    const q=missing[0];
    els.error.textContent=`Falta completar: ${q.label}`;
    els.error.classList.remove('hidden');
    const target=els.content.querySelector(`[data-field="${q.id}"]`);
    target?.querySelector('.field-control')?.classList.add('invalid');
    target?.scrollIntoView({behavior:'smooth',block:'center'});
    return false;
  }
  const email=answers.contact_email||'';
  if(stepIndex===0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    els.error.textContent='Ingresá una dirección de correo electrónico válida.';els.error.classList.remove('hidden');
    els.content.querySelector('[name="contact_email"]')?.focus();return false;
  }
  return true;
}
function setProgress(){
  const review=stepIndex===steps.length;
  const pct=Math.round(100*Math.min(stepIndex,steps.length)/steps.length);
  els.stepLabel.textContent=review?'REVISIÓN FINAL':`ETAPA ${String(stepIndex+1).padStart(2,'0')} / 06`;
  els.stepProgress.textContent=review?'6 DE 6 COMPLETADAS':`${stepIndex+1} DE 6`;
  els.bar.style.width=`${review?100:pct}%`;els.progressbar.setAttribute('aria-valuenow',review?100:pct);
  els.nav.innerHTML=steps.map((s,i)=>`<div class="nav-step ${i===stepIndex?'active':''} ${i<stepIndex?'done':''}" ${i===stepIndex?'aria-current="step"':''}><span class="nav-num">${i<stepIndex?'✓':String(i+1).padStart(2,'0')}</span><span class="nav-name">${escapeHTML(s.nav)}</span></div>`).join('');
}
function render(){
  delivered=false;
  setProgress();hideError();
  if(stepIndex===steps.length){renderReview();return;}
  const section=steps[stepIndex];
  els.content.innerHTML=`<div class="step-kicker">BR / ${escapeHTML(section.kicker)}</div><h2 class="step-title">${escapeHTML(section.title)}</h2><p class="step-description">${escapeHTML(section.desc)}</p><div class="fields">${section.questions.filter(active).map(fieldMarkup).join('')}</div>`;
  els.prev.classList.toggle('hidden',stepIndex===0);
  els.next.innerHTML='Continuar <span aria-hidden="true">→</span>';
  els.save.classList.remove('hidden');
  els.footnote.classList.remove('hidden');
  attachListeners();
}
function allActive(){return steps.map(s=>({...s,questions:s.questions.filter(active).filter(q=>q.kind!=='section')}));}
function answerText(value){return Array.isArray(value)?value.join(', '):(value||EMPTY_LABEL)}
function normalizedAnswers(){
  return allActive().reduce((obj,s)=>{
    for(const q of s.questions){ if(populated(answers[q.id]))obj[q.label]=answerText(answers[q.id]); }
    return obj;
  },{});
}
function reportText(){
  return ['BRUNITO / BRIEF ESTRATÉGICO DE CAMPAÑAS',`Negocio: ${answers.brand||EMPTY_LABEL}`,`Generado: ${new Intl.DateTimeFormat('es-AR',{dateStyle:'long',timeStyle:'short'}).format(new Date())}`,'','—'.repeat(45), ...allActive().flatMap((s,i)=>[
    '',`${i+1}. ${s.nav.toUpperCase()}`,'',...s.questions.map(q=>`${q.label}\n${answerText(answers[q.id])}\n`)
  ])].join('\n');
}
function reportFile(extension,content,type){
  const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);
  const link=el('a',{href:url,download:`brunito-brief-${normalize(answers.brand)}.${extension}`});
  document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function downloadTxt(){reportFile('txt',reportText(),'text/plain;charset=utf-8');notify('Brief descargado correctamente.')}
function downloadJson(){reportFile('json',JSON.stringify({brief:'brunito / Campañas Meta Ads y Google Ads',generated_at:new Date().toISOString(),answers:normalizedAnswers()},null,2),'application/json;charset=utf-8');notify('Datos exportados en JSON.')}
async function copyBrief(){
  try { await navigator.clipboard.writeText(reportText());notify('Respuestas copiadas al portapapeles.');}
  catch(_e){notify('No se pudo copiar. Usá “Descargar respuestas”.')}
}
function renderReview(){
  els.prev.classList.remove('hidden');
  els.save.classList.add('hidden');
  els.next.classList.toggle('hidden',!FORM_ENDPOINT);
  els.next.innerHTML='Enviar brief <span aria-hidden="true">→</span>';
  els.content.innerHTML=`<div class="step-kicker">BR / 07 — REVISAR</div><h2 class="step-title">Todo listo para revisar.</h2><p class="step-description">Estas son tus respuestas. Podés volver a cualquier sección y corregir lo que necesites.</p>
    <p class="review-intro">${FORM_ENDPOINT?'Al enviarlo, el brief se compartirá con brunito a través del servicio de formularios configurado.':'La recepción automática todavía no está configurada. Descargá las respuestas o guardalas en PDF para compartirlas con brunito.'}</p>
    <div id="review-sections">${allActive().map((s,index)=>`<section class="review-section"><div class="review-header"><h3>${String(index+1).padStart(2,'0')} / ${escapeHTML(s.nav)}</h3><button class="edit-link" data-edit="${index}" type="button">Editar ↗</button></div><dl class="review-list">${s.questions.filter(q=>populated(answers[q.id])).map(q=>`<div class="review-item"><dt>${escapeHTML(q.label)}</dt><dd>${escapeHTML(answerText(answers[q.id]))}</dd></div>`).join('')||'<div class="review-item"><dd>No hay respuestas en esta sección.</dd></div>'}</dl></section>`).join('')}</div>
    ${FORM_ENDPOINT?'<div class="privacy-row"><label><input id="send-ok" type="checkbox"><span>Confirmo que la información es correcta y autorizo a brunito a contactarme para preparar la propuesta publicitaria.</span></label></div>':''}
    <div class="summary-actions"><button class="btn btn-outline" id="download-txt" type="button">↓ Descargar respuestas</button><button class="btn btn-outline" id="print-pdf" type="button">↗ Guardar como PDF</button><button class="btn btn-subtle" id="copy-txt" type="button">Copiar texto</button><button class="btn btn-subtle" id="download-json" type="button">↓ JSON</button></div>
    <p class="summary-disclosure">No envíes contraseñas, claves API, datos de tarjetas ni credenciales. Los accesos publicitarios se gestionan mediante invitaciones con permisos específicos. El borrador queda guardado en este navegador.</p>`;
  els.content.querySelectorAll('[data-edit]').forEach(button=>button.addEventListener('click',()=>{stepIndex=Number(button.dataset.edit);render();scrollToBrief()}));
  document.getElementById('download-txt').addEventListener('click',downloadTxt);
  document.getElementById('download-json').addEventListener('click',downloadJson);
  document.getElementById('copy-txt').addEventListener('click',copyBrief);
  document.getElementById('print-pdf').addEventListener('click',()=>window.print());
}
function scrollToBrief(){
  const node=document.getElementById('brief');
  const top=node.getBoundingClientRect().top+window.scrollY-15;
  window.scrollTo({top,behavior:'smooth'});
}
async function sendBrief(){
  if(!FORM_ENDPOINT)return;
  if(!document.getElementById('send-ok')?.checked){els.error.textContent='Confirmá que la información es correcta para enviarla.';els.error.classList.remove('hidden');return;}
  els.next.disabled=true;els.next.textContent='Enviando…';
  try{
    const payload={_subject:`Nuevo brief de campañas · ${answers.brand||'Cliente'}`,...normalizedAnswers()};
    const res=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify(payload)});
    if(!res.ok)throw Error('El servidor rechazó el envío.');
    localStorage.removeItem(STORAGE_KEY);delivered=true;
    els.content.innerHTML='<div class="success-state"><div class="success-icon" aria-hidden="true">✓</div><div class="step-kicker">BR / ENVÍO CORRECTO</div><h2>¡Gracias!<br>Ahora empieza la estrategia.</h2><p>Tu brief se envió correctamente. brunito revisará la información para definir el enfoque de las campañas.</p></div>';
    els.actions.classList.add('hidden');els.footnote.classList.add('hidden');hideError();
  }catch(_e){els.error.textContent='No pudimos confirmar el envío. Descargá una copia de tus respuestas y volvé a intentar.';els.error.classList.remove('hidden');}
  finally{els.next.disabled=false;els.next.textContent='Enviar brief →';}
}
els.prev.addEventListener('click',()=>{if(delivered)return;updateAnswersFromVisible();if(stepIndex>0){stepIndex--;render();scrollToBrief()}});
els.next.addEventListener('click',()=>{
  if(delivered)return;
  if(stepIndex===steps.length){sendBrief();return;}
  if(!validateStep())return;
  stepIndex=Math.min(stepIndex+1,steps.length);render();scrollToBrief();
});
els.save.addEventListener('click',()=>{updateAnswersFromVisible();notify(saveDraft()?'Borrador guardado en este navegador.':'No se pudo guardar el borrador en este dispositivo.')});
render();
