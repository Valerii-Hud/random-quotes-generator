import quotes from "../db/db_quotes.mjs";

const quoteEl = document.getElementById("quote");
const generateBtn = document.getElementById("generate-btn");
const toggleFavoriteBtn = document.getElementById("toggle-favorite-btn");
const favoritesContainer = document.getElementById("favorites-container");

let currentQuoteIndex;

function generateRandomQuotes() {
  currentQuoteIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[currentQuoteIndex];
  const randomQuotes = `${randomQuote.quote}`;
  const randomQuotesAuthor = `${randomQuote.author}`;
  const resultLine = `${randomQuotes} <br/> <span class="author">${randomQuotesAuthor}</span>`;
  quoteEl.innerHTML = resultLine;
  toggleFavoriteBtn.textContent = randomQuote.isFavorite
    ? "Remove from favorites"
    : "Add to favorites";
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

  if (currentQuote.isFavorite) {
    const exists = Array.from(favoritesContainer.children).some((child) =>
      child.textContent.includes(currentQuote.quote)
    );
    if (!exists) {
      const favoriteCard = document.createElement("div");
      favoriteCard.classList.add("favorite-card");
      favoriteCard.innerHTML = `
        <p>${currentQuote.quote}</p>
        <p class="author">${currentQuote.author}</p>
      `;
      favoritesContainer.appendChild(favoriteCard);
    }
  } else {
    const favoriteCards = document.querySelectorAll(".favorite-card");
    favoriteCards.forEach((card) => {
      if (card.textContent.includes(currentQuote.quote)) {
        card.remove();
      }
    });
  }
}

generateBtn.addEventListener("click", generateRandomQuotes);
toggleFavoriteBtn.addEventListener("click", toggleFavorite);
