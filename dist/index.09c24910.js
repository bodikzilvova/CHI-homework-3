//1 Завдання
class Transport {
    ride() {
        throw new Error("\u0426\u0435\u0439 \u043C\u0435\u0442\u043E\u0434 \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0431\u0443\u0442\u0438 \u043F\u0435\u0440\u0435\u0432\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 \u0443 \u043F\u0456\u0434\u043A\u043B\u0430\u0441\u0456");
    }
    stop() {
        throw new Error("\u0426\u0435\u0439 \u043C\u0435\u0442\u043E\u0434 \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0431\u0443\u0442\u0438 \u043F\u0435\u0440\u0435\u0432\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 \u0443 \u043F\u0456\u0434\u043A\u043B\u0430\u0441\u0456");
    }
}
class Car extends Transport {
    ride() {
        console.log("\u041C\u0430\u0448\u0438\u043D\u0430 \u0457\u0434\u0435");
    }
    stop() {
        console.log("\u041C\u0430\u0448\u0438\u043D\u0430 \u0437\u0443\u043F\u0438\u043D\u0438\u043B\u0430\u0441\u044C");
    }
}
class Bike extends Transport {
    ride() {
        console.log("\u0412\u0435\u043B\u043E\u0441\u0438\u043F\u0435\u0434 \u0457\u0434\u0435");
    }
    stop() {
        console.log("\u0412\u0435\u043B\u043E\u0441\u0438\u043F\u0435\u0434 \u0437\u0443\u043F\u0438\u043D\u0438\u0432\u0441\u044F");
    }
}
class TransportFactory {
    static createTransport(type) {
        switch(type){
            case "car":
                return new Car();
            case "bike":
                return new Bike();
            default:
                throw new Error("\u041D\u0435\u0432\u0456\u0434\u043E\u043C\u0438\u0439 \u0442\u0438\u043F \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0443");
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
const getData = async (page = 1)=>{
    const url = `https://rickandmortyapi.com/api/character?page=${page}`;
    const charactersDiv = document.getElementById("characters");
    const pageNumberElem = document.getElementById("pageNumber");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    charactersDiv.innerHTML = "<p>Loading\u2026</p>";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
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
const displayCharacters = (characters)=>{
    const charactersDiv = document.getElementById("characters");
    charactersDiv.innerHTML = characters.map((character)=>`
          <div class="p-4 border rounded-2xl m-5 text-center">
            <img class="mb-2" src="${character.image}" width="200px" height="200px" alt="Character image" />
            <p>Name: ${character.name}</p>
            <p>Status: ${character.status}</p>
          </div>
        `).join("");
};
let currentPage = 1;
document.getElementById("prevButton").addEventListener("click", ()=>{
    if (currentPage > 1) {
        currentPage--;
        getData(currentPage);
    }
});
document.getElementById("nextButton").addEventListener("click", ()=>{
    currentPage++;
    getData(currentPage);
});
getData();

//# sourceMappingURL=index.09c24910.js.map
