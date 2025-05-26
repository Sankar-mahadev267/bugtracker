//api base url http://localhost:8008
const API_URL='http://localhost:8008/bugtrackerapi/developer';
const token=localStorage.getItem("jwtToken");

//Bugs


const allBug=document.getElementById("all-bug-id");
const bugDesc=document.getElementById("bug-desc-id");
const black=document.getElementById("black");

//get bugs when click on bugs page
getAllBugs();

//display allbugs on when user clicks on allbugs
allBug.addEventListener("click" , () => {getAllBugs()});

async function getAllBugs() {
    try {
        const response=await fetch(`${API_URL}/bugs` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });
    
        if(response.ok){
            var a=1;
             bugList= await response.json();
            const bugTable=document.getElementById("bug-table-id");
            bugTable.replaceChildren();
            bugList.forEach( bug => {
                const row=document.createElement('tr');
                const bugId=`${bug.id}`;
                row.ondblclick=function(){bugDescription(bugId);};
                row.innerHTML=`
                    <td class="align-center" width="60">${a}</td>
                    <td>${bug.title}</td>
                    <td width="200"><span class="${bug.status}" onclick="bugStatusBoxfun(${bug.id})">${bug.status}</span></td>
                    <td width="200">${bug.createdAt.substr(0,10)}&nbsp;&nbsp;${bug.createdAt.substr(11,8)}</td>
                `;
                bugTable.appendChild(row);
                a++;
            });
        }
    } catch (error) {
        console.error("error "+error);
    }
}


//get bug by serching bug title
document.getElementById("get-bug-form").onsubmit=async function (event) {
    event.preventDefault();
    const title=document.querySelector("#get-bug-form input").value;
    try{
        const response=await fetch(`${API_URL}/bugs/title/${title}` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });

        if(response.ok){
            document.getElementById("get-bug-form").reset();
            const bug= await response.json();
            const bugTable=document.getElementById("bug-table-id");
            bugTable.replaceChildren();
            const row =document.createElement("tr");
            const bugId=`${bug.id}`;
            row.ondblclick=function(){bugDescription(bugId);};
            row.innerHTML=`
                <td width="60" class="align-center">${bug.id}</td>
                <td>${bug.title}</td>
                <td width="200"><span class="${bug.status}" onclick="bugStatusBoxfun(${bug.id})">${bug.status}</span></td>
                <td width="200">${bug.createdAt.substr(0,10)}&nbsp;&nbsp;${bug.createdAt.substr(11,8)}</td>
            `;
            bugTable.appendChild(row);
        }
        else{
            alert('Enter correct title');
        }
        
    } catch(error){
        console.error('Error..'+ error);
    }
}


const bugDescMatter=document.getElementById("bug-desc-matter");

// display bug description when click on bug
async function bugDescription(id) {

    try{
        const response=await fetch(`${API_URL}/bugs/${id}` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });
    
        if(response.ok){
            bugDesc.style.display='block';
            black.style.display='block';
            const bug= await response.json();
            bugDescMatter.replaceChildren();
            bugDescMatter.innerHTML=`
                <h3>${bug.title} <span id="${bug.status}"> ${bug.status}</span> &nbsp;&nbsp;&nbsp;<i class="bi bi-chat-left-text" onclick="addCommentBox(${bug.id})"></i></h3>
                <p>${bug.description}</p>
                <p>Reporter    : ${bug.reportedBy.username}</p>
                <p>Project     : ${bug.project.projectTitle}</p>
            `;
        }

    } catch(error) {
        console.error('Error.. '+ error);
    }  
}


const bugStatusBox=document.getElementById("bug-status-box-id");

// display bug status box
function bugStatusBoxfun(id){
    bugStatusBox.style.display='block';
    black.style.display='block';
    document.getElementById("bug-status-form").onsubmit = function(event){
        event.preventDefault();
        const status=document.querySelector('input[name="status"]:checked').value;
        bugStatus(id,status);
    };
}

//changing bug status function
async function bugStatus(id,status) {

    const data={
        status:`${status}`
    };
    try{
        const response=await fetch(`${API_URL}/bugs/${id}` , {
            method: "PUT",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if(response.ok){
            document.getElementById("bug-status-form").reset();
            bugStatusBox.style.display='none';
            black.style.display='none';
            const bug= await response.json();
            const bugTable=document.getElementById("bug-table-id");
            bugTable.replaceChildren();
            const row =document.createElement("tr");
            const bugId=`${bug.id}`;
            row.ondblclick=function(){bugDescription(bugId);};
            row.innerHTML=`
                <td class="align-center" width="60">${bug.id}</td>
                <td>${bug.title}</td>
                <td width="200"><span class="${bug.status}" onclick="bugStatusBoxfun(${bug.id})">${bug.status}</span></td>
                <td width="200">${bug.createdAt.substr(0,10)}&nbsp;&nbsp;${bug.createdAt.substr(11,8)}</td>
            `;
            bugTable.appendChild(row);
        }
        else{
            alert('Try again');
        }
        
    } catch(error){
        console.error('Error..'+ error);
    }
}

const commentBox=document.getElementById("comment-box-id");

function addCommentBox(id) {
    if(commentBox.style.display == 'none'){
        commentBox.style.display='block';
     } else{
        commentBox.style.display='none';
     }
     displayComments(id);
     document.querySelector("#comment-form i").onclick=function(event){
        event.preventDefault();
        addComment(id);
     };
     document.getElementById("comment-form").onsubmit=function(event){
        event.preventDefault();
        addComment(id);
     };
}

async function displayComments(id) {
    try {
        const response=await fetch(`${API_URL}/bugs/${id}/comments` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });
        if(response.ok){
            const comments= await response.json();
            const allComments=document.getElementById("comments");
            allComments.replaceChildren();
            comments.forEach(comment => {
                const ele=document.createElement('div');
                ele.classList.add("comment");
                ele.innerHTML=`
                    <i class="bi bi-person"></i><span>${comment.author.username}</span>
                    <p class="message">${comment.message}</p>
                `;
                allComments.appendChild(ele);
            });
        }
    } catch (error) {
        console.error('Error..'+ error);
    }
}

async function addComment(id){
    const data={
        message:document.getElementById("message").value
    };
    try{
        const response=await fetch(`${API_URL}/bugs/${id}/comments` , {
            method: "POST",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if(response.ok){
            document.getElementById("comment-form").reset();
            commentBox.style.display='none';
            alert('Comment/feedback added successfully');
        }
        else{
            alert('Try again');
        }
        
    } catch(error){
        console.error('Error..'+ error);
    }
}

black.addEventListener("click" , () => {
    black.style.display='none'
    if(bugDesc.style.display == 'block'){
        bugDesc.style.display='none';
    }
    if(bugStatusBox.style.display =='block'){
        bugStatusBox.style.display ='none';
    }
    if(commentBox.style.display=='block'){
        commentBox.style.display='none';
    }
});







