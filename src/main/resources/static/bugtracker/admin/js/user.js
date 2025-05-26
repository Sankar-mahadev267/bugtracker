//api base url http://localhost:8008
const API_URL='http://localhost:8008/bugtrackerapi/admin';
const token=localStorage.getItem("jwtToken");

const allUser=document.getElementById("all-user-id");


//get users when open user page
getAllUsers();


//get users when user click the all users
allUser.addEventListener("click" , () =>{getAllUsers()});
async function getAllUsers() {
try{
    const response=await fetch(`${API_URL}/users` , {
		method:"GET",
        headers: {
            "Authorization": "Bearer "+token,
            "Content-Type": "application/json"
        }
	});
    
    if(response.ok){
        var a=1;
        const userList= await response.json();
        const userTable=document.getElementById("user-table-id");
        userTable.replaceChildren();
        userList.forEach(user => {
            const row =document.createElement("tr");
            row.innerHTML=`
                <td width="60"  class="align-center">${a}</td>
                <td>${user.username}</td>
                <td width="100">${user.roles[0]}</td>
                <td width="300" class="align-center">${user.createdAt.substr(0,10)}&nbsp;&nbsp;${user.createdAt.substr(11,8)}</td>
                <td width="100" class="align-center"><i class="bi bi-pencil-square" onclick="updateUserBoxfun(${user.id})"></i></td>
                <td width="100" class="align-center"><i class="bi bi-trash" onclick="deleteUserBoxfun(${user.id})"></i></td>
            `;
            userTable.appendChild(row);
            a++;
        });
    }
}  catch(error){
    console.error('error..'+ error);
}

}

//get user by serching username
document.getElementById("get-user-form").onsubmit=async function(event) {
    event.preventDefault();
    const username=document.querySelector("#get-user-form input").value;
    try{
        const response=await fetch(`${API_URL}/users/username/${username}` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });

        if(response.ok){
            document.getElementById("get-user-form").reset();
            const user= await response.json();
            const userTable=document.getElementById("user-table-id");
            userTable.replaceChildren();
            const row =document.createElement("tr");
            row.innerHTML=`
                <td width="60" class="align-center">${user.id}</td>
                <td>${user.username}</td>
                <td width="100">${user.roles[0]}</td>
			    <td width="300" class="align-center">${user.createdAt.substr(0,10)}&nbsp;&nbsp;${user.createdAt.substr(11,8)}</td>
                <td width="100" class="align-center"><i class="bi bi-pencil-square" onclick="updateUserBoxfun(${user.id})"></i></td>
                <td width="100" class="align-center"><i class="bi bi-trash" onclick="deleteUserBoxfun(${user.id})"></i></td>
            `;
            userTable.appendChild(row);

        } else{
            alert('enter correct username');
        }
        
    } catch(error){
        console.error('Error..'+ error);
    }
}


const addUser=document.getElementById("add-user-id");
const addUserBox=document.getElementById("add-user-box-id");
const black=document.getElementById("black");

//display add user box
addUser.addEventListener("click" , () => {
    if(addUserBox.style.display == 'none'){
        addUserBox.style.display = 'block';
        black.style.display='block';
    }
    else{
        addUserBox.style.display = 'none';
        black.style.display='none';
    }
});

//posting user information
document.getElementById("add-user-form-id").addEventListener("submit" , async (event) => {
    event.preventDefault();

    const userData={
        username:document.getElementById("username").value,
        password:document.getElementById("password").value,
        roles:[document.getElementById("role").value]
    };

    try{
        const response=await fetch(`${API_URL}/users` , {
            method: "POST",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if(!response.ok){
            alert('Failed to add User !');
        }
		else{
            document.getElementById("add-user-form-id").reset();
            const user=await response.json();
            addUserBox.style.display = 'none';
            black.style.display='none';
            const userTable=document.getElementById("user-table-id");
            userTable.replaceChildren();
            const row =document.createElement("tr");
            row.innerHTML=`
                <td width="60" class="align-center">${user.id}</td>
                <td>${user.username}</td>
                <td width="100">${user.roles[0]}</td>
			    <td width="300" class="align-center">${user.createdAt.substr(0,10)}&nbsp;&nbsp;${user.createdAt.substr(11,8)}</td>
                <td width="100" class="align-center"><i class="bi bi-pencil-square" onclick="updateUserBoxfun(${user.id})"></i></td>
                <td width="100" class="align-center"><i class="bi bi-trash" onclick="deleteUserBoxfun(${user.id})"></i></td>
            `;
            userTable.appendChild(row);
            
            alert('user added Successfully with Id:'+ user.id);
        }

    } catch(error){
        console.error("Error",error);
    }
});


//display update user form
const updateUserBox=document.getElementById("update-user-box-id");
function updateUserBoxfun(id){
    updateUserBox.style.display='block';
    black.style.display='block';
    document.getElementById("update-user-form-id").onsubmit= function(event){
        event.preventDefault();
        updateUser(id);
    };
}

//update data in database
async function updateUser(id) {
    
    const formData={
        username:document.getElementById("username1").value,
        password:document.getElementById("password1").value,
        roles:document.getElementById("role1").value
    };
    
    //adding the fields which are given by the user
    const updatingData={};
    for(let key in formData){
        if(formData[key]!="" && formData[key]!=null && formData[key]!=undefined){
            if(key === "roles"){
                updatingData[key]=[formData[key]];
            }
            else{
                updatingData[key]=formData[key];
            }
        }
    }

    try{
        const response=await fetch(`${API_URL}/users/${id}` , {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatingData)
        });

        if(!response.ok){
            alert('Failed to update User !');
        }
		else{
            document.getElementById("update-user-form-id").reset();
            updateUserBox.style.display='none';
            black.style.display='none';
            const user=await response.json();
            alert('user with id '+ user.id+' updated Successfully!');
            const userTable=document.getElementById("user-table-id");
            userTable.replaceChildren();
            const row =document.createElement("tr");
            row.innerHTML=`
                <td width="60" class="align-center">${user.id}</td>
                <td>${user.username}</td>
                <td width="100">${user.roles[0]}</td>
			    <td width="300" class="align-center">${user.createdAt.substr(0,10)}&nbsp;&nbsp;${user.createdAt.substr(11,8)}</td>
                <td width="100" class="align-center"><i class="bi bi-pencil-square" onclick="updateUserBoxfun(${user.id})"></i></td>
                <td width="100" class="align-center"><i class="bi bi-trash" onclick="deleteUserBoxfun(${user.id})"></i></td>
            `;
            userTable.appendChild(row);
        }

    } catch(error){
        console.error("Error",error);
    }
}

//display delete form
const deleteUserBox=document.getElementById("delete-user-box-id");
function deleteUserBoxfun(id){
    deleteUserBox.style.display='block';
    black.style.display='block';
    document.getElementById("delete-user").onclick= function(event){
        event.preventDefault();
        deleteUser(id);
    };
}

document.querySelector("#delete-user-box-id .cancel").addEventListener("click" , () => {
    deleteUserBox.style.display='none';
	black.style.display='none';
});

// delete user from database
async function deleteUser(id) {

    try{
        const response = await fetch(`${API_URL}/users/${id}` , {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });
        if(!response.ok){
            alert('failed to delete user');
        }
        else{
            alert('User with id '+id+' deleted successfully');
            deleteUserBox.style.display='none';
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
    if(addUserBox.style.display=='block'){
        addUserBox.style.display='none';
    }
    if(updateUserBox.style.display=='block'){
       updateUserBox.style.display='none';
    }
    if(deleteUserBox.style.display=='block'){
        deleteUserBox.style.display='none';
    }
});









