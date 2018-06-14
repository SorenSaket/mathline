// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = '123056932561-7v2fj1maje4ncsp0m2guksel2og3ojop.apps.googleusercontent.com';

// Instantiates a client
const translator = new Translate({
  projectId: projectId,
});

// The text to translate
const text = 'Hello, world!';
// The target language
const target = 'ru';

function translate()
{
    // Translates some text into Russian
    translator
    .translate(text, target)
    .then(results => {
        const translation = results[0];

        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
        addLine(`Translation: ${translation}`);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
}
