// Select The Start Game Button
let startButton = document.querySelector(".control-buttons span")

startButton.onclick = function () {
    // Prompt Window To Ask For Name
    let yourName = prompt("Enter Nour Name");
    // If Name Is Empty Set Name To Unknown
    if (yourName == null || yourName.length == 0 || yourName == "") {
        document.querySelector(".player-name span").innerHTML = "Unknown Player";
    } else {
        // Name Is Not Empty
        document.querySelector(".player-name span").innerHTML = yourName;
    }
    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();
};

// Effect Duration
const EffectDuration = 1000;

// Select Blocks Game Container
let gameContainer = document.querySelector(".game-container");

// Create Array From Game Blocks
let gameBlocks = Array.from(gameContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(gameBlocks.length).keys()];
let orderRange = Array.from(Array(gameBlocks.length).keys());

shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
gameBlocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    // Add Click Event
    block.addEventListener('click', function () {
        // Trigger The Flip Block Function
        flipBlock(block);
    })
});

// Flip Block Function
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    // Collect All Flipped Cards
    let allFlippedBlocks = gameBlocks.filter(flipedBlock => flipedBlock.classList.contains("is-flipped"));
    // If Theres Two Selected Blocks
    if (allFlippedBlocks.length === 2) {
        // Stop Clicking Function
        stopClick();
        // Check Matched Block Function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// Stop Clicking Function
function stopClick() {
    // Add Class No Clicking on Main Container
    gameContainer.classList.add("no-click");
    // Wait Duration
    setTimeout(function () {
        // Remove Class No Clicking After The Duration
        gameContainer.classList.remove("no-click");
    }, EffectDuration)
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        document.getElementById("success").play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, EffectDuration)
        // document.getElementById("fail").play();
    }
}

// Shuffle Function
function shuffle(array) {
    let current = array.length,
        temp,
        random;
    
    while (current > 0) {
        // Get random element
        random = Math.floor(Math.random() * current);

        // Decrease Length By One
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];
        // [2] Current Element = Random Element
        array[current] = array[random];
        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array;
}

