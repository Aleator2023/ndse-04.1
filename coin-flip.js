#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

if (process.argv.length < 3) {
  console.log('Использование: node coin-flip.js <лог-файл>');
  process.exit(1);
}

const logFile = process.argv[2];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const flipCoin = () => Math.floor(Math.random() * 2) + 1;

const logResult = (result) => {
  fs.appendFile(logFile, `${new Date().toISOString()} - ${result}\n`, (err) => {
    if (err) {
      console.error('Ошибка записи в файл:', err);
    }
  });
};

const playGame = () => {
  const coin = flipCoin();
  console.log('Игра началась! Угадайте: 1 (Орёл) или 2 (Решка)?');

  rl.question('Ваш выбор: ', (answer) => {
    const guess = parseInt(answer, 10);

    if (isNaN(guess) || (guess !== 1 && guess !== 2)) {
      console.log('Пожалуйста, введите 1 (Орёл) или 2 (Решка).');
      playGame();
      return;
    }

    if (guess === coin) {
      console.log('Правильно! Вы угадали.');
      logResult('Угадал');
    } else {
      console.log('Неправильно. Вы не угадали.');
      logResult('Не угадал');
    }

    rl.question('Хотите сыграть ещё раз? (да/нет): ', (response) => {
      if (response.toLowerCase() === 'да' || response.toLowerCase() === 'yes') {
        playGame();
      } else {
        console.log('Спасибо за игру!');
        rl.close();
      }
    });
  });
};

playGame();
