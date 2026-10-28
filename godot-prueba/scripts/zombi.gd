extends CharacterBody3D
## Un zombi sencillo hecho con figuras (cápsulas y cajas): camina hacia el jugador con NavigationAgent3D y cae de un disparo.

signal murio(zombi)

var objetivo: Node3D
var agente: NavigationAgent3D
var cuerpo: Node3D
var torso: Node3D
var cabeza: Node3D
var pierna_i: Node3D
var pierna_d: Node3D
var brazo_i: Node3D
var brazo_d: Node3D
var vivo := true
var quieto := false
var vel := 1.25
var t := 0.0
var t_ruta := 0.0
var cd_golpe := 0.0
var estocada := 0.0


func construir(rng: RandomNumberGenerator) -> void:
	vel = rng.randf_range(1.0, 1.6)
	t = rng.randf() * 10.0
	var cs := CollisionShape3D.new()
	var cap := CapsuleShape3D.new()
	cap.radius = 0.3
	cap.height = 1.75
	cs.shape = cap
	cs.position.y = 0.875
	add_child(cs)
	agente = NavigationAgent3D.new()
	agente.path_desired_distance = 0.6
	agente.target_desired_distance = 1.1
	agente.radius = 0.4
	agente.height = 1.8
	add_child(agente)

	var piel := StandardMaterial3D.new()
	piel.albedo_color = Color(0.43, 0.5, 0.36).lerp(Color(0.5, 0.48, 0.42), rng.randf())
	piel.roughness = 0.75
	var ropas := [Color(0.25, 0.22, 0.3), Color(0.35, 0.12, 0.1), Color(0.18, 0.25, 0.2), Color(0.42, 0.38, 0.3), Color(0.15, 0.17, 0.25)]
	var camisa := StandardMaterial3D.new()
	camisa.albedo_color = ropas[rng.randi() % ropas.size()]
	camisa.roughness = 0.95
	var pantalon := StandardMaterial3D.new()
	pantalon.albedo_color = Color(0.12, 0.12, 0.14).lerp(Color(0.25, 0.2, 0.15), rng.randf())
	pantalon.roughness = 0.95
	var ojos := StandardMaterial3D.new()
	ojos.albedo_color = Color(1.0, 0.8, 0.3)
	ojos.emission_enabled = true
	ojos.emission = Color(1.0, 0.65, 0.15)
	ojos.emission_energy_multiplier = 6.0
	var boca := StandardMaterial3D.new()
	boca.albedo_color = Color(0.12, 0.02, 0.02)

	cuerpo = Node3D.new()
	add_child(cuerpo)
	# piernas (giran desde la cadera)
	pierna_i = _miembro(cuerpo, Vector3(-0.11, 0.88, 0), 0.085, 0.88, pantalon)
	pierna_d = _miembro(cuerpo, Vector3(0.11, 0.88, 0), 0.085, 0.88, pantalon)
	# torso encorvado
	torso = Node3D.new()
	torso.position = Vector3(0, 0.88, 0)
	torso.rotation.x = -0.28
	cuerpo.add_child(torso)
	var tm := CapsuleMesh.new()
	tm.radius = 0.2
	tm.height = 0.72
	_malla(torso, tm, camisa, Vector3(0, 0.34, 0)).scale = Vector3(1.15, 1.0, 0.75)
	# cabeza
	cabeza = Node3D.new()
	cabeza.position = Vector3(0, 0.78, 0.02)
	torso.add_child(cabeza)
	var sm := SphereMesh.new()
	sm.radius = 0.13
	sm.height = 0.3
	_malla(cabeza, sm, piel, Vector3(0, 0.05, 0))
	var ojo := SphereMesh.new()
	ojo.radius = 0.022
	ojo.height = 0.044
	_malla(cabeza, ojo, ojos, Vector3(-0.05, 0.08, -0.115))
	_malla(cabeza, ojo, ojos, Vector3(0.05, 0.08, -0.115))
	var bm := BoxMesh.new()
	bm.size = Vector3(0.08, 0.03, 0.03)
	_malla(cabeza, bm, boca, Vector3(0, -0.01, -0.12))
	# brazos estirados hacia adelante
	brazo_i = _miembro(torso, Vector3(-0.25, 0.62, 0), 0.06, 0.62, camisa)
	brazo_d = _miembro(torso, Vector3(0.25, 0.62, 0), 0.06, 0.62, camisa)
	for b in [brazo_i, brazo_d]:
		var mano := SphereMesh.new()
		mano.radius = 0.055
		mano.height = 0.11
		_malla(b, mano, piel, Vector3(0, -0.64, 0))


