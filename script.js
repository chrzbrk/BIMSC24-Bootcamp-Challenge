
// --------------- EYE POSITION ------------------------------
function positionEyes() {
    const pic = document.getElementById('picture_cow');
    const picWidth = pic.offsetWidth;
    const picHeight = pic.offsetHeight;

    const eye1X = 0.19;
    const eye1Y = 0.16; 
    const eye2X = 0.095;
    const eye2Y = 0.16;

    const eye1 = document.getElementById('eye1');
    const eye2 = document.getElementById('eye2');
    eye1.style.left = (picWidth * eye1X) + 'px';
    eye1.style.top = (picHeight * eye1Y) + 'px';
    eye2.style.left = (picWidth * eye2X) + 'px';
    eye2.style.top = (picHeight * eye2Y) + 'px';
}

// EventListener Eyeposition by resizing
window.addEventListener('resize', positionEyes);

// Position Eyes first time loading the page
positionEyes();


// --------------- PUPILS ------------------------------

function movepupils(x, y) {
    const eyes = document.querySelectorAll('.eye');

    eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 1;
        const eyeY = rect.top + rect.height / 1;
        const deltaX = x - eyeX;
        const deltaY = y - eyeY;
        const degree= Math.atan2(deltaY, deltaX);
        const maxDistance = rect.width / 4; // Maximaler Versatz der Pupille
        const distance = Math.min(maxDistance, Math.hypot(deltaX, deltaY));

        const pupil = eye.querySelector('.pupil');
        pupil.style.transform = `translate(${distance * Math.cos(degree)}px, ${distance * Math.sin(degree)}px)`;
    });
}

document.addEventListener('mousemove', function(event) {movepupils(event.clientX, event.clientY);});

// --------------- SPEECH BUBBLE ------------------------------

function positionSpeechBubble() {
    const pic = document.getElementById('picture_cow');
    const speechBubble = document.getElementById('speech_bubble');

    if (pic && speechBubble) {
        const rect = pic.getBoundingClientRect();
        
        const bubbleX = rect.width * 0.17; // Z.B. 50% der Bildbreite
        const bubbleY = rect.height * 0.37; // Z.B. 30% der Bildhöhe

        speechBubble.style.left = bubbleX + 'px';
        speechBubble.style.top = bubbleY + 'px';
    }
}

// Event-Listener für das Laden der Seite und Änderungen der Fenstergröße
window.addEventListener('load', positionSpeechBubble);
window.addEventListener('resize', positionSpeechBubble);



document.getElementById('button_speech').addEventListener('click', function() {
    var text = document.getElementById('input_speech').value;
    var speechBubble = document.getElementById('speech_bubble');
    var newParagraph = document.createElement('p');
    newParagraph.textContent = text;
    speechBubble.appendChild(newParagraph);
    speechBubble.style.display = 'block'; // Sprechblase anzeigen
});

document.getElementById('button_reset').addEventListener('click', function() {
    var speechBubble = document.getElementById('speech_bubble');
    speechBubble.innerHTML = ''; // Entfernt alle Paragraphen
    speechBubble.style.display = 'none'; // Versteckt die Sprechblase
});