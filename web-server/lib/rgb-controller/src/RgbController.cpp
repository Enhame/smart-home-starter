#include "RgbController.h"
#include <ArduinoJson.h>
#include <JsonConfigManager.h>

JsonConfigManager jsonConfigManager;

RGBController::RGBController() {
}

void RGBController::initConfig() {
    // Read config start

    StaticJsonDocument<10000> config = jsonConfigManager.getConfig();
    int red = config["rgb"]["pins"]["red_pin"];
    int green = config["rgb"]["pins"]["green_pin"];
    int blue = config["rgb"]["pins"]["blue_pin"];
    int redC = config["rgb"]["red"];
    int greenC = config["rgb"]["green"];
    int blueC = config["rgb"]["blue"];
    boolean switchState = config["rgb"]["state"];

    // Read config end

    redPin = red;
    greenPin = green;
    bluePin = blue;
   
    setSwitchState(switchState, false);
    setColors(redC, greenC, blueC, false);
    
    pinMode(redPin, OUTPUT);
    pinMode(greenPin, OUTPUT);
    pinMode(bluePin, OUTPUT);
}

void RGBController::setSwitchState(boolean state, boolean save) {
    if (save) {
        StaticJsonDocument<10000> config = jsonConfigManager.getConfig();
        config["rgb"]["state"].set(state);
        jsonConfigManager.saveJsonConfig(config);
        config.clear();
    }

    switchState = state;
}

void RGBController::handleRequest(StaticJsonDocument<500>& _doc) {
    String actionType = _doc["type"];

    if (actionType == "switch") {
        setSwitchState((boolean) _doc["state"], true);
    }
    else if (actionType == "recolor") {
        setColors((int) _doc["red"], (int) _doc["green"], (int) _doc["blue"], true);
    }
    
}

void RGBController::setColors(int r, int g, int b, boolean save) {
  if (save) {
        StaticJsonDocument<10000> config = jsonConfigManager.getConfig();
        config["rgb"]["red"].set(r);
        config["rgb"]["green"].set(g);
        config["rgb"]["blue"].set(b);
        jsonConfigManager.saveJsonConfig(config);
        config.clear();
    }

    redColor = r;
    greenColor = g;
    blueColor = b;
}

void RGBController::tick() {
    if (!switchState) {
        analogWrite(redPin, 0);
        analogWrite(greenPin, 0);
        analogWrite(bluePin, 0);
    }
    else {
        analogWrite(redPin, map(redColor, 0, 255, 0, 1023));
        analogWrite(greenPin, map(greenColor, 0, 255, 0, 1023));
        analogWrite(bluePin, map(blueColor, 0, 255, 0, 1023));
    }
}
