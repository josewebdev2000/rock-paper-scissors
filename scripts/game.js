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

function getWinner(winner)
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

    return announcement;

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