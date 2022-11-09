const api_url = "http://localhost:3000/users";

var comments = {};
async function getUsers(){
    const response =  await fetch(api_url);
    const data = await response.json();
    console.log(data[0]["name"]);  
    console.log(data[0]["company"]["catchPhrase"]);  
    console.log(data[0]["company"]["bs"]);  
    console.log(data);
    var template =
     `<div class="card m-4" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <a href = "faculty-detail.html"><img src="../static/images/profile-1.jpg" class="img-fluid rounded-start" alt="..."></a>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title" id = "name"></h5>
                    <p class="card-text" id = "desc"></p>
                    <p class="card-text"><small class="text-muted" id = "small-desc"></small></p>
                </div>
            </div>
        </div>
      </div> `;
    for(var i = 0; i < 10; i++){
        const messages = document.getElementById('faculty');
        messages.insertAdjacentHTML("afterbegin", template);
        document.getElementById('name').textContent = data[i]["name"];
        document.getElementById('desc').textContent = data[i]["company"]["catchPhrase"];
        document.getElementById('small-desc').textContent = data[i]["company"]["bs"];
    }
}

getUsers();