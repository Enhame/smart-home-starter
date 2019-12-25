#ifndef JsonConfigManager_h
#define JsonConfigManager_h
#include <Arduino.h>
#include <ArduinoJson.h>

class JsonConfigManager {
  public:
    JsonConfigManager();
    StaticJsonDocument<44000> getConfig();

};

#endif