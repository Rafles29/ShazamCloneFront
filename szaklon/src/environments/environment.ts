// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:9876/',
  loginUrl: 'login',
  logoutUrl: 'logout',
  registerUrl: 'signup',
  historyUrl: 'history',
  recognizeUrl: 'recognize',
  popularUrl: 'popular',
  songsUrl: 'songs',
  genresUrl: 'genres',
  artistsUrl: 'artists',
  addSongUrl: 'add_song',
  editSongUrl: 'edit_song',
  usersUrl: 'users',
  logsUrl: 'logs',
  accountUrl: 'account',
  checkSessionUrl: 'check_session',

  SESSION_CHECK_INTERVAL: 30000, // 30 seconds

  ADD_SONG_TIMEOUT: 120000 // 120 seconds
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
