package com.faceit.feed;
import android.os.Bundle;
// react-native-splash-screen >= 0.3.1
//import org.devio.rn.splashscreen.SplashScreen; // here
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "FACEIT";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
//    SplashScreen.show(this);
    super.onCreate(null);
  }
}
