sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, History, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("ehsm.controller.Incidents", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteIncidents").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var oUserModel = this.getOwnerComponent().getModel("user");
            if (!oUserModel) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteLogin");
                return;
            }

            var sEmployeeId = oUserModel.getProperty("/EmployeeId");
            var oModel = this.getOwnerComponent().getModel();
            var that = this;

            this.getView().setBusy(true);
            oModel.read("/INCIDENTSet", {
                filters: [new Filter("EmployeeId", FilterOperator.EQ, sEmployeeId)],
                success: function (oData) {
                    this.getView().setBusy(false);
                    var oLocalModel = new sap.ui.model.json.JSONModel(oData.results);
                    this.getView().setModel(oLocalModel, "incidentModel");
                }.bind(this),
                error: function (oError) {
                    this.getView().setBusy(false);
                    sap.m.MessageToast.show("Failed to fetch incidents");
                }.bind(this)
            });
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteDashboard", {}, true);
            }
        },

        formatPriority: function (sPriority) {
            switch (sPriority) {
                case "High": return "Error";
                case "Medium": return "Warning";
                case "Low": return "Success";
                default: return "None";
            }
        },

        formatStatus: function (sStatus) {
            switch (sStatus) {
                case "Open": return "Error";
                case "In Progress": return "Warning";
                case "Closed": return "Success";
                default: return "None";
            }
        }
    });
});
