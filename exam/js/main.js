


 var nvWidth=0;
 var isTrue=true;


$(".strip-toggel-menu").click(function(){

 if(isTrue)
 {
 	$(".nav-tab-menu").addClass("open-menu").removeClass("close-menu");
   nvWidth= $(".nav-tab-menu").width()-10;
   $(".strip-header-nav").css("left",nvWidth);
   $(".fa-align-justify").toggleClass("fa-times");
   $(".nav-tab-menu .item1").animate({opacity:'1',paddingTop:'25px'},1100);
   $(".nav-tab-menu .item2").animate({opacity:'1',paddingTop:'25px'},1200);
   $(".nav-tab-menu .item3").animate({opacity:'1',paddingTop:'25px'},1300);
   $(".nav-tab-menu .item4").animate({opacity:'1',paddingTop:'25px'},1400);
   $(".nav-tab-menu .item5").animate({opacity:'1',paddingTop:'25px'},1500);
   $(".nav-tab-menu .item6").animate({opacity:'1',paddingTop:'25px'},1600);

   isTrue=!isTrue;
 }else 
 {
    $(".nav-tab-menu").addClass("close-menu").removeClass("open-menu")
    $(".fa-align-justify").toggleClass("fa-times");
    $(".strip-header-nav").css("left",0);
     $(".nav-tab-menu li").animate({opacity:'0',paddingTop:'500px'},500);
    isTrue=!isTrue;
 }
  

	
})

var isSearchTrue=true;


$(".strip-search").click(function(){
 
 if(isSearchTrue)
 {
 	 $(".search").addClass("open-menu").removeClass("close-search");
 $(".fa-search").toggleClass("fa-times");
  $(".search-input").animate({top:'49%'},1500,function(){
  	$(".search-input").animate({top:'50%'},250)
  })

 isSearchTrue=!isSearchTrue;
 }else 
 {
 	 	 $(".search").addClass("close-search").removeClass("open-menu");
 	 	 $(".fa-search").toggleClass("fa-times");
 	 	 $(".search-input").animate({top:'300%'})
 	 	  isSearchTrue=!isSearchTrue;

 }


 

})




// var scene = document.getElementById('scene');
// var parallaxInstance = new Parallax(scene);

// var scene2 = document.getElementById('scene2');
// var parallaxInstance = new Parallax(scene2);





// movies


var allData;
var allMovies;
var row = document.getElementById("rowData");
var categorylinks = document.getElementsByClassName("nav-category");
var result = document.getElementById("res");
var allMoviesByWord = document.getElementById("allMovies");
var searchURL ="https://api.themoviedb.org/3/search/movie?query=mad&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false"

var trendingURL= 'https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44';
var latestURL ="https://api.themoviedb.org/3/movie/latest?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
var popularURL ="https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
var topratedURL ="https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
var upcomingURL="https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
var URL="https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
var category="";
var search_bar = document.getElementById("word");

getMovies();



for(var i=0;i<categorylinks.length;i++)
    {
        categorylinks[i].addEventListener("click",function(e){
            
         category=e.target.innerHTML;
         if(category=="Now playing")
         {
             URL=URL;
             getMovies()
            //alert(category);
         }
         if(category=="Popular")
         {
             URL=popularURL;
             getMovies()
            //alert(category);
         }
         else if(category=="Top Rated")
         {
            URL=topratedURL;
            getMovies()
         }
         else if(category=="Latest")
         {
            URL=latestURL;
            getMovies()
         }
         else if(category=="Trending")
         {
            URL=trendingURL;
            getMovies()
         }
         else if(category=="Upcoming")
         {
            URL=upcomingURL;
            getMovies()
         }
      
        })
    }


function getMovies(){
    var req = new XMLHttpRequest();
            
            req.open("get",URL);
            req.send();
                
    req.onreadystatechange=function(){
    if(req.readyState==4&&req.status==200)
        {
           
            allMovies=JSON.parse(req.response);
            allMovies=allMovies.results;
        
          displayMovies();
        }
    else
        {
            console.log("error");
        }
}
}

allMoviesByWord.onkeyup=function(){
     var x = allMoviesByWord.value;
     getMoviesByWord(x);
 

}

function getMoviesByWord(word){
    var req = new XMLHttpRequest();
    var urlWithWord="https://api.themoviedb.org/3/search/movie?query="+word+"&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false";
            
    req.open("get",urlWithWord);
    req.send();
        
req.onreadystatechange=function(){
if(req.readyState==4&&req.status==200)
{
   
    allMovies=JSON.parse(req.response);
    allMovies=allMovies.results;

  displayMovies();
}
else
{
    console.log("error");
}
}

}

