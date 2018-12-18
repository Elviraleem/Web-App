//var dataURL = 'https://api.myjson.com/bins/k7n66';
var app = new Vue({
    el: '#app',

    data: {
        pages: "home",
        myData: [],
        myGames: [],
        user: null,
        team: "",
        game: "",

        
    },
    methods: {
        showPages: function (id, name) {
           
            this.pages = id;
            this.team = name;
          
            
            noCollapse();
        },
    
        
        getLogo(teamName){
            
            // En myData (los equipos) encuentra el nombre de cada uno de ellos que será igual al parámetro (nombre del equipo) que le pase.
            
            var desiredTeam =  this.myData.find(everyTeam => (everyTeam.first_name + " " + everyTeam.last_name) == teamName);
            
            return desiredTeam.logo;
            
            //Forma abreviada:
            
            //return this.myData.find(everyTeam => (everyTeam.first_name + " " + everyTeam.last_name) == teamName).logo
            
        },

        getData: function () {
            //            fetch("https://api.myjson.com/bins/k7n66", {
            //                method: "GET",
            //
            //            }).then(function (result) {
            //                return result.json()
            //
            //            }).then(function (data) {
            //                app.myData = data.teams;
            //                  app.myGames = data.games;
            //                console.log(data.teams);
            //                
            //            })

            this.myData = myJson.teams;
            this.myGames = myJson.games;
        }

        //                getData: function () {
        //                    this.$http.get(dataURL).then(function (response) {
        //                        this.myData = response.data.teams;
        //                    })
        //                },


        //            
        //        }

    },
    created: function () {
        this.getData();
        //        this.standings();

    },
    computed: {
        standings: function () {
            return this.myData.slice().sort(function (a, b) {
                return b.win_games - a.win_games;

            });
        },
        teamSelected: function () {
            return this.myData.find(team => team.first_name == this.team);
        },

        gameSelected: function () {
            return this.myGames.find(team => team.id == this.team);
        },
        
        setTheName(){
            return this.pages.toUpperCase();
        }
        
//        getLogo: function() {
//            return this.myData.find(logo => ;
//            
//            
//            //ves a mydata, busca el team que tenga como nombre el parametro que he pasado y haz un return de su logo url
//        }
    }


});

function noCollapse() {
    var menu = document.getElementById("myDropdown");
    menu.classList.remove("in");

}

//function clearField(){
//    document.getElementById("textInput").value = "";
//}
//clearField();

//------ CHAT ------- //

document.getElementById("login").addEventListener("click", login);
document.getElementById("create-post").addEventListener("click", writeNewPost);

getPosts();

function login() {

    // https://firebase.google.com/docs/auth/web/google-signin

    // Provider
    var provider = new firebase.auth.GoogleAuthProvider();

    // How to Log In   
    firebase.auth().signInWithPopup(provider)
        .then(function (response) {
            app.pages = "chat";
        });

}

function writeNewPost() {

    // https://firebase.google.com/docs/database/web/read-and-write

    var textToSend = document.getElementById("textInput").value;

    // Values

    var message = {
        message: textToSend,
        name: firebase.auth().currentUser.displayName
    }
    firebase.database().ref('chat').push(message);


    console.log(message);
    // A post entry.

    // Get a key for a new Post.

    //Write data

    console.log("write");

}


function getPosts() {
        var posts = document.getElementById("posts");
    

    firebase.database().ref('chat').on('value', function (data) {
        posts.innerHTML ='';
        
        /*-- dejar en blanco el input box cada vez que escribes --*/
//        document.getElementById("textInput").value = "";
//        posts.innerHTML = "";
        //         shouldScroll = posts.scrollTop + posts.clientHeight === posts.scrollHeight;
        //         
        //         if (!shouldScroll) {
        //            scrollToBottom();
        //  }
        var messages = data.val();

        for (var key in messages) {
            var text = document.createElement("div");
            var element = messages[key];
            
            if(element.name != firebase.auth().currentUser.displayName){
                text.setAttribute("class", "guest");
            }else{
                text.setAttribute("class", "owner");
            }
            
            text.append(element.name + ":" + " ");
            text.append(element.message);
            posts.append(text);
        }
        posts.scrollTop = posts.scrollHeight;
        

    })

    console.log("getting posts");

}
