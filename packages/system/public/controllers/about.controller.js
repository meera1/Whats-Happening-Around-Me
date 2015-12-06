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
            aboutModel.team.push({
                name: "Aditya Kadakia",
                imgUrl: "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/10410330_825556437492936_9184702533137033617_n.jpg?oh=9746f98518f4c9809c5b0c119bb1f0ab&oe=56E8E3B1",
                description: "Member"
            });
            aboutModel.team.push({
                name: "Lijo Daniel",
                imgUrl: "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/27865_1345379748456_6051426_n.jpg?oh=1c14595c820eebb2e62c5a3238cd6429&oe=56DBE24D",
                description: "Member"
            });
            aboutModel.team.push({
                name: "Meera Udani",
                imgUrl: "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xtp1/v/t1.0-9/11218617_972210449498066_8396873252335948018_n.jpg?oh=cf736eeedd093c8e9c53c5b6ea47bad9&oe=56E6F27D",
                description: "Member"
            });
            aboutModel.team.push({
                name: "Sahib Jaspal",
                imgUrl: "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xft1/t31.0-8/11056626_10205960689191728_1127791890433578008_o.jpg",
                description: "Member"
            });
            aboutModel.team.push({
                name: "Ameya Pandilwar",
                imgUrl: "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/11903987_10207369696181016_712033819468516961_n.jpg?oh=ce3c114d82cad01d3d6abf1b74a6e388&oe=56EEA1BD",
                description: "Member"
            });
        }

    }

})();

