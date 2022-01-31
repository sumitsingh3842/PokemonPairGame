const cards=document.querySelectorAll(".card");
let hasFlippedCard=false;
let firstCard,secondCard;
let lockBoard=false;
let pairs=0;
let timer=false;
var Interval ;
var seconds = 00; 
var tens = 00; 
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var text=document.getElementById("text");
var resetbtn=document.getElementById("reset");
function flipCard(){
    if(lockBoard)
    return;
    if(this===firstCard) return;
    if(timer===false){
        clearInterval(Interval);
     Interval = setInterval(start, 10);
     text.innerHTML="Timer has started:";
     resetbtn.style.visibility="visible";
    }
    this.classList.toggle('flip');
    if(!hasFlippedCard){
        hasFlippedCard=true;
        firstCard=this;
    }
    else{
        hasFlippedCard=false;
        secondCard=this;
        if(firstCard.dataset.pokemon===secondCard.dataset.pokemon)
    {
        firstCard.removeEventListener('click',flipCard);
        secondCard.removeEventListener('click',flipCard);
        pairs++;
        resetBoard();
    }
    else{
        lockBoard=true;
        setTimeout(()=>{
            firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard=false;
        resetBoard();
        },1000);

    }
    }
    if(pairs==6){
        clearInterval(Interval);
        text.innerHTML="Your time was:"
    }
    
}
function resetBoard(){
    hasFlippedCard=false;
    lockBoard=false;
    firstCard=null;
    secondCard=null;
}
(function shuffle(){
    cards.forEach(card=>{
        let randomPos=Math.floor(Math.random()*12);
        card.style.order=randomPos;
    });
})();
function shuffle(){
    cards.forEach(card=>{
        let randomPos=Math.floor(Math.random()*12);
        card.style.order=randomPos;
    });
}
cards.forEach(card=>card.addEventListener("click",flipCard));
function start(){
    tens++; 
    
  if(tens < 9){
    appendTens.innerHTML = "0" + tens;
  }
    
  if (tens > 9){
    appendTens.innerHTML = tens;
      
  } 
    
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }
    
  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }

}
function reset(){
    cards.forEach(card=>{
        card.classList.remove('flip');
        card.addEventListener("click",flipCard);
});
resetBoard();
shuffle();
pairs=0;
clearInterval(Interval);
tens=0;
seconds=0;
appendSeconds.innerHTML ="00";
appendTens.innerHTML="00";
text.innerHTML="Click any card to begin";
resetbtn.style.visibility="hidden";
}