import{f as u}from"./fetch-hDQBONsW.js";const p=document.querySelector(".get_users");p.addEventListener("click",m);async function m(){console.log("Hei täällä ollaan");const t="https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/users",o={method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};u(t,o).then(e=>{console.log(e),h(e)})}function h(t){console.log(t);const n=document.querySelector(".tbody");n.innerHTML="",t.forEach(o=>{console.log(o.user_id,o.username,o.user_level);const e=document.createElement("tr"),l=document.createElement("td"),a=document.createElement("td");l.innerText=o.username,a.innerText=o.user_level;const c=document.createElement("td"),r=document.createElement("button");r.className="check",r.setAttribute("data-id",o.user_id),r.innerText="Info",c.appendChild(r),r.addEventListener("click",m);const d=document.createElement("td"),s=document.createElement("button");s.className="del",s.setAttribute("data-id",o.user_id),s.innerText="Delete",d.appendChild(s),s.addEventListener("click",k);const i=document.createElement("td");i.innerText=o.user_id,e.appendChild(l),e.appendChild(a),e.appendChild(c),e.appendChild(d),e.appendChild(i),n.appendChild(e)})}const g="https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/auth/me",y=localStorage.getItem("token"),E={method:"GET",headers:{Authorization:"Bearer: "+y}};u(g,E).then(t=>{console.log(t),document.getElementById("name").innerText=t.user.username});function k(t){console.log("Poistettu"),console.log(t);const n=t.target.attributes["data-id"].value;console.log(n);const o=t.target.parentElement.nextElementSibling.textContent;console.log("Toinen tapa",o);const e=`https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/users/${n}`,a={method:"DELETE",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};confirm(`Oletko varma että haluat poistaa käyttäjän ID: ${n}`)&&u(e,a).then(r=>{console.log(r)})}const S=document.querySelector(".update");S.addEventListener("click",async t=>{t.preventDefault(),console.log("Lisätään tietoja");const n="https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries";let o=localStorage.getItem("token");const e=document.querySelector("#post");if(!e.checkValidity()){e.reportValidity();return}console.log("Tiedot valideja, jatketaan");const l={date:e.querySelector("input[name=date]").value,mood:e.querySelector("select[name=moods]").value,weight:e.querySelector("input[name=weight]").value,sleep_hours:e.querySelector("input[name=hours]").value,notes:e.querySelector("input[name=notes]").value},a={method:"POST",headers:{Authorization:"Bearer: "+o,"Content-Type":"application/json"},body:JSON.stringify(l)};u(n,a).then(c=>{console.log(c)})});const f=document.querySelector("#logout");f.addEventListener("click",v);function v(t){t.preventDefault(),localStorage.removeItem("token"),console.log("logginout"),window.location.href="login.html"}
