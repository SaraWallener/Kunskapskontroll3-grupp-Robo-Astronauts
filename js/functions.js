function Game() {
  // Spel saker hamnar här  
  console.log('Start')
  this.click('.card')
}

Game.prototype.click = (className) => {
  const card = document.querySelectorAll(className);
  card.forEach(c => {
    c.addEventListener('click', (value) => {
      console.log(value.target)
    })
  });
}

function MemoryCard(){
  new Game();
};


export {MemoryCard}

