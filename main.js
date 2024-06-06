// JavaScript Document
// HTML5 Ad Template JS from DoubleClick by Google

"use strict"

// DOM Elements
let container = null
let content = null
let internalDiv = null
let bgExt = null
let btnClose = null
let scenes = null
let timer = null
let sound = null
let cta = null
let spots = null
let spotsNodes = null
let gameBack = null

// State
let currentTime = 30
let introTime = 6
let interacted = false
let isVertical = false
let spotOpened = false

// Animations
let tl = null
let introTl = null

// Timers
let introTimer = null
let gameTimer = null

// Images
let loadedImages = 0
let imageArray = new Array(
    "close.png",
    "dl_loading.gif",
    "images/background.jpg",
    "images/burger.png",
    "images/clock.png",
    "images/cta.png",
    "images/endcard_logo.png",
    "images/endcard_product.png",
    "images/endcard_txt.png",
    "images/info_1.png",
    "images/info_2.png",
    "images/info_3.png",
    "images/info_4.png",
    "images/info_5.png",
    "images/info_6.png",
    "images/instructions.png",
    "images/logo.png",
    "images/spot.png",
    "images/spot_selected.png"
)

let uclass = {
    exists: function (elem, className) { let p = new RegExp("(^| )" + className + "( |$)"); return (elem.className && elem.className.match(p)) },
    add: function (elem, className) { if (uclass.exists(elem, className)) { return true } elem.className += " " + className },
    remove: function (elem, className) { let c = elem.className; let p = new RegExp("(^| )" + className + "( |$)"); c = c.replace(p, " ").replace(/  /g, " "); elem.className = c }
}

// Enabler.loadModule(studio.module.ModuleId.VIDEO, function () {
//   studio.video.Reporter.attach("video_1", video1)
// })

// Waits for the content to load and then starts the ad
window.onload = () => {
    if (Enabler.isInitialized()) {
        enablerInitHandler()
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler)
    }
}

// Checks if the creative is visible
const enablerInitHandler = () => {
    if (Enabler.isVisible()) {
        preloadImages()
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, preloadImages)
    }
}

const preloadImages = () => {
    for (let i = 0; i < imageArray.length; i++) {
        let tempImage = new Image()
        tempImage.addEventListener("load", trackProgress, true)
        tempImage.src = imageArray[i]
    }
}

const trackProgress = () => {
    loadedImages++
    if (loadedImages == imageArray.length) {
        startAd()
    }
}




// START AD
const startAd = () => {
    document.querySelector("#loader-container").style.display = "none"
    // document.querySelector("#dc_bgImage").style.backgroundImage = "url(images/background_selection.jpg)"
    // Assign All the elements to the element on the page
    Enabler.setFloatingPixelDimensions(1, 1)

    Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START, expandHandler)
    Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START, collapseHandler)
    Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH, expandFinishHandler)
    Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH, collapseFinishHandler)
    Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_SUPPORT, fullscreenHandler)

    container = document.querySelector("#dc_container")
    content = document.querySelector("#dc_content")

    internalDiv = document.querySelector("#internalDiv")
    bgExt = document.querySelector("#dc_background_exit")
    btnClose = document.querySelector("#dc_btnClose")
    scenes = document.querySelectorAll(".scene")
    timer = document.querySelector("#game_current_time")
    cta = document.querySelector("#cta_wrapper")
    spotsNodes = document.querySelectorAll(".spot:not(.spot_selected)")
    spots = [...spotsNodes]
    gameBack = document.querySelector('.game_back')

    setTimeout(onResize, 200)

    addListeners()
    Enabler.queryFullscreenSupport()
    initAnimations()

    window.onresize = onResize
    onResize()
}




// EVENT LISTENERS
const addListeners = () => {
    bgExt.addEventListener("touchend", clickBG, false)
    bgExt.addEventListener("click", clickBG, false)
    btnClose.addEventListener("touchend", clickClose, false)
    btnClose.addEventListener("click", clickClose, false)
    cta.addEventListener("touchend", clickCTA, false)
    cta.addEventListener("click", clickCTA, false)
    spots.forEach(s => {
        s.addEventListener("touchend", clickSpot, false)
        s.addEventListener("click", clickSpot, false)
    })

    gameBack.addEventListener("touchend", closeSpot, false)
    gameBack.addEventListener("click", closeSpot, false)
}



// GAME
const clickSpot = (e) => {
    if (!interacted) {
        Enabler.counter("McDonalds-HotSpot-FirstInteraction")
        interacted = true
        gsap.to(`#instructions`, 0.5, { opacity: 0 })
    }

    if (spotOpened) closeSpot();

    spotOpened = true;
    introTl.pause();
    const spot = e.target.id.split("_")[1];

    Enabler.counter(`McDonalds-HotSpot-Open_Spot_${spot}`);

    gsap.to(`#spot_${spot}_selected`, 0.5, { opacity: 1 })
    gsap.to(`#info_${spot}`, 0.5, { opacity: 1 })
}

const closeSpot = () => {
    spotOpened = false;
    gsap.to(['.spot_selected', '.info'], 0.5, { opacity: 0 }, 0)
    introTl.restart();
}


