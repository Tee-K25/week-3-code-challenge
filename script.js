document.addEventListener("DOMContentLoaded", () => {
  //get movie data
  function getMovieData() {
    return fetch("http://localhost:3000/films")
      .then((response) => response.json())
      .then((data) => {
        renderHome(data);
        movieList(data);
        ticketDeduction(data);
      });
  }
  function renderHome(data) {
    data.filter((film) => {
      let random = (Math.floor(Math.random() * 15) + 1).toString();
      if (film.id === random) {
        let homeCard = document.createElement("div");
        homeCard.classList = "home_card";
        homeCard.innerHTML = `
            <img class = "image" src= "${film.poster}" >
            <div><h2>${film.title}</h2>
            <p><strong>RUNTIME:</strong>${film.runtime}</p>
            <p><strong>SHOWTIME:</strong>${film.showtime}</p>
            <p><strong>AVAILABLE TICKETS:</strong><span id='count'>${
              film.capacity - film.tickets_sold
            }</span></p></div>
            <button class = "btn">Buy Ticket</button>
        `;
        let movieCard = document.getElementById("movie_card");
        movieCard.appendChild(homeCard);
        return movieCard;
      }
    });
  }
  function movieList(data) {
    let list = document.getElementById("films");
    data.forEach((film) => {
      let li = document.createElement("li");
      li.textContent = film.title;
      list.appendChild(li);
    });
  }
  //add event listener to buy tickets
  function ticketDeduction(data) {
    data.forEach((film) => {
      let ticketButton = document.querySelector(".btn");
      let availableTicket = document.getElementById("count");
      ticketButton.addEventListener("click", () => {
        if (availableTicket > 0) {
          availableTicket.innerHTML = film.capacity - film.tickets_sold;
          availableTicket -= 1;
        } else if (availableTicket == 0) {
          availableTicket.innerHTML = "Sold out";
        }
      });
    });
  }
  //initialize
  function initialize() {
    getMovieData();
  }
  initialize();
});
