console.clear();
import * as chalk from "chalk";
configure_stdin();

const titleHeight = 3;
console.log(chalk.hex("FF00FF")("      ------------------"));
console.log(chalk.hex("FF00FF")("    = Choose your weapon ="));
console.log(chalk.hex("FF00FF")("      ------------------"));

const menuItems = [
    "Knightly sword",
    "War Hammer",
    "Dagger",
    "Longbow",
    "Pike",
    "Crossbows",
    "Longsword",
    "Spear",
    "Battle axe",
];

for (let i = 0; i < menuItems.length; i++) {
    drawMenuItem(i, false);
}

let index = 0;
let prevIndex = 0;

drawMenuItem(index, true);
runMenuLoop();

//////////////////////////////
//////////////////////////////
//////////////////////////////

function configure_stdin() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
}

function drawMenuItem(index, isSelected) {
    process.stdout.cursorTo(0, titleHeight + index);
    process.stdout.clearLine(0);
    const menuItem = `      ${menuItems[index]}`;
    console.log(chalk.hex(isSelected ? "#FF69B4" : "0000FF")(menuItem));
    process.stdout.cursorTo(0, titleHeight + index);
}

function runMenuLoop() {
    process.stdin.on("data", function (key) {

        if (key.toString() === "\u0003") {
            displayMessage("FFFF00", "goodbye");
            process.exit();
            return;
        }

        if (key.toString() === "\u000d") {
            displayMessage("00FF00", `You chose "${menuItems[index]}"`);
            process.exit();
            return;
        }

        if (key.toString() === "\u001b[A") {
            prevIndex = index;
            if (--index < 0) {
                index = menuItems.length - 1;
            }
        }

        else if (key.toString() === "\u001b[B") {
            prevIndex = index;
            if (++index >= menuItems.length) {
                index = 0;
            }
        }

        else {
            return;
        }

        drawMenuItem(prevIndex, false);
        drawMenuItem(index, true);
    });
}


function displayMessage(hex, message) {
    process.stdout.cursorTo(0, titleHeight + menuItems.length + 1);
    console.log(chalk.hex(hex)(message));
}
