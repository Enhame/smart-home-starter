#ifndef JsonConfigManager_h
#define JsonConfigManager_h
#include <Arduino.h>
#include <ArduinoJson.h>

class JsonConfigManager {
  public:
    JsonConfigManager();
    StaticJsonDocument<10000> getConfig();
    void saveJsonConfig(StaticJsonDocument<10000>& _config);
};

#endif