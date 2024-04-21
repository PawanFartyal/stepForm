const detailContainer = document.querySelector('#detailsContainer');
const details = JSON.parse(localStorage.getItem('details'));
for(let [key,value] of Object.entries(details)){
    if(key==="Password") continue;
    if(key=="Contact Number" || key=="Alternative Contact Number") {
        value = value.slice(0,2) + "********"
    }
    detailContainer.insertAdjacentHTML('beforeend',`<div class="detail">
        <h2>${key}</h2>
        <h2 class="value">${value}</h2>
    </div>`)
}