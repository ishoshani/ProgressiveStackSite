from flask import Flask
from flask import request
from flask_cors import CORS
from flask_json import FlaskJSON


import json
import secrets
app = Flask(__name__)
CORS(app)
ojson = FlaskJSON(app)

Rooms= {}

##YES I KNOW ITS A QUEUE (FIFO)
##YOU CAN TELL A CS PERSON DIDN'T INVENT THE IDEA

def addStacker(room,tags, name):
    stacker = {}
    stacker['name']=name
    stacker['tags']=tags
    ProgressiveAdd(stacker, Rooms[room]['stack'])

def addStackerDR(room,tags, name):
    stacker = {}
    stacker['name']=name
    stacker['tags']=tags
    ProgressiveAdd(stacker, Rooms[room]['directResponse'])

def pointCalc(stacker):
    points = 0
    tags = stacker['tags']
    for tag in tags:
        app.logger.info("tag given:"+str(tag))
        points = points + tag['points']
    return points

def pop(room):
    newSpeaker = Rooms[room]["stack"].pop(0)
    Rooms[room]["currentSpeaker"]=newSpeaker
    return newSpeaker

def popDR(room):
    newSpeaker = Rooms[room]["directResponse"].pop(0)
    Rooms[room]["currentSpeaker"]=newSpeaker
    return newSpeaker

def getRoom(room):
    stack = Rooms[room]["stack"]
    speaker = Rooms[room]["currentSpeaker"]
    directResponse = Rooms[room]["directResponse"]

    return json.dumps({'speaker':speaker,'stack':stack, 'directResponse':directResponse})

def ProgressiveAdd(stacker, stack):
    points = pointCalc(stacker)
    expectedPosition = len(stack)
    expectedPosition = expectedPosition - points
    if(expectedPosition<0):
        expectedPosition = 0
    if(len(stack)>expectedPosition):
        while(pointCalc(stack[expectedPosition])>=points):
            expectedPosition = expectedPosition + 1
    stack.insert(expectedPosition, stacker)



@app.route('/')
def show_stack():
    s = json.dumps(Rooms)
    return s

@app.route('/newRoom', methods=['POST'])
def new_room():
    data = request.get_json(force=True)
    app.logger.info(data)
    title = data['title']
    tags = data['tags']
    app.logger.info(title)
    app.logger.info(tags)
    uid = secrets.token_urlsafe(8)
    Rooms[uid]={'title':title,'stack':[],'tags':tags, 'currentSpeaker':None, 'directResponse':[] }
    return json.dumps(uid)

@app.route('/<room>')
def show_room(room):
    return getRoom(room)

@app.route('/<room>/desc')
def getFullRoom(room):
    return json.dumps(Rooms[room])


@app.route('/<room>/add', methods=['POST'])
def new_stacker(room):
    data = request.get_json(force=True)
    app.logger.info("got from add:" + str(data))
    name = data['name']
    tags = data['tags']
    addStacker(room,tags,name)
    return getRoom(room)

@app.route('/<room>/addDR', methods=['POST'])
def new_DR(room):
    data = request.get_json(force=True)
    app.logger.info("got from add:" + str(data))
    name = data['name']
    tags = data['tags']
    addStackerDR(room,tags,name)
    return getRoom(room)

@app.route('/<room>/pop')
def pop_stack(room):
    pop(room)
    return(getRoom(room))

@app.route('/<room>/popDR')
def pop_DR(room):
    popDR(room)
    return(getRoom(room))
    
