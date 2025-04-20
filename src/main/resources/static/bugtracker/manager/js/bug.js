//api base url http://localhost:8008
const API_URL='http://localhost:8008/bugtrackerapi/manager';
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
            const bugList= await response.json();
            const bugTable=document.getElementById("bug-table-id");
            bugTable.replaceChildren();
            bugList.forEach( bug => {
                const row=document.createElement('tr');
                if(bug.assignedTo != null){
                    var dev=`<td width="300">${bug.assignedTo.username}</td>`
                } else{
                    var dev=`<td width="300" onclick="assignBugBoxfun(${bug.id})" style="cursor:pointer;"><i class="bi bi-person-plus"></i></td>`
                }
                const bugId=`${bug.id}`;
                row.ondblclick=function(){bugDescription(bugId);};
                row.innerHTML=`
                    <td width="60">${a}</td>
                    <td>${bug.title}</td>
                    <td width="200"><span class="${bug.status}">${bug.status}</span></td>
                    <td width="200">${bug.createdAt}</td>
                    ${dev}
                `;
                bugTable.appendChild(row);
                a++;
            });
        }
    } catch (error) {
        console.error('error....'+error)
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
            document.getElementById("get-bug-form").reset;
            const bug= await response.json();
            const bugTable=document.getElementById("bug-table-id");
            bugTable.replaceChildren();
            const row =document.createElement("tr");
            if(bug.assignedTo != null){
                var dev=`<td width="300">${bug.assignedTo.username}</td>`
            } else{
                var dev=`<td width="300" onclick="assignBugBoxfun(${bug.id})" style="cursor:pointer;"><i class="bi bi-person-plus"></i></td>`
            }
            const bugId=`${bug.id}`;
            row.ondblclick=function(){bugDescription(bugId);};
            row.innerHTML=`
                <td width="60">${bug.id}</td>
                <td>${bug.title}</td>
                <td width="200"><span class="${bug.status}">${bug.status}</span></td>
                <td width="200">${bug.createdAt}</td>
                ${dev}
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
            bugDesc.innerHTML=`
                <h3>${bug.title} <span id="${bug.status}">${bug.status}</span></h3>
                <p>${bug.description}</p>
                <p>Reporter    : ${bug.reportedBy.username}</p>
                <p>Project     : ${bug.project.projectTitle}</p>
            `;
        }

    } catch(error) {
        console.error('Error.. '+ error);
    }
}


const assignBugBox=document.getElementById("assign-bug-box-id");

// display assign bug box 
function assignBugBoxfun(id){
    assignBugBox.style.display='block';
    black.style.display='block';
    document.getElementById("assign-bug-form").onsubmit = function(event){
        event.preventDefault();
        const developer=document.getElementById("developer").value;
        assignBug(id,developer);
    };
}

//assign bug to a developer
async function assignBug(bugId,developer) {
    try{
        const userResponse=await fetch(`${API_URL}/users/username/${developer}` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });

        if(userResponse.ok){
            const user= await userResponse.json();

            const bugResponse=await fetch(`${API_URL}/bugs/${bugId}/assign/${user.id}` , {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer "+token,
                    "Content-Type": "application/json"
                }
    
            });
    
            if(bugResponse.ok){
                document.getElementById("assign-bug-form").reset;
                assignBugBox.style.display='none';
                black.style.display='none';
                const bug= await bugResponse.json();
                const bugTable=document.getElementById("bug-table-id");
                bugTable.replaceChildren();
                const row =document.createElement("tr");
                if(bug.assignedTo != null){
                    var dev=`<td width="300">${bug.assignedTo.username}</td>`
                } else{
                    var dev=`<td width="300" onclick="assignBugBoxfun(${bug.id})" style="cursor:pointer;"><i class="bi bi-person-plus"></i></td>`
                }
                const bugId=`${bug.id}`;
                row.ondblclick=function(){bugDescription(bugId);};
                row.innerHTML=`
                    <td width="60">${bug.id}</td>
                    <td>${bug.title}</td>
                    <td width="200"><span class="${bug.status}">${bug.status}</span></td>
                    <td width="200">${bug.createdAt}</td>
                    ${dev}
                `;
                bugTable.appendChild(row);
                alert(bug.title+' is assigned to the '+ developer)
            }
           else{
                alert('Try again');
           }
        }
        else{
            alert('enter correct username');
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
    if(assignBugBox.style.display =='block'){
        assignBugBox.style.display ='none';
    }
});







