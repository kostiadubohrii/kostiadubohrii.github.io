function timer(id, deadline){

    function getTImeRemaining(endtime){
        let days, hours, mins, secs;
        const t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0 ){
            days = 0;
            hours = 0;
            mins = 0; 
            secs = 0;
        }else{
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            mins = Math.floor((t / 1000 / 60) % 60),
            secs = Math.floor((t / 1000) % 60);
        }


        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'mins': mins,
            'secs': secs
        };
    }
    function getZero(num){
        if ( num >=0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              mins = timer.querySelector('#minutes'),
              secs = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
              
              updateClock();

        function updateClock(){
            const t = getTImeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            mins.innerHTML = getZero(t.mins);
            secs.innerHTML = getZero(t.secs);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

export default timer;