#for ab testing
con_wind=true

{StickyHeaders} = require "sticky-headers/StickyHeaders"
flow = new FlowComponent
Screen_for_klicking_pill_red.parent = flow


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

screenOffset = 0

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
Time_pacman.name = "StickyHeader"

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

# Default Pacman position
Pacman.xHome = 244
Pacman.yHome = 21

Pillsavail = [Pill2, Pill3, Pill4]
Pillsnotavail = [Pill1, Pill5]

for pill in Pillsavail
	pill.states =
			default:
				opacity: 1
			taken:
				opacity: 1


for pill in Pillsnotavail
	pill.states =
			default:
				opacity: 1
			cannottake:
				opacity: 0.75


# Default positions
Pillsxpos = []
Pillsypos = []
for pill in Pillsavail
	Pillsxpos.push(pill.x)
	Pillsypos.push(pill.y)

Confimation_popup.states =
	default:
		opacity:0
	popup:
		opacity:1

Pacman.on Events.DragStart, ->
	scroll_home.scrollVertical = false

	for pill in Pillsnotavail
		pill.states.switchInstant "cannottake"

	for index in [0..Pillsavail.length-1]
		Pillsavail[index].animate
			x:130
			y:Pillsypos[index] + index * 60
			options:
				time: 0.5

	Pillsavail[2].animate
		x:130
		y:Pillsypos[2]
		options:
			time: 0.5

pacmanXTrail = []
pacmanYTrail = []
touchedPillsIdcs = []
untouchedPillsIdcs = []

Pacman.on Events.DragMove, ->
	pacmanXTrail.push(this.screenFrame.x)
	pacmanYTrail.push(this.screenFrame.y)

	for pill in Pillsavail
		index = Pillsavail.indexOf(pill)
		pill.on "change:point", ->
		if (not (index in touchedPillsIdcs)) and isTouching(Pacman,pill) and pill.states.current.name != "taken"
			touchedPillsIdcs.push(index)

	caterpillarPosition = 0
	for pillIdx in touchedPillsIdcs
		# TODO: This currently assumes there will always be enough trail, might need to add a check
		pill = Pillsavail[pillIdx]
		yOffset = pill.y - pill.screenFrame.y
		pill.animate
			x: pacmanXTrail[(pacmanXTrail.length - 1) - 5 * caterpillarPosition] + 10
			y: pacmanYTrail[(pacmanYTrail.length - 1) - 5 * caterpillarPosition] + yOffset
			# opacity: 0.75
			options:
				time: 0.1

		caterpillarPosition++


Confirmation_content = [one_list,two_list,three_list]

one_list_cb = [Check1_one]
two_list_cb = [Check1_two,Check2_two]
three_list_cb = [Check1_three,Check2_three,Check3_three]
checkedboxes=[one_list_cb,two_list_cb,three_list_cb]


counter = [0,0,0]

for lists in checkedboxes
	for item in lists
		item.states = 
			default:
				opacity:1
			uncheck:
				opacity:0
		idx = lists.indexOf(item)
		item.on Events.Click, ->
			counter[idx]=counter[idx]+1
			print(counter[idx])
			if counter[idx] %%2 ==0
				this.states.switchInstant "default"
			else
				untouchedPillsIdcs.push(touchedPillsIdcs.pop())
				this.states.switchInstant "uncheck"
			

for item in Confirmation_content
	item.states = 
		default:
			x:168
			y:0
			opacity:0
			parent:Home_Screen
		appear:
			x:30
			y:76
			opacity: 1
			parent:Confimation_popup

Pacman.on Events.DragEnd, ->

	for index in [0..Pillsnotavail.length-1]
		Pillsnotavail[index].states.switchInstant "default"

	for index in [0..Pillsavail.length-1]
		pill = Pillsavail[index]
		if index not in touchedPillsIdcs and pill.states.current.name != "taken"
			pill.animate
				x:Pillsxpos[index]
				y:Pillsypos[index]
				opacity: 1
				options:
					curve: Spring(damping: 0.5)
					time: 0.5

	print "Pacman z: " + this.z
	# TODO: Fix z arragement of pills
	touchedPillPos = 0 # Position in touchedPillIdcs
	for pillIdx in touchedPillsIdcs # TODO: Rethink what we want to do with taken pills
		pill = Pillsavail[pillIdx]
		#										v Position at start
		yOffset = this.y - this.screenFrame.y + 386 + 7 #< adjustment
		pill.animate
			x: this.xHome + 68 + 20 * touchedPillPos
			y: this.yHome + yOffset

		print "Pill z: " + pill.z

		++touchedPillPos

	this.animate
		x: this.xHome
		y: this.yHome
		options:
			curve: Spring(damping: 0.5)
			time:0.5

	if touchedPillsIdcs.length > 0 && con_wind
		Confimation_popup.states.switchInstant "popup"
		Confirmation_content[touchedPillsIdcs.length-1].states.switchInstant "appear"

	pacmanXTrail = []
	pacmanYTrail = []

	scroll_home.scrollVertical=true




