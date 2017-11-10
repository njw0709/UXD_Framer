{StickyHeaders} = require "sticky-headers/StickyHeaders"
# make the page scrollable
scroll = new ScrollComponent
	size: Screen.size
	scrollHorizontal: false

Calendar.parent = scroll.content
Time_pacman.parent = scroll.content

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
Time_pacman.name = "StickyHeader"

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

Pillsavail = [Pill2, Pill3, Pill4]
Pillsnotavail = [Pill1, Pill5]

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
	scroll.scrollVertical = false
	for index in [0..1]
		Pillsnotavail[index].states.switchInstant "cannottake"
	for index in [0..1]
		Pillsavail[index].animate
			x:90
			y:Pillsypos[index] + index * 60
			options:
				time: 0.5
	Pillsavail[2].animate
		x:90
		y:Pillsypos[2]
		options:
			time: 0.5

	for index in [0..2]
		Diff.push(Pillsavail[index].y-Pacman.maxY)

pacmanXTrail = []
pacmanYTrail = []
touchedPillsIdcs = []

touch_counter = 0
Pacman.on Events.DragMove, ->
	pacmanXTrail.push(this.screenFrame.x)
	pacmanYTrail.push(this.screenFrame.y)
	# print pacmanXTrail.length
	for index in [0..Pillsavail.length-1]
		Pillsavail[index].on "change:point", ->
		# print "In touchedPills: #{index in touchedPillsIdcs}; isTouching: #{isTouching(Pacman,Pillsavail[index],Diff[index])}"
		if (not (index in touchedPillsIdcs)) and isTouching(Pacman,Pillsavail[index],Diff[index])
			touch_counter += 1
			print "Touched pill#{index} \##{touch_counter}"
			touchedPillsIdcs.push(index)

	print "touchedPillsIdcs: #{touchedPillsIdcs}"
	caterpillarPosition = 0
	for pillIdx in touchedPillsIdcs
		print "Moving pill\##{pillIdx}"
		Pillsavail[pillIdx].animate
			x: pacmanXTrail[pacmanXTrail.length - 2 * caterpillarPosition] + 10
			y: pacmanYTrail[pacmanYTrail.length - 2 * caterpillarPosition]
			opacity: 0.8
			options:
				time: 0.1

		caterpillarPosition++


Pacman.on Events.DragEnd, ->
	pacmanXTrail = []
	pacmanYTrail = []
	touchedPillsIdcs = []

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

# Change times for the pills
Pillscheduled=[Pill2,Pill3,Pill4,Pill5]
Timewindow = [300,400,200,100]
Timerail.states=
	default:
		opacity:0
	appear:
		opacity:1


#Collision Detection
isTouching = (Pacman, Pill, diff) ->

	Pill_r = (Pill.maxX - Pill.x) / 2
	Pill_x = (Pill.screenFrame.x + Pill_r) # Center position
	Pill_y = (Pill.screenFrame.y + Pill_r)

	Pacman_r = (Pacman.maxY - Pacman.y) / 2
	Pacman_x = (Pacman.screenFrame.x + Pacman_r)
	Pacman_y = (Pacman.screenFrame.y + Pacman_r)

	Dist_sq = (Pill_x - Pacman_x) ** 2 + (Pill_y - Pacman_y) ** 2
	tolerance = Pill_r / 4 # Make the hitbox be inside the pill

	return Dist_sq ** 0.5 < Pacman_r + tolerance
