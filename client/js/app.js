

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    
    $("#playButton").on("click",function(){
//        alert("Play");
        window.location.href='game.html';
    });
}
document.addEventListener("app.Ready", onAppReady, false) ;