# TODO: Lock all actions outside of buttons when confirmation screen is up
No_Take.onClick (event, layer) ->
	untouchedPillsIdcs = touchedPillsIdcs
	moveUntouchedPills()
	touchedPillsIdcs = []
	untouchedPillsIdcs = []
	Confimation_popup.states.switchInstant "default"
	for i in [0..2]
		Confirmation_content[i].states.switchInstant "default"
	counter=[0,0,0]

Confirm_Take.onClick (event, layer) ->
	for pillIdx in touchedPillsIdcs # TODO: Rethink what we want to do with taken pills
		Pillsavail[pillIdx].states.switchInstant "taken"
	counter=[0,0,0]
	# moveUntouchedPills()
	touchedPillsIdcs = []
	untouchedPillsIdcs = []
	Confimation_popup.states.switchInstant "default"
	for i in [0..2]
		Confirmation_content[i].states.switchInstant "default"	
moveUntouchedPills = () ->
	if untouchedPillsIdcs.length != 0
		for index in untouchedPillsIdcs
			Pillsavail[index].animate
				x:Pillsxpos[index]
				y:Pillsypos[index]
				opacity: 1
				options:
					curve: Spring(damping: 0.5)
					time: 0.5

#Collision Detection
isTouching = (Pacman, Pill) ->
	Pill_r = (Pill.maxX - Pill.x) / 2
	Pill_x = (Pill.screenFrame.x + Pill_r) # Center position
	Pill_y = (Pill.screenFrame.y + Pill_r)

	Pacman_r = (Pacman.maxY - Pacman.y) / 2
	Pacman_x = (Pacman.screenFrame.x + Pacman_r)
	Pacman_y = (Pacman.screenFrame.y + Pacman_r)

	Dist_sq = (Pill_x - Pacman_x) ** 2 + (Pill_y - Pacman_y) ** 2
	tolerance = Pill_r / 4 # Make the hitbox be inside the pill

	return Dist_sq ** 0.5 < Pacman_r + tolerance


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

Pills_red=[Pill1,Pill4]
for i in Pills_red
	i.onClick (event, layer) ->
		flow.showNext(Screen_for_klicking_pill_red)
		
Pills_green=[Pill2]
for i in Pills_green
	i.onClick (event, layer) ->
		flow.showNext(Screen_for_klicking_pill_green)
		
Pills_orange=[Pill3,Pill5]
for i in Pills_orange
	i.onClick (event, layer) ->
		flow.showNext(Screen_for_klicking_pill_orange)


return_to_home_1.onClick (event, layer) ->
	flow.showPrevious()
	
return_to_home_2.onClick (event, layer) ->
	flow.showPrevious()
	
return_to_home_3.onClick (event, layer) ->
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
		flow.showNext(Screen_for_klicking_pill_red)



BtCalendar.onClick (event,layer) ->
	flow.showNext(CalendarScreen)

BtMypills.onClick (event,layer) ->
	flow.showPrevious()

Pill_Information.onSwipeRight (event, layer) ->
	flow.showPrevious()


#Add Pill Sequence
Addpill.onClick (event,layer) ->
	flow.showNext(AddPillScreen)

Cancelbut.on Events.Click, ->
	flow.showOverlayLeft(Pill_Information)
	
Camerabut.on Events.Click, ->
	flow.showNext(Add_Pill_photos)

#Add photo screen
Cancelbut_1.on Events.Click, ->
	flow.showPrevious()

AddPhoto.on Events.Click, ->
	flow.showOverlayBottom(Add_Pill_Camera)

#Photo view
Takephoto.on Events.Click, ->
	flow.showOverlayTop(Add_Pill_photos2)
	
#Add Photo 2 screen
Add.on Events.Click, ->
	flow.showNext(Add_Pill_Confirm)
	
Cancelbut_2.on Events.Click, ->
	flow.showOverlayLeft(AddPillScreen)


#schedule_time screen scrollable

scroll_schedule = new ScrollComponent
	x:0
	y:76
	width:375
	height:667-64-76
	scrollHorizontal: false
	parent: Schedule_time
	mouseWheelEnabled: true

Scroll_content_sch.parent=scroll_schedule.content


#Add Pill Confirm screen
Confirm_1.on Events.Click, ->
	flow.showNext(Schedule_time)
Cancelbut_3.on Events.Click, ->
	flow.showOverlayLeft(Pill_Information)
	
#Schedule_time screen buttons
Cancelbut_4.on Events.Click, ->
	flow.showOverlayLeft(Add_Pill_Confirm)

Confirm_2.on Events.Click, ->
	flow.showOverlayLeft(PillInfo_New)

Handle_len_up.draggable.enabled=true
Handle_len_up.draggable.horizontal=false
Handle_len_up.draggable.momentum=false
Handle_len_up.draggable.overdrag=false
startlen_1=0
startpos_1_up=0
startpos_1_down=0
#up
Handle_len_up.on Events.DragStart, ->
	scroll_schedule.scrollVertical=false
	startpos_1_up= Handle_len_up.y
	startlen_1 = TimeWindow1.size.height