var imgPath="https://image.tmdb.org/t/p/w500";
function displayMovies()
{
    var temp="";
    for(var i=0;i<allMovies.length;i++)
        {
            temp+=`<div class="col-md-6 col-lg-4 my-3 myM  shadow">
            <div class="movie shadow rounded position-relative">
                    <div class="post">
                    <img src=`+imgPath+allMovies[i].poster_path+` class="img-fluid rounded"/>
                    <div class="layer d-flex align-items-center ">
                    <div class="info p-0">
                   
                        <h2>`+allMovies[i].original_title+`</h2>
                        <p>`+allMovies[i].overview+`</p>
                        <p >rate: `+allMovies[i].vote_average+`</p>
                        <p>`+allMovies[i].release_date+`</p>
                        
                    </div>
                    </div>
                    </div>
                    </div>
                </div>`;
        }
    row.innerHTML=temp;
}


search_bar.onkeyup = function() {
    var word = search_bar.value;
    var resultcols = "";

    if (word == "") {
        result.innerHTML = " ";
        return false;
    }
    for (var i = 0; i < allMovies.length; i++) {
        if (allMovies[i].original_title.includes(word) == true) {

            resultcols +=`</h3><div class="col-md-4 my-3 shadow">
            <div class="movie shadow rounded position-relative">
                    <div class="post">
                    <img src=`+imgPath+allMovies[i].poster_path+` class="img-fluid rounded"/>
                    <div class="layer d-flex align-items-center ">
                    <div class="info p-5">
                   
                        <h2>`+allMovies[i].original_title+`</h2>
                        <p>`+allMovies[i].overview+`</p>
                        <p >rate: `+allMovies[i].vote_average+`</p>
                        <p>`+allMovies[i].release_date+`</p>
                        
                    </div>
                    </div>
                    </div>
                    </div>
                </div>`;
                result.innerHTML = resultcols;
        }

    }


    
}


let userName             = document.getElementById("name");
let userEmail            = document.getElementById("email");
let userPhone            = document.getElementById("phone");
let userAge              = document.getElementById("age");
let userPassword         = document.getElementById("password");
let userRePassword       = document.getElementById("rePassword");
let userNameAlert        = document.getElementById("namealert");
let userEmailAlert       = document.getElementById("emailalert");
let userPhoneAlert       = document.getElementById("phonealert");
let userAgeAlert         = document.getElementById("agealert");
let userpasswordAlert    = document.getElementById("passwordalert");
let userRepasswordAlert  = document.getElementById("repasswordalert");
userAgeAlert.style.display="none";

    userName.addEventListener("keyup",userNameValid)

    function userNameValid(){
        let regex = /^[a-zA-Z0-9]+$/;
        if(regex.test(userName.value)==true)
        {
            userNameAlert.style.display="none";
            return true
        }
        else{
            userNameAlert.style.display="block";
            return false;
        }
    }
    userEmail.addEventListener("keyup",userEmailValid)
    function userEmailValid(){
        let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
        if(regex.test(userEmail.value)==true)
        {
        
            userEmailAlert.style.display="none";
            return true
        }
        else{
            userEmailAlert.style.display="block";
            return false;
        }
    }
    userPhone.addEventListener("keyup",userPhoneValid)
    function userPhoneValid(){
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; 
        if(regex.test(userPhone.value)==true)
        {
            userPhoneAlert.style.display="none";
            return true
        }
        else{
            userPhoneAlert.style.display="block";
   
            return false;
        }
    }
    userAge.addEventListener("keyup",userAgeValid)
    function userAgeValid(){
        let regex = /^[1-9][0-9]?$|^100$/; 
        if(regex.test(userAge.value)==true)
        {
            userAgeAlert.style.display="none";
            return true
        }
        else{
            userAgeAlert.style.display="block";
            console.log("dkldkdlkdlk")

            return false;
        }
    }
    userPassword.addEventListener("keyup",userPasswordValid)
    function userPasswordValid(){
        let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
        if(regex.test(userPassword.value)==true)
        {  
            userpasswordAlert.style.display="none";
            return true
        }
        else{
            userpasswordAlert.style.display="block";
            return false;
            
        }
    }
    userRePassword.addEventListener("keyup",userRePasswordValid)
    function userRePasswordValid(){
        if(userPassword.value==userRePassword.value)
        {
           
            userRepasswordAlert.style.display="none";
            return true
        }
        else{
            userRepasswordAlert.style.display="block";
            return false;
        }
    }
document.getElementById("contact").addEventListener("click",function(){
    if(userNameValid()&&userEmailValid()&&userPhoneValid()&&userAgeValid()&&userPasswordValid()&&userRePasswordValid()) { 
        document.getElementById("submitBtn").disabled = false;
    }
    else {
        document.getElementById("submitBtn").disabled = true;
    }   
})



  






