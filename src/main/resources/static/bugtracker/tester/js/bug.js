//api base url http://localhost:8008
const API_URL='http://localhost:8008/bugtrackerapi/tester';
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
    const response=await fetch(`${API_URL}/bugs` , {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+token,
            "Content-Type": "application/json"
        }
    });

    var a=1;
    const bugList= await response.json();
    const bugTable=document.getElementById("bug-table-id");
    bugTable.replaceChildren();
    bugList.forEach( bug => {
        const row=document.createElement('tr');
        const bugId=`${bug.id}`;
        row.ondblclick=function(){bugDescription(bugId);};
        row.innerHTML=`
            <td width="60">${a}</td>
            <td>${bug.title}</td>
            <td width="200"><span class="${bug.status}" onclick="bugStatusBoxfun(${bug.id})">${bug.status}</span></td>
            <td width="100"><i class="bi bi-pencil-square" onclick="updateBugBoxfun(${bug.id})"></i></td>
            <td width="100"><i class="bi bi-trash" onclick="deleteBugBoxfun(${bug.id})"></i></td>
        `;
        bugTable.appendChild(row);
        a++;
    });
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
            document.getElementById("get-bug-form").reset;
            const bug= await response.json();
            const bugTable=document.getElementById("bug-table-id");
            bugTable.replaceChildren();
            const row =document.createElement("tr");
            const bugId=`${bug.id}`;
            row.ondblclick=function(){bugDescription(bugId);};
            row.innerHTML=`
                <td width="60">${bug.id}</td>
                <td>${bug.title}</td>
                <td width="200"><span class="${bug.status}" onclick="bugStatusBoxfun(${bug.id})">${bug.status}</span></td>
                <td width="100"><i class="bi bi-pencil-square" onclick="updateBugBoxfun(${bug.id})"></i></td>
                <td width="100"><i class="bi bi-trash" onclick="deleteBugBoxfun(${bug.id})"></i></td>
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
            bugDesc.replaceChildren();
            var dev="Not assigned";
            if(bug.assignedTo != null){
                dev=bug.assignedTo.username;
            }
            bugDesc.innerHTML=`
                <h3>${bug.title} <span id="${bug.status}"> ${bug.status}</span> &nbsp;&nbsp;&nbsp;&nbsp;<i class="bi bi-chat-left-text" onclick="addCommentBox(${bug.id})"></i></h3>
                <p>${bug.description}</p>
                <p>created At  : ${bug.createdAt}</p>
                <p>Project     : ${bug.project.projectTitle}</p>
                <p>Developer   : ${dev}</p>
            `;
        } else{
            alert('try again');
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
        const status=document.getElementById("status").value;
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
            document.getElementById("bug-status-form").reset;
            bugStatusBox.style.display='none';
            black.style.display='none';
            const bug= await response.json();
            const bugTable=document.getElementById("bug-table-id");
            bugTable.replaceChildren();
            const row =document.createElement("tr");
            const bugId=`${bug.id}`;
            row.ondblclick=function(){bugDescription(bugId);};
            row.innerHTML=`
                <td width="60">${bug.id}</td>
                <td>${bug.title}</td>
                <td width="200"><span class="${bug.status}" onclick="bugStatusBoxfun(${bug.id})">${bug.status}</span></td>
                <td width="100"><i class="bi bi-pencil-square" onclick="updateBugBoxfun(${bug.id})"></i></td>
                <td width="100"><i class="bi bi-trash" onclick="deleteBugBoxfun(${bug.id})"></i></td>
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




const addBug=document.getElementById("add-bug-id");
const addBugBox=document.getElementById("add-bug-box-id");

//display add bug box
addBug.addEventListener("click" , () => {
    if(addBugBox.style.display == 'none'){
        addBugBox.style.display = 'block';
        black.style.display='block';
    }
    else{
        addBugBox.style.display = 'none';
        black.style.display='none';
    }
});

