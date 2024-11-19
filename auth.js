const storage = require("./storage");

function login(username, pin){
    // return sesion code
}

function is_valid(username, session){
    return storage.get_session_username(session)===username;
}

function change_pin(username, oldPin, newPin){
    // ganti pin kalau oldPin benar
}

function create_account(username, pin){
    // bikin user kalau gak ada
    // initial balance 0
}