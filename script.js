(function() {
    // Grabs elements from CSS
    const box = document.querySelector('.box');
    const spin = document.querySelector('.spin');
    const marker = document.querySelector('.marker');
    const person = document.querySelector('.person');
    const selected = document.querySelector('.selected');

    // Defines variables
    let deg = 0;
    let teamMembers = 8;
    let currentWinningNumber = 0;
    let segment = new Array(teamMembers);
    let winningOrder = [40, 80, 125, 170, 215, 260, 305, 340];

    // Adds Sound
    let snd = new Audio('./assets/sound.m4a');

    // Gets week day
    (function getWeekDay() {
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
    })();

    // Names the segment
    (function nameEachSegment() {
        let dict = {
            40: 'Stefano',
            80: 'Jeanie',
            125: 'Niro',
            170: 'Kunmi',
            215: 'Finchy',
            260: 'Amanda',
            305: 'Alex',
            340: 'Davi',
        };

        for (let key in dict) {
            segment[key] = dict[key];
        }
    })();

    // Lands on a person
    function hasFallenIntoThatRange() {
        currentWinningNumber = Math.floor(Math.random() * winningOrder.length);
        landedNumber = winningOrder[currentWinningNumber];
        console.log(
            winningOrder,
            currentWinningNumber,
            winningOrder[currentWinningNumber],
            segment[winningOrder[currentWinningNumber]]
        );
        winningOrder.splice(currentWinningNumber, 1);
        return landedNumber;
    }

    // Checks if everyone has been selected
    function hasEveryOneBeenSelected() {
        if (winningOrder === undefined || winningOrder.length === 0) {
            alert("Everyone's been selected!");
            document.getElementById('spin').disabled = true;
            return;
        }
    }

    // Function to make the selected sticker visible
    function showSelected() {
        if (selected.style.display === 'none') {
            selected.style.display = 'block';
        }
    }

    // Adds the selected sticker on the person's segment
    person.addEventListener('click', () => {
        showSelected();
    });

    // On click on spin
    spin.addEventListener('click', () => {
        hasEveryOneBeenSelected();
        spin.getElementsByClassName.pointerEvents = 'none';
        marker.classList.add('animate');
        deg = hasFallenIntoThatRange();
        box.classList.add('animateBox');
        box.style.transform = `rotate(${deg}deg)`;

        if (deg > 0) snd.play();
    });

    spin.addEventListener('transitionend', () => {
        spin.style.pointerEvents = 'auto';
        box.style.transition = 'none';
        const actualDeg = deg % 360;
        box.style.transform = `rotate(${actualDeg+360}deg)`;
    });
})();