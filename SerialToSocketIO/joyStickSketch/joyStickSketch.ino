/*
  Read Joystick
  Reads a 2-axis analog joystick, maps its range to 0-400 (X) and 0-300 (Y)
  and sends the results out serially.
  
  created 10 Jun 2015
  by Tom Igoe
 */

int oldX, oldY, oldButton;  // previous versions of the sensor values

void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT_PULLUP);
}

void loop() {
  int xAxis = analogRead(A0);          // read the X axis of the joystick
  xAxis = map(xAxis, 0, 1023, 0, 400); // map to 0-400 range
  delay(1);                            // delay to let ADC stabilize
  int yAxis = analogRead(A1);          // read the Y axis of the joystick
  yAxis = map(yAxis, 0, 1023, 0, 300); // map to 0-300 range
  delay(1);                            // delay to let ADC stabilize
  int button = digitalRead(2);         // read the button

  // if any of the sensor values have changed:
  if (xAxis != oldX || yAxis != oldY || button != oldButton) {
    // print it:
    Serial.print(xAxis);
    Serial.print(',');
    Serial.print(yAxis);
    Serial.print(',');
    Serial.println(button);
  }

  // save the current value for next time through:
  oldX = xAxis;
  oldY = yAxis;
  oldButton = button;
}
