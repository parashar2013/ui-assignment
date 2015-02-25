/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Commit Collection
	// ---------------

	var Commits = Backbone.Collection.extend({
		model: app.Commit,

        url: 'http://localhost:8080/commits',

        getCommits: function (start, end) {
            return this.slice(start, end);
        },

        parse: function(response) {
            return response.commits;
        }
	});

	app.commits = new Commits();
})();
