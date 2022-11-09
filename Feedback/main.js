const api_url = "http://localhost:3000/comments";

var comments = {};
var template =
`
<div class="card message mt-1 m-4">
    <div class = "card-header d-flex flex-row justify-content-between">
       <div id = "sender-name"></div>
       <div>December 21st 2021</div>
       <div class = "upvote d-flex flex-row justify-content-between">
           <div>2</div>
            <div>
                <i class="material-icons icon-styling">change_history</i>
            </div>                    
        </div>                
    </div>
    <div class="card-body" id = "chat-detail">
    </div>
</div>
`;
const messages = document.getElementById('messages');

async function getComments(){
    const response =  await fetch(api_url);
    const data = await response.json();
    console.log(data);    
    for(var i = 0; i < 20; i++){
        comments[i] = data[i];
        // console.log(data[i]);
    }
    // console.log(comments[0]);


    // const newDiv = document.createElement('div');
    // var newContent = document.createTextNode(template);
    // newDiv.appendChild(newContent);
    // document.body.appendChild(newDiv);

    for(var i = 0; i < 20; i++){        
        messages.insertAdjacentHTML("afterbegin", template);
        document.getElementById('sender-name').textContent = comments[i].name;
        document.getElementById('chat-detail').textContent = comments[i].body;
    }
}

getComments();


// const messageReply = document.getElementById("message-reply");
// const out1 = document.getElementById("output");
var num = 1;
var templateReply = '';
// var templateReply = 
// `
// <div id = "message-reply">
//     <div class="card mt-1 m-4">
//         <div class = "card-header d-flex flex-row justify-content-between">
//             <div id = "sender-name">Nandita</div>
//             <div>December 21st 2021</div>
//             <div class = "upvote d-flex flex-row justify-content-between">
//                 <div>0</div>
//                 <div>
//                     <i class="material-icons icon-styling">change_history</i>
//                 </div>                    
//             </div>                
//         </div>
//         <div class="card-body" id = "chat-reply-detail-${num}">
//         </div>
//     </div>
// </div>
// `
function updateNum(num){
    var reply = 
`
<div id = "message-reply">
    <div class="card mt-1 m-4">
        <div class = "card-header d-flex flex-row justify-content-between">
            <div id = "sender-name">Nandita</div>
            <div>December 21st 2021</div>
            <div class = "upvote d-flex flex-row justify-content-between">
                <div>0</div>
                <div>
                    <i class="material-icons icon-styling">change_history</i>
                </div>                    
            </div>                
        </div>
        <div class="card-body" id = "chat-reply-detail-${num}">
        </div>
    </div>
</div>
`;
return reply;
}
function getInput(){
    templateReply = updateNum(num);
    messages.insertAdjacentHTML("beforeend", templateReply);
    const textTyped = document.getElementById("user-feedback");
    console.log(textTyped.value);

    document.getElementById(`chat-reply-detail-${num}`).textContent = textTyped.value;
    textTyped.value = "";
    num += 1;
    // const showData = document.getElementById("chat-detail");
    // showData.innerHTML = textTyped.value;
    // messageReply.style.display = "block";
}

// const buttonSend = document.getElementById("button-send");
// buttonSend.addEventListener('click', getInput);

// console.log(comments[0]);

// const userURL = "http://localhost:3000/users"
// fetch( userURL )
// .then(response=>response.json())
// .then(users=>console.log(users))

// const url = 'https://jsonplaceholder.typicode.com/users';
// fetch(url)
// .then((response) => {
//     return response.json();
// }).then((data) => {
//     let authors = data;
//     console.log(authors);
// }).catch(function(error) {
//     console.log(error);
// });

// fetch('https://jsonplaceholder.typicode.com/users')
// .then((response) => response.json())
// .then((data) => console.log(data));