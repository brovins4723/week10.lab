import GenSynthNote from "./GenSynthNote.js"; // imports a custom class that generates and manages a single synthesizer "note"

// -------------------- Global Timing & Envelope Settings --------------------
let loopTime = 250.;                          // length of one loop in milliseconds
let delayTimeNum = loopTime / 1000. * 2.;     // convert ms to seconds, set delay time to 2× the loop length
let attack = 0.01;                            // envelope attack time (s) — how quickly the sound reaches peak
let decay = 0.1;                              // envelope decay time (s) — how quickly it falls to sustain level
let sustain = 0.25;                           // sustain amplitude (0..1) — the steady level after decay
let release = 0.9;
let interval = 12

// -------------------- Audio Graph Setup --------------------
const styleCtx = new AudioContext();      // creates the main Web Audio context — everything lives inside here
const vol = new GainNode(styleCtx);       // master gain node that controls overall output volume (post-effects)
// vol.gain.value = 0.5;                      // (optional) set a default master volume




const delay = new DelayNode(styleCtx);
delay.delayTime.value = delayTimeNum

const delFb = new GainNode(styleCtx, {gain:0.75})
delay.connect(delFb).connect(delay);
delay.connect(vol)



vol.connect(styleCtx.destination);        // finally send the master gain node to the speakers (audio output)

// -------------------- Note Pool --------------------
let midiNotes = [36, 48, 55, 58, 60, 62, 63, 65, 67, 69, 70, 72, 75, 79, 82];
// collection of MIDI pitches (integers) — will be randomly selected to create variety

// -------------------- Playback Function --------------------
const playANote = function () {
    // choose a random pitch from the list
    let midiPitch = midiNotes[Math.floor(Math.random() * midiNotes.length)];

    // create a new note instance from the GenSynthNote class
    // arguments: audio context, destination node, pitch, ADSR envelope parameters
    let note1 = new GenSynthNote(
        styleCtx,
        delay,                                  // <-- this must exist once you create it in the TODO section
        midiPitch,
        attack, decay, sustain, release
    );
    let note2 = new GenSynthNote(
        styleCtx,
        delay,                                  // <-- this must exist once you create it in the TODO section
        midiPitch + interval,
        attack, decay, sustain/2., release
    );

    // start the note immediately
    note1.start();
    // schedule its stop after one loop cycle
    setTimeout(() => note2.start(), loopTime/2);

    // schedule its stop after one loop cycle
    setTimeout(() => note1.stop(), loopTime);
    // schedule its stop after one loop cycle
    setTimeout(() => note2.stop(), loopTime*1.5);
};

// -------------------- Looping Engine --------------------
let looper = null;

document.querySelector("#start").addEventListener("click", () => {
    styleCtx.resume();                      // Web Audio contexts must be resumed by a user gesture
    if (looper) clearInterval(looper);          // clear any existing loop before starting a new one
    looper = setInterval(playANote, loopTime);  // repeatedly trigger playANote every loopTime ms
});

document.querySelector("#stop").addEventListener("click", () => {
    clearInterval(looper);                      // stop the loop
    looper = null;
});

// -------------------- UI Controls for Envelope --------------------
// Each slider updates both the onscreen label and the corresponding variable

document.querySelector("#attTime").addEventListener("input", (e) => {
    document.querySelector("#attLabel").textContent = `${Number(e.target.value * 1000)} ms`;
    attack = Number(e.target.value);
});

document.querySelector("#decTime").addEventListener("input", (e) => {
    document.querySelector("#decLabel").textContent = `${Number(e.target.value * 1000)} ms`;
    decay = Number(e.target.value);
});

document.querySelector("#susAmp").addEventListener("input", (e) => {
    document.querySelector("#susLabel").textContent = `${Number(e.target.value)}`;
    sustain = Number(e.target.value);
});

document.querySelector("#relTime").addEventListener("input", (e) => {
    document.querySelector("#relLabel").textContent = `${Number(e.target.value * 1000)} ms`;
    release = Number(e.target.value);
});

// -------------------- UI Control for Feedback Gain --------------------
document.querySelector("#fb").addEventListener("input", (e) => {
    document.querySelector("#fbLabel").textContent = `${Number(Math.round(e.target.value * 100))}%`;
    delFb.gain.linearRampToValueAtTime(        // smoothly adjust feedback gain
        Number(e.target.value),
        styleCtx.currentTime + 0.01
    );
});


// -------------------- UI Control for Interval control --------------------
document.querySelector("#int").addEventListener("input", (e) => {
    document.querySelector("#intLabel").textContent = `${Number(e.target.value)} semitones`;
    interval = Number(e.target.value)
});
