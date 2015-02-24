/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var AppRouter = Backbone.Router.extend({
		routes: {
            '': 'home'
			//'commit/:commit': 'showCommit'
		},

        home: function() {
            //console.log("home");
        }

		/*showCommit: function (commit) {
            console.log(commit);
		}*/
	});

	app.AppRouter = new AppRouter();
	Backbone.history.start();
})();
