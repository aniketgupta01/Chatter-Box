const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageContainer = document.getElementById('message-container');
const backendAPI = 'http://localhost:6200'


loginForm.addEventListener('submit', loginFormSubmit);

async function loginFormSubmit(e){
    e.preventDefault();

    let obj = {
        email : emailInput.value,
        password : passwordInput.value

    }

    try{
        const result = await axios.post(`${backendAPI}/user/login`,obj)
        loginForm.reset();
        if(result.status == 200){
            showMessage('Logged in successfully!','success')
            localStorage.setItem('token',result.data.token)
        }
        


    }
    catch(err){
        if(err.response.status == 400){
            showMessage('Wrong Password','error')
        }
        else{
            showMessage('User does not exist!','error')
        }
        
    }
}












function showMessage(message, messageType) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;

    messageDiv.className = `message ${messageType}`;

    messageContainer.innerHTML = ''; 
    messageContainer.appendChild(messageDiv);

    setTimeout(function() {
        messageDiv.remove(); 
    }, 4000);
}