// ANIMATIONS
const initAnimations = () => {
    Enabler.counter("McDonalds-HotSpot-GameStarted")
    gsap.to(`#instructions`, 0.5, { opacity: 1, delay: 0.5, onComplete: initTimers })

    introTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 })

    introTl
        .set('.spot', { transformOrigin: '50% 50%' }, 0)
        .to(`#spot_1_selected`, 0.5, { opacity: 1, scale: 1.2, delay: 0.5 })
        .to(`#spot_1_selected`, 0.5, { opacity: 0, scale: 1, delay: 0.5 })
        .to(`#spot_2_selected`, 0.5, { opacity: 1, scale: 1.2, delay: 0.5 })
        .to(`#spot_2_selected`, 0.5, { opacity: 0, scale: 1, delay: 0.5 })
        .to(`#spot_3_selected`, 0.5, { opacity: 1, scale: 1.2, delay: 0.5 })
        .to(`#spot_3_selected`, 0.5, { opacity: 0, scale: 1, delay: 0.5 })
        .to(`#spot_4_selected`, 0.5, { opacity: 1, scale: 1.2, delay: 0.5 })
        .to(`#spot_4_selected`, 0.5, { opacity: 0, scale: 1, delay: 0.5 })
        .to(`#spot_5_selected`, 0.5, { opacity: 1, scale: 1.2, delay: 0.5 })
        .to(`#spot_5_selected`, 0.5, { opacity: 0, scale: 1, delay: 0.5 })
        .to(`#spot_6_selected`, 0.5, { opacity: 1, scale: 1.2, delay: 0.5 })
        .to(`#spot_6_selected`, 0.5, { opacity: 0, scale: 1, delay: 0.5 })
}




// TIMERS
const initTimers = () => {
    initIntroTimer()
    initGameTimer()
}




// SIZE & DEVICES
const onResize = () => {
    internalDiv.style.display = "block"
    internalDiv.style.top = content.offsetHeight / 2 - internalDiv.offsetHeight / 2 + "px"
    internalDiv.style.left = content.offsetWidth / 2 - internalDiv.offsetWidth / 2 + "px"

    setTimeout(() => {
        checkRotation()
        checkIfTablet()
    }, 100)
}

const checkRotation = () => {
    const iDRect = internalDiv.getBoundingClientRect()

    isVertical = iDRect.height > iDRect.width

    if (iDRect.width < iDRect.height) {
        scenes.forEach(scene => {
            scene.style.width = iDRect.height + "px"
            scene.style.height = iDRect.width + "px"

            const ratio = 50 / (iDRect.width / iDRect.height)
            scene.style.transformOrigin = "center " + ratio + "%"
        })
    }
}

const checkIfTablet = () => {
    const iDRect = internalDiv.getBoundingClientRect()

    let min = iDRect.width
    let max = iDRect.height

    if (min > max) {
        max = iDRect.width
        min = iDRect.height
    }
    if (min / max >= 0.65) {
        internalDiv.className = "tablet"
    } else {
        internalDiv.className = ""
    }
}

const expandHandler = () => {
    container.style.display = "block"
    Enabler.finishFullscreenExpand()
}

const collapseHandler = () => {
    container.style.display = "none"
    Enabler.finishFullscreenCollapse()
}

const expandFinishHandler = () => {
}

const collapseFinishHandler = () => {
}

const fullscreenHandler = () => {
    Enabler.requestFullscreenExpand()
}




// TIMERS
const initIntroTimer = () => {
    if (introTimer === null || introTimer === undefined) {
        introTimer = setTimeout(() => {
            if (!interacted) {
                endGame()
            }
        }, introTime * 1000)
    }
}

const initGameTimer = () => {
    if (gameTimer === null || gameTimer === undefined) {
        gameTimer = setInterval(() => {
            currentTime--
            timer.innerHTML = `0:${("0" + currentTime).slice(-2)}`
            if (currentTime === 0) {
                clearInterval(gameTimer)
                endGame()
            }
        }, 1000)
    }
}




// AUDIO
const getAssetUrl = (filename) => {
    if (Enabler.isServingInLiveEnvironment()) {
        return Enabler.getUrl(filename)
    } else {
        return filename
    }
}

const createAudio = (source) => {
    const audio = document.createElement("audio")
    const audioSource = document.createElement("source")
    audioSource.src = getAssetUrl(source)
    audio.appendChild(audioSource)
    return audio
}




// EXITS
const clickBG = () => {
    if (isEnded) {
        Enabler.counter("McDonalds-HotSpot-ClickBackground")
        Enabler.exit("HTML5_Background_Clickthrough", window.clickThrough)
        Enabler.requestFullscreenCollapse()
    }
}

const clickCTA = () => {
    Enabler.counter("McDonalds-HotSpot-ClickCTA")
    Enabler.exit("HTML5_CTA_Clickthrough", window.clickThrough)
    Enabler.requestFullscreenCollapse()
}

const clickClose = () => {
    Enabler.counter("McDonalds-HotSpot-ManuallyClosed")
    Enabler.reportManualClose()
    Enabler.requestFullscreenCollapse()
    Enabler.close()
}

const endGame = () => {
    Enabler.counter("McDonalds-HotSpot-GameEnded")
    clearInterval(gameTimer)
    clearTimeout(introTimer)
    setTimeout(() => {
        gsap.to(`#game`, 0.5, { pointerEvents: "none", opacity: 0 })
        gsap.to(`#endframe_scene`, 0.5, { pointerEvents: "all", opacity: 1 })
    }, 1500)
}




// HELPERS
const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // Maximum is exclusive and minimum is inclusive
}

const counters = () => {
    Enabler.counter("McDonalds-HotSpot-Open_Spot_1");
    Enabler.counter("McDonalds-HotSpot-Open_Spot_2");
    Enabler.counter("McDonalds-HotSpot-Open_Spot_3");
    Enabler.counter("McDonalds-HotSpot-Open_Spot_4");
    Enabler.counter("McDonalds-HotSpot-Open_Spot_5");
    Enabler.counter("McDonalds-HotSpot-Open_Spot_6");
}