// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  appUrl: 'localhost:4200/',
  winDownload: 'https://drive.google.com/drive/folders/1I326wVQdmsKEQob1t7Xv2fz7-CCgEZGl?usp=sharing',
  winStore: '',
  macDownload: 'https://drive.google.com/drive/folders/18FNfgAb2SAiKzCbvjbcEB6zV7BS_Srff?usp=sharing',
  linuxDownload: 'https://drive.google.com/drive/folders/12WQSSxS_lnJZaL4IJIeUZj6MohbgbqAm?usp=sharing',
  firebase: {
    apiKey: 'AIzaSyA2IOEOGN9HmM4Im_kGkfDljivtXVPV_Ns',
    authDomain: 'e-testo-dev.firebaseapp.com',
    databaseURL: 'https://e-testo-dev.firebaseio.com',
    projectId: 'e-testo-dev',
    storageBucket: 'e-testo-dev.appspot.com',
    messagingSenderId: '932060243973'
  }
};
