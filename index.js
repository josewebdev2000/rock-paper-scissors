/* GLOBAL SCOPE */

// Initialize Music File
const bgMusic = new Audio("assets/music/bg-music.mp3");
bgMusic.loop = true;

// Store whether or not the sound click switcher was clicked for the first time in sessionStorage
const soundSwitcherClickedFirstTimeIdentified = "sound-switcher-clicked-first-time";
sessionStorage.setItem(soundSwitcherClickedFirstTimeIdentified, "no");

function main()
{
    /* Run the relevant code for the main page */

    // Grab required HTML elements
    const h1Header = document.querySelector("h1");
    const soundSwitcherBtn = document.querySelector("button#sound-switcher");
    const h2Link = document.querySelector("a > h2");

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
        }
    ];

    soundSwitcherBtn.addEventListener("click", toggleAudio);
    // Add event Listeners to appropiate DOM elements
    addSfxFromDomElements(domElementsWithSources);
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

document.addEventListener("DOMContentLoaded", main);