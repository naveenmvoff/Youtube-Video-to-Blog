// // const speech = require('@google-cloud/speech');
// // const fs = require('fs');

// // async function transcribeAudio() {
// //     const client = new speech.SpeechClient({
// //         keyFilename: 'E:\\Task\\youtube\\test\\your-service-account-file.json', // Ensure this path is correct
// //     });

// //     const fileName = 'output_audio.wav';
// //     const audioStream = fs.createReadStream(fileName);  // Create a read stream for the audio file

// //     const request = {
// //         config: {
// //             encoding: 'LINEAR16',  // Match the encoding of your file
// //             sampleRateHertz: 16000,  // Set this according to your file's sample rate
// //             languageCode: 'en-US',  // Set the language for transcription
// //         },
// //         audio: {
// //             content: '',  // This will be populated with the audio stream
// //         },
// //     };

// //     // Create a stream to send the audio file to Google Cloud Speech-to-Text
// //     const recognizeStream = client
// //         .streamingRecognize(request)
// //         .on('error', console.error)
// //         .on('data', (data) => {
// //             console.log('Transcription: ', data.results
// //                 .map(result => result.alternatives[0].transcript)
// //                 .join('\n'));
// //         });

// //     // Pipe the audio file stream to the recognition stream
// //     audioStream.pipe(recognizeStream);
// // }

// // transcribeAudio().catch(console.error);

// const { SpeechClient } = require('@google-cloud/speech');
// const grpc = require('@grpc/grpc-js');
// const path = require('path');

// // Set up the SpeechClient with a service account JSON key
// const client = new SpeechClient({
//   keyFilename: path.join(__dirname, 'your-service-account-file.json'), // Ensure this path is correct
// });

// // Example metadata setup
// const metadata = new grpc.Metadata();
// metadata.add('Authorization', 'Bearer ' + 'yourAuthToken'); // Use actual authorization token

// // Example audio and config setup (adjust to your needs)
// const request = {
//   config: {
//     encoding: 'LINEAR16',
//     sampleRateHertz: 16000,
//     languageCode: 'en-US',
//   },
//   audio: {
//     content: 'yourAudioDataBase64EncodedHere', // Your audio file data in Base64 format
//   },
//   metadata: metadata, // Pass metadata correctly
// };

// // Making the gRPC call
// client.recognize(request)
//   .then(response => {
//     console.log('Response:', response);
//   })
//   .catch(err => {
//     console.error('Error:', err);
//   });


const fs = require('fs');
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();

// The path to the local audio file
const fileName = './output_audio.wav';

// Reads the audio file into memory
const audio = {
  content: fs.readFileSync(fileName).toString('base64'),
};

// Configure the request
const request = {
  audio: audio,
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  },
};

// Recognize speech from the audio file
client
  .recognize(request)
  .then((responses) => {
    const transcription = responses[0].results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log('Transcription:', transcription);
  })
  .catch((err) => {
    console.error('Error recognizing speech:', err);
  });
