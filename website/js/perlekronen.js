window.addEventListener("load", homeScreen);

function homeScreen(){
    //skjuler skærmene der ikke skal bruges
    console.log("homeScreen");
    hideAllScreens();

    document.querySelector("#startside").classList.remove("hide");
    document.querySelector("#startside").classList.remove("hide");

  
  // ved klik på knappen start skal spille-skærmen komme frem
  document.querySelector("#knap_start").addEventListener("click", startGame);
  document.querySelector("#knap_start2").addEventListener("click", startGame);
  document.querySelector("#knap_spil_igen1").addEventListener("click", startGame);
  document.querySelector("#knap_spil_igen2").addEventListener("click", startGame);

  //ved klik på regler skal regle skærmen komme frem
  document.querySelector("#knap_regler").addEventListener("click", regler);

  //ved klik på knappen giv kronen, kommer ny skærm frem
  document.querySelector("#knap_giv_kronen").addEventListener("click", kronenGivet);

  //coralina og pearlina hopper/svæver
  console.log("coralinaHop");
  document.querySelector("#coralina1_container").classList.add("hopper");

  console.log("pearlinaHop");
  document.querySelector("#pearlina1_container").classList.add("hopper");
}

let point;
let liv;

function regler(){
//skjul alle skærme
 hideAllScreens();

 //vis regel og forside skærmen
 document.querySelector("#startside").classList.remove("hide");
 document.querySelector("#regler").classList.remove("hide");
}

function startGame() {
  console.log("startGame");
  
 //skjul alle skærme
 hideAllScreens();


 //vis game skærmen
 document.querySelector("#spillet").classList.remove("hide");

 //nulstil liv og point
 point = 0;
 liv = 3;

  //opdatere point og liv på siden
  document.querySelector("#point").textContent = point;
  document.querySelector("#liv1").textContent = liv;

  //starter timer animation
  document.querySelector("#timer_sprite").classList.add("shrink");

  //lyt efter om timer-animationen skal starte
  document.querySelector("#timer_sprite").addEventListener("animationend", endGame);
  
  //Coralina hopper
  console.log("coralinaHop");
  document.querySelector("#coralina2_container").classList.add("hopper");


  //få perlen til at falde ned fra oven fra en random position
  console.log("movePearl");
  document.querySelector("#pearl_container").classList.add("falling");
  let rnd = generateRandomNumber(6);
  document.querySelector("#pearl_container").classList.add("pos" + rnd);
  
  //få blæksprutten til at falde ned fra oven fra en random position
  console.log("moveSquid");
  document.querySelector("#squid_container").classList.add("falling");
  rnd = generateRandomNumber(6);
  document.querySelector("#squid_container").classList.add("pos" + rnd);

  //få goplen til at falde ned fra oven fra en random position
  console.log("moveGople");
  document.querySelector("#gople_container").classList.add("falling");
  rnd = generateRandomNumber(6);
  document.querySelector("#gople_container").classList.add("pos" + rnd);


  // lyt efter klik på perle
  console.log("clickPearl");
  document.querySelector("#pearl_container").addEventListener("mousedown", clickPearl);

  // lyt efter klik på blæksprutte
  console.log("clickSquid");
  document.querySelector("#squid_container").addEventListener("mousedown", clickSquid);

  // lyt efter klik på gople
  console.log("clickGople");
  document.querySelector("#gople_container").addEventListener("mousedown", clickGople);


  // når clickPearl har faldet 1 gang, skal den dukke op et nyt sted (gå til reset funktionen)
  document.querySelector("#pearl_container").addEventListener("animationiteration", resetPearl);
  
  // når clickSquid har faldet 1 gang, skal den dukke op et nyt sted (gå til reset funktionen)
  document.querySelector("#squid_container").addEventListener("animationiteration", resetSquid);

  // når ClickGople har faldet 1 gang, skal den dukke op et nyt sted (gå til reset funktionen)
  document.querySelector("#gople_container").addEventListener("animationiteration", resetGople);
}

