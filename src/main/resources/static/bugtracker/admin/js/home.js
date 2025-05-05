// APIBASE URL http://localhost:8008
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
        const response1=await fetch(`${API_URL}/admin/projects/count` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });
        const response2=await fetch(`${API_URL}/admin/bugs/count` , {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        });
        const response3=await fetch(`${API_URL}/admin/users/count` , {
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
        }
        if(response3.ok){
            const userCount= await response3.json();
            document.getElementById("total-users").innerHTML=`${userCount}`;
        }
        
    } catch(error){
        console.error('Error..'+ error);
    }
}

