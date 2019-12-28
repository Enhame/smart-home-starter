#include "JsonConfigManager.h"
#include <ArduinoJson.h>
#include <FS.h>

JsonConfigManager::JsonConfigManager() {
}

StaticJsonDocument<10000> JsonConfigManager::getConfig() {
    File file = SPIFFS.open("/config.json", "r");
    StaticJsonDocument<10000> doc;
    deserializeJson(doc, file);
    file.close();
    return doc;
}

void JsonConfigManager::saveJsonConfig(StaticJsonDocument<10000>& _config) {
    File file = SPIFFS.open("/config.json", "w");
    serializeJsonPretty(_config, file);
    file.close();
}
