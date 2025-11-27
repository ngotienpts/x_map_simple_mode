document.addEventListener('DOMContentLoaded', function() {
    const lanes = document.querySelectorAll('.js__lane');
    const maxSkew = 20;
    const numLanes = lanes.length;

    lanes.forEach((lane, index) => {
        const normalizedIndex = (index / (numLanes - 1)) * 2 - 1;
        const skewValue = normalizedIndex * maxSkew;
        lane.style.transform = `skewX(${skewValue}deg)`;

        if (numLanes === 3 && index === 1) {
            lane.style.background = '#EEB669';
            const carModel = document.querySelector('.js__carModel')
            carModel.style.left = '56%';
            carModel.style.transform = 'unset';
        }
    });
});