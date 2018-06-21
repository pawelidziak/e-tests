// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAI-J2AxSgUKNRzJhzi7_j2svVVvPFglFY',
    authDomain: 'e-testo.firebaseapp.com',
    databaseURL: 'https://e-testo.firebaseio.com',
    projectId: 'e-testo',
    storageBucket: 'e-testo.appspot.com',
    messagingSenderId: '516263112548'
  }
};
