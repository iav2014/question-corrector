const reducer = require('./reducer')
const profiler = require('./profiler')
const defaultLanguageProfiles = require('../data/modelProfiles.json')

module.exports = (question,text, opts= {}) => {
  const { languageProfiles = defaultLanguageProfiles, reducers } = opts
  const allLanguages = Object.keys(languageProfiles)
  const reducedLanguages = reducer(text, reducers)

  if (reducedLanguages.length === 1) {
    console.log(1)
    return {
      language: reducedLanguages[0]
    }
  }

  const languagesIntersection = () => allLanguages.filter(lang => -1 !== reducedLanguages.indexOf(lang))
  const languages = reducedLanguages.length > 1 ? languagesIntersection() : allLanguages;
  const inputProfile = profiler(text)
  const scores = {}
  inputProfile.forEach((ngram, index) => {
    languages.forEach(language => {
      const foundPos = languageProfiles[language].findIndex(entry => entry.token === ngram.token)
      const found = foundPos >= 0
      const penalty = found ? Math.abs(found - index) : 1000
      language in scores ? (scores[language] -= penalty) : (scores[language] = 0 - penalty)
      //console.log(foundPos,found,penalty)
    })
  })
  console.log('question:',question,'response:',text);
  console.log('score analising',scores);
  const sorted = Object.keys(scores)
    .map(language => ({ language: language, score: scores[language] }))
    .sort((first, second) => second.score - first.score)

  const bestMatchParts = sorted[0].language.split('_');
  const score = sorted[0].score;
  return {
    _class: bestMatchParts[0],
    score:score,
    country: bestMatchParts[1] ? bestMatchParts[1] : ''
  }
}
