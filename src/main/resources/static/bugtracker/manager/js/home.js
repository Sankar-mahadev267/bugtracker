// api base url http://localhost:8008
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
        const response1=await fetch(`${API_URL}/manager/projects/count` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });
        const response2=await fetch(`${API_URL}/manager/bugs/count` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });

        if(response1.ok){
            const projectCount= await response1.json();
            document.getElementById("total-projects").innerHTML=`${projectCount}`;
        }
        if(response2.ok){
            const count= await response2.json();
            document.getElementById("total-bugs").innerHTML=`${count.totalBugs}`;
            document.getElementById("assigned-bugs").innerHTML=`${count.assignedBugs}`;
            document.getElementById("not-assigned-bugs").innerHTML=`${count.notAssignedBugs}`;
        }
        
    } catch(error){
        console.error('Error..'+ error);
    }
}
