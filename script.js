document.addEventListener("DOMContentLoaded", () => {
  //get movie data
  function getMovieData() {
    return fetch("http://localhost:3000/films")
      .then((response) => response.json())
      .then((data) => {
        renderHome(data);

        movieList(data);
      });
  }
  // function to reneder initial homepage
  function renderHome(data) {
    data.filter((film) => {
      let random = (Math.floor(Math.random() * 15) + 1).toString();
      if (film.id === random) {
        let homeCard = document.createElement("div");
        homeCard.classList = "home_card";
        homeCard.innerHTML = "";
        homeCard.innerHTML = `
              <img class = "image" src= "${film.poster}" >
              <div id ='content' ><h2>${film.title}</h2>
              <p><strong>RUNTIME:</strong>${film.runtime}</p>
              <p><strong>SHOWTIME:</strong>${film.showtime}</p>
              <p><strong>AVAILABLE TICKETS:</strong><span id='count'>${
                film.capacity - film.tickets_sold
              }</span></p></div>
              <button id="buy_tkt" class = "btn">Buy Ticket</button>
          `;
        let movieCard = document.getElementById("movie_card");
        movieCard.appendChild(homeCard);
        ticketDeduction(data);
        return movieCard;
      }
    });
  }
  function movieList(data) {
    let list = document.getElementById("films");
    data.forEach((film) => {
      let li = document.createElement("li");
      li.textContent = film.title;
      li.addEventListener("click", (e) => {
        let clickedTitle = e.target.textContent;
        let homeCard = document.querySelector(".home_card");
        if (film.title == clickedTitle) {
          homeCard.innerHTML = "";
          homeCard.innerHTML = `
          <img class = "image" src= "${film.poster}" >
          <div id = 'content'><h2>${film.title}</h2>
          <p><strong>RUNTIME:</strong>${film.runtime}</p>
          <p><strong>SHOWTIME:</strong>${film.showtime}</p>
          <p><strong>AVAILABLE TICKETS:</strong><span id='count'>${
            film.capacity - film.tickets_sold
          }</span></p></div>
          <button id="buy_tkt" class = "btn">Buy Ticket</button>
      `;
          let movieCard = document.getElementById("movie_card");
          movieCard.appendChild(homeCard);
        }
      });
      list.appendChild(li);
    });
  }
  //add event listener to buy tickets
  function ticketDeduction(data) {
    data.forEach((film) => {
      let homesCard = document.querySelector(".home_card");
      console.log(homesCard);
      let ticketButton = homesCard.querySelector(".btn");
      let availableTicket1 = homesCard.querySelector("#content");
      let realCount = availableTicket1.querySelector("#count");

      ticketButton.addEventListener("click", () => {
        realCount.textContent = film.capacity - film.tickets_sold - 1;
      });
    });
  }
  //initialize
  function initialize() {
    getMovieData();
  }
  initialize();
});
