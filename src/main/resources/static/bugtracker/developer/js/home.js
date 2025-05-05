// API BASE URL http://localhost:8008
const API_URL="http://localhost:8008/bugtrackerapi";
const token=localStorage.getItem("jwtToken");

const username=document.getElementById("username");

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
            username.innerHTML=`${user.username}`
        }
        
    } catch(error){
        console.error('Error..'+ error);
    }
}


counts();
async function counts() {
    try{
        const response=await fetch(`${API_URL}/developer/bugs/count` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });

        if(response.ok){
            const count= await response.json();
            document.getElementById("assigned-bugs").innerHTML=`${count.assignedBugs}`;
            document.getElementById("open-bugs").innerHTML=`${count.openBugs}`;
            document.getElementById("bugs-inprogress").innerHTML=`${count.bugsInprogress}`;
            document.getElementById("resolved-bugs").innerHTML=`${count.resolvedBugs}`;
        }
        
    } catch(error){
        console.error('Error..'+ error);
    }
}
