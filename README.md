Question corrector PoC

this project (PoC) has been based on the development made by chattylabs

The PoC consists of a system capable of automatically correcting open questions about the 8-year-old children's science level.
In this code the are 2 ways to do this (from too many,,,)
(see nlp/nlp.js)
```
{
	_class:class_id
  score: <-n>,
  country: 'SP'
}
```
project reference:
https://github.com/chattylabs/language-detector
code from:
"author": {
	"name": "Daniel Antelo",
	"url": "https://github.com/danielantelo"
}
## how it works
like original author says:

This is obtained with a combination of "reducing" and "matching". 
Given a piece of text we can reduce it to a set of potential languages by checking for common 
patterns (see src/utils/reducers.js), additionally we can match the n-grams of sed 
text to a set of pre-compiled language profiles generated through "learning" 
(processing known samples).
This is obtained with a combination of "reducing" and "matching".

In this case,  
In one question, we can reduce it to a set of potential words by checking for common correct patterns to find the best
response, bring a scores, than define how the "good or not good" is the response writing for the user.
 
## Usage
Example of question: (/data/questions) in spanish language:
file: /data/question/queeslainteligenciaartificial_SP.txt
La inteligencia artificial (IA), es la inteligencia llevada a cabo por máquinas.
En ciencias de la computación, una máquina «inteligente» ideal es un agente flexible que percibe su entorno
y lleva a cabo acciones que maximicen sus posibilidades de éxito en algún objetivo o tarea.1
Coloquialmente, el término inteligencia artificial se aplica cuando una máquina imita las funciones
cognitivas que los humanos asocian con otras mentes humanas, como por ejemplo: percibir, razonar, aprender y
resolver problemas».
Andreas Kaplan y Michael Haenlein definen la inteligencia artificial como la capacidad de un sistema para interpretar 
correctamente datos externos, para aprender de dichos datos y emplear esos conocimientos para lograr tareas y metas 
concretas a través de la adaptación flexible

measures example for different responses:

question: que es la IA (1) response: Es la inteligencia que simula el conocimiento humano
score analising { cualeslacapitaldehungria_SP: -74890,
  cuantoes5mas5_SP: -77071,
  cuantoes9mas1_SP: -76087,
  cuantoshuesostieneelcuerpohumano_SP: -82735,
  enelmesencefalosehubican_SP: -79904,
  queeslainteligenciaartificial_SP: -10263,
  quienpintolasmeninas_SP: -64522 }
{ _class: 'queeslainteligenciaartificial',
  score: -10263, // minor score, good response
  country: 'SP' }
question: que es la IA (2) response: maquina que imita el proceso cognitivo humano
score analising { cualeslacapitaldehungria_SP: -72653,
  cuantoes5mas5_SP: -76475,
  cuantoes9mas1_SP: -73631,
  cuantoshuesostieneelcuerpohumano_SP: -76509,
  enelmesencefalosehubican_SP: -78492,
  queeslainteligenciaartificial_SP: -16213,
  quienpintolasmeninas_SP: -71700 }
{ _class: 'queeslainteligenciaartificial',
  score: -16213, // less score, possible response
  country: 'SP' }
question: que es la IA (3) response: no tengo ni idea de que es eso
score analising { cualeslacapitaldehungria_SP: -40341,
  cuantoes5mas5_SP: -46178,
  cuantoes9mas1_SP: -39335,
  cuantoshuesostieneelcuerpohumano_SP: -43357,
  enelmesencefalosehubican_SP: -47188,
  queeslainteligenciaartificial_SP: -17082,
  quienpintolasmeninas_SP: -37434 }
{ _class: 'queeslainteligenciaartificial',
  score: -17082, // worst score, it seens to be fail response
  country: 'SP' }



#### generate model train

```
 node bin/train.js

```
then execute it via the cli `node bin/training.js`

#### execute
```
 node bin/detect.js

```

#### Second way todo
/nlp/nlp.js
using natual-nlp library to make questions & answers
see source file to check

node nlp/nlp.js

## References 
Main project - https://github.com/chattylabs/language-detector

- https://blog.twitter.com/engineering/en_us/a/2015/evaluating-language-identification-performance.html
- https://shuyo.wordpress.com/2012/02/21/language-detection-for-twitter-with-99-1-accuracy/
- http://cloudmark.github.io/Language-Detection/
