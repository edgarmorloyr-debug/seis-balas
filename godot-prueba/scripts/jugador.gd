extends CharacterBody3D
## El jugador: primera persona (WASD + ratón), correr, saltar y un revólver de seis balas que dispara al instante (sin bala visible).
## En el teléfono: arrastrar en la mitad izquierda camina, arrastrar en la derecha mira y un toque corto en la derecha dispara.

signal cambio_balas(balas: int)
signal golpeado(vida: int)

const VEL := 4.2
const VEL_CORRER := 7.0
const SALTO := 4.8
const GRAV := 14.0
const SENS := 0.0025

var cabeza: Node3D
var camara: Camera3D
var arma: Node3D
var tambor: Node3D
var fogonazo: OmniLight3D
var destello: MeshInstance3D
var yaw := 0.0
var pitch := 0.0
var balas := 6
var vida := 100
var recargando := false
var bloqueado := false
var t_bob := 0.0
var retroceso := 0.0
var sacudida := 0.0
var mat_madera: Material

# táctil
var dedo_mover := -1
var dedo_mirar := -1
var inicio_mover := Vector2.ZERO
var mover_tactil := Vector2.ZERO
var inicio_mirar_t := 0.0
var mirar_recorrido := 0.0


func _ready() -> void:
	var cs := CollisionShape3D.new()
	var cap := CapsuleShape3D.new()
	cap.radius = 0.35
	cap.height = 1.8
	cs.shape = cap
	cs.position.y = 0.9
	add_child(cs)
	cabeza = Node3D.new()
	cabeza.position.y = 1.62
	add_child(cabeza)
	camara = Camera3D.new()
	camara.fov = 75.0
	camara.near = 0.04
	camara.far = 250.0
	cabeza.add_child(camara)
	camara.current = true
	_armar_revolver()


func mirar_a(punto: Vector3) -> void:
	var d := punto - (global_position + Vector3(0, 1.62, 0))
	yaw = atan2(-d.x, -d.z)
	pitch = atan2(d.y, Vector2(d.x, d.z).length())
	rotation.y = yaw
	cabeza.rotation.x = pitch


func _armar_revolver() -> void:
	arma = Node3D.new()
	arma.position = Vector3(0.2, -0.19, -0.42)
	camara.add_child(arma)
	var acero := StandardMaterial3D.new()
	acero.albedo_color = Color(0.3, 0.3, 0.32)
	acero.metallic = 0.75
	acero.roughness = 0.38
	var laton := StandardMaterial3D.new()
	laton.albedo_color = Color(0.75, 0.55, 0.25)
	laton.metallic = 1.0
	laton.roughness = 0.35
	var cachas := StandardMaterial3D.new()
	cachas.albedo_color = Color(0.32, 0.17, 0.08)
	cachas.roughness = 0.55
	# cañón
	_pieza(arma, _cil(0.016, 0.016, 0.24), acero, Vector3(0, 0.035, -0.17), Vector3(PI / 2, 0, 0))
	_pieza(arma, _cil(0.02, 0.02, 0.24), acero, Vector3(0, 0.012, -0.17), Vector3(PI / 2, 0, 0)).scale = Vector3(1, 1, 0.55)
	_pieza(arma, _caja(Vector3(0.008, 0.012, 0.012)), acero, Vector3(0, 0.056, -0.28), Vector3.ZERO)   # mira
	# armazón
	_pieza(arma, _caja(Vector3(0.036, 0.07, 0.11)), acero, Vector3(0, 0.02, -0.02), Vector3.ZERO)
	# tambor (gira al recargar)
	tambor = Node3D.new()
	tambor.position = Vector3(0, 0.024, -0.02)
	arma.add_child(tambor)
	_pieza(tambor, _cil(0.034, 0.034, 0.065), acero, Vector3.ZERO, Vector3(PI / 2, 0, 0))
	for i in 6:
		var a := TAU * i / 6.0
		_pieza(tambor, _cil(0.007, 0.007, 0.067), laton, Vector3(cos(a) * 0.021, sin(a) * 0.021, 0), Vector3(PI / 2, 0, 0))
	# martillo, gatillo y guardamonte
	_pieza(arma, _caja(Vector3(0.012, 0.03, 0.02)), acero, Vector3(0, 0.06, 0.04), Vector3(-0.5, 0, 0))
	_pieza(arma, _caja(Vector3(0.006, 0.028, 0.008)), acero, Vector3(0, -0.032, -0.01), Vector3(0.3, 0, 0))
	var guarda := TorusMesh.new()
	guarda.inner_radius = 0.018
	guarda.outer_radius = 0.023
	_pieza(arma, guarda, acero, Vector3(0, -0.035, -0.012), Vector3(0, 0, PI / 2))
	# cachas de madera
	_pieza(arma, _caja(Vector3(0.034, 0.12, 0.045)), cachas, Vector3(0, -0.06, 0.055), Vector3(-0.35, 0, 0))
	# fogonazo
	fogonazo = OmniLight3D.new()
	fogonazo.light_color = Color(1.0, 0.7, 0.35)
	fogonazo.light_energy = 0.0
	fogonazo.omni_range = 7.0
	fogonazo.position = Vector3(0, 0.035, -0.33)
	arma.add_child(fogonazo)
	destello = MeshInstance3D.new()
	var q := QuadMesh.new()
	q.size = Vector2(0.16, 0.16)
	destello.mesh = q
	var md := StandardMaterial3D.new()
	md.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	md.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	md.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	md.albedo_color = Color(4.0, 2.4, 0.9)
	var g := GradientTexture2D.new()
	g.fill = GradientTexture2D.FILL_RADIAL
	g.fill_from = Vector2(0.5, 0.5)
	g.fill_to = Vector2(1.0, 0.5)
	var gr := Gradient.new()
	gr.set_color(0, Color(1, 1, 1, 1))
	gr.set_color(1, Color(1, 1, 1, 0))
	g.gradient = gr
	md.albedo_texture = g
	destello.material_override = md
	destello.position = Vector3(0, 0.035, -0.31)
	destello.visible = false
	destello.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	arma.add_child(destello)


