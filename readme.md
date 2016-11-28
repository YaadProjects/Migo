#This is an ionic 2 project using typscript.
### Some usefull resources for the ionic to work.

- [Life cycle hooks and authentication](https://ionicframework.com/docs/v2/api/navigation/NavController/)
- [Navigation](https://webcake.co/exploring-nav-hierarchy-in-the-ionic-2-tabs-page/)


#Errors and challenges.
- If you see this `build-debug.xcconfig line 27: Unable to find included file "../pods-debug.xcconfig"` 
weird line in the console while doing `ionic emulate ios`.

  ```
  ionic emulate -lc --address localhost ios
  ```
  [More Info](https://github.com/driftyco/ionic-cli/issues/605#issuecomment-147834095)

- If you get file missing or configuration related error. 
  ```
  cordova update ios
  ```
  will solve the problem for you.

- If you get error in live reload on the emulater then run the following command
  
  `ionic emulate -l -c  -s  --address localhost ios --target=iPhone-6s`
  

### GoogleMap api
  Import links 
- [places api](https://github.com/SebastianM/angular2-google-maps/issues/431)
- [Auto complete Api](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete)


## To-dos







## CSS and Tips and Tricks

- use `color="secondary"`
    - primary
    - secondary
    - danger
    - light
    - dark
- [Utilities css](http://ionicframework.com/docs/v2/theming/css-utilities/)
e.g.
    - `text-center`
    - more....