func _miembro(padre: Node3D, pos: Vector3, r: float, largo: float, mat: Material) -> Node3D:
	var piv := Node3D.new()
	piv.position = pos
	padre.add_child(piv)
	var c := CapsuleMesh.new()
	c.radius = r
	c.height = largo
	_malla(piv, c, mat, Vector3(0, -largo * 0.5, 0))
	return piv


func _malla(padre: Node3D, m: Mesh, mat: Material, pos: Vector3) -> MeshInstance3D:
	var mi := MeshInstance3D.new()
	mi.mesh = m
	mi.material_override = mat
	mi.position = pos
	padre.add_child(mi)
	return mi


func _physics_process(dt: float) -> void:
	if not vivo:
		return
	t += dt
	cd_golpe -= dt
	estocada = move_toward(estocada, 0.0, dt * 3.0)
	if not is_on_floor():
		velocity.y -= 14.0 * dt
	var rapidez := 0.0
	if not quieto and objetivo:
		var d := global_position.distance_to(objetivo.global_position)
		t_ruta -= dt
		if t_ruta <= 0.0:
			t_ruta = 0.3
			agente.target_position = objetivo.global_position
		var listo := NavigationServer3D.map_get_iteration_id(agente.get_navigation_map()) > 0
		if listo and d < 22.0 and not agente.is_navigation_finished():
			var sig := agente.get_next_path_position()
			var dir := sig - global_position
			dir.y = 0
			if dir.length() > 0.01:
				dir = dir.normalized()
				velocity.x = dir.x * vel
				velocity.z = dir.z * vel
				rapidez = vel
				var ang := atan2(-dir.x, -dir.z)
				rotation.y = lerp_angle(rotation.y, ang, clamp(dt * 5.0, 0.0, 1.0))
		else:
			velocity.x = 0
			velocity.z = 0
		if d < 1.5:
			var hacia := objetivo.global_position - global_position
			rotation.y = lerp_angle(rotation.y, atan2(-hacia.x, -hacia.z), clamp(dt * 6.0, 0.0, 1.0))
			if cd_golpe <= 0.0:
				cd_golpe = 1.3
				estocada = 1.0
				if objetivo.has_method("recibir_golpe"):
					objetivo.recibir_golpe()
	else:
		velocity.x = 0
		velocity.z = 0
	move_and_slide()
	# andar torpe
	var paso := sin(t * 5.5) * (0.5 if rapidez > 0.1 else 0.05)
	pierna_i.rotation.x = paso
	pierna_d.rotation.x = -paso
	var brazos := 1.35 + sin(t * 2.3) * 0.12 + estocada * 0.4
	brazo_i.rotation.x = brazos + paso * 0.15
	brazo_d.rotation.x = brazos - paso * 0.15 - 0.15
	brazo_i.rotation.z = 0.08
	brazo_d.rotation.z = -0.08
	torso.rotation.z = sin(t * 2.75) * 0.08
	cabeza.rotation.z = sin(t * 1.3) * 0.25
	cuerpo.position.y = abs(sin(t * 5.5)) * 0.03 * (1.0 if rapidez > 0.1 else 0.0)


func recibir_disparo(punto: Vector3, dir: Vector3) -> void:
	if not vivo:
		return
	vivo = false
	collision_layer = 0
	_sangre(punto, -dir)
	var lado := 1.0 if dir.dot(global_transform.basis.z) > 0 else -1.0
	var tw := create_tween()
	tw.set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
	tw.tween_property(cuerpo, "rotation:x", PI / 2 * lado, 0.55)
	tw.parallel().tween_property(brazo_i, "rotation:x", -0.3, 0.4)
	tw.parallel().tween_property(brazo_d, "rotation:x", 0.2, 0.4)
	tw.tween_interval(3.0)
	tw.tween_property(cuerpo, "position:y", -0.6, 1.5)
	tw.tween_callback(func():
		murio.emit(self)
		queue_free())


func _sangre(p: Vector3, n: Vector3) -> void:
	var s := CPUParticles3D.new()
	s.one_shot = true
	s.amount = 24
	s.lifetime = 0.8
	s.explosiveness = 1.0
	s.direction = (n + Vector3(0, 0.4, 0)).normalized()
	s.spread = 30.0
	s.initial_velocity_min = 1.5
	s.initial_velocity_max = 4.0
	s.gravity = Vector3(0, -9.8, 0)
	s.scale_amount_min = 0.02
	s.scale_amount_max = 0.05
	var m := SphereMesh.new()
	m.radius = 0.5
	m.height = 1.0
	m.radial_segments = 6
	m.rings = 3
	var mat := StandardMaterial3D.new()
	mat.albedo_color = Color(0.3, 0.02, 0.02)
	mat.roughness = 0.2
	m.material = mat
	s.mesh = m
	get_parent().add_child(s)
	s.global_position = p
	s.emitting = true
	get_tree().create_timer(1.5).timeout.connect(s.queue_free)
