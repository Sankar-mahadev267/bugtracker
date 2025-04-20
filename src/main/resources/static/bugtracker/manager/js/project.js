//api base url http://localhost:8008
const API_URL='https://bugtracker.up.railway.app/bugtrackerapi/manager';
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
                    <td width="300">${project.createdAt}</td>
                    <td width="100"><i class="bi bi-pencil-square" onclick="updateProjectBoxfun(${project.id})"></i></td>
                    <td width="100"><i class="bi bi-trash" onclick="deleteProjectBoxfun(${project.id})"></i></td>
                `;
                projectTable.appendChild(row);
                a++;
            });
        }
    } catch (error) {
        console.error('error...'+ error);
    }
}

//get project by serching project title
document.getElementById("get-project-form").onsubmit=async function(event) {
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
                <td width="300">${project.createdAt}</td>
                <td width="100"><i class="bi bi-pencil-square" onclick="updateProjectBoxfun(${project.id})"></i></td>
                <td width="100"><i class="bi bi-trash" onclick="deleteProjectBoxfun(${project.id})"></i></td>
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
            console.log(project);
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



const addProject=document.getElementById("add-project-id");
const addProjectBox=document.getElementById("add-project-box-id");

//display add project box
addProject.addEventListener("click" , () => {
    if(addProjectBox.style.display == 'none'){
        addProjectBox.style.display = 'block';
        black.style.display='block';
    }
    else{
        addProjectBox.style.display = 'none';
        black.style.display='none';
    }
});

//posting project information
document.getElementById("add-project-form-id").addEventListener("submit" , async (event) => {
    event.preventDefault();

    const projectData={
        projectTitle:document.getElementById("title").value,
        projectDescription:document.getElementById("description").value
    };

    try{
        const response=await fetch(`${API_URL}/projects` , {
            method: "POST",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectData)
        });

        if(!response.ok){
            alert('Failed to add project !');
        }
		else{
            document.getElementById("add-project-form-id").reset();
            const project=await response.json();
            addProjectBox.style.display = 'none';
            black.style.display='none';
            const projectTable=document.getElementById("project-table-id");
            projectTable.replaceChildren();
            const row =document.createElement("tr");
            const projectId=`${project.id}`;
            row.ondblclick=function(){projectDescription(projectId);};
            row.innerHTML=`
                <td width="60">${project.id}</td>
                <td>${project.projectTitle}</td>
			    <td width="300">${project.createdAt}</td>
                <td width="100"><i class="bi bi-pencil-square" onclick="updateProjectBoxfun(${project.id})"></i></td>
                <td width="100"><i class="bi bi-trash" onclick="deleteProjectBoxfun(${project.id})"></i></td>
            `;
            projectTable.appendChild(row);
            
            alert('project added Successfully with Id:'+ project.id);
        }

    } catch(error){
        console.error("Error",error);
    }
});


//display update project form
const updateProjectBox=document.getElementById("update-project-box-id");
function updateProjectBoxfun(id){
    updateProjectBox.style.display='block';
    black.style.display='block';
    document.getElementById("update-project-form-id").onsubmit= function(event){
        event.preventDefault();
        updateProject(id);
    };
}

//update data in database
async function updateProject(id) {
    
    const formData={
        projectTitle:document.getElementById("title1").value,
        projectDescription:document.getElementById("description1").value
    };
    
    //adding the fields which are given by the user
    const updatingData={};
    for(let key in formData){
        if(formData[key]!="" && formData[key]!=null && formData[key]!=undefined){
                updatingData[key]=formData[key];
        }
    }

    try{
        const response=await fetch(`${API_URL}/projects/${id}` , {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatingData)
        });

        if(!response.ok){
            alert('Failed to update Project !');
        }
		else{
            document.getElementById("update-project-form-id").reset();
            updateProjectBox.style.display='none';
            black.style.display='none';
            const project=await response.json();
            const projectTable=document.getElementById("project-table-id");
            projectTable.replaceChildren();
            const row =document.createElement("tr");
            const projectId=`${project.id}`;
            row.ondblclick=function(){projectDescription(projectId);};
            row.innerHTML=`
                <td width="60">${project.id}</td>
                <td>${project.projectTitle}</td>
			    <td width="300">${project.createdAt}</td>
                <td width="100"><i class="bi bi-pencil-square" onclick="updateProjectBoxfun(${project.id})"></i></td>
                <td width="100"><i class="bi bi-trash" onclick="deleteProjectBoxfun(${project.id})"></i></td>
            `;
            projectTable.appendChild(row);
            alert('project with id '+ project.id+' updated Successfully!');
        }

    } catch(error){
        console.error("Error",error);
    }
}

//display delete form
const deleteProjectBox=document.getElementById("delete-project-box-id");
function deleteProjectBoxfun(id){
    deleteProjectBox.style.display='block';
    black.style.display='block';
    document.getElementById("delete-project").onclick= function(){
        deleteProject(id);
    };
}

document.querySelector("#delete-project-box-id .cancel").addEventListener("click" , () => {
    deleteProjectBox.style.display='none';
	black.style.display='none';
});

// delete project from database
async function deleteProject(id) {

    try{
        const response = await fetch(`${API_URL}/projects/${id}` , {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });
        if(!response.ok){
            alert('failed to delete project');
        }
        else{
            alert('project with id '+id+' deleted successfully');
            deleteProjectBox.style.display='none';
	        black.style.display='none';
        }
    }
    catch(error){
        console.error('Error '+error);
    }
}

//remove black display 
black.addEventListener("click" , () => {
    black.style.display='none';
    if(addProjectBox.style.display=='block'){
        addProjectBox.style.display='none';
    }
    if(updateProjectBox.style.display=='block'){
        updateProjectBox.style.display='none';
    }
    if(deleteProjectBox.style.display=='block'){
        deleteProjectBox.style.display='none';
    }
    if(projectDesc.style.display=='block'){
        projectDesc.style.display='none';
    }
});


