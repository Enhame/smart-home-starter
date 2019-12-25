#include "JsonConfigManager.h"
#include <ArduinoJson.h>
#include <FS.h>

JsonConfigManager::JsonConfigManager() {
}

StaticJsonDocument<44000> JsonConfigManager::getConfig() {
    File file = SPIFFS.open("/config.json", "r");
    StaticJsonDocument<44000> doc;
    deserializeJson(doc, file);

    return doc;
}