//posting bug information
document.getElementById("add-bug-form-id").addEventListener("submit" , async (event) => {
    event.preventDefault();

    const projectTitle=document.getElementById("project-title").value;
    try{
        const projectResponse=await fetch(`${API_URL}/projects/title/${projectTitle}` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            },
        });

        if(projectResponse.ok){

            const project= await projectResponse.json();

            const bugData={
                title:document.getElementById("title").value,
                description:document.getElementById("description").value
            };

            const bugResponse=await fetch(`${API_URL}/projects/${project.id}/bugs` , {
                method: "POST",
                headers: {
                    "Authorization": "Bearer "+token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bugData)
            });
    
            if(!bugResponse.ok){
                alert('Failed to add bug !');
            }
            else{
                document.getElementById("add-bug-form-id").reset();
                const bug=await bugResponse.json();
                addBugBox.style.display = 'none';
                black.style.display='none';
                const bugTable=document.getElementById("bug-table-id");
                bugTable.replaceChildren();
                const row =document.createElement("tr");
                const bugId=`${bug.id}`;
                row.ondblclick=function(){bugDescription(bugId);};
                row.innerHTML=`
                    <td width="60">${bug.id}</td>
                    <td>${bug.title}</td>
			        <td width="200"><span class="${bug.status}" onclick="bugStatusBoxfun(${bug.id})">${bug.status}</span></td>
                    <td width="100"><i class="bi bi-pencil-square" onclick="updateBugBoxfun(${bug.id})"></i></td>
                    <td width="100"><i class="bi bi-trash" onclick="deleteBugBoxfun(${bug.id})"></i></td>
                `;
                bugTable.appendChild(row);
                
                alert('Bug added Successfully with Id:'+ bug.id);
            }
        }

    } catch(error){
        console.error("Error",error);
    }
});


//display update bug form
const updateBugBox=document.getElementById("update-bug-box-id");
function updateBugBoxfun(id){
    updateBugBox.style.display='block';
    black.style.display='block';
    document.getElementById("update-bug-form-id").onsubmit= function(event){
        event.preventDefault();
        updateBug(id);
    };
}

//update bug data in database
async function updateBug(id) {
    
    const formData={
        title:document.getElementById("title1").value,
        description:document.getElementById("description1").value
    };
    
    //adding the fields which are given by the user
    const updatingData={};
    for(let key in formData){
        if(formData[key]!="" && formData[key]!=null && formData[key]!=undefined){
                updatingData[key]=formData[key];
        }
    }

    try{
        const response=await fetch(`${API_URL}/bugs/${id}` , {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatingData)
        });

        if(!response.ok){
            alert('Failed to update bug !');
        }
		else{
            document.getElementById("update-bug-form-id").reset();
            updateBugBox.style.display='none';
            black.style.display='none';
            const bug=await response.json();
            const bugTable=document.getElementById("bug-table-id");
            bugTable.replaceChildren();
            const row =document.createElement("tr");
            const bugId=`${bug.id}`;
            row.ondblclick=function(){bugDescription(bugId);};
            row.innerHTML=`
                <td width="60">${bug.id}</td>
                <td>${bug.title}</td>
			    <td width="200"><span class="${bug.status}" onclick="bugStatusBoxfun(${bug.id})">${bug.status}</span></td>
                <td width="100"><i class="bi bi-pencil-square" onclick="updateBugBoxfun(${bug.id})"></i></td>
                <td width="100"><i class="bi bi-trash" onclick="deleteBugBoxfun(${bug.id})"></i></td>
            `;
            bugTable.appendChild(row);
            alert('bug with id '+ bug.id+' updated Successfully!');
        }

    } catch(error){
        console.error("Error",error);
    }
}

//display delete form
const deleteBugBox=document.getElementById("delete-bug-box-id");
function deleteBugBoxfun(id){
    deleteBugBox.style.display='block';
    black.style.display='block';
    document.getElementById("delete-bug").onclick= function(){
        deleteBug(id);
    };
}

document.querySelector("#delete-bug-box-id .cancel").addEventListener("click" , () => {
    deleteBugBox.style.display='none';
	black.style.display='none';
});

// delete project from database
async function deleteBug(id) {

    try{
        const response = await fetch(`${API_URL}/bugs/${id}` , {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });
        if(!response.ok){
            alert('failed to delete bug');
        }
        else{
            alert('bug with id '+id+' deleted successfully');
            deleteBugBox.style.display='none';
	        black.style.display='none';
        }
    }
    catch(error){
        console.error('Error '+error);
    }
}



const commentBox=document.getElementById("comment-box-id");

function addCommentBox(id) {
    if(commentBox.style.display == 'none'){
        commentBox.style.display='block';
     } else{
        commentBox.style.display='none';
     }

     document.querySelector("#comment-box-id i").onclick=function(event){
        event.preventDefault();
        addComment(id);
     };
     document.getElementById("comment-form").onsubmit=function(event){
        event.preventDefault();
        addComment(id);
     };
}

async function addComment(id){
    const data={
        message:document.getElementById("comment").value
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
            document.getElementById("comment-form").reset;
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
    if(addBugBox.style.display=='block'){
        addBugBox.style.display='none';
    }
    if(updateBugBox.style.display=='block'){
        updateBugBox.style.display='none';
    }
    if(deleteBugBox.style.display=='block'){
        deleteBugBox.style.display='none';
    }
    if(commentBox.style.display == 'block'){
        commentBox.style.display='none';
     }
});







