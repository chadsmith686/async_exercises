//Numbers - #1:

let url = "http://numbersapi.com"
let num = 42;

async function get42() {
    let res = await axios.get(`${url}/${num}/?json`);
    console.log(res)
}

//Numbers - #2:

const numbersArr = [23, 56, 9999]

async function luckyNumbers() {
    let res = await axios.get(`${url}/${numbersArr}/?json`);
    console.log(res)
}

// Numbers - #3:

async function getFacts() {
    let res = await axios.get(`${url}/${num}/?json`)
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => res.data.text));
    facts.forEach(data => {
        $('body').append(`<p>${res.data.text}`);
    });
}

// async function getFacts() {
//   let res = await axios.get(`${url}/${num}/?json`);
//   for (let i = 0; i <= 5; i++) {
//     let facts = await Promise.all(res.data.text);
//     facts.forEach((data) => {
//       $("body").append(`<p>${res.data.text}`);
//     });
//   }
//   }

// Deck of Cards - #1

let cardsURL = 'http://deckofcardsapi.com/api/deck/'

async function part1() {
    let res = await axios.get(`${cardsURL}/new/draw`);
    let value = res.data.cards[0].value
    let suit = res.data.cards[0].suit
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
}

// Deck of Cards - #2

async function part2() {
  let res1 = await axios.get(`${cardsURL}/new/draw`);
  let card1 = `${res1.data.cards[0].value} of ${res1.data.cards[0].suit}`;
  let res2 = await axios.get(`${cardsURL}/new/draw`);
  let card2 = `${res2.data.cards[0].value} of ${res2.data.cards[0].suit}`;
  console.log(card1.toLowerCase(), "/", card2.toLowerCase());
}

// Deck of Cards - #3

async function setup() {
let $btn = $('button');
let $cardArea = $('#card-area');

let deckData = await $.getJSON(`${cardsURL}/new/shuffle/`);
$btn.show().on('click', async function() {
    let cardData = await $.getJSON(`${cardsURL}/${deckData.deck_id}/draw/`);
    let cardSrc = cardData.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    $cardArea.append(
    $('<img>', {
        src: cardSrc,
        css: {
        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }
    })
    );
    if (cardData.remaining === 0) $btn.remove();
});
}

