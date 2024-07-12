const signupForm = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone')
const passwordInput = document.getElementById('password')
const messageContainer = document.getElementById('message-container')
const backendAPI = 'http://localhost:6200'

signupForm.addEventListener('submit',signupFormSubmit);

async function signupFormSubmit(e){
    e.preventDefault();

    let obj = {
        name:nameInput.value,
        email:emailInput.value,
        phone:phoneInput.value,
        password:passwordInput.value
    }
     try{
        const result = await axios.post(`${backendAPI}/user/signup`,obj);
        signupForm.reset();
        console.log(result);
        if(result.status == 200){
            showMessage('User created successfully!','success');
        }
        else 
            showMessage('User already exists!', 'error')
        
        

     }
     catch(err){
        showMessage('Internal Server Error','error')
        console.log(err)
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