sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("ehsm.controller.Login", {
        onLogin: function () {
            var sEmployeeId = this.getView().byId("idEmployee").getValue();
            var sPassword = this.getView().byId("idPassword").getValue();

            if (!sEmployeeId || !sPassword) {
                MessageToast.show("Please enter both Employee ID and Password");
                return;
            }

            var oModel = this.getOwnerComponent().getModel();
            var sPath = "/LOGINSet(EmployeeId='" + sEmployeeId + "',Password='" + sPassword + "')";

            var that = this;
            oModel.read(sPath, {
                success: function (oData) {
                    if (oData.Status === "Success") {
                        var oUserModel = new sap.ui.model.json.JSONModel({
                            EmployeeId: sEmployeeId
                        });
                        that.getOwnerComponent().setModel(oUserModel, "user");

                        MessageToast.show("Login Successful");
                        var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                        oRouter.navTo("RouteDashboard");
                    } else {
                        MessageToast.show("Login Failed");
                    }
                },
                error: function (oError) {
                    MessageToast.show("Login Failed");
                }
            });
        }
    });
});
