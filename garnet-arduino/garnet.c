#define BAUD_RATE 9600
#define ANALOG_INPUT_1 0

void setup() {
  Serial.begin(BAUD_RATE);
}

void loop() {
  int val;
  val = analogRead(ANALOG_INPUT_1);
  Serial.print(val);
  delay(100);
}