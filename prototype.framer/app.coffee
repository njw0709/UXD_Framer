
{StickyHeaders} = require "sticky-headers/StickyHeaders"
flow = new FlowComponent
Home_Screen.parent = flow
Screen_for_klicking_pill.parent = flow
flow.showNext(Home_Screen)

# make the page scrollable

Home_Screen_layer = new Layer
	size:Screen.size
	x:0
	y:0

flow = new FlowComponent
Home_Screen.parent=flow
flow.showNext(Home_Screen_layer)



scroll_home = new ScrollComponent
	x:0
	y:0
	width:375
	height:667
	scrollHorizontal: false
	parent: Home_Screen_layer
	mouseWheelEnabled: true

Home_Screen.parent=scroll_home.content
Time_pacman.parent=scroll_home.content
Pill_Info.parent=scroll_home.content

# Button to transition to pill info list, fixed to position
scroll_home.on Events.Move, (offset) ->
	yOffset = -offset.y
	Pill_Info.y=582+yOffset


#scroll to current time 
scroll_home.scrollToLayer(Time_pacman)
# scroll.mouseWheelEnabled=true

#Define states for the time indicator
CurrentTimeline.states = 
	Now:
		borderColor: "rgba(34,34,34,0.23)"
		opacity: 1.00
		backgroundColor: "rgba(0,0,0,1)"
	future:
		borderWidth: 3
		borderColor: "rgba(34,34,34,0.23)"
		opacity: 0.5

CurrentTime.states =
	Now:
		opacity: 1.00
		backgroundColor: "rgba(247,248,255,0)"
	future:
		opacity: 0.50
	

# Make the pacman stick to the top when scrolled further
Time_pacman.name="StickyHeader"

# Enable StickyHeaders for your scroll component
StickyHeaders.enableFor(scroll_home)

#make time indicator change colors when scrolled up far
Current_Time=Time_pacman.y

scroll_home.onMove ->
	if Time_pacman.y > Current_Time
		CurrentTimeline.states.switchInstant "future"
		CurrentTime.states.switchInstant "future"
		Uparrow.animate
			opacity: 0.6
			options:
				time: 0.1
	else
		CurrentTimeline.states.switchInstant "Now"
		CurrentTime.states.switchInstant "Now"
		Uparrow.animate
			opacity: 0
			options: 
				time: 0

				
# Make pacman draggable
Pacman.draggable.enabled = true
Pacman.draggable.speedX = 1
Pacman.draggable.speedY = 1
Pacman.draggable.overdrag=false
Pacman.draggable.bounce = false
Pacman.draggable.momentum=false

Pillsavail =[Pill2,Pill3,Pill4]
Pillsnotavail=[Pill1,Pill5]

for index in [0..1]
	Pillsnotavail[index].states=
			cannottake:
				opacity: 0.75
			default:
				opacity: 1

Pillsxpos=[]
Pillsypos=[]
for index in [0..2]
	Pillsxpos.push(Pillsavail[index].x)
	Pillsypos.push(Pillsavail[index].y)

Diff=[]
Pacman.on Events.DragStart, ->
	scroll_home.scrollVertical=false
	for index in [0..1]
		Pillsnotavail[index].states.switchInstant "cannottake"
	for index in [0..2]
		Pillsavail[index].animate
			x:90
			y:Pillsypos[index]+index*60
			options:
				time: 0.5
	Pillsavail[2].animate
		x:90
		y:Pillsypos[2]
		options:
			time: 0.5
			
	for index in [0..2]
		Diff.push(Pillsavail[index].y-Pacman.maxY)

Pacman.on Events.DragMove, ->
	for index in [0..2]
		Pillsavail[index].on "change:point", ->
		if isTouching(Pacman,Pillsavail[index],Diff[index])
			Pillsavail[index].animate
				x:140
				options:
					time: 0.5


Pacman.on Events.DragEnd, -> 
	for index in [0..1]
		Pillsnotavail[index].states.switchInstant "default"
	for index in [0..2]
		Pillsavail[index].animate
			x:Pillsxpos[index]
			y:Pillsypos[index]
			options:
				curve: Spring(damping: 0.5)
				time: 0.5

	this.animate
		x:311
		y:21
		options:
			curve: Spring(damping: 0.5)
			time:0.5
			
	scroll_home.scrollVertical=true


#Collision Detection
isTouching = (Pacman, Pill, diff) ->
	Pill_r=(Pill.maxX-Pill.x)/2 
	Pill_x=(Pill.screenFrame.x+Pill_r)
	Pill_y=(Pill.screenFrame.y+Pill_r)		
	Pacman_r=(Pacman.maxY-Pacman.y)/2
	Pacman_x=(Pacman.maxX-Pacman_r)
	Pacman_y=(Pacman.maxY-Pacman_r)
	Dist_sq = (Pill_x-Pacman_x)**2+(Pill_y-Pacman_y)**2
	if Dist_sq-20<(Pill_r+Pacman_r)**2
		return true
	else 
		return false
		
