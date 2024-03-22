import{f as d}from"./fetch-hDQBONsW.js";function u(){let o=localStorage.getItem("name");document.getElementById("name").innerText=o}u();async function s(o){o.preventDefault(),console.log("Nyt päivitetään tietoja");const n=document.querySelector("#Update");let e=localStorage.getItem("token");if(!n.checkValidity()){n.reportValidity();return}console.log("Tiedot valideja, jatketaan");const t={entry_id:n.querySelector("input[name=entry_id]").value,entry_date:n.querySelector("input[name=date]").value,mood:n.querySelector("select[name=moods]").value,weight:n.querySelector("input[name=weight]").value,sleep_hours:n.querySelector("input[name=hours]").value,notes:n.querySelector("textarea[name=notes]").value},a=`https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries/${t.entry_id}`,i={method:"PUT",headers:{Authorization:"Bearer: "+e,"Content-Type":"application/json"},body:JSON.stringify(t)};try{const r=await d(a,i);console.log(r),console.log(t),await l()}catch(r){console.error(r)}}function c(o){o.preventDefault();const n=o.target.attributes["data-id"].value;fetch(`https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries/${n}`,{method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}}).then(e=>e.json()).then(e=>{const t=document.querySelector("#app_information");t.innerHTML=`
            <form id="Update">
                    <label for="created_at">Date</label><br>
                    <input type="date" id="date" name="date" required><br>
                    <input type="hidden" name="entry_id" value="${e[0].entry_id}">
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
                    <input type="text" id="weight" name="weight" value="${e[0].weight}" required><br>
                    <label for="sleep_hours">Sleep_hours:</label><br>
                    <input type="int" id="sleep" name="hours" value="${e[0].sleep_hours}" required><br>
                    <label for="notes">Notes</label><br>
                    <textarea id="notes" name="notes" value="${e[0].notes}" required>${e[0].notes}</textarea><br>
                    <input name="submit" type="submit" value="Update" id="Update_button" />
                </form>
            `;const a=document.createElement("button");a.textContent="Insert Entry",a.setAttribute("data-id",e.entry_id),a.addEventListener("click",p),t.appendChild(a),Update_button.addEventListener("click",s)}).catch(e=>console.error("Error fetching data:",e))}function p(){const o=document.querySelector("#app_information");o.innerHTML=`
                <form id="post">
                    <label for="created_at">Date</label><br>
                    <input type="date" id="date" name="date" required><br>
                    <label for="mood">Select mood:</label><br>
                    <select id="moods" name="moods" required>
                        <option value="#"></option>
                        <option value="Happy">Happy</option>
                        <option value="Sad">Sad</option>
                        <option value="Exided">Exided</option>
                        <option value="Angry">Angry</option>
                      </select><br>
                  <!--  <input type="text" id="mood" name="mood" value=""><br> -->
                    <label for="weight">Weight:</label><br>
                    <input type="text" id="weight" name="weight" value="" required><br>
                    <label for="sleep_hours">Sleep_hours:</label><br>
                    <input type="int" id="sleep" name="hours" value="" required><br>
                    <label for="notes">Notes</label><br>
                    <textarea id="notes" name="notes" value="" required></textarea><br>
                    <input name="submit" type="submit" value="Post" class="post" />
                    
                </form>
  `}const m=document.querySelector(".post");m.addEventListener("click",async o=>{o.preventDefault(),console.log("Lisätään tietoja");const n="https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries";let e=localStorage.getItem("token");const t=document.querySelector("#post");if(!t.checkValidity()){t.reportValidity();return}console.log("Tiedot valideja, jatketaan");const a={entry_date:t.querySelector("input[name=date]").value,mood:t.querySelector("select[name=moods]").value,weight:t.querySelector("input[name=weight]").value,sleep_hours:t.querySelector("input[name=hours]").value,notes:t.querySelector("textarea[name=notes]").value},i={method:"POST",headers:{Authorization:"Bearer: "+e,"Content-Type":"application/json"},body:JSON.stringify(a)};console.log(a),d(n,i).then(async r=>{console.log(r),await l()})});const h=async o=>{o.preventDefault();const n=o.target.attributes["data-id"].value;confirm(`Oletko varma että haluat poistaa päivityksen ID:llä ${n}`)&&(fetch(`https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries/${n}`,{method:"DELETE",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}}),await l())},l=async()=>{const o=document.getElementById("entries_container");o.innerHTML="";let n=localStorage.getItem("token");fetch("https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries",{method:"GET",headers:{Authorization:"Bearer: "+n}}).then(e=>e.json()).then(e=>{e.forEach(t=>{const a=document.createElement("div");a.classList.add("entry"),a.innerHTML=`
              <div class="card" id="information_card">
      <div class="card-content">
        <h4>${new Date(t.entry_date).toLocaleDateString()}</h4>
        <p>${t.notes}</p>

      </div>
    </div>
                
              `;const i=document.createElement("button");i.textContent="Delete",i.setAttribute("data-id",t.entry_id),i.addEventListener("click",h),a.querySelector(".card-content").appendChild(i);const r=document.createElement("button");r.textContent="Update",r.setAttribute("data-id",t.entry_id),r.addEventListener("click",c),a.querySelector(".card-content").appendChild(r),o.appendChild(a)})}).catch(e=>console.error("Error fetching data:",e))};document.addEventListener("DOMContentLoaded",async()=>{localStorage.getItem("token")||(window.location.href="login.html"),await l()});const y=document.querySelector("#logout");y.addEventListener("click",v);function v(o){o.preventDefault(),localStorage.removeItem("token"),console.log("logginout"),window.location.href="login.html"}
