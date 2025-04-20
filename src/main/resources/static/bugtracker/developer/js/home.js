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


