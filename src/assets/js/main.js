let allplayers = [];
const All_players = "../../../DataBase/players.json";
fetch(All_players)
  .then((response) => response.json())
  .then((data) => {
    allplayers = data.players;
    displayPlayers(allplayers);
  })
  .catch((error) => console.error("Error loading JSON data:", error));
// Function display players
function displayPlayers(players) {
  const playersContainer = document.getElementById("all_players");
  playersContainer.innerHTML = "";

  players.forEach((player) => {
    const playersDiv = document.createElement("div");
    playersDiv.classList.add("player");

    playersDiv.innerHTML = `
                        <div class="card-player relative w-fit text-black bg-slate-200 rounded-3xl ">
                        <img class="ml-4" src="/src/assets/images/addPlayer1.png" alt="img-Card">
                        <div class="w-fit absolute top-14 left-16 text-center rounded-full" >
                        <img class="w-28 rounded-full" src="${player.photo}" alt="">
                        <h4 class="name  text-white">${player.name}</h4>
                        <img class="inline" src="${player.flag}" alt="flag"><img class="w-10 inline" src="${player.logo}" alt="logo-Team">
                        </div>
                        <span class="absolute font-bold top-[2px] left-3 p-2 border border-black rounded-full">${player.position}</span>
                        <div class="text-sm flex text-center gap-2 ml-2">
                        <div class="w-[25px]">RAT ${player.rating}</div>
                        <div class="w-[25px]">PAC ${player.pace}</div>
                        <div class="w-[25px]">SHO ${player.shooting}</div>
                        <div class="w-[25px]">PAS ${player.passing}</div>
                        <div class="w-[25px]">DRI ${player.dribbling}</div>
                        <div class="w-[25px]">DEF ${player.defending}</div>
                        <div class="w-[25px]">PHY ${player.physical}</div><br>
                        </div> `;

    playersContainer.appendChild(playersDiv);
  });
}

// filtrage by searsh Bar
function filterPlayers() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  const filteredplayers = allplayers.filter(
    (players) =>
      players.name.toLowerCase().includes(searchTerm) ||
      (Array.isArray(players.position)
        ? players.position.some((pos) => pos.toLowerCase().includes(searchTerm))
        : players.position.toLowerCase().includes(searchTerm))
  );

  displayPlayers(filteredplayers);
}
// open_Modal
const openModalBtn = document.getElementById("openModal");
const closeModalBtns = [
  document.getElementById("closeModal"),
  document.getElementById("closeModalFooter"),
];
const modal = document.getElementById("myModal");
const body = document.body;
openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  body.classList.add("modal-open");
});
closeModalBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    modal.classList.add("hidden");
    body.classList.remove("modal-open");
  })
);

// Close modal when clicking outside the modal content
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
    body.classList.remove("modal-open");
  }
});
document.querySelector(".player").addEventListener("click", displayModal);

function displayModal() {
  modal.classList.remove("hidden");
}
function saveChanges() {
  const namePlayer = document.getElementById("namePlayer").value;
  const PhotoPlayer = document.getElementById("PhotoP").value;
  const positionSelect = document.getElementById("position").value;
  const nationality = document.getElementById("nationality").value;
  const flag = document.getElementById("flag").value;
  const logo = document.getElementById("logo").value;
  const rating = document.getElementById("rating").value;
  const pace = document.getElementById("pace").value;
  const shooting = document.getElementById("shooting").value;
  const passing = document.getElementById("passing").value;
  const dribbling = document.getElementById("dribbling").value;
  const defending = document.getElementById("defending").value;
  const physical = document.getElementById("physical").value;
  const add_players = document.getElementById("add_players");
  add_players.innerHTML += `
                        <div id="playerCard" class=" card-player relative w-fit text-black bg-slate-200 rounded-3xl">
                            <div class="absolute top-10">
                                <button type="button" onclick="deletPlayers()" id="closePlayer" class="text-gray-500 hover:text-gray-700">
                                    <i class="fa-solid fa-x"></i>
                                </button><br>
                                <button type="button" onclick="updatPlayers()" id="updatPlayer" class="text-gray-500 hover:text-gray-700">
                                   <i class="fa-solid fa-pen-clip"></i>
                                </button>

                            </div>
                        <img class="ml-4"  src="/src/assets/images/addPlayer1.png" alt="img-Card">
                        <div class="w-fit absolute top-14 left-12 text-center rounded-full" >
                        <img class="w-28 rounded-full" src="${PhotoPlayer}" alt="">
                        <h4 class="name  text-white">${namePlayer}</h4>
                        <img class="inline" src="${flag}" alt="flag"><img class="w-10 inline" src="${logo}" alt="logo-Team">
                        </div>
                        <div class="absolute font-bold top-[2px] left-3 p-2 border border-black rounded-full">${positionSelect}</div>
                        <div class="text-sm flex text-center gap-2 ml-2">
                        <div class="w-[25px]">RAT ${rating}</div>
                        <div class="w-[25px]">PAC ${pace}</div>
                        <div class="w-[25px]">SHO ${shooting}</div>
                        <div class="w-[25px]">PAS ${passing}</div>
                        <div class="w-[25px]">DRI ${dribbling}</div>
                        <div class="w-[25px]">DEF ${defending}</div>
                        <div class="w-[25px]">PHY ${physical}</div><br>
                        </div>`;
}
// the input validation
function validateInput(id, regex, errorId) {
  const input = document.getElementById(id);
  const errorElement = document.getElementById(errorId);
  if (regex.test(input.value.trim())) {
    errorElement.classList.add("hidden");
    

  } else {
    errorElement.classList.remove("hidden");
  }
}
function validateName() {
  const nameRegex = /^[A-Za-z\s]{2,}$/;
  return validateInput("namePlayer", nameRegex, "NameError");
}
function validationPosition() {
  const positionRegex = /^(GK|CB|LB|RB|CD|CM|AM|LM|RM|LW|RW|ST|CF)$/;
  return validateInput("position", positionRegex, "PositionError");
}
function validationNationalty() {
  const NationRegex = /^[A-Za-z\s]{2,}$/;
  return validateInput("nationality", NationRegex, "natioError");
}
function AlertForm(event) {
  event.preventDefault();
  const isValid =
    validateName() && validationPosition() && validationNationalty;

  if (isValid) {
    alert("Form submitted successfully!");
  } else {
    alert("Please fix errors in the form.");
  }
}

function deletPlayers() {
  const playerCard = document.getElementById("playerCard");
  playerCard.remove();
}
