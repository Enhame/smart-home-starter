#ifndef RGBController_h
#define RGBController_h
#include <Arduino.h>
#include <ArduinoJson.h>

class RGBController {
  public:
    RGBController(int r_pin, int g_pin, int b_pin);

    boolean switchState = false;

    int redPin;
    int bluePin;
    int greenPin;

    int greenColor = 255;
    int redColor = 255;
    int blueColor = 255;

    void setColors(int r, int g, int b);
    void setSwitchState(boolean state);
    void handleRequest(StaticJsonDocument<500>& _doc);
    void tick();

};

#endif