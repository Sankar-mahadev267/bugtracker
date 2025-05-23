

const home=document.getElementById('home');
const project=document.getElementById('project');
const bug=document.getElementById('bug');
const data=document.getElementById('data');
const profile=document.getElementById('profile');
const profileBox=document.getElementById('profile-box');



// default style for home
home.style.backgroundColor='rgba(0,0,0,0.1)';


home.addEventListener('click' , () => {
    data.src='./home.html';
    home.classList.remove("bi-house");
    home.classList.add("bi-house-fill");
    home.style.backgroundColor='rgba(0,0,0,0.1)';
    if(project.classList.contains("bi-diagram-3-fill")){
        project.classList.remove("bi-diagram-3-fill");
        project.classList.add("bi-diagram-3");
        project.style.removeProperty("background-color");
    }
    if(bug.classList.contains("bi-bug-fill")){
        bug.classList.remove("bi-bug-fill");
        bug.classList.add("bi-bug");
        bug.style.removeProperty("background-color");
    }
    if(profile.classList.contains('bi-person-fill')){
        profile.classList.remove("bi-person-fill");
        profile.classList.add("bi-person");
        profileBox.style.display='none';
    }
});

project.addEventListener('click' , () => {
    data.src='./project.html';
    project.classList.remove("bi-diagram-3");
    project.classList.add("bi-diagram-3-fill");
    project.style.backgroundColor='rgba(0,0,0,0.1)';
    if(home.classList.contains("bi-house-fill")){
        home.classList.remove("bi-house-fill");
        home.classList.add("bi-house");
        home.style.removeProperty("background-color");
    }
    if(bug.classList.contains("bi-bug-fill")){
        bug.classList.remove("bi-bug-fill");
        bug.classList.add("bi-bug");
        bug.style.removeProperty("background-color");
    }
    if(profile.classList.contains('bi-person-fill')){
        profile.classList.remove("bi-person-fill");
        profile.classList.add("bi-person");
        profileBox.style.display='none';
    }
    // getAllProjects();
});

bug.addEventListener('click' , () => {
    data.src='./bug.html';
    bug.classList.remove("bi-bug");
    bug.classList.add("bi-bug-fill");
    bug.style.backgroundColor='rgba(0,0,0,0.1)';
    if(home.classList.contains("bi-house-fill")){
        home.classList.remove("bi-house-fill");
        home.classList.add("bi-house");
        home.style.removeProperty("background-color");
    }
    if(project.classList.contains("bi-diagram-3-fill")){
        project.classList.remove("bi-diagram-3-fill");
        project.classList.add("bi-diagram-3");
        project.style.removeProperty("background-color");
    }
    if(profile.classList.contains('bi-person-fill')){
        profile.classList.remove("bi-person-fill");
        profile.classList.add("bi-person");
        profileBox.style.display='none';
    }
    // getAllBugs();
});

profile.addEventListener('click' , () => {
    if(profile.classList.contains('bi-person-fill')){
        profile.classList.remove("bi-person-fill");
        profile.classList.add("bi-person");
        profileBox.style.display='none';
    }
    else{
        profile.classList.remove("bi-person");
        profile.classList.add("bi-person-fill");
        profileBox.style.display='block';
    }
});












//api base url http://localhost:8008
const API_URL="http://localhost:8008/bugtrackerapi";
const token=localStorage.getItem("jwtToken");

const username=document.getElementById("username");
const joined=document.getElementById("joined");
const role=document.getElementById("role");
getUserProfile();


//get user profile
async function getUserProfile() {
    try{
        const response=await fetch(`${API_URL}/profile` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });

        if(response.ok){
            const user= await response.json();
            username.innerHTML=`${user.username}`;
            joined.innerHTML=`Joined from ${user.createdAt}`;
            role.innerHTML=`Role : ${user.roles[0]}`;

        }
        
    } catch(error){
        console.error('Error..'+ error);
    }
}


document.getElementById("logout").addEventListener("click" , () => {
    localStorage.removeItem("JwtToken");
    window.href=`http://localhost:8008/bugtracker/login`;
});