#Time window

Pillscheduled=[Pill2,Pill4,Pill5]
Timewindow = [Timerail_2,Timerail_4,Timerail_5]
for index in [0..2]	
	Timewindow[index].states=
		default:
			opacity:0
		appear:
			opacity:1

	Pillscheduled[index].onLongPressStart (event, layer) ->
		scroll_home.scrollVertical=false
		ind = Pillscheduled.indexOf(this)
		this.draggable.enabled=true
		this.draggable.horizontal=false
		this.draggable.constraints=
			x:Timewindow[ind].x
			y:Timewindow[ind].y
			width:Timewindow[ind].width
			height:Timewindow[ind].height
		this.draggable.overdrag=false
		this.draggable.momentum=false
		
		Timewindow[ind].states.switchInstant "appear"

	Pillscheduled[index].onLongPressEnd (event, layer) ->
		scroll_home.scrollVertical=true
		ind = Pillscheduled.indexOf(this)
		this.draggable.enabled=false
		Timewindow[ind].states.switchInstant "default"

		if this in Pillsavail
			availind = Pillsavail.indexOf(this)
			Pillsypos[availind]=this.y



# Move to Pill info
Pill_Info.onClick (event, layer) ->
	flow.showOverlayBottom(Pill_Information)



#Go to next screen by klicking pill

Pills=[Pill1,Pill2,Pill3,Pill4,Pill5]
for i in Pills
	i.onClick (event, layer) ->
		flow.showNext(Screen_for_klicking_pill)


return_to_home.onClick (event, layer) ->
	flow.showPrevious()


Return_home.onClick (event, layer) ->
	flow.showOverlayTop(Home_Screen_layer)

info_scroll = new ScrollComponent
	width:375
	height:667-76*2
	x:0
	y:76
	scrollHorizontal: false

info_scroll.parent=Pill_Information
PillList.parent = info_scroll.content
info_scroll.scrollToLayer(PillList)

Pill_info_list = [Pilllist1,Pilllist2,Pilllist3]
for listel in Pill_info_list
	listel.on Events.Click, ->
		flow.showNext(Screen_for_klicking_pill)
		


BtCalendar.onClick (event,layer) ->
	flow.showNext(CalendarScreen)

BtMypills.onClick (event,layer) ->
	flow.showPrevious()

Pill_Information.onSwipeRight (event, layer) ->
	flow.showPrevious()


#Add Pill Sequence
Addpill.onClick (event,layer) ->
	flow.showNext(AddPillScreen)

Textfield=[Text1,Text2,Text3,Mealbut]

for field in Textfield
	field.on Events.Click, ->
		flow.showNext(AddPillScreen_Comp)

Cancelbut.on Events.Click, ->
	flow.showPrevious()

Cancelbut_comp.on Events.Click, ->
	flow.showOverlayLeft(Pill_Information)

Confirm_comp.on Events.Click, ->
	flow.showOverlayLeft(PillInfo_New)


#Updated Pill List Definition

Return_home_new.onClick (event, layer) ->
	flow.showOverlayLeft(Home_Screen_layer)


# Daily Calendar on Swipe right

scroll_calendar = new ScrollComponent
	x:0
	y:0
	width:375
	height:667
	scrollHorizontal: false
	parent: Home_Screen_layer
	mouseWheelEnabled: true

scroll_calendar.parent = DailySchedule
Calendar_expanded.parent = scroll_calendar.content
Time_pacman_expanded.parent=scroll_calendar.content

#Define states for the time indicator
CurrentTimeline_exp.states = 
	Now:
		borderColor: "rgba(34,34,34,0.23)"
		opacity: 1.00
		backgroundColor: "rgba(0,0,0,1)"
	future:
		borderWidth: 3
		borderColor: "rgba(34,34,34,0.23)"
		opacity: 0.5

# Make the pacman stick to the top when scrolled further
Time_pacman_expanded.name="StickyHeader"

# Enable StickyHeaders for your scroll component
StickyHeaders.enableFor(scroll_calendar)

#make time indicator change colors when scrolled up far
Current_Time_exp=Time_pacman_expanded.y

scroll_calendar.onMove ->
	scroll_home.scrollPoint={x:0,y:scroll_calendar.scrollY}
	if Time_pacman_expanded.y > Current_Time_exp
		CurrentTimeline_exp.states.switchInstant "future"
		Uparrow_exp.animate
			opacity: 0.8
			options:
				time: 0.1
	else
		CurrentTimeline_exp.states.switchInstant "Now"
		Uparrow_exp.animate
			opacity: 0
			options: 
				time: 0


Home_Screen.onSwipeRight (event, layer) ->
	flow.showOverlayLeft(DailySchedule)
	vertpos = scroll_home.scrollY
	scroll_calendar.scrollPoint = {x:0,y:vertpos}


DailySchedule.onSwipeLeft (event,layer) ->
	flow.showPrevious()
	vertpos = scroll_calendar.scrollY
	scroll_home.scrollPoint = {x:0,y:vertpos}


