package com.loan_store;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

public class Splash extends Activity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.launch_screen);
    Handler handler = new Handler();
    handler.postDelayed(new Runnable() {
      @Override
      public void run() {
        Intent openMainActivity = new Intent(Splash.this, MainActivity.class);
        startActivity(openMainActivity);
        finish();

      }
    }, 5000);
  }
}