func _cil(r1: float, r2: float, h: float) -> CylinderMesh:
	var c := CylinderMesh.new()
	c.top_radius = r1
	c.bottom_radius = r2
	c.height = h
	c.radial_segments = 16
	return c


func _caja(t: Vector3) -> BoxMesh:
	var b := BoxMesh.new()
	b.size = t
	return b


func _pieza(padre: Node3D, malla: Mesh, mat: Material, pos: Vector3, rot: Vector3) -> MeshInstance3D:
	var m := MeshInstance3D.new()
	m.mesh = malla
	m.material_override = mat
	m.position = pos
	m.rotation = rot
	m.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	padre.add_child(m)
	return m


func _unhandled_input(e: InputEvent) -> void:
	if bloqueado:
		return
	if e is InputEventMouseMotion and Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
		_girar(e.relative * SENS)
	elif e is InputEventMouseButton and e.pressed and e.button_index == MOUSE_BUTTON_LEFT:
		if Input.mouse_mode != Input.MOUSE_MODE_CAPTURED:
			Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
		else:
			disparar()
	elif e is InputEventKey and e.pressed and not e.echo:
		if e.physical_keycode == KEY_R:
			recargar()
		elif e.physical_keycode == KEY_ESCAPE:
			Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
	elif e is InputEventScreenTouch:
		var w := get_viewport().get_visible_rect().size.x
		if e.pressed:
			if e.position.x < w * 0.5 and dedo_mover < 0:
				dedo_mover = e.index
				inicio_mover = e.position
			elif e.position.x >= w * 0.5 and dedo_mirar < 0:
				dedo_mirar = e.index
				inicio_mirar_t = Time.get_ticks_msec() / 1000.0
				mirar_recorrido = 0.0
		else:
			if e.index == dedo_mover:
				dedo_mover = -1
				mover_tactil = Vector2.ZERO
			elif e.index == dedo_mirar:
				dedo_mirar = -1
				if mirar_recorrido < 18.0 and Time.get_ticks_msec() / 1000.0 - inicio_mirar_t < 0.3:
					disparar()
	elif e is InputEventScreenDrag:
		if e.index == dedo_mover:
			mover_tactil = ((e.position - inicio_mover) / 70.0).limit_length(1.0)
		elif e.index == dedo_mirar:
			mirar_recorrido += e.relative.length()
			_girar(e.relative * 0.005)


func _girar(r: Vector2) -> void:
	yaw -= r.x
	pitch = clamp(pitch - r.y, -1.4, 1.4)
	rotation.y = yaw
	cabeza.rotation.x = pitch


func disparar() -> void:
	if recargando:
		return
	if balas <= 0:
		recargar()
		return
	balas -= 1
	cambio_balas.emit(balas)
	retroceso = 1.0
	fogonazo.light_energy = 6.0
	destello.visible = true
	destello.rotation.z = randf() * TAU
	get_tree().create_timer(0.05).timeout.connect(func(): destello.visible = false)
	var origen := camara.global_position
	var fin := origen - camara.global_transform.basis.z * 120.0
	var q := PhysicsRayQueryParameters3D.create(origen, fin)
	q.exclude = [get_rid()]
	var r := get_world_3d().direct_space_state.intersect_ray(q)
	if r.is_empty():
		return
	var c: Object = r.collider
	if c.has_method("recibir_disparo"):
		c.recibir_disparo(r.position, -camara.global_transform.basis.z)
	else:
		_polvo(r.position, r.normal)
	if balas == 0:
		get_tree().create_timer(0.35).timeout.connect(recargar)


