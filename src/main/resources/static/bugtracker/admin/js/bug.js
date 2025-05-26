//api base url http://localhost:8008
const API_URL='http://localhost:8008/bugtrackerapi/admin';
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

    if(response.ok){
        var a=1;
        const bugList= await response.json();
        const bugTable=document.getElementById("bug-table-id");
        bugTable.replaceChildren();
        bugList.forEach( bug => {
            const row=document.createElement('tr');
            const bugId=`${bug.id}`;
            row.ondblclick=function(){bugDescription(bugId);};
            var dev=bug.assignedTo.username;
            if(dev == null){
                dev="Not assigned";
            }
            row.innerHTML=`
                <td width="60" class="align-center">${a}</td>
                <td>${bug.title}</td>
                <td width="200"><span class="${bug.status}">${bug.status}</span></td>
                <td width="200" class="align-center">${bug.createdAt.substr(0,10)}&nbsp;&nbsp;${bug.createdAt.substr(11,8)}</td>
                <td width="300">${dev}</td>
            `;
            bugTable.appendChild(row);
            a++;
        });
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
            var dev=bug.assignedTo.username;
            if(dev == null){
                dev="Not assigned";
            }
            row.innerHTML=`
                <td width="60"  class="align-center">${bug.id}</td>
                <td class="left-align">${bug.title}</td>
                <td width="200"><span class="${bug.status}">${bug.status}</span></td>
                <td width="200" class="align-center">${bug.createdAt.substr(0,10)}&nbsp;&nbsp;${bug.createdAt.substr(11,8)}</td>
                <td width="300">${dev}</td>
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
                <h3>${bug.title} <span id="${bug.status}"> ${bug.status}</span></h3>
                <p>${bug.description}</p>
                <p>Reporter    : ${bug.reportedBy.username}</p>
                <p>Project     : ${bug.project.projectTitle}</p>
            `;
        } else{
            alert('Try again');
        }

    } catch(error) {
        console.error('Error.. '+ error);
    }
}





black.addEventListener("click" , () => {
    black.style.display='none'
    bugDesc.style.display='none';
});







