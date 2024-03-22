import{f as l}from"./fetch-hDQBONsW.js";function u(){let o=localStorage.getItem("name");document.getElementById("name").innerText=o}u();async function s(o){o.preventDefault(),console.log("Nyt päivitetään tietoja");const a="https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries/:id";let t=localStorage.getItem("token");const e=document.querySelector("#Update");if(!e.checkValidity()){e.reportValidity();return}console.log("Tiedot valideja, jatketaan");const n={entry_id:e.querySelector("input[name=entry_id]").value,mood:e.querySelector("select[name=moods]").value,weight:e.querySelector("input[name=weight]").value,sleep_hours:e.querySelector("input[name=hours]").value,notes:e.querySelector("textarea[name=notes]").value},i={method:"PUT",headers:{Authorization:"Bearer: "+t,"Content-Type":"application/json"},body:JSON.stringify(n)};try{const r=await l(a,i);console.log(r),console.log(n)}catch(r){console.error(r)}}function d(o){o.preventDefault();const a=o.target.attributes["data-id"].value;fetch(`https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries/${a}`,{method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}}).then(t=>t.json()).then(t=>{const e=document.querySelector("#app_information");e.innerHTML=`
            <form id="Update">
                    <input type="hidden" name="entry_id" value="${t[0].entry_id}">
                    <label for="mood">Select mood:</label><br>
                    <select id="moods" name="moods" required>
                        <option value=""></option>
                        <option value="Happy" selected>Happy</option>
                        <option value="Sad">Sad</option>
                        <option value="Exided">Exided</option>
                        <option value="Angry">Angry</option>
                      </select><br>
                  <!--  <input type="text" id="mood" name="mood" value=""><br> -->
                    <label for="weight">Weight:</label><br>
                    <input type="text" id="weight" name="weight" value="${t[0].weight}" required><br>
                    <label for="sleep_hours">Sleep_hours:</label><br>
                    <input type="int" id="sleep" name="hours" value="${t[0].sleep_hours}" required><br>
                    <label for="notes">Notes</label><br>
                    <textarea id="notes" name="notes" value="${t[0].notes}" required>${t[0].notes}</textarea><br>
                    <input name="submit" type="submit" value="Update" id="Update_button" />
                    
                    
                </form>
              
            `,Update_button.addEventListener("click",s)}).catch(t=>console.error("Error fetching data:",t))}const p=document.querySelector(".post");p.addEventListener("click",async o=>{o.preventDefault(),console.log("Lisätään tietoja");const a="https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries";let t=localStorage.getItem("token");const e=document.querySelector("#post");if(!e.checkValidity()){e.reportValidity();return}console.log("Tiedot valideja, jatketaan");const n={entry_date:e.querySelector("input[name=date]").value,mood:e.querySelector("select[name=moods]").value,weight:e.querySelector("input[name=weight]").value,sleep_hours:e.querySelector("input[name=hours]").value,notes:e.querySelector("textarea[name=notes]").value},i={method:"POST",headers:{Authorization:"Bearer: "+t,"Content-Type":"application/json"},body:JSON.stringify(n)};console.log(n),l(a,i).then(async r=>{console.log(r),await c()})});const c=async()=>{const o=document.getElementById("entries_container");o.innerHTML="";let a=localStorage.getItem("token");fetch("https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries",{method:"GET",headers:{Authorization:"Bearer: "+a}}).then(t=>t.json()).then(t=>{t.forEach(e=>{const n=document.createElement("div");n.classList.add("entry"),n.innerHTML=`
              <div class="card" id="information_card">
      <div class="card-content">
        <h4>${new Date(e.entry_date).toLocaleDateString()}</h4>
        <p>${e.notes}</p>
        <button id="create_update_button" data-id="${e.entry_id}">Update<button/>

      </div>
    </div>
                
              `,o.appendChild(n),document.querySelector("#create_update_button").addEventListener("click",d)})}).catch(t=>console.error("Error fetching data:",t))};document.addEventListener("DOMContentLoaded",async()=>{await c()});const m=document.querySelector("#logout");m.addEventListener("click",h);function h(o){o.preventDefault(),localStorage.removeItem("token"),console.log("logginout"),window.location.href="login.html"}