func _polvo(p: Vector3, n: Vector3) -> void:
	var s := CPUParticles3D.new()
	s.one_shot = true
	s.amount = 14
	s.lifetime = 0.6
	s.explosiveness = 1.0
	s.direction = n
	s.spread = 35.0
	s.initial_velocity_min = 1.5
	s.initial_velocity_max = 3.5
	s.gravity = Vector3(0, -6, 0)
	s.scale_amount_min = 0.02
	s.scale_amount_max = 0.05
	var m := SphereMesh.new()
	m.radius = 0.5
	m.height = 1.0
	m.radial_segments = 6
	m.rings = 3
	var mat := StandardMaterial3D.new()
	mat.albedo_color = Color(0.5, 0.45, 0.4)
	mat.emission_enabled = true
	mat.emission = Color(1.0, 0.6, 0.2)
	mat.emission_energy_multiplier = 0.6
	m.material = mat
	s.mesh = m
	get_parent().add_child(s)
	s.global_position = p + n * 0.02
	s.emitting = true
	get_tree().create_timer(1.2).timeout.connect(s.queue_free)


func recargar() -> void:
	if recargando or balas == 6:
		return
	recargando = true
	var t := create_tween()
	t.tween_property(arma, "rotation", Vector3(0.2, 0.0, 0.9), 0.2)
	t.parallel().tween_property(tambor, "rotation:z", tambor.rotation.z + TAU * 2, 0.8)
	t.tween_property(arma, "rotation", Vector3.ZERO, 0.25)
	t.tween_callback(func():
		balas = 6
		recargando = false
		cambio_balas.emit(balas))


func recibir_golpe() -> void:
	vida = max(0, vida - 20)
	sacudida = 1.0
	golpeado.emit(vida)
	if vida == 0:
		vida = 100
		golpeado.emit(vida)


func _physics_process(dt: float) -> void:
	fogonazo.light_energy = move_toward(fogonazo.light_energy, 0.0, dt * 80.0)
	retroceso = move_toward(retroceso, 0.0, dt * 6.0)
	sacudida = move_toward(sacudida, 0.0, dt * 3.0)
	if bloqueado:
		return
	var ent := Vector2(
		float(Input.is_physical_key_pressed(KEY_D) or Input.is_physical_key_pressed(KEY_RIGHT)) - float(Input.is_physical_key_pressed(KEY_A) or Input.is_physical_key_pressed(KEY_LEFT)),
		float(Input.is_physical_key_pressed(KEY_S) or Input.is_physical_key_pressed(KEY_DOWN)) - float(Input.is_physical_key_pressed(KEY_W) or Input.is_physical_key_pressed(KEY_UP)))
	ent += mover_tactil
	ent = ent.limit_length(1.0)
	var corre := Input.is_physical_key_pressed(KEY_SHIFT) or mover_tactil.length() > 0.95
	var dir := transform.basis * Vector3(ent.x, 0, ent.y)
	var v := VEL_CORRER if corre else VEL
	var suelo := is_on_floor()
	var acel := 12.0 if suelo else 3.0
	velocity.x = lerp(velocity.x, dir.x * v, clamp(acel * dt, 0.0, 1.0))
	velocity.z = lerp(velocity.z, dir.z * v, clamp(acel * dt, 0.0, 1.0))
	if suelo:
		if Input.is_physical_key_pressed(KEY_SPACE):
			velocity.y = SALTO
	else:
		velocity.y -= GRAV * dt
	move_and_slide()
	# balanceo al caminar, retroceso del arma y sacudida al recibir un golpe
	var rapidez := Vector2(velocity.x, velocity.z).length()
	if suelo and rapidez > 0.5:
		t_bob += dt * rapidez * 1.9
	var bob: float = sin(t_bob) * 0.035 * clamp(rapidez / VEL, 0.0, 1.3)
	camara.position = Vector3(cos(t_bob * 0.5) * 0.02 * clamp(rapidez / VEL, 0.0, 1.0), bob, 0) + Vector3(randf_range(-1, 1), randf_range(-1, 1), 0) * sacudida * 0.04
	if not recargando:
		arma.rotation.x = retroceso * 0.35
	arma.position = Vector3(0.2, -0.19 + bob * 0.4, -0.42 + retroceso * 0.06)
