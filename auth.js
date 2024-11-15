function createacc() {
    
    let name = prompt("Input your name:");
    while (!name) {
      alert("Kindly try inputing the name again.");
      name = prompt("Input your name:");
    }
  
    let email = prompt("Input your email address:");
    while (!email || !emailvalid(email)) {
      alert("Kindly provide a valid email address.");
      email = prompt("Input your email address:");
    }
  
    let password = "";
    while (password.length < 5) {
      password = prompt("Create a strong password of at least 5 characters:");
      if (password.length < 5) {
        alert("Password must consists of at least 5 characters.");
      }
    }
  
    let confirmpassw = "";
    while (confirmpassw !== password) {
      confirmpassw = prompt("Confirm your password:");
      if (confirmpassw !== password) {
        alert("Password is different, please try inputing again.");
      }
    }
  
    alert("Account successfully activated. Welcome, " + name + "!");
  }
  
  function emailcheck(email) {
    const emailchar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailchar.test(email);
  }
  
  createacc();


  function loginacc() {
    let email = prompt("Input your email address:");
    let password = prompt("Input your password:");
  
    let account = matchingdata.find(account => account.email === email && 
        account.password === password);
    if (account) {
      alert("Login complete, great to see you again!" + account.name + "!");
    } else {
      alert("Incorrect data, please try inputing again.");
    }
  }
  
  createacc();
  loginacc();


  function passwchange(account) {
    let password = prompt("Enter your previous password:");
    if (password !== account.password) {
      alert("Incorrect password. Please enter the password correctly.");
      return; 
    }
  
    let passwnew = prompt("New password (at least be 5 characters)):");
    while (passwnew.length !== 4 || isNaN(passwnew)) {
      alert("Invalid password, password must be at least 5 characters.");
      passwnew = prompt("New password (at least be 5 characters)):");
    }
  
    let passwconfirm = prompt("Confirm your new password:");
    while (passwconfirm !== passwnew) {
      alert("Passwords are different, kindly try again.");
      passwconfirm = prompt("Confirm your new passwrd:");
    }
  
    account.pin = passwnew; 
    alert("PIN change successful!");
  }
  
  createacc();
  loginacc();
