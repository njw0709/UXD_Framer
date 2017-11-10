{StickyHeaders} = require "sticky-headers/StickyHeaders"
# make the page scrollable
scroll = new ScrollComponent
	size: Screen.size
	scrollHorizontal: false

Calendar.parent=scroll.content
Time_pacman.parent=scroll.content
#scroll to current time 
scroll.scrollToLayer(Time_pacman)

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
StickyHeaders.enableFor(scroll)

#make time indicator change colors when scrolled up far
Current_x=Time_pacman.x
Current_Time=Time_pacman.y

scroll.onMove ->
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
	scroll.scrollVertical=false
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
			
	scroll.scrollVertical=true


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
		scroll.scrollVertical=false
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
		scroll.scrollVertical=true
		ind = Pillscheduled.indexOf(this)
		this.draggable.enabled=false
		Timewindow[ind].states.switchInstant "default"
		if this in Pillsavail
			availind = Pillsavail.indexOf(this)
			Pillsypos[availind]=this.y
	
		
		
			
		
	
	
		
		
	
		

		
		
		
		