Handle_len_up.on Events.DragMove, ->
	TimeWindow1.y=Handle_len_up.y+33
	TimeWindow1.height=startlen_1-Handle_len_up.y+startpos_1_up
	Handle_vert_pos_1.y=TimeWindow1.y+TimeWindow1.size.height/2-65/2

	
Handle_len_up.on Events.DragEnd, ->
	scroll_schedule.scrollVertical=true

#down
Handle_len_down.draggable.enabled=true
Handle_len_down.draggable.horizontal=false
Handle_len_down.draggable.momentum=false
Handle_len_down.draggable.overdrag=false

Handle_len_down.on Events.DragStart, ->
	scroll_schedule.scrollVertical=false
	startpos_1_down= Handle_len_down.y
	startlen_1 = TimeWindow1.size.height

Handle_len_down.on Events.DragMove, ->
	TimeWindow1.height=startlen_1+Handle_len_down.y-startpos_1_down
	Handle_vert_pos_1.y=TimeWindow1.y+TimeWindow1.size.height/2-65/2
	
Handle_len_down.on Events.DragEnd, ->
	scroll_schedule.scrollVertical=true
	
#Vertical

Handle_vert_pos_1.draggable.enabled=true
Handle_vert_pos_1.draggable.horizontal=false
Handle_vert_pos_1.draggable.momentum=false
Handle_vert_pos_1.draggable.overdrag=false

startpos_vert=0

Handle_vert_pos_1.on Events.DragStart, ->
	scroll_schedule.scrollVertical=false
	startlen_1=TimeWindow1.size.height
	startpos_vert=Handle_vert_pos_1.y

Handle_vert_pos_1.on Events.DragMove, ->
	TimeWindow1.y=Handle_vert_pos_1.y-startlen_1/2+17
	Handle_len_up.y=TimeWindow1.y-33
	Handle_len_down.y=TimeWindow1.y+TimeWindow1.size.height
	
Handle_vert_pos_1.on Events.DragEnd, ->
	scroll_schedule.scrollVertical=true


#Timewindow2
Handle_len_up_2.draggable.enabled=true
Handle_len_up_2.draggable.horizontal=false
Handle_len_up_2.draggable.momentum=false
Handle_len_up_2.draggable.overdrag=false
startlen_2=0
startpos_2_up=0
startpos_2_down=0
#up
Handle_len_up_2.on Events.DragStart, ->
	scroll_schedule.scrollVertical=false
	startpos_2_up= Handle_len_up_2.y
	startlen_2 = TimeWindow2.size.height

Handle_len_up_2.on Events.DragMove, ->
	TimeWindow2.y=Handle_len_up_2.y+33
	TimeWindow2.height=startlen_2-Handle_len_up_2.y+startpos_2_up
	Handle_vert_pos_2.y=TimeWindow2.y+TimeWindow2.size.height/2-65/2

	
Handle_len_up_2.on Events.DragEnd, ->
	scroll_schedule.scrollVertical=true

#down
Handle_len_down_2.draggable.enabled=true
Handle_len_down_2.draggable.horizontal=false
Handle_len_down_2.draggable.momentum=false
Handle_len_down_2.draggable.overdrag=false

Handle_len_down_2.on Events.DragStart, ->
	scroll_schedule.scrollVertical=false
	startpos_2_down= Handle_len_down_2.y
	startlen_2 = TimeWindow2.size.height

Handle_len_down_2.on Events.DragMove, ->
	TimeWindow2.height=startlen_2+Handle_len_down_2.y-startpos_2_down
	Handle_vert_pos_2.y=TimeWindow2.y+TimeWindow2.size.height/2-65/2
	
Handle_len_down_2.on Events.DragEnd, ->
	scroll_schedule.scrollVertical=true
	
#Vertical

Handle_vert_pos_2.draggable.enabled=true
Handle_vert_pos_2.draggable.horizontal=false
Handle_vert_pos_2.draggable.momentum=false
Handle_vert_pos_2.draggable.overdrag=false

startpos_vert_2=0

Handle_vert_pos_2.on Events.DragStart, ->
	scroll_schedule.scrollVertical=false
	startlen_2=TimeWindow2.size.height
	startpos_vert_2=Handle_vert_pos_2.y

Handle_vert_pos_2.on Events.DragMove, ->
	TimeWindow2.y=Handle_vert_pos_2.y-startlen_2/2+17
	Handle_len_up_2.y=TimeWindow2.y-33
	Handle_len_down_2.y=TimeWindow2.y+TimeWindow2.size.height
	
Handle_vert_pos_2.on Events.DragEnd, ->
	scroll_schedule.scrollVertical=true
	

# Button to transition to pill info list, fixed to position
scroll_home.on Events.Move, (offset) ->
	yOffset = -offset.y
	Pill_Info.y=582+yOffset
	


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


