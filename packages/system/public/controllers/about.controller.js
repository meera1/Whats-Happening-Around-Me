/**
 *
 * Created by ameyapandilwar on 12/05/15 at 22:30 PM.
 */

(function () {

    angular
        .module("eventapp")
        .controller("AboutController", AboutController);

    function AboutController($scope) {

        var aboutModel = this;

        aboutModel.team = [];

        showInformation();

        function showInformation() {
            aboutModel.team.push({name: "Aditya Kadakia", description: "Member | Team JARVIS"});
            aboutModel.team.push({name: "Lijo Daniel", description: "Member | Team JARVIS"});
            aboutModel.team.push({name: "Meera Udani", description: "Member | Team JARVIS"});
            aboutModel.team.push({name: "Sahib Jaspal", description: "Member | Team JARVIS"});
            aboutModel.team.push({name: "Ameya Pandilwar", description: "Member | Team JARVIS"});
        }

    }

})();

