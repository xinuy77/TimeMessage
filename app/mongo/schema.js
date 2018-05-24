// number number string string string string
function User(u_id, t_id, s_id, pswd, u_name, l_login, route, token, tokenSecret) {
    this.u_id        = u_id;
    this.t_id        = t_id;
    this.s_id        = s_id;
    this.pswd        = pswd;
    this.u_name      = u_name;
    this.l_login     = l_login;
    this.route       = route;
    this.token       = token;
    this.tokenSecret = tokenSecret;
}

function Message(m_id, t_id, msg_title, msg_text, sent_date, available_date, msg_sender, read) {
    this.m_id           = m_id;
    this.t_id           = t_id;
    this.sender         = msg_sender;
    this.title          = msg_title;
    this.text           = msg_text;
    this.date           = sent_date;
    this.available_date = available_date;
    this.read           = read;
}

function cleanUser(u_id, t_id, s_id, pswd, u_name, l_login, route) {
    var user = new User(u_id, t_id, s_id, pswd, u_name, l_login, route); 
    return clean(user);
}

function cleanMessage(m_id, t_id, msg_title, msg_text, sent_date, available_date) {
    var msg = new Message(m_id, t_id, msg_title, msg_text, sent_date, available_date);
    return clean(msg);
} 

function clean(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
}

module.exports = {
    User:         User,
    cleanUser:    cleanUser,
    Message:      Message,
    cleanMessage: cleanMessage
}
