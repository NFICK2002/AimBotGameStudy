const numDivs = 36;
const maxHits = 11;

let hits = 1;
let firstHitTime = 0;
let allMiss = 0;


function restart() {
  hits = 1;
  allMiss = 0;
  $('.col').removeClass('miss');
  $('.col').removeClass('target');
  $('.col').text("");
  $('.game-field').show();
  $('#win-message').addClass("d-none");
  round();
}

function round() {
  $('#button-reload').text("Начать игру заново")
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $('.miss').removeClass("miss");
  $('.target').removeClass("target");
  $(".target").text("")

  let divSelector = randomDivId();
  //TODO: помечать target текущим номером
  $(divSelector).text(hits);
  $(divSelector).addClass("target");

  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 1) {
    firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}


function endGame() {
  //FIXME: спрятать игровое поле сначала
  $(".game-field").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-less-puts").text(allMiss);
  $("#win-message").removeClass("d-none");
  console.log("Всего промахов: ", allMiss);
}


function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    $(event.target).removeClass("target");
    $('.miss').removeClass("miss");
    $(event.target).text("");
    hits = hits + 1;
    round();
  } else {
    $(event.target).addClass("miss");
    allMiss += 1;
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-reload").click(() => {
    if (firstHitTime > 0) {
      restart();
    } else {
      $(".game-field").click(handleClick);
      round();
    }
  })
}

$(document).ready(init);
