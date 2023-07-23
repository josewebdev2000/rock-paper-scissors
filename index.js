/* GLOBAL SCOPE */

// Initialize Music File
const bgMusic = new Audio("assets/music/bg-music.mp3");
bgMusic.loop = true;

// Store whether or not the sound click switcher was clicked for the first time in sessionStorage
const soundSwitcherClickedFirstTimeIdentified = "sound-switcher-clicked-first-time";
sessionStorage.setItem(soundSwitcherClickedFirstTimeIdentified, "no");

const choices = ["rock", "paper", "scissors"];

const userColor = "rgb(51, 133, 196)";
const computerColor = "rgb(226, 62, 62)";

function main()
{
    /* Run the relevant code for the main page */

    // Grab required HTML elements
    const h1Header = document.querySelector("h1");
    const soundSwitcherBtn = document.querySelector("button#sound-switcher");
    const h2Link = document.querySelector("a > h2");
    const profileLink = document.querySelector("div.copyright > p > a");
    const userRockBtn = document.querySelector("button.user-option.rock");
    const userPaperBtn = document.querySelector("button.user-option.paper");
    const userScissorsBtn = document.querySelector("button.user-option.scissors");
    const resultsMessage = document.querySelector(".results-message");
    const playAgainLink = document.querySelector("a#play-again");

    // Prepare DOM elements and sources
    const domElementsWithSources = [
        {
            dom_obj: h1Header,
            events: [
                {
                    name: "mouseover",
                    assetPath: "assets/sound-effects/hover.wav"
                }
            ]
        },
        {
            dom_obj: resultsMessage,
            events: [
                {
                    name: "mouseover",
                    assetPath: "assets/sound-effects/hover.wav"
                }
            ]
        },
        {
            dom_obj: h2Link,
            events: [
                {
                    name: "mouseover",
                    assetPath: "assets/sound-effects/hover.wav"
                },
                {
                    name: "click",
                    assetPath: "assets/sound-effects/start.wav"
                }
            ]
        },
        {
            dom_obj: playAgainLink,
            events: [
                {
                    name: "mouseover",
                    assetPath: "assets/sound-effects/hover.wav"
                },
                {
                    name: "click",
                    assetPath: "assets/sound-effects/start.wav"
                }
            ]
        },
        {
            dom_obj: soundSwitcherBtn,
            events: [
                {
                    name: "mouseover",
                    assetPath: "assets/sound-effects/hover.wav"
                },
                {
                    name: "click",
                    assetPath: "assets/sound-effects/click.mp3"
                }
            ]
        },
        {
            dom_obj: profileLink,
            events: [
                {
                    name: "mouseover",
                    assetPath: "assets/sound-effects/hover.wav"
                },
                {
                    name: "click",
                    assetPath: "assets/sound-effects/click.mp3"
                }
            ]
        },
        {
            dom_obj: userRockBtn,
            events: [
                {
                    name: "mouseover",
                    assetPath: "assets/sound-effects/hover.wav"
                },
                {
                    name: "click",
                    assetPath: "assets/sound-effects/click.mp3"
                }
            ]
        },
        {
            dom_obj: userPaperBtn,
            events: [
                {
                    name: "mouseover",
                    assetPath: "assets/sound-effects/hover.wav"
                },
                {
                    name: "click",
                    assetPath: "assets/sound-effects/click.mp3"
                }
            ]
        },
        {
            dom_obj: userScissorsBtn,
            events: [
                {
                    name: "mouseover",
                    assetPath: "assets/sound-effects/hover.wav"
                },
                {
                    name: "click",
                    assetPath: "assets/sound-effects/click.mp3"
                }
            ]
        }
    ];

    soundSwitcherBtn.addEventListener("click", toggleAudio);
    // Add event Listeners to appropiate DOM elements
    addSfxFromDomElements(domElementsWithSources);

    // Start the game when required
    h2Link.addEventListener("click", startGame);

    // Add the play again functionality
    playAgainLink.addEventListener("click", playAgain);

}

function toggleAudio()
{
    /* Switch audio from on to off according to what's required */

    // Set the sound switcher clicked for the first time if requried
    if (sessionStorage.getItem(soundSwitcherClickedFirstTimeIdentified) === "no")
    {
        sessionStorage.setItem(soundSwitcherClickedFirstTimeIdentified, "yes");
    }

    const soundSwitcherBtnImg = document.querySelector("img#sound-switcher-image");

    // Check if on is in the name of the image of the actual btn
    if (isSoundAllowed())
    {
        bgMusic.play();
        soundSwitcherBtnImg.src = "assets/pics/sound-off.png";
    }

    else
    {
        bgMusic.pause();
        soundSwitcherBtnImg.src = "assets/pics/sound-on.png";
    }
}

