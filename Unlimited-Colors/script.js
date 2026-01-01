const start = document.getElementById('start');
const stop = document.getElementById('stop');

let intervalId;
const randomColor = function (){
    const hex = '0123456789ABCDEF';
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * 16)]; 
    }
    return color;
};


const startChangingColor = function(){
    if(!intervalId){
        intervalId = setInterval(changeBgColor ,1000);
    }
    
    function changeBgColor(){
    document.body.style.backgroundColor = randomColor();
    };
    console.log(intervalId);
};

const stopChangingColor = function (){
    clearInterval(intervalId);
    intervalId = null;
}


start.addEventListener('click', startChangingColor);
stop.addEventListener('click', stopChangingColor);