function clickPearl(){
  console.log("clickPearl");

   //stop med at lytte efter flere end et klik
   document.querySelector("#pearl_container").removeEventListener("mousedown", clickPearl);

   //tæl op på point (kan også skrives som: point = point++;)
   point = point + 1;

   //vis nyt point tal
   document.querySelector("#point").textContent = point;

   //stop falde animation på container
   document.querySelector("#pearl_container").classList.add("frys");

   //put forsvind animation på sprite
   document.querySelector("#pearl_sprite").classList.add("forsvind");

  // Går til reset funktionen når forsvind-animationen er færdig
  document.querySelector("#pearl_container").addEventListener("animationend", resetPearl);

}

function clickGople(){
  console.log("clickGople");

   //stop med at lytte efter flere end et klik
   document.querySelector("#gople_container").removeEventListener("mousedown", clickGople);
  
   //tæl ned på liv
   liv = liv - 1;

   //vis nyt liv tal
   document.querySelector("#liv_container").textContent = liv;

   //stop falde animation på container
   document.querySelector("#gople_container").classList.add("frys");

   //put forsvind animation på sprite
   document.querySelector("#gople_sprite").classList.add("forsvind");

   // Går til reset funktionen når forsvind-animationen er færdig
  document.querySelector("#gople_container").addEventListener("animationend", resetGople);
}

function clickSquid(){
  console.log("clickSquid");

   //stop med at lytte efter flere end et klik
   document.querySelector("#squid_container").removeEventListener("mousedown", clickSquid);

   //stop falde animation på container
   document.querySelector("#squid_container").classList.add("frys");

   //put forsvind animation på sprite
   document.querySelector("#squid_sprite").classList.add("forsvind");

   document.querySelector("#squid_sprite").addEventListener("mousedown", inkScreen);

   // Går til reset funktionen når forsvind-animationen er færdig
  document.querySelector("#squid_container").addEventListener("animationend", resetSquid);
}

function resetPearl() {
  console.log("resetPearl");

  //fjern alle klasser fra pearl_container (fald, frys og pos1)
  document.querySelector("#pearl_container").classList = "";

  //fjern alle klasser fra pearl_sprite (forsvind)
  document.querySelector("#pearl_sprite").classList = "";
  
  // genstart falde-animation (faldeanimationen sættes på igen)
  document.querySelector("#pearl_container").offsetHeight;
  document.querySelector("#pearl_container").classList.add("falling");

  //ny random position
  let rnd = generateRandomNumber(6);
  document.querySelector("#pearl_container").classList.add("pos" + rnd);

  // lyt efter klik på Perle, gå til funktionen clickPearl hvis der klikkes
  document.querySelector("#pearl_container").addEventListener("mousedown", clickPearl);
}

function resetGople() {
  console.log("resetGople");

  //fjern alle klasser fra pearl_container (fald, frys og pos1)
  document.querySelector("#gople_container").classList = "";

  //fjern alle klasser fra pearl_sprite (forsvind)
  document.querySelector("#gople_sprite").classList = "";


  // genstart falde-animation (faldeanimationen sættes på igen)
  document.querySelector("#gople_container").offsetHeight;
  document.querySelector("#gople_container").classList.add("falling");

  //ny random position
  let rnd = generateRandomNumber(6);
  document.querySelector("#gople_container").classList.add("pos" + rnd);

  // lyt efter klik på Perle, gå til funktionen clickPearl hvis der klikkes
  document.querySelector("#gople_container").addEventListener("mousedown", clickGople);
}

function resetSquid() {
  console.log("resetSquid");

  //fjern alle klasser fra pearl_container (fald, frys og pos1)
  document.querySelector("#squid_container").classList = "";

  //fjern alle klasser fra pearl_sprite (forsvind)
  document.querySelector("#squid_sprite").classList = "";

  // genstart falde-animation (faldeanimationen sættes på igen)
  document.querySelector("#squid_container").offsetHeight;
  document.querySelector("#squid_container").classList.add("falling");

  //ny random position
  let rnd = generateRandomNumber(6);
  document.querySelector("#squid_container").classList.add("pos" + rnd);

  // lyt efter klik på Perle, gå til funktionen clickPearl hvis der klikkes
  document.querySelector("#squid_container").addEventListener("mousedown", clickSquid);
}

