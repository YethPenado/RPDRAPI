//  MODAL QUE DESPLIEGA INFORMACIÓN IMPORTANTE  //

// Declarando Modal
const modal = document.getElementById('modal');
// Botón para abrir el Modal
const openModal = document.getElementById('clic-info');
// Botón que cierra el Modal
const closeModal = document.getElementsByClassName('close')[0];

// Funcionalidad para abrir el Modal
openModal.onclick = function () {
  modal.style.display = 'block';
}
// Funcionalidad para cerrar el Modal
closeModal.onclick = function () {
  modal.style.display = 'none';
}

//  ALL QUEENS  //
// Botón que despliega los nombres de todas las Queens participantes
const queensButton = document.getElementById('queens');
queensButton.addEventListener('click', getInfo);

let queensClick = 0;
let winnersClick = 0;
let congenialityClick = 0;

// dataReceived(): Este evento se dispara cuando el Request obtiene sus datos de forma satisfactoria
function dataReceived(event) {

  // Response es el Array "All Queens" que contiene toda la información de donde se despliegan los filtros (Winners, Miss Congeniality)
  const response = event.target.response;
  const queensContainer = document.getElementById('queens-container');

  /* Este if se utiliza para permitir un único click en el botón de All Winners, con el fin de evitar que la lista se imprima por cada vez que se clickea dicho botón. */
  if (queensClick === 0) {
    for (const element of response) {
      const listItemQueens = document.createElement('p'); // Crea el <p> donde se imprimen los nombres de todas las Queens
      listItemQueens.innerText = element.name;
      queensContainer.appendChild(listItemQueens);
    }
    queensClick += 1;
  }

//  WINNERS //
  // Botón que despliega la información de Winners
  const winnersButton = document.getElementById('winners');
  winnersButton.addEventListener('click', loadWinners);

  // Carga la información únicamente de las Winners
  function loadWinners() {
    const arrayWinners = response.filter(function (element) {
      return element.winner;
    });

    const winnersContainer = document.getElementById('winners-container');
    if (winnersClick === 0) {
      for (const elementWinner of arrayWinners) {
        const listItemWinner = document.createElement('p'); // Crea el <p> donde se imprimen únicamente los nombres de las Ganadoras
        listItemWinner.innerText = elementWinner.name;
        winnersContainer.appendChild(listItemWinner);
      }
      winnersClick += 1;
    }
  }

  //  MISS CONGENIALITY //
  // Botón que despliega la información de las Miss Congeniality
  const congenialityButton = document.getElementById('congeniality');
  congenialityButton.addEventListener('click', loadCongeniality);

  // Carga la información únicamente de las Miss Congeniality
  function loadCongeniality() {
    const arrayCongeniality = response.filter(function (element) {
      return element.missCongeniality;
    });

    const congenialityContainer = document.getElementById('congeniality-container');
    if (congenialityClick === 0) {
      for (const elementCongeniality of arrayCongeniality) {
        const listItemCongeniality = document.createElement('p'); // Crea el <p> donde se imprimen únicamente los nombres de las Miss Congeniality
        listItemCongeniality.innerText = elementCongeniality.name;
        congenialityContainer.appendChild(listItemCongeniality);
      }
      congenialityClick += 1;
    }
  }
}

// getInfo(): Crea el request para solicitar los datos del API
function getInfo() {
  const request = new XMLHttpRequest();
  request.addEventListener('load', dataReceived);
  request.responseType = 'json';
  request.open('GET', 'http://www.nokeynoshade.party/api/queens/all');
  request.send();
}
