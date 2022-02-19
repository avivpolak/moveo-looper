# Audio Looper App

This audio looper was meant to help musicians practice their own instruments.
Just add your song and have fun!

Check out github pages:
https://avivpolak.github.io/moveo-looper/


Features:
- Draggable cursor.
- Responsive for also mobile and desktop use.


## Run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Upload a song :

1. Upload the .mp3 songs tracks(they must be exactly the same duration) to "src/media/{your-song-name}".

2. import all the tracks to "/src/songs/soundpaths"
3. In "src/songs/soundpaths", add an entry to soundPaths , as follows :
"yourSongName":[track1,track2,track3 ...]

## Tools Used

- React
- HTML5 Audio

## Contribution:
PR's are welcome !