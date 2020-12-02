(function() {
    // Selects elements from CSS
    const box = document.querySelector('.box');
    const spin = document.querySelector('.spin');
    const marker = document.querySelector('.marker');

    // Defines variables
    let initialDegree = 0;
    let slice = 0;
    let currentSelectedIndex = 0;
    let winningPossibilities = [0, 1, 2, 3, 4, 5, 6, 7];
    const numberOfTeamMembers = 8;
    const personArray = new Array(numberOfTeamMembers);

    // Adds Sound
    let snd = new Audio('./assets/sound.m4a');

    // Initiates the wheel adding each person on the wheel
    for (let i = 0; i < numberOfTeamMembers; i++) {
        personArray[i] = document.querySelector(`#box > span.person.person${i}`);
        personArray[i].style.transform = `rotate(${initialDegree+=45}deg)`
            // rotates.setProperty('--number', initialDegree += 45)
            // personArray[i].classList.add('rotates');
    }

    // Gets week day
    function getWeekDay() {
        let d = new Date();
        let weekday = new Array(7);
        weekday = [
            'Come back tomorrow 10am!',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Happy Friday!',
            "It's the weekend, what are you doing here?",
        ];

        let n = weekday[d.getDay()];
        document.getElementById('weekday').innerHTML = n;
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
        person = personArray[slice];
        person.appendChild(image);
    }

    // On click on the spin button
    spin.addEventListener('click', () => {
        let currentPerson = hasFallenIntoThatRange();
        spin.getElementsByClassName.pointerEvents = 'none';
        box.style.transform = `rotate(${(180-currentPerson)}deg)`
        marker.classList.add('animate');
        box.classList.add('animateBox');
        setTimeout(() => { addsSticker(currentPerson); }, 1500);

    });

    // When the transition ends
    spin.addEventListener('transitionend', () => {
        box.classList.remove('animateBox');
        spin.classList.add('spinTransitionEnded');
        box.classList.add('boxTransitionEnded');
    });
})();