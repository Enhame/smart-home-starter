#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <FS.h>
#include <ArduinoJson.h>
#include <SimpleDHT.h>
#include <ActionsReponse.h>
#include <RGBController.h>
#include <JsonConfigManager.h>

const char *ssid =  "Enh-Fi";
const char *pass =  "wanrltwhesoyam1";

ActionsResponse actions;

#define dht_pin 14
#define red_pin 15
#define green_pin 12
#define blue_pin 13

boolean btnState = false;

SimpleDHT11 dht11(dht_pin);
WiFiClient client;
ESP8266WebServer server(80);
JsonConfigManager configManager;
HTTPMethod methods;
RGBController rgbController(red_pin, green_pin, blue_pin);

File readFile(String path) {
  Serial.print("requested file: ");
  Serial.print(path);
  Serial.println("");
  File f = SPIFFS.open(path, "r");

  return f;
}

void onHome() {
  File home = readFile("/index.html");
  server.streamFile(home, "text/html");
  home.close();
}

void onAction() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  StaticJsonDocument<500> doc;
  Serial.println(server.arg("plain"));
  DeserializationError error = deserializeJson(doc, server.arg("plain"));
  if (error)
    Serial.println(F("Failed to read file, using default configuration"));

  // Copy values from the JsonDocument to the Config 
  String deviceType = doc["deviceType"];
  Serial.println(deviceType);
  if (deviceType == actions.DEVICE_RGB) {
    rgbController.handleRequest(doc);
  }

  server.send(200);
}

void onActionsList() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  StaticJsonDocument<44000> config = configManager.getConfig();
  String result;
  serializeJson(config, result);
  Serial.println(result);
  server.send(200, "text/json", result);
}

void onGetTemp() {
  byte temperature = 0;
  byte humidity = 0;
  byte data[40] = {0};
  if (dht11.read(dht_pin, &temperature, &humidity, data)) {
    Serial.print("Read DHT11 failed");
    server.send(400, "text/json", "{ \"error\": \"DHT not found\"} ");
    return;
  }

  DynamicJsonDocument doc(100);
  String output = "";
  doc["temp"].set(temperature);
  doc["humidity"].set(humidity);
  Serial.print((int)temperature); Serial.print(" *C, ");
  Serial.print((int)humidity); Serial.println(" %");
  serializeJson(doc, output);
  Serial.print(output); Serial.println(" out");
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/json", output);
}

void on404() {
  Serial.println(server.uri());
  server.send(404, "text/html", "{ \"not_found\": \"not found\"} ");
}
 
void setup() 
{
      Serial.begin(9600);
      delay(10);
      pinMode(actions.lightPulpPin, OUTPUT);
      pinMode(red_pin, OUTPUT);
      pinMode(blue_pin, OUTPUT);
      pinMode(green_pin, OUTPUT);
      digitalWrite(actions.lightPulpPin, actions.lightPulpPinState);
               
      Serial.println("Connecting to ");
      Serial.println(ssid); 
      WiFi.hostname("Smart home");
      WiFi.begin(ssid, pass); 
      while (WiFi.status() != WL_CONNECTED) 
        {
          delay(500);
          Serial.print(".");
        }
      Serial.println("");
      Serial.println("WiFi connected"); 
      server.onNotFound(on404);
      server.on("/", onHome);
      server.on("/actions", HTTP_POST, onAction);
      server.on("/actionsList", HTTP_GET, onActionsList);
      server.on("/gettemp", onGetTemp);


      server.serveStatic("/", SPIFFS, "/", "max-age=86400");
      SPIFFS.begin();
      server.begin(80);
}
 
void loop() 
{      
  server.handleClient();
  rgbController.tick();
}