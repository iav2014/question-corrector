/*
Using NLP classifier
intent: question
utterance: correct response
locale: question
cases: same response for different question && free text responses
(c) Nacho Ariza, jun 2019
**/


const { NlpManager } = require('node-nlp');
let l=[];
for(let i=0;i<1000;i++){
	l.push(i.toString())
}

console.log('training...',new Date());
const classifier = new NlpManager({ languages: ['capital de hungria','9+1','5+5','IA'] });
// Gives a name for the fantasy language
classifier.describeLanguage('capital de hungria','5+5','9+1','IA');
// Train capital de humgria
classifier.addDocument('capital de hungria', 'budapest', 'capital de hungria');
classifier.addDocument('capital de hungria', 'Es budapest', 'capital de hungria');
classifier.addDocument('capital de hungria', 'creo que es budapest', 'capital de hungria');
classifier.addDocument('capital de hungria', 'diria que es budapest', 'capital de hungria');
classifier.addDocument('capital de hungria', 'va a ser budapest', 'capital de hungria');
classifier.addDocument('IA', 'La inteligencia artificial (IA), es la inteligencia llevada a cabo por máquinas.', 'IA');
// train inteligencia artificial
classifier.addDocument('IA', 'En ciencias de la computación, una máquina «inteligente» ideal es un agente flexible que percibe su entorno', 'IA');
classifier.addDocument('IA', 'Coloquialmente, el término inteligencia artificial se aplica cuando una máquina imita las funciones\n' +
	'cognitivas que los humanos asocian con otras mentes humanas, como por ejemplo: percibir, razonar, aprender y\n' +
	'resolver problemas', 'IA');
classifier.addDocument('IA', 'la capacidad de un sistema para interpretar\n' +
	'correctamente datos externos, para aprender de dichos datos y emplear esos conocimientos para lograr tareas y metas\n' +
	'concretas a través de la adaptación flexible', 'IA');


// if several questions have same response:
// 5+5
classifier.addDocument('5+5', '10', '5+5');
classifier.addDocument('5+5', '10', '5+5');
classifier.addDocument('5+5', '10', '5+5');
classifier.addDocument('5+5', 'diez', '5+5');
classifier.addDocument('5+5', 'es diez', '5+5');
classifier.addDocument('5+5', 'parece que es diez', '5+5');
classifier.addDocument('5+5', 'creo que es diez', '5+5');

// or 9+1
classifier.addDocument('9+1', '9+1=10', '9+1');
classifier.addDocument('9+1', '10', '9+1');
classifier.addDocument('9+1', 'diez', '9+1');
classifier.addDocument('9+1', 'es diez', '9+1');
classifier.addDocument('9+1', 'parece que es diez', '9+1');
classifier.addDocument('9+1', 'creo que es diez', '9+1');
classifier.addDocument('9+1', 'diezmil', '9+1');

classifier.train(); // train out model
classifier.save(); // save()
console.log('trained !',new Date());

// test
console.log('testing');
classifier.process('capital de hungria', 'budapest').then(console.log); // ok

classifier.process('capital de hungria', 'pues ni idea').then(console.log); //intent null ok



classifier.process('5+5', 'creo 10').then(console.log); // intent 5+5 ok
classifier.process('5+5', 'diez').then(console.log); // intent 5+5 ok
classifier.process('5+5', '7').then(console.log); // intent None ok

classifier.process('IA', 'simula el esquema de razonamiento humano').then(console.log); // intent IA ok
classifier.process('IA', 'maquinas que piensan').then(console.log); // correct response ,intent IA ok
classifier.process('IA', 'no he estudiado nada').then(console.log); // intent None incorrect response for IA -  ok