#ifndef RGBController_h
#define RGBController_h
#include <Arduino.h>
#include <ArduinoJson.h>

class RGBController {
  public:
    RGBController();

    boolean switchState = false;

    uint8_t redPin;
    uint8_t bluePin;
    uint8_t greenPin;

    int greenColor;
    int redColor;
    int blueColor;

    void setColors(int r, int g, int b, boolean save);
    void setSwitchState(boolean state, boolean save);
    void initConfig();
    void handleRequest(StaticJsonDocument<500>& _doc);
    void tick();

};

#endif
