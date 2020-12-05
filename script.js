(function() {
    // Selects elements from CSS
    const box = document.querySelector('.box');
    const spin = document.querySelector('.spin');
    const marker = document.querySelector('.marker');

    // Defines variables
    let initialDegree = 0;
    let slice = -1;
    let currentSelectedIndex = 0;
    let rotationIncrement = 0;
    let winningPossibilities = [...Array(document.querySelectorAll('.person').length).keys()];

    // Defines constants
    const numberOfTeamMembers = 8;
    const personArray = new Array(numberOfTeamMembers);

    // Adds Wheel ratatata Sound
    let snd = new Audio('./assets/sound.m4a');


    // Initiates the wheel by adding each on the correct position
    for (let i = 0; i < numberOfTeamMembers; i++) {
        personArray[i] = document.querySelector(`.person${i}`);
        personArray[i].style.transform = `rotate(${initialDegree+=45}deg)`;
    }

    // Gets week day
    function getWeekDay() {
        let day = new Date();
        const dailyMessage = [
            'Come back tomorrow 10am!',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Happy Friday!',
            "It's the weekend, what are you doing here?",
        ];

        let weekday = dailyMessage[day.getDay()];
        document.getElementById('weekday').innerHTML = weekday;
    }

    getWeekDay();

    // Lands on a person
    function hasFallenIntoThatRange() {
        if (!winningPossibilities.length) {
            alert("Everyone has been selected");
            return;
        }
        currentSelectedIndex = Math.floor(Math.random() * winningPossibilities.length);
        slice = winningPossibilities.splice(currentSelectedIndex, 1);
        return slice * 45;
    }

    // Makes the selected sticker visible
    function addsSticker() {
        const url = './assets/images/sticker.png';
        const image = new Image();

        image.src = url;
        image.className = 'selected';

        let person = personArray[slice];
        person.appendChild(image);
    }

    // On click on the spin button
    spin.addEventListener('click', () => {
        // Disables button during spin
        spin.style.pointerEvents = 'none';
        // Adds animations
        marker.classList.add('animate');
        box.classList.add('animateBox');

        let currentPerson = hasFallenIntoThatRange();
        rotationIncrement += 720;
        //Rotates the wheel
        box.style.transform = `rotate(${(165-currentPerson+rotationIncrement)}deg)`;
        //Plays the ratatata sound
        snd.play();
        // Adds the sticker after the below added seconds
        setTimeout(() => { addsSticker(currentPerson); }, 3000);
    });

    // When the transition ends
    box.addEventListener('transitionend', () => {
        // Enables button when spin is over
        spin.style.pointerEvents = 'auto';
    });
})();