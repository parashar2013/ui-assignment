# Front-End/Web Development UI Assignment for Interviewees

## Part 1: UI/UX/Interaction Design and Development

A sample set of data (taken from Github's public APIs) is provided. Using this data, please construct a UI which will allow users to do the following:

* When the user visits the landing page, they should be presented with a brief overview of the first 25 commits from the data set (in this case "the first 25" can be any arbitrary 25, order doesn't matter), with some way to view the remaining commits. Keep in mind that the sample data set has only 200 items, but a real data set may have many more than that. This summary should include the following information for each commit:
  * Author's name
  * Commit time (either the author's commit date or the committer's commit date is acceptable)
  * The first 50 characters of the commit message
  * The counts of additions/deletions
  * The files included in the commit
* The user should be able to select a file from a commit to view the patch contents for that file
* The user should also be able to view the full commit message
* When a user is viewing the commit message, they should have the option to edit its contents, with the ability to save these changes
  * If a user closes the commit message and then re-opens it, any previous changes should still be present (Note: this requirement does not hold if the page is reloaded - i.e. it is acceptable for changes to be stored in-memory only)
* Users should be able to tell easily which commits they've made changes to

The data set is made available as an array, `ALL_DATA`, which is loaded and available within `js/main.js`.

## Part 2: REST API Design

The UI developed in Part 1 relies entirely on a set of data loaded into the browser as a statically-linked script. In the real world, though, this data would be fetched and updated from a remote server using a [RESTful API](http://en.wikipedia.org/wiki/Representational_state_transfer).

For this section, we want you to design a RESTful API for accessing the sample Github commit data, based on the requirements from Part 1. Be sure to think about the sorts of [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations you need to support based on these requirements (e.g. you'll likely need an endpoint to fetch a list of commits, but you won't need an endpoint to update a commit's `sha` value).

Deliverables should be a list of endpoints, their expected inputs (query strings, request bodies, etc.), and any expected output.

## (Optional) Part 3: REST API Development

**Note:** This section is entirely optional! Complete only if you're so inclined.

Using the UI you developed in Part 1, and the REST API you designed in Part 2, write your own REST API implementation and have your UI talk to that API rather than the static data currently supplied

## USAGE

You must start up the server to use the UI. It no longer uses the local allData.js file. The server should come up on port 8080. The server has been tested with Python v2.7.6.

Run the following command to start the server:

```bash
python server/server.py
```
