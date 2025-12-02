document.addEventListener('DOMContentLoaded', function() {

    const SPEEDS = [
        'maximum-speed-limit-30','maximum-speed-limit-40','maximum-speed-limit-50',
        'maximum-speed-limit-60','maximum-speed-limit-70','maximum-speed-limit-80',
        'maximum-speed-limit-90','maximum-speed-limit-100','maximum-speed-limit-120'
    ];
    let currentIndexSpeed = 0;

    const CODES = [
        'traffic','speed','crash','cow','flooded','bumps','end-of-prohibition','no-stopping',
        'no-parking','no-turn-left','no-turn-right','no-turn-left-no-u-turn','no-u-turn',
        'no-cars','end-of-no-overtaking','no-overtaking--g5','no-overtaking',
        'end-of-maximum-speed-limit-50','end-of-maximum-speed-limit-60',
        'end-of-maximum-speed-limit-70','end-of-maximum-speed-limit-80',
        'end-of-maximum-speed-limit-90','end-of-maximum-speed-limit-100',
        'information--end-of-built-up-area','information-built-up-area','signs-all-1'
    ];
    let currentIndexSignposts = 0;

    const DIRECTS = ['normal','go-straight','turn-left','turn-right'];
    let currentIndexDirects = 0;

    const DISTANCES = ['normal','fast','stop','turn-left','turn-right'];
    let currentIndexDistances = 0;

    // --- 2. Hàm setLane (Được giữ nguyên vì đã tối ưu ở lần trước) ---
    function setLane(desiredLaneCount) {
        const lanesContainer = document.querySelector('.js__lanes');
        if (!lanesContainer) return;

        let numLanesFromInput;
        if (desiredLaneCount !== 2 && desiredLaneCount !== 3) {
            numLanesFromInput = 3; 
        } else {
            numLanesFromInput = desiredLaneCount;
        }
        
        lanesContainer.dataset.lanes = numLanesFromInput;

        const numLanes = numLanesFromInput + 1; 
        const maxSkew = 30;

        lanesContainer.innerHTML = '';

        for (let i = 0; i < numLanes; i++) {
            const lane = document.createElement('div');
            lane.classList.add('lane', 'js__lane');
            lanesContainer.appendChild(lane);
        }

        const newLanes = document.querySelectorAll('.js__lane');

        newLanes.forEach((lane, index) => {
            const divisor = (numLanes - 1) === 0 ? 1 : (numLanes - 1);
            const normalizedIndex = (index / divisor) * 2 - 1; 
            const skewValue = normalizedIndex * maxSkew;

            lane.style.transform = `skewX(${skewValue}deg) rotateX(80deg) scaleY(2)`;

            if (numLanes === 3 && index === 1) { 
                lane.style.background = '#EEB669';
            }
        });
    }

    setLane(2); 
    
    function setMaxSpeed() {
        const speedLimit = document.querySelector('.js__speedLimit');
        if (!speedLimit) return; 

        const newSpeedLimit = SPEEDS[currentIndexSpeed];
        speedLimit.setAttribute('data-speed-limit', newSpeedLimit);
        
        currentIndexSpeed = (currentIndexSpeed + 1) % SPEEDS.length; 
    }

    function setLaneDirect() {
        const signposts = document.querySelector('.js__signposts');
        if (!signposts) return;

        const newSignposts = DIRECTS[currentIndexDirects];
        signposts.setAttribute('data-signposts', newSignposts);
        
        currentIndexDirects = (currentIndexDirects + 1) % DIRECTS.length; 
    }
    
    function setSign() {
        const trafficWarningSigns = document.querySelector('.js__trafficWarningSigns');
        if (!trafficWarningSigns) return;

        const newTrafficWarningSigns = CODES[currentIndexSignposts]; 
        trafficWarningSigns.setAttribute('data-traffic-warning-signs', newTrafficWarningSigns);
        
        currentIndexSignposts = (currentIndexSignposts + 1) % CODES.length; 
    }
    
    function updateRemaining() {
        const carModel = document.querySelector('.js__carModel');
        if (!carModel) return;
        const newCarModel = DISTANCES[currentIndexDistances];
        carModel.setAttribute('data-car', newCarModel);
        
   
        currentIndexDistances = (currentIndexDistances + 1) % DISTANCES.length;
    }

    

    setInterval(setMaxSpeed, 5000); 
  
    setInterval(setLaneDirect, 5000); 
 
    setInterval(setSign, 5000); 

    setInterval(updateRemaining, 2000); 

});