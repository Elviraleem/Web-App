//var dataURL = 'https://api.myjson.com/bins/k7n66';
var app = new Vue({
    el: '#app',

    data: {
        pages: "home",
        myData: [],
        user: null
    },
    methods: {
        showPages: function (id) {
            this.pages = id;
            noCollapse();
        },

        getData: function(){
//            fetch("https://api.myjson.com/bins/k7n66", {
//                method: "GET",
//
//            }).then(function (result) {
//                return result.json()
//
//            }).then(function (data) {
//                app.myData = data.teams;
//                console.log(data.teams);
//                
//            })
            
            this.myData = myJson.teams;
        },

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
        standings(){
            return this.myData.slice().sort(function(a,b){
                return b.win_games - a.win_games;
                
            });
        }
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
        .then(function(response){
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

    firebase.database().ref('chat').on('value', function (data) {
        var posts = document.getElementById("posts");
        
        /*-- dejar en blanco el input box cada vez que escribes --*/
        document.getElementById("textInput").value = "";
        posts.innerHTML = "";
        //         shouldScroll = posts.scrollTop + posts.clientHeight === posts.scrollHeight;
        //         
        //         if (!shouldScroll) {
        //            scrollToBottom();
        //  }
        var messages = data.val();

        for (var key in messages) {
            var text = document.createElement("div");
            var element = messages[key];

            text.append(element.message);
            posts.append(text);
        }

    })

    console.log("getting posts");

}
