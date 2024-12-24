sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    function (Controller, Fragment, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("simpleformfragment.controller.View1", {
            onInit: function () {
            },
            onVHTrigger: function () {
                var oView = this.getView();
                if (!this._oForm) {
                    Fragment.load({
                        name: "simpleformfragment.view.Form",
                        controller: this
                    }).then(function (_oForm) {
                        this._oForm = _oForm;
                        oView.addDependent(this._oForm);
                        this._oForm.open();
                    }.bind(this));
                } else {
                    this._oForm.open();
                }
            },
            onclose: function () {
                this._oForm.close();
            },
            onPressItem: function (oEvent) {
                var bp = oEvent.getParameter("listItem").getProperty("title");
                this.getView().byId("idBpId").setValue(bp);
                this._oForm.close();
            },
            onSubmit: function (oEvent) {
                this.getView().byId("idAddPanel").setVisible(true);
                var bpId = oEvent.getSource().getProperty("value");
                var bpId = this.getView().byId("idBpId").getValue();

                var path = "/BusinessPartnerSet('" + bpId + "')";
                var oModel = this.getOwnerComponent().getModel();
                var that = this;
                var tModel = new sap.ui.model.json.JSONModel();
                oModel.read(path, {
                    success: function (oData, response) {
                        var readdata = {
                            "City": oData.Address.City,
                            "Building": oData.Address.Building,
                            "Country": oData.Address.Country,
                            "Street": oData.Address.Street,
                            "PostalCode": oData.Address.PostalCode,

                        }
                        tModel.setData(readdata);
                        that.getView().setModel(tModel,"readModel")

                      //  that.onSubmit1(oData);

                    },
                    error: function () {

                        alert("failuer case")

                    }

                });
            },
            onSubmit1: function (oData) {
                // var readdata={
                //     this.getView().byId("idInput1").setValue(oData.Address.City),
                //     this.getView().byId("idInput2").setValue(oData.Address.Building),
                //     this.getView().byId("idInput3").setValue(oData.Address.Country),
                //     this.getView().byId("idInput4").setValue(oData.Address.Street),
                //     this.getView().byId("idInput5").setValue(oData.Address.PostalCode),
                // } 
                 alert("onsubmit one alert");

            },
            onDialogClose:function(){
                this._oForm.close();
            },
            onDilaogSearch:function(){

            },
            // onMultiSelect:function(oEvent){

            // },
            onDialogOK:function(){
             var oList=this.byId("listItem");
            
            },



            

        });
    });