function inkScreen(){
  console.log("inkScreen");

  hideAllScreens();

  document.querySelector("#spillet").classList.remove("hide");
  document.querySelector("#ink_screen").classList.remove("hide");
}

function endGame(){
    console.log("endGame");
    if(liv <=0){
      gameOver();
    }
  
    else if (point >=3){
      levelComplete();
    }
  
    else {
      gameOver();
    }

    // stop timer og fjern eventlistener
  document.querySelector("#timer").classList.remove("shrink");
  document.querySelector("#timer").removeEventListener("animationend", endGame);

  // Fjerner alle eventlistnere fra elementerne
  pearl.removeEventListener("animationend", resetPearl);
  pearl.removeEventListener("animationiteration", resetPearl);
  pearl.removeEventListener("mousedown", clickPearl);

  squid.removeEventListener("animationend", resetSquid);
  squid.removeEventListener("animationiteration", resetSquid);
  squid.removeEventListener("mousedown", clickSquid);

  gople.removeEventListener("animationend", resetGople);
  gople.removeEventListener("animationiteration", resetGople);
  gople.removeEventListener("mousedown", clickGople);

  // Fjerner alle klasser fra elementerne
  pearl.classList = "";
  document.querySelector("#pearl_sprite").classList = "";
  squid.classList = "";
  document.querySelector("#squid_sprite").classList = "";
  gople.classList = "";
  document.querySelector("#gople_sprite").classList = "";

}

function gameOver (){
  console.log("gameOver");

  //fjerner klassen der hider game-over skærmen
  hideAllScreens();

  document.querySelector("#game_over").classList.remove("hide");

  //ved klik på knappen start igen, starter spillet forfra
  document.querySelector("#knap_spil_igen").addEventListener("click", startGame);

  console.log("coralinaHop");
  document.querySelector("#coralina3_container").classList.add("hopper");

  //fjern timer animation og sæt den på igen
  document.querySelector("#timer").classList.remove("timer");
  document.querySelector("#timer").addEventListener("animationend", endGame);
}

function levelComplete(){
  console.log("levelComplete");

  hideAllScreens();
  document.querySelector("#level_complete").classList.remove("hide");

  document.querySelector("#knap_giv_kronen").addEventListener("click", kronenGivet);

  console.log("coralinaHop");
  document.querySelector("#coralina4_container").classList.add("hopper");

  //fjern timer animation og sæt den på igen
 document.querySelector("#timer").classList.remove("timer");
 document.querySelector("#timer").addEventListener("animationend", endGame);

}

function kronenGivet(){
  //skjul alle skærme
 hideAllScreens();

 //vis regel og forside skærmen
 document.querySelector("#kronen_givet").classList.remove("hide");
 document.querySelector("#knap_start_igen1").addEventListener("click", startGame);

 console.log("coralinaHop");
  document.querySelector("#coralina5_container").classList.add("hopper");

  console.log("pearlinaHop");
  document.querySelector("#pearlina2_container").classList.add("hopper");

 //fjern timer animation og sæt den på igen
 document.querySelector("#timer").classList.remove("timer");
 document.querySelector("#timer").addEventListener("animationend", endGame);
}

function generateRandomNumber(num){
  let rndNumber = Math.random();
  rndNumber = rndNumber * num;
  rndNumber = Math.floor (rndNumber);
  rndNumber = rndNumber + 1;
  return rndNumber;
}

function hideAllScreens(){
  console.log("hideallscreen");
  document.querySelector("#startside").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#regler").classList.add("hide");
  document.querySelector("#spillet").classList.add("hide");
  document.querySelector("#kronen_givet").classList.add("hide");
  document.querySelector("#ink_screen").classList.add("hide");
}


