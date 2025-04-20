//api base url http://localhost:8008
const API_URL='https://bugtracker.up.railway.app/bugtrackerapi/admin';
const token=localStorage.getItem("jwtToken");
//projects

const allProject=document.getElementById("all-project-id");
const projectDesc=document.getElementById("project-desc-id");
const black=document.getElementById("black");



//get projects when open projects page
getAllProjects();



//get projects when user click the all projects
allProject.addEventListener("click" ,() =>{getAllProjects()});
async function getAllProjects() {
    try {
        const response=await fetch(`${API_URL}/projects` , {
            method:"GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });
        if(response.ok){
            var a=1;
            const projectList= await response.json();
            const projectTable=document.getElementById("project-table-id");
            projectTable.replaceChildren();
            projectList.forEach(project => {
                const row =document.createElement("tr");
                const projectId=`${project.id}`;
                row.ondblclick=function(){projectDescription(projectId);};
                row.innerHTML=`
                    <td width="60">${a}</td>
                    <td>${project.projectTitle}</td>
                    <td width="300">${project.manager.username}</td>
                    <td width="200">${project.createdAt}</td>
                `;
                projectTable.appendChild(row);
                a++;
            });
        }
    } catch (error) {
        console.error('error...'+error);
    }
}

//get project by serching project title
document.getElementById("get-project-form").onsubmit=async function (event) {
    event.preventDefault();
    const title=document.querySelector("#get-project-form input").value;
    try{
        const response=await fetch(`${API_URL}/projects/title/${title}` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });

        if(response.ok){
            document.getElementById("get-project-form").reset;
            const project= await response.json();
            const projectTable=document.getElementById("project-table-id");
            projectTable.replaceChildren();
            const row =document.createElement("tr");
            const projectId=`${project.id}`;
            row.ondblclick=function(){projectDescription(projectId);};
            row.innerHTML=`
                <td width="60">${project.id}</td>
                <td>${project.projectTitle}</td>
                <td width="300">${project.manager.username}</td>
			    <td width="200">${project.createdAt}</td>
            `;
            projectTable.appendChild(row);
        } else{
            alert('enter corect title');
        }
        
    } catch(error){
        console.error('Error..'+ error);
    }
}


// display project description
async function projectDescription(id){
   
    try{
        const response= await fetch(`${API_URL}/projects/${id}` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });
        if(response.ok){
            projectDesc.style.display='block';
            black.style.display='block';
            const project= await response.json();
            projectDesc.replaceChildren();
            projectDesc.innerHTML=`
                <h3>${project.projectTitle} </h3>
                <p>Manager : ${project.manager.username}</p>
                <p>${project.projectDescription}</p>
            `;  
        } else{
            alert('try again');
        }
    } catch(error){
        console.error('Error..'+error);
    }
    
}

black.addEventListener("click" , () => {
    black.style.display='none';
    projectDesc.style.display='none';
});

