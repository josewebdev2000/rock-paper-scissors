function main()
{
    console.log("All ready for the game");

    // Play the game 5 times
    game(5);
}

function game(rounds)
{
    // Define all possible choices for the game
    const choices = ["rock", "paper", "scissors"];

    // Keep the score of each party
    let userScore = 0;
    let computerScore = 0;

    // Play as many rounds there are
    for (let i = 0; i < rounds; i++)
    {
        // Get choices of each party
        const userChoice = getUserChoice(choices);
        const compChoice = getComputerChoice(choices);

        // Get the winner
        const winner = playRound(userChoice, compChoice);

        // Announce choices
        console.log("You chose " + userChoice);
        console.log("The computer chose: " + compChoice);

        // Announce the winner
        announceWinner(winner);

        // Increase score accordingly
        switch (winner)
        {
            case "player":
                userScore++;
                break;
            
            case "computer":
                computerScore++;
                break;
            
            default: {

                }
        }

    }

    // Announce final scores
    console.log("Your final score is: " + userScore);
    console.log("The machine's final score is: " + computerScore);

    // Announce final winner
    if (userScore > computerScore)
    {
        console.log("You are the ultimate winner");
    }

    else if (userScore < computerScore)
    {
        console.log("The machine is the ultimate winner");
    }

    else
    {
        console.log("There is no ultimate winner");
    }
    
}

function getUserChoice(choices)
{
    /* Ask the user through a prompt for what element they choose to play with */

    // If the user did not choose a valid option, keep asking
    let userChoice = "";

    do
    {
        // Get user choice
        userChoice = prompt("What do you choose? (rock, paper, or scissors)");
    }
    while (!choices.includes(userChoice));

    return userChoice;
}

function getComputerChoice(choices)
{
    /* Randomly return either "Rock", "Paper", or "Scissor" */

    // Generate a rendom index to reference a random choice
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];

}

function announceWinner(winner)
{
    /* Return a string to announce the winner of the round */

    let announcement = "";

    switch(winner)
    {
        case "player":
            announcement = "You Win!";
            break;
        
        case "computer":
            announcement = "You Lose!";
            break;
        
        default:
            announcement = "It's a Tie!";
    }

    console.log(announcement);

}

function playRound(playerChoice, computerChoice)
{
    /* Based on the choice of the player and the computer, choose a winner if any */

    // Lowercase all input
    const playerSelection = playerChoice.toLowerCase();
    const computerSelection = computerChoice.toLowerCase();

    // Define outputs
    const playerWinsMsg = "player";
    const playerLosesMsg = "computer";
    const tieMsg = "none";

    // Define winning conditions for every case
    if (playerSelection === "rock" && computerSelection === "scissors")
    {
        return playerWinsMsg;
    }

    else if (playerSelection === "rock" && computerSelection === "paper")
    {
        return playerLosesMsg;
    }

    else if (playerSelection === "paper" && computerSelection === "rock")
    {
        return playerWinsMsg;
    }

    else if (playerSelection === "paper" && computerSelection === "scissors")
    {
        return playerLosesMsg;
    }

    else if (playerSelection === "scissors" && computerSelection === "paper")
    {
        return playerWinsMsg;
    }

    else if (playerSelection === "scissors" && computerSelection === "rock")
    {
        return playerLosesMsg;
    }

    else
    {
        return tieMsg;
    }
}

document.addEventListener("DOMContentLoaded", main);