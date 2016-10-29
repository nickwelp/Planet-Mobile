
var db = openDatabase('PlanetFox', '1.0', 'PlanetFoxDB', 1000000);

function initializeDB(tx){  //level one initialization
    tx.executeSql('CREATE TABLE IF NOT EXISTS PlanetFox (id unique, user, key, value)');
    tx.executeSql('INSERT INTO PlanetFox (user, key, value,) VALUES ("noname", "level", "1")');
    tx.executeSql('INSERT INTO PlanetFox (user, key, value,) VALUES ("noname", "score", "0")');
    tx.executeSql('INSERT INTO PlanetFox (user, key, value,) VALUES ("noname", "marbles", "0")');
}

function saveDBendOfLevel(lvl,scr,mrbls){
    string1 = 'INSERT INTO PlanetFox (user, key, value,) VALUES ("noname", "'+ lvl +'", "1")';
    string2 = 'INSERT INTO PlanetFox (user, key, value,) VALUES ("noname", "'+ src +'", "1")';
    string3 = 'INSERT INTO PlanetFox (user, key, value,) VALUES ("noname", "'+ mrbls +'", "1")';
    
    
    
    tx.executeSql(string1);
    tx.executeSql(string2);
    tx.executeSql(string3);
    
}


function errorCB(err){
    alert("db error");
}
function successCB(){
    //
}



