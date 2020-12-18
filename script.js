const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more


function shuffle(array) { // shuffles the cards and assigns colours.
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS); // this is the function call to get the cards 




// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over

    
    newDiv.setAttribute("data-color",color);
    


    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}







///////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\///////////////////////////////\\\\\\\\\\\


//THIS IS DA GAME LOGIC as a game dev I know what im doing ;)


let previousCard;
let cardsFlipped =0;
let matches =0;
let preventClick = false;
//method to flip a card 
function flipCard(card , hide)
{

  

  if(!hide)
  {
    card.classList.add(card.dataset.color);

    cardsFlipped ++;
  }
  else
  {
    card.classList.remove(card.dataset.color);
    if(cardsFlipped > 0)
    {
      cardsFlipped --;
    }
    
  }
  
  


  return card.dataset.color;

  
}

//method to check if the cards match

function cardChecker(currentCard)
{

if(previousCard === currentCard) return false

if(previousCard.dataset.color === currentCard.dataset.color)
{
  matches ++;
  if(matches === COLORS.length / 2)
  {
    return alert("GG nerd you wasted time on this crappy game")
  }
  return true;
}
else{
  return false;
}

}


function disbableCard(card){



card.classList.add("disabled");



}


function handleCardClick(event) {

  if(preventClick)
  {
    return
  }

let results;

console.log(cardsFlipped);



if(cardsFlipped < 2) flipCard(event.target);

if(cardsFlipped === 2) results = cardChecker(event.target);

if(results === false) 
{
  preventClick = true;
  setTimeout(function(){

    flipCard(event.target , true);
    flipCard(previousCard , true);
    previousCard = event.target;
    preventClick = false;
  },1000)
  
}
else
{
  previousCard = event.target;
}


console.log(results);


if(results)
{

cardsFlipped =0;



disbableCard(event.target);
disbableCard(previousCard);

previousCard = null;


}


 
 return;
  


 

}

// when the DOM loads
createDivsForColors(shuffledColors);
