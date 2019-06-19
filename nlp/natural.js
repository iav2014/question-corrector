const natural = require('natural');
const classifier = new natural.BayesClassifier();


// Train capital de humgria
classifier.addDocument('budapest', 'capital de hungria');
classifier.addDocument( 'Es budapest', 'capital de hungria');
classifier.addDocument('creo que es budapest', 'capital de hungria');
classifier.addDocument( 'diria que es budapest', 'capital de hungria');
classifier.addDocument( 'va a ser budapest', 'capital de hungria');
classifier.addDocument( 'La inteligencia artificial (IA), es la inteligencia llevada a cabo por máquinas.', 'que es la inteligencia artificial');
// train inteligencia artificial
classifier.addDocument( 'En ciencias de la computación, una máquina «inteligente» ideal es un agente flexible que percibe su entorno', 'que es la inteligencia artificial');
classifier.addDocument( 'Coloquialmente, el término inteligencia artificial se aplica cuando una máquina imita las funciones\n' +
	'cognitivas que los humanos asocian con otras mentes humanas, como por ejemplo: percibir, razonar, aprender y\n' +
	'resolver problemas', 'que es la inteligencia artificial');
classifier.addDocument( 'la capacidad de un sistema para interpretar\n' +
	'correctamente datos externos, para aprender de dichos datos y emplear esos conocimientos para lograr tareas y metas\n' +
	'concretas a través de la adaptación flexible', 'que es la inteligencia artificial');


// if several questions have same response:
// 5+5
classifier.addDocument( '10', '5+5');
classifier.addDocument( '10', '5+5');
classifier.addDocument( '10', '5+5');
classifier.addDocument( 'diez', '5+5');
classifier.addDocument( 'es diez', '5+5');
classifier.addDocument( 'parece que es diez', '5+5');
classifier.addDocument( 'creo que es diez', '5+5');

// or 9+1
classifier.addDocument( '9+1=10', '9+1');
classifier.addDocument( '10', '9+1');
classifier.addDocument( 'diez', '9+1');
classifier.addDocument( 'es diez', '9+1');
classifier.addDocument( 'parece que es diez', '9+1');
classifier.addDocument( 'creo que es diez', '9+1');
classifier.addDocument( 'diezmil', '9+1');




classifier.train();


console.log(classifier.classify('simular el comportamiento'));
console.log(classifier.classify('parece que es diez'));