function addSfxFromDomElements(domElementsNSources)
{
    /* Add or remove SFX from given DOM Elements */
    for (let i = 0; i < domElementsNSources.length; i++)
    {
        const { dom_obj, events } = domElementsNSources[i];

        for (let j = 0; j < events.length; j++)
        {
            const { name, assetPath } = events[j];
            dom_obj.addEventListener(name, () => playSfx(assetPath));  
        }
    }
}

function isSoundAllowed()
{
    /* Return whether or not sound is allowed by the user */

    const soundSwitcherBtnImg = document.querySelector("img#sound-switcher-image");
    const imageSource = soundSwitcherBtnImg.src;
    const fileName = imageSource.substring(imageSource.lastIndexOf('/') + 1);
    return fileName.includes("on");
}

function playSfx(sfxSource)
{
    /* Play a sound effect*/

    // Get whether the toggle button was first clicked or not
    const wasToggleSoundBtnFirstClicked = sessionStorage.getItem(soundSwitcherClickedFirstTimeIdentified);

    if (!isSoundAllowed() && wasToggleSoundBtnFirstClicked === "yes")
    {
        const clickSfx = new Audio(sfxSource);
        clickSfx.play();
    }
}

function startGame()
{
    /* Run this function when the h2 link from the intro is clicked */

    // Grab required DOM elements
    const introSection = document.querySelector("section#link-container");
    const gameSection = document.querySelector("section#game-container");

    // Add the class fade-out from Animate CSS to intro container
    introSection.classList.add("animate__fadeOut");

    // Add proper animations to dissapear intro container and make appear game container
    setTimeout(() => {
        introSection.style.display = "none";

        // Display the element to the DOM
        gameSection.style.display = "flex";

        // Add the class fade-in from Animate CSS to game container
        gameSection.classList.add("animate__fadeIn");

    }, 1000);

    // Allow the user to make a choice
    const userOptions = document.querySelectorAll("button.user-option");
    userOptions.forEach(userOption => userOption.addEventListener("click", getUserChoice));
}

function getUserChoice(e)
{
    // Make sure to always grab the button
    let elementToConsider = null;

    if (e.target.nodeName !== "BUTTON")
    {
        elementToConsider = e.target.parentElement;
    }

    else
    {
        elementToConsider = e.target;
    }

    // Change the background color of this button
    elementToConsider.style.backgroundColor = userColor;

    // Disable all buttons for user
    document.querySelectorAll("button.user-option").forEach(userOption => {
        userOption.disabled = true;
    });

    // Allow the computer to make a choice
    grabComputerChoice();
}

function grabComputerChoice()
{
    /* Grab Computer Choice For the Browser */
    const computerChoice = getComputerChoice(choices);

    // Grab all the computer choices
    const computerChoices = document.querySelectorAll("button.computer-option");

    // Grab the one that has the same class name as the computer option chosen
    computerChoices.forEach(computerOption => {

        if (computerOption.classList.contains(computerChoice))
        {
            // Change the background color of that computer choice
            computerOption.style.backgroundColor = computerColor;
        }

        // Disable all computer colors
        computerOption.disabled = true;
    });

    // Show the results to the user
    displayResults();
}

function displayResults()
{
    // Grab choices players made
    const { userChoice, computerChoice } = grabChoices();

    // Determine who the winner is
    const winner = playRound(userChoice, computerChoice);

    // Get message to show to the user
    const finalMsg = getWinner(winner);

    // Grab the results container
    const resultsSection = document.querySelector("section#results-container");

    // Add proper animations to make the results section appear
    setTimeout(() => {
        // Display the element to the DOM
        resultsSection.style.display = "flex";

        // Add the class fade-in from Animate CSS to game container
        resultsSection.classList.add("animate__fadeIn");

    }, 1000);

    // Grab the message h2 tag to show the results message
    const resultsMsgElement = document.querySelector(".results-message");
    resultsMsgElement.textContent = finalMsg;

}

function playAgain()
{
    /* Prepare everything to play another round */

    // Grab the game and results section
    //const gameContainerSection = document.querySelector();
}

function grabChoices() 
{
    /* Grab the option chosen by the user according to the background color of the buttons in the game container */

    // Generate an object to store the choices of the user and the computer
    const playerChoices = {
        userChoice: "",
        computerChoice: ""
    }

    // Grab all buttons present in the game container
    const gameContainerBtns = document.querySelectorAll("section#game-container button");

    // Grab the user and computer choice
    gameContainerBtns.forEach(btn => {

        if (btn.style.backgroundColor === userColor)
        {
            playerChoices.userChoice = btn.classList[1];
        }

        else if (btn.style.backgroundColor === computerColor)
        {
            playerChoices.computerChoice = btn.classList[1];
        }
    });

    // Return the user and computer choices
    return playerChoices;
}

document.addEventListener("DOMContentLoaded", main);