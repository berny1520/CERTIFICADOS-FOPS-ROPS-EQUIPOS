(function(){
 const data = window.EQUIPOS || [];
 const buscar = document.getElementById('buscar');
 const tipo = document.getElementById('tipo');
 const estado = document.getElementById('estado');
 const tabla = document.getElementById('tabla');
 const contador = document.getElementById('contador');
 const kpis = document.getElementById('kpis');
 const tipos = [...new Set(data.map(e=>e.tipo).filter(Boolean))].sort();
 tipos.forEach(t=>{ const o=document.createElement('option'); o.value=t; o.textContent=t; tipo.appendChild(o); });
 function badge(e){ return `<span class="badge ${e==='Certificado'?'ok':'warn'}">${e}</span>`; }
 function renderKpis(rows){
   const total = data.length;
   const cert = data.filter(x=>x.estado==='Certificado').length;
   const pend = total - cert;
   const tiposN = new Set(data.map(x=>x.tipo)).size;
   kpis.innerHTML = `<div class="kpi"><strong>${total}</strong><span>Equipos registrados</span></div><div class="kpi"><strong>${cert}</strong><span>Con certificado</span></div><div class="kpi"><strong>${pend}</strong><span>Pendientes</span></div><div class="kpi"><strong>${tiposN}</strong><span>Familias de equipo</span></div>`;
 }
 function render(){
   const q = (buscar.value || '').toLowerCase().trim();
   let rows = data.filter(e => (!tipo.value || e.tipo===tipo.value) && (!estado.value || e.estado===estado.value));
   if(q){ rows = rows.filter(e => Object.values(e).some(v => String(v||'').toLowerCase().includes(q))); }
   contador.textContent = `${rows.length} de ${data.length} registros`;
   tabla.innerHTML = rows.map(e => `<tr><td><b>${e.codigo}</b></td><td>${e.equipo}<div class="small">${e.tipo_certificado}</div></td><td>${e.tipo}</td><td>${e.marca || '-'}<div class="small">${e.modelo || ''}</div></td><td>${e.serie || '-'}<div class="small">Rig: ${e.rig || '-'}</div></td><td>${badge(e.estado)}</td><td>${e.certificado_pdf ? `<a class="link" href="${e.certificado_pdf}" target="_blank" rel="noopener">Ver PDF</a>` : '<span class="small">Pendiente</span>'}</td><td><a class="link" href="${e.validacion}">Validar</a></td></tr>`).join('') || `<tr><td colspan="8" class="empty">Sin resultados</td></tr>`;
 }
 [buscar,tipo,estado].forEach(x=>x.addEventListener('input',render));
 renderKpis(data); render();
})();
