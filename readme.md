#This is an ionic 2 project using typscript.
### Some usefull resources for the ionic to work.

- [Life cycle hooks and authentication](https://ionicframework.com/docs/v2/api/navigation/NavController/)
- [Navigation](https://webcake.co/exploring-nav-hierarchy-in-the-ionic-2-tabs-page/)

### To debug the project on the devices.
1. problem with the auth if the user is logging with the other social medium. there is a
solution for this in the link of my anser follow the [link](https://github.com/angular/angularfire2/issues/476)

### running the emulator and run project on the device.
1. Error : spawn Access solution follow the [link](https://forum.ionicframework.com/t/how-to-fix-this-error-spawn-eacces/20490/30)
  sudo chmod -R a+rwx /appfolder
2. You might see the error related to gradle or the gradle wrapper. 
Error: Could not find gradle wrapper within Android SDK. Might need to update your Android SDK.
Looked here: /Users/lokesh/Library/Android/sdk/tools/templates/gradle/wrapper.
  
  ```
  cordova platform update android@6.2.2
  ``` 
  
  has solved the problem for me.
3. Error: There is a network Error: 
  solution is to use  ` cordova plugin add cordova-plugin-whitelist  --save`
  better use `ionic plugin add <plugin-name>`
  but this was listed in my package.json under the 
  `cordovaPlugins`. but when search it in the plugins directory it was missing. how do i sync the 
  plugins listed in the list.

  ```
  ionic state restore
  ``` 
  There are more to it do `ionic help state`.

4. Note: This is classic Error and hard to resolve.

- Navigate to `plugins/android.json`
- Navigate to `plugins/ios.json`
- check the list of installed plugin and the list list in the `package.json`
- If there is a difference that may be source of the problems.
- `cordova plugin add cordova-plugin-statusbar` This wil install only plugins only to the missing platform.s

Note: mine list broke due the `ionic state restore` broke as it was unable to install `facebook4` plugin due to needed params.
:)








### About the Angular
1. Change detection [link](https://juristr.com/blog/2017/03/angular-tuning-change-detection/) 

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
- [google directions Api](https://github.com/SebastianM/angular2-google-maps/issues/495) There is a directive for that we can use.


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

