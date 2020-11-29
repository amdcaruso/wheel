(function() {
    // Grabs elements from CSS
    const box = document.querySelector('.box');
    const spin = document.querySelector('.spin');
    const marker = document.querySelector('.marker');

    // Defines variables
    let deg = 0;
    let currentSelectedIndex = 0;
    const numberOfTeamMembers = 8;
    let segment = new Array(numberOfTeamMembers);
    const personArray = new Array(numberOfTeamMembers);
    const segmentArray = [40, 80, 125, 170, 215, 260, 305, 340];
    let segmentArrayPerson = new Array(numberOfTeamMembers);


    // Adds Sound
    let snd = new Audio('./assets/sound.m4a');

    // Selected sticker per person
    for (let i = 0; i < numberOfTeamMembers; i++) {
        personArray[i] = document.querySelector(`#box > span.person.person${i}`);
    }

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

    // namesEachPerson
    (function nameEachPerson() {
        let dictPerson = {
            40: personArray[0],
            80: personArray[1],
            125: personArray[2],
            170: personArray[3],
            215: personArray[4],
            260: personArray[5],
            305: personArray[6],
            340: personArray[7]
        };

        for (let key in dictPerson) {
            segmentArrayPerson[key] = dictPerson[key];
        }
    })();

    // Lands on a person
    function hasFallenIntoThatRange() {
        currentSelectedIndex = Math.floor(Math.random() * segmentArray.length);
        landedNumber = segmentArray[currentSelectedIndex];
        console.log(
            segmentArray,
            currentSelectedIndex,
            segmentArray[currentSelectedIndex],
            segment[segmentArray[currentSelectedIndex]]
        );
        segmentArray.splice(currentSelectedIndex, 1);
        return landedNumber;
    }

    // Checks if everyone has been selected
    function hasEveryOneBeenSelected() {
        if (segmentArray === undefined || segmentArray.length === 0) {
            alert("Everyone's been selected!");
            document.getElementById('spin').disabled = true;
            return;
        }
    }

    // Makes the selected sticker visible
    function addsSticker(person) {
        const url = './assets/images/sticker.png';
        const image = new Image();
        image.src = url;
        image.className = 'selected';

        let toBeAppended = segmentArrayPerson[person];
        toBeAppended.appendChild(image);
    }

    // On click on the spin button
    spin.addEventListener('click', () => {
        hasEveryOneBeenSelected();
        spin.getElementsByClassName.pointerEvents = 'none';
        marker.classList.add('animate');
        deg = 180 - hasFallenIntoThatRange();
        box.classList.add('animateBox');
        box.style.transform = `rotate(${deg}deg)`;
        if (deg > 0) snd.play();
        addsSticker(landedNumber);
    });

    // When the transition ends
    spin.addEventListener('transitionend', () => {
        spin.style.pointerEvents = 'auto';
        box.style.transition = 'none';
        const actualDeg = deg % 360;
        box.style.transform = `rotate(${actualDeg+360}deg)`;
    });
})();