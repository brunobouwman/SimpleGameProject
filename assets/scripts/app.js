const ATTACK_VALUE = 11;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK = 15;
const HEAL_VALUE = 15;
const MODE_ATTACK = 1;
const MODE_STRONG_ATTACK = 2;
const LOG_RESET = 'Game reseted';
const LOG_ATTACK = 'Attacked';
const LOG_STRONG_ATTACK = 'Used strong attack';
const LOG_HEAL = 'Healed';
const LOG_BONUS_LIFE = 'Bonus life used';
const LOG_WON = 'Won game';
const LOG_LOST = 'Lost game';
const LOG_DRAW = 'Drawed';

let i = 0;
let battleLog = [];
let hasBonusLife = true;
let enteredValue = prompt('Choose the Maximum life:', '100');
let chosenMaxLife = parseInt(enteredValue);
let logValue;
let lastLoggedEntry;
// let chosenMaxLife = 100;

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
   while (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {  
    alert('Input must be a number and greater than 0!');
    enteredValue = prompt('Choose the Maximum life:', '100');
    chosenMaxLife = parseInt(enteredValue);
}} 

// try {
  // chosenMaxLife = getMaxLifeValues();
// } catch(error) {
  // console.log(error);
    // chosenMaxLife = 100;
    // alert('You've entered something wrong and the default value was used!');
    // throw error;
// }

// getMaxLifesValues();
// function getMaxLifesValues () {
  // const enteredValue = prompt ('Choose maximum life:', '100');
  // const parsedValue = parseInt (enteredValue);
  // if (isNaN(parsedValue) || parsedValue <= 0) {
    // throw { message: 'Invalid number input NaN' };
  // }
  // return parsedValue;
// }
// 
adjustHealthBars(chosenMaxLife);
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

function writeToLog (ev, i, playerAttVal, monsterAttVal, finalPlayerHealth, finalMonsterHealth) {
    let logEntry;
    battleLog[i] = logEntry = {
      event: ev,
      playerAttackValue: playerAttVal,
      monsterAttackValue: monsterAttVal,
      finalPlayerHealth: currentPlayerHealth,
      finalMonsterHealth: currentMonsterHealth
    };
    }
      

function reset() {
  i++;
  writeToLog (LOG_RESET, i, 0, 0, currentPlayerHealth, currentMonsterHealth);
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound () {
      const initialPlayerHealth = currentPlayerHealth;
      const monsterDamage = dealPlayerDamage(MONSTER_ATTACK);
      currentPlayerHealth -= monsterDamage;
      monsterAttVal = monsterDamage;
      i++;
      writeToLog(logType, i, playerAttVal, monsterAttVal, currentPlayerHealth, currentMonsterHealth);
      if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        i++;
        writeToLog(LOG_BONUS_LIFE, i, 0, currentPlayerHealth, currentMonsterHealth);
        alert('You have used your last life!');
        setPlayerHealth(initialPlayerHealth);
        currentPlayerHealth = initialPlayerHealth;
      }
       if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You've won the game");
        i++;
        writeToLog(LOG_WON, i, 0, currentPlayerHealth, currentMonsterHealth);
        reset();
      } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You've lost the game!");
        i++;
        writeToLog(LOG_LOST, i, 0, currentPlayerHealth, currentMonsterHealth);
        reset();
      } else if ((currentMonsterHealth && currentPlayerHealth) <= 0) {
        alert("It's a draw!");
        i++;
        writeToLog(LOG_DRAW, i, 0, currentPlayerHealth, currentMonsterHealth);
        reset();
      }
}

function attackMonster(mode) {
  // const logType = mode === MODE_ATTACK? LOG_ATTACK : LOG_STRONG_ATTACK;
  // const maxDamage = mode === MODE_ATTACK? ATTACK_VALUE: STRONG_ATTACK_VALUE;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logType = LOG_ATTACK;
  } else {
    maxDamage = STRONG_ATTACK_VALUE;
    logType = LOG_STRONG_ATTACK
  }
  const playerDamage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= playerDamage;
  playerAttVal = playerDamage;
  endRound();
}

function attack() {
  attackMonster(MODE_ATTACK);
}

function strongAttack() {
  attackMonster(MODE_STRONG_ATTACK);
}

function heal() {
  let healValue;
  if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("Can't increase life more than start value!");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  logType = LOG_HEAL;
  logValue = healValue;
  playerAttVal = 0;
  endRound();
}

let j = 0;
function printLogHandler () {
  // for (let j = 0; j < battleLog.length; j++) {
  //     console.log(battleLog[j]);
  // }
  for (const logEntry of battleLog) {
    console.log(`#${j}`);
    j++;
    for (const key in logEntry) {
      console.log(`${key} => ${logEntry[key]}`);
    }
    console.log(logEntry);
  }
}

attackBtn.addEventListener('click', attack);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', heal);
logBtn.addEventListener('click', printLogHandler);
