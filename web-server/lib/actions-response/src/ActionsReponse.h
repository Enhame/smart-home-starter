#ifndef ActionsResponse_h
#define ActionsResponse_h
#include <Arduino.h>

class ActionsResponse {
  public:
    ActionsResponse();

    String getActionsJSON();
    int lightPulpPin = 12;
    int lightPulpPinState = false;
    String lightPulpName = "Simple lamp";
    String rgbName = "Simple rgb";
    String DEVICE_LIGHT_PULP = "lightPulp";
    String DEVICE_RGB = "rgb";

};

#endif