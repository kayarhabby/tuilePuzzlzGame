/*
NOM : KAYA RHABBY
Prénom :Pascia Hershe

NOM : ANDRIANIAINA
Prénom :Ny Haja Nirina

*/

function alea(min, max){ // [0;15[
  return Math.floor((Math.random()*(max-min))+min)
}
              
$(document).ready(
  function() { // chargement des images
      for (let i = 0; i < 16; i++) {
          if (i == 15) {
              var pathFull = "<div class='tuile' id='t0" + i + "'><p>" + i + "</p></div>";
          } else {
              var pathFull = "<div class='tuile' id='t0" + i + "'><img src='./assets/img/0" + i + ".jpg'/><p>" + i + "</p></div>";
          }
          $("#puzzlearea").append(pathFull);

          var idTag = "#t0" + i;
          $(idTag).css("order", String(i + 1));
      }


      $("#shuffle").click( // fonction pour mélanger les tuiles
          function shuffle() {
              for (let i = 0; i < 50; i++) {
                  var n = alea(0,16);
                  var m = alea(0,16);
                  if (n == m) {
                      i--;
                  }
                  var idTag1 = "#t0" + n;
                  var idTag2 = "#t0" + m;
                  var ord1 = $(idTag1).css("order");
                  var ord2 = $(idTag2).css("order");
                  $(idTag1).css("order", ord2);
                  $(idTag2).css("order", ord1);
              }
          }
      );

      $(".tuile").click( // fonction pour changer la place d'une tuile avec celle de la tuile vide
          function check_and_swap() {
              var ordClicked = $(this).css("order");
              var idClicked = "#" + $(this).attr("id");
              $(".tuile").each(
                  function() {
                      var ordMatch = $(this).css("order");
                      var idMatch = "#" + $(this).attr("id");
                      if (![1, 5, 9, 13].includes(parseInt(ordClicked))) {
                          if (ordMatch == parseInt(ordClicked) - 1 && idMatch == "#t015") {
                              $(idClicked).css("order", ordMatch);
                              $(idMatch).css("order", ordClicked);
                          }
                      }
                      if (![4, 8, 12, 16].includes(parseInt(ordClicked))) {
                          if (ordMatch == parseInt(ordClicked) + 1 && idMatch == "#t015") {
                              $(idClicked).css("order", ordMatch);
                              $(idMatch).css("order", ordClicked);
                          }
                      }
                      if (ordClicked <= 12) {
                          if (ordMatch == parseInt(ordClicked) + 4 && idMatch == "#t015") {
                              $(idClicked).css("order", ordMatch);
                              $(idMatch).css("order", ordClicked);
                          }
                      }
                      if (ordClicked >= 5) {
                          if (ordMatch == parseInt(ordClicked) - 4 && idMatch == "#t015") {
                              $(idClicked).css("order", ordMatch);
                              $(idMatch).css("order", ordClicked);
                          }
                      }
                  }
              );

              var countCorrect = 0;
              $(".tuile").each( // fonction pour vérifier l'ordre
                  function() {
                      var ord = $(this).css("order");
                      var id = $(this).attr("id");
                      if (parseInt(id.slice(1)) + 1 == parseInt(ord)) {
                          countCorrect++;
                          if (countCorrect == 16) {
                              $("#output").append("Bien joué, vous avez gagné !");
                          }
                      }
                  }
              );
          }
      );
  }
);

