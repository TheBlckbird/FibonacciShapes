const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

draw = new Draw(ctx, canvas);

function patternFound(arr) {
    var newArray = arr
        .map(function (o, i) {
            if (i < arr.length - 1) {
                return arr[i] + "|" + arr[i + 1];
            }
        })
        .sort();

    newArray = newArray.filter(function (o, i) {
        if (i < arr.length - 1) {
            return o == newArray[i + 1];
        }
    });

    return newArray.length > 0;
}

let mainLoopId = 0;

function startDrawing() {
    const moduloValue = document.getElementById("moduloValue").value;
    const ignoreZeros = document.getElementById("ignoreZeros").checked;
    console.log(ignoreZeros);
    stopDrawing();
    draw.reset();
    let i = 0;
    let number1 = 0;
    let number2 = 1;

    let numbers = [];

    mainLoopId =  setInterval(() => {
        const calculatedNumber = number1 % moduloValue;
        draw.tick(calculatedNumber, ignoreZeros);
        numbers.push(calculatedNumber);
        nextTerm = number1 + number2;
        number1 = number2;
        number2 = nextTerm;

        if (number2 >= Number.MAX_SAFE_INTEGER) {
            stopDrawing();
        }

        i++;
    }, 100);

    // console.log(interval);

    // for (let i = 1; i !== -1; i++) {
    //     setTimeout(() => {
    //         this.tick(number);
    //     }, i * 100);
    // }
}

function stopDrawing() {
    clearInterval(mainLoopId);
}

document.getElementById("startDrawing").addEventListener("click", (e) => startDrawing());
document.getElementById("stopDrawing").addEventListener("click", (e) => stopDrawing());

// const fibonacciNumbers = fibonacci(0, 1);

// let sequence = [];

// fibonacciNumbers.forEach(number => {
//     sequence.push(number % 5);
// });
