#include "ActionsReponse.h"
#include "ArduinoJson.h"

ActionsResponse::ActionsResponse() {

}

String ActionsResponse::getActionsJSON() {
    DynamicJsonDocument doc(200);
    String output = "";

    // light pulp start

    JsonObject lightPulpAction = doc.createNestedObject();
    lightPulpAction["deviceType"] = DEVICE_LIGHT_PULP;
    lightPulpAction["pin"] = lightPulpPin;
    lightPulpAction["currentState"] = lightPulpPinState;
    lightPulpAction["name"] = lightPulpName;

    // light pulp end
    
    JsonObject rgbAction = doc.createNestedObject();
    rgbAction["deviceType"] = DEVICE_RGB;
    rgbAction["name"] = rgbName;

    serializeJson(doc, output);
    return output;
}