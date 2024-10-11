//1 Завдання
class Transport {
  ride() {
    throw new Error("Цей метод повинен бути перевизначений у підкласі");
  }

  stop() {
    throw new Error("Цей метод повинен бути перевизначений у підкласі");
  }
}

class Car extends Transport {
  ride() {
    console.log("Машина їде");
  }

  stop() {
    console.log("Машина зупинилась");
  }
}

class Bike extends Transport {
  ride() {
    console.log("Велосипед їде");
  }

  stop() {
    console.log("Велосипед зупинився");
  }
}

class TransportFactory {
  static createTransport(type) {
    switch (type) {
      case "car":
        return new Car();
      case "bike":
        return new Bike();
      default:
        throw new Error("Невідомий тип транспорту");
    }
  }
}

const car = TransportFactory.createTransport("car");
car.ride();
car.stop();

const bike = TransportFactory.createTransport("bike");
bike.ride();
bike.stop();

//Завдання 2

const getData = async (page = 1) => {
  const url = `https://rickandmortyapi.com/api/character?page=${page}`;
  const charactersDiv = document.getElementById("characters");
  const pageNumberElem = document.getElementById("pageNumber");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  charactersDiv.innerHTML = "<p>Loading…</p>";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    displayCharacters(data.results);

    pageNumberElem.innerText = page;
    prevButton.disabled = page === 1;
    nextButton.disabled = data.info.next === null;
  } catch (error) {
    console.error(error.message);
    charactersDiv.innerHTML = "<p>Error loading data</p>";
  }
};

const displayCharacters = (characters) => {
  const charactersDiv = document.getElementById("characters");
  charactersDiv.innerHTML = characters
    .map(
      (character) => `
          <div class="p-4 border rounded-2xl m-5 text-center">
            <img class="mb-2" src="${character.image}" width="200px" height="200px" alt="Character image" />
            <p>Name: ${character.name}</p>
            <p>Status: ${character.status}</p>
          </div>
        `
    )
    .join("");
};

let currentPage = 1;
document.getElementById("prevButton").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getData(currentPage);
  }
});

document.getElementById("nextButton").addEventListener("click", () => {
  currentPage++;
  getData(currentPage);
});

getData();
