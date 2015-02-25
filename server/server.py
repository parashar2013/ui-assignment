import json
from lib.dateutil import parser
from lib.bottle import route, run, request, hook, response

# Quick REST API for Github commit viewer
version = "1"

# Load commit data
data_file = open('data/allData.json')
all_data = json.load(data_file)

# Set id attribute for backbone.js
for commit in all_data:
    commit['id'] = commit['sha']

# Sort commits by date
all_data.sort(key=lambda x: parser.parse(x['commit']['author']['date']), reverse=True)

@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'

@route('/commits', method='GET')
def commits():
    data_to_return = all_data

    if not request.params.all:
        offset = int(request.params.offset or 0)
        length = int(request.params.length or 25)

        data_to_return = all_data[offset:(offset+length)]

    return {"commits": data_to_return}

@route('/commits/<sha>', method='GET')
def commit(sha):
    commit_to_return = None

    for commit in all_data:
        if commit['sha'] == sha:
            commit_to_return = commit
            break
    
    return {"commit": commit_to_return}

@route('/commits/<sha>', method='POST')
def update_message(sha):
    success = False
    commit_message = request.params.commitMessage

    if commit_message:
        for commit in all_data:
            if commit['sha'] == sha:
                commit['commit']['message'] = commit_message
                m = commit_message
                success = True
                break

    return {"success": success}

run(host='localhost', port=8080)
