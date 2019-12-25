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
    JsonArray pulpActions = lightPulpAction.createNestedArray("actions");
    pulpActions.add("switch");

    // light pulp end
    
    // RGB actions start

    JsonObject rgbAction = doc.createNestedObject();
    rgbAction["deviceType"] = DEVICE_RGB;
    rgbAction["name"] = rgbName;
    JsonArray actions = rgbAction.createNestedArray("actions");
    actions.add("switch");
    actions.add("recolor");
    serializeJson(doc, output);
    return output;

    // RGB actions end
}