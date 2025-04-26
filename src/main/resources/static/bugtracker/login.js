// api base url http://localhost:8008
const API_URL='http://localhost:8008/bugtrackerapi';

const loginBox=document.getElementById("login-box");
// const registerBox=document.getElementById("register-box");
// const signin=document.getElementById("signin");
// const signup=document.getElementById("signup");

// signup.addEventListener("click" , () => {
//     registerBox.style.display='block';
//     loginBox.style.display='none';
// });

// signin.addEventListener("click" , () => { 
//     registerBox.style.display='none';
//     loginBox.style.display='block';
// });


loginBox.addEventListener("submit" , async (event) => {
    event.preventDefault();

    const loginInfo= {
        username:document.getElementById('username').value,
        password:document.getElementById("password").value,
    };

    try {
        const response= await fetch(`${API_URL}/login` , {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(loginInfo)
        });

        if(response.ok){
            const token= await response.text();
            localStorage.setItem("jwtToken", token);
            try {
                const userResponse = await fetch(`${API_URL}/profile` , {
                    method : "GET",
                    headers : {
                        "ContentType" : "application/json",
                        "Authorization" : "Bearer "+localStorage.getItem("jwtToken")
                    }
                });

                if(userResponse.ok){
                    const user =await userResponse.json();
                    const role=`${user.roles}`.toLowerCase();
                    window.location.href=`http://localhost:8008/bugtracker/${role}/dashboard.html`;
                }
            } catch (error) {
                console.log(error);
            }
        } else{
            alert('Enter correct details');
        }
    } catch (error) {
        console.error("error..."+error);
    }

});


// registerBox.addEventListener("submit" , async (event) => {
//     event.preventDefault();
//     const password1=document.getElementById('password1').value;
//     const password2=document.getElementById("password2").value;
//     const role=document.getElementById("role1").value;
//     if(password1 == password2 && role!="role"){
//         const registerInfo= {
//             username:document.getElementById('username1').value,
//             password:password1,
//             roles:[role]
//         };
//         console.log(registerInfo);
//         try {
//             const response= await fetch(`${API_URL}/register` , {
//                 method: "POST",
//                 headers: {
//                     "Content-Type" : "application/json"
//                 },
//                 body: JSON.stringify(registerInfo)
//             });
            
//             if(response.ok){
//                 const token= await response.text();
//                 localStorage.setItem("jwtToken", token);
//                 const role=document.getElementById("role1").value.toLowerCase();
//                 window.location.href=`http://localhost:8008/bugtracker/${role}/dashboard.html`;
//                 document.getElementById("register-box").reset();
//             } else{
//                 alert('username already in use');
//             }
//         } catch (error) {
//             console.error("error..."+error);
//         }
//     } else{
//         alert('select your role | new password and the retype password should be same');
//     }
// });