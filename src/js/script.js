import quotes from "../db/db_quotes.mjs";

const quoteEl = document.getElementById("quote");
const generateBtn = document.getElementById("generate-btn");
const toggleFavoriteBtn = document.getElementById("toggle-favorite-btn");
let currentQuoteIndex;

function generateRandomQuotes() {
  currentQuoteIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[currentQuoteIndex];
  const randomQuotes = `${randomQuote.quote}`;
  const randomQuotesAuthor = `${randomQuote.author}`;
  const resultLine = `${randomQuotes} <br/> ${randomQuotesAuthor}`;
  quoteEl.innerHTML = resultLine;
}

function toggleFavorite() {
  if (currentQuoteIndex === undefined) {
    console.warn("No quote generated yet.");
    return;
  }
  const currentQuote = quotes[currentQuoteIndex];
  currentQuote.isFavorite = !currentQuote.isFavorite;
  toggleFavoriteBtn.textContent = currentQuote.isFavorite
    ? "Remove from favorites"
    : "Add to favorites";
}

generateBtn.addEventListener("click", generateRandomQuotes);
toggleFavoriteBtn.addEventListener("click", toggleFavorite);
