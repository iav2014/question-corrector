const detector = require('../src/detector');

console.log(detector('invented 1','this is the best match'));
console.log(detector('invented 2','any response of this test'));

console.log(detector('capital de hungria','budapest'));
console.log(detector('cuantos huesos hay en el cuerpo','creo que tiene 206'));
console.log(detector('en el mesencefalo se hubica','coliculos'));
console.log(detector('que es la IA (1)','Es la inteligencia que simula el conocimiento humano'))
console.log(detector('que es la IA (2)','maquina que imita el proceso cognitivo humano'));
console.log(detector('que es la IA (3)','no tengo ni idea de que es eso'));
