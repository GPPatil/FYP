#include "dht.h"

dht DHT;

#define DHT11_PIN 7

const int LDR_PIN = A0;

const int loadLight = 9;

float ldrValue = 0;
int loadLightValue;

String inputString = "";

void setup(){
  loadLightValue = 255;
  pinMode(loadLight, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  ldrValue = analogRead(LDR_PIN);
  ldrValue = (ldrValue/1024.00)*100;

  if (ldrValue < 60) {
    analogWrite(loadLight, loadLightValue);
  } else {
    loadLightValue = 0;
    analogWrite(loadLight, 0);
  }

  while(Serial.available()) {
    inputString = Serial.readString();
    String property = inputString.substring(0, 9);
    String value = inputString.substring(10);

    if (property == "loadLight") {
//      if (value == "1") 
//        digitalWrite(loadLight, HIGH);
//      else
//        digitalWrite(loadLight, LOW);  
      loadLightValue = value.toInt();
      analogWrite(loadLight, loadLightValue);
    }
  }

  int chk = DHT.read11(DHT11_PIN);
  String humidity = String(DHT.humidity);
  String temperature = String(DHT.temperature);
  String brightness = String(ldrValue);
  String loadLightStatus = String(loadLightValue);
  Serial.println("humidity: "+humidity + "," + "temperature: "+temperature + "," + "brightness: "+brightness + "," + "loadLightValue: "+loadLightStatus);
  delay(2000);
}

