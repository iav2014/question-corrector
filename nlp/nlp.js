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

const classifier = new NlpManager({ languages: ['es','9+1','5+5'] });
// Gives a name for the fantasy language
classifier.describeLanguage('es','5+5','9+1');
// Train capital de humgria
classifier.addDocument('es', 'budapest', 'capital de hungria');
classifier.addDocument('es', 'Es budapest', 'capital de hungria');
classifier.addDocument('es', 'creo que es budapest', 'capital de hungria');
classifier.addDocument('es', 'diria que es budapest', 'capital de hungria');
classifier.addDocument('es', 'va a ser budapest', 'capital de hungria');
classifier.addDocument('es', 'La inteligencia artificial (IA), es la inteligencia llevada a cabo por máquinas.', 'que es la inteligencia artificial');
// train inteligencia artificial
classifier.addDocument('es', 'En ciencias de la computación, una máquina «inteligente» ideal es un agente flexible que percibe su entorno', 'que es la inteligencia artificial');
classifier.addDocument('es', 'Coloquialmente, el término inteligencia artificial se aplica cuando una máquina imita las funciones\n' +
	'cognitivas que los humanos asocian con otras mentes humanas, como por ejemplo: percibir, razonar, aprender y\n' +
	'resolver problemas', 'que es la inteligencia artificial');
classifier.addDocument('es', 'la capacidad de un sistema para interpretar\n' +
	'correctamente datos externos, para aprender de dichos datos y emplear esos conocimientos para lograr tareas y metas\n' +
	'concretas a través de la adaptación flexible', 'que es la inteligencia artificial');


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




classifier.process('es', 'budapest').then(console.log); // ok

classifier.process('es', 'pues ni idea').then(console.log); //intent null ok

classifier.process('es', 'once').then(console.log); // intent null ok
classifier.process('es', 'diez').then(console.log); // intent 9+1 ok
classifier.process('es', 'no lo se').then(console.log); // intent null ok

classifier.process('5+5', 'creo 10').then(console.log); // intent 5+5 ok
classifier.process('5+5', 'diez').then(console.log); // intent 5+5 ok
classifier.process('5+5', '7').then(console.log); // intent None ok