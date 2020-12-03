function Game(apiKey) {
    let images = [[],[]];
    getData(apiKey).then(data => {
        for (let i = 0; i < 12; i++) {
            images[0][i] = data.photos.photo[i];
            images[1][i] = data.photos.photo[i];
        }
        imageGeneration(images);
    })

    //Från Prototype
    this.match('.card')

}

async function getData(apiKey) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=nature&media=photos&per_page=12&page=1&format=json&nojsoncallback=1`;
    let response = await fetch(url);
    return response.json()
}   

function imageGeneration(images) {

    let allCards = document.querySelectorAll('.card');
    // Lägger till IMG element tagg till .card klassen.
    
    for (let i = 0; i < 24; i++) {
        let img = document.createElement('img');
        allCards[i].appendChild(img);
        img.classList.add('hide')
    }

    let result;
    let convertNodeListToArray = [];
    // Loopa igenom 2ggr och sedan spotta ut 24 bilder pga vi hämtar 12st och sparar ner de i en array
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 12; j++) {
            let id = images[i][j].id;
            let secret = images[i][j].secret;
            let server = images[i][j].server;
            let size = 'q';

            result = `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
            convertNodeListToArray.push(result);
        }
        
    }
    shuffle(convertNodeListToArray)
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return displayImage(a);
}

function displayImage(images) {
    let img = document.querySelectorAll('.card img');
    // console.log(images)
    for(let i = 0; i< images.length; i++) {
        img[i].src = images[i];
    }
}

// Prototypes
Game.prototype.match = function (className) {
    const card = document.querySelectorAll(className);
    card.forEach(c => {
        c.addEventListener('click', (e) => {
            e.target.classList.toggle('hide')
        })
    });
}

//Vi skickar ut Game functions till Main.js
export { Game };