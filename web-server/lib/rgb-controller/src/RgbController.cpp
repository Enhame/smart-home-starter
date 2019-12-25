#include "RgbController.h"
#include <ArduinoJson.h>

RGBController::RGBController(int r_pin, int g_pin, int b_pin) {
    redPin = r_pin;
    greenPin = g_pin;
    bluePin = b_pin;
}

void RGBController::setSwitchState(boolean state) {
    switchState = state;
}

void RGBController::handleRequest(StaticJsonDocument<500>& _doc) {
    String actionType = _doc["type"];

    if (actionType == "switch") {
        setSwitchState((boolean) _doc["state"]);
    }
    else if (actionType == "recolor") {
        setColors((int) _doc["red"], (int) _doc["green"], (int) _doc["blue"]);
    }
    
}

void RGBController::setColors(int r, int g, int b) {
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