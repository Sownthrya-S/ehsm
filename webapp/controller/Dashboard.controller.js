sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("ehsm.controller.Dashboard", {
        onLogout: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteLogin");
        },

        onPressIncident: function () {
            MessageToast.show("Navigate to Incident Management");
        },

        onPressRisk: function () {
            MessageToast.show("Navigate to Risk Assessment");
        }
    });
});
