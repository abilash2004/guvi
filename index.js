async function getData() {
  try {
      let res = await fetch('https://restcountries.com/v3.1/all');
      let data = await res.json();
      return data;
  } catch (error) {
      console.log(error);
  } finally {
      console.log("I am Finally");
  }
}

async function construct() {
  let data = await getData();
  displayCountries(data);
}

function displayCountries(data) {
  const divRoot = document.getElementById('root');
  divRoot.innerHTML = "";

  data.forEach(e => {
      let div = document.createElement('div');
      div.innerHTML = `<div class="card cardWrapper" style="width: 18rem;">
          <img src="${e.flags.svg}" class="card-img-top" alt="${e.flags.alt}">
          <div class="card-body">
              <h4 class="card-title">Country Name : ${e.name.common}</h4>
              <h6 class="card-text">Country Capital : ${e.capital ? e.capital[0] : ""}</h6>
              
          </div>
      </div>`;
      divRoot.appendChild(div);
  });
}

function searchCountries() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.toLowerCase();

  getData()
      .then(data => {
          const filteredData = data.filter(e => {
              const countryName = e.name.common.toLowerCase();
              return countryName.includes(searchTerm);
          });
          displayCountries(filteredData);
      })
      .catch(error => console.log(error));
}

construct();

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchCountries);
