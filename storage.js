function new_session(username, session){
    // tambahin session ke username
}

function get_session_username(session){
    // cari username dari session
}

function revoke_session(session){
    // hapus session
}

function get_funds(username){
    // get jumlah uang dari username
}

function set_funds(username){
    // set jumlah uang dari username
}

function check_pin(username,pin){
    // return true kalau bener
    // false kalau salah
}

function set_pin(username){
    // ganti pin username
}

module.exports = {
    new_session,
    get_session_username,
    revoke_session,
    get_funds,
    set_funds,
    check_pin,
    set_pin
};