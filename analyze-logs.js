#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Проверка аргументов командной строки
if (process.argv.length < 3) {
  console.log('Использование: node analyze-logs.js <путь к лог-файлу>');
  process.exit(1);
}

const logFilePath = process.argv[2];

// Функция для анализа логов
const analyzeLogs = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      process.exit(1);
    }

    const lines = data.trim().split('\n');
    const totalGames = lines.length;
    const wins = lines.filter(line => line.includes('Угадал')).length;
    const losses = totalGames - wins;
    const winPercentage = ((wins / totalGames) * 100).toFixed(2);

    console.log(`Общее количество партий: ${totalGames}`);
    console.log(`Количество выигранных партий: ${wins}`);
    console.log(`Количество проигранных партий: ${losses}`);
    console.log(`Процентное соотношение выигранных партий: ${winPercentage}%`);
  });
};

analyzeLogs(logFilePath);
