/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Commit Collection
	// ---------------

	var Commits = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Commit,

		// Filter down the list of all todo items that are finished.
		/*completed: function () {
			return this.where({completed: true});
		},*/

        getCommits: function (start, end) {
            return this.slice(start, end);
        },

		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			return this.length ? this.last().get('order') + 1 : 1;
		},

		// Todos are sorted by their original insertion order.
		comparator: 'order'
	});

	// Create our global collection of **Todos**.
	app.commits = new Commits();
})();
