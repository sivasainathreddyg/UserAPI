// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ], (Controller) => {
//     "use strict";

//     return Controller.extend("com.userapi.controller.View1", {
//         onInit() {
//             var oUserModel = new sap.ui.model.json.JSONModel("/user-api/currentUser");
// 			oUserModel.attachRequestCompleted(function () {
// 				that.username = oUserModel.getData().id;
// 				// oGModel.setProperty("/Username", that.username);	
// 			});
//         }
//     });
// });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
  ], function (Controller, JSONModel) {
    "use strict";
  
    return Controller.extend("com.userapi.controller.View1", {
      onInit: function () {
        this._fetchUserDetails();
      },
  
      _fetchUserDetails: function () {
        // Ensure 'this' context is preserved
        var that = this;
  
        // Make an AJAX call to fetch user details
        $.ajax({
          url: "http://port5000-workspaces-ws-7hf7j.us10.trial.applicationstudio.cloud.sap/user-api/currentUser",
          method: "GET",
          async: true, // Recommended to avoid UI blocking
          success: function (user) {
            var currentUser = {
              fullName: user.lastName + ", " + user.firstName,
              userId: user.name
            };
  
            // Set the fetched user data into a JSON Model
            var oUserModel = new JSONModel(currentUser);
            that.getView().setModel(oUserModel, "userModel"); // Set the model with a named reference
          },
          error: function (xhr, status, error) {
            // Handle errors gracefully
            console.error("Error fetching user details:", error);
            sap.m.MessageToast.show("Failed to fetch user details. Please try again.");
          }
        });
      }
    });
  });
  