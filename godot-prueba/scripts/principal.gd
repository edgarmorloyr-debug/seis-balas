extends Node3D
## Sala de prueba en Godot: una bodega de piedra de «Las Bodegas» unida por una puerta al callejón con lluvia
## (escaleras de incendio, ventanas con cortinas, el letrero del Bar El Trébol, charcos y vapor).
## Todo se arma con figuras y materiales hechos con matemáticas: no usa imágenes ni modelos de nadie.
##
## Para sacar fotos sin jugar:  godot --path . -- --fotos=/carpeta   (guarda bodega.png, callejon.png y callejon_vuelta.png)

const Jugador := preload("res://scripts/jugador.gd")
const Zombi := preload("res://scripts/zombi.gd")

var compat := false         # true en la web (motor gráfico «Compatibilidad»)
var region: NavigationRegion3D
var jugador: CharacterBody3D
var zombis: Array = []
var rng := RandomNumberGenerator.new()
var fotos_dir := ""
var vencidos := 0
var foco_pivote: Node3D
var foco_luz: OmniLight3D
var t := 0.0
var m := {}     # materiales

# pantalla
var lbl_balas: Label
var lbl_info: Label
var lbl_fps: Label
var rojo: ColorRect
var aviso: Control

const APARECE := [Vector3(-1.2, 0, 26), Vector3(1.6, 0, 31), Vector3(-3.5, 0, -10.5), Vector3(3.8, 0, -8.0), Vector3(0.5, 0, 20)]


func _ready() -> void:
	rng.seed = 7
	compat = RenderingServer.get_current_rendering_method() == "gl_compatibility"
	for a in OS.get_cmdline_user_args():
		if a.begins_with("--fotos="):
			fotos_dir = a.substr(8)
	_materiales()
	_entorno()
	region = NavigationRegion3D.new()
	var nm := NavigationMesh.new()
	nm.geometry_parsed_geometry_type = NavigationMesh.PARSED_GEOMETRY_STATIC_COLLIDERS
	nm.cell_size = 0.25
	nm.cell_height = 0.25
	nm.agent_radius = 0.5
	nm.agent_height = 2.0
	nm.agent_max_climb = 0.25
	region.navigation_mesh = nm
	add_child(region)
	_bodega()
	_callejon()
	_lluvia()
	region.bake_navigation_mesh(false)
	jugador = Jugador.new()
	add_child(jugador)
	jugador.position = Vector3(-1.5, 0, -1.6)
	jugador.mirar_a(Vector3(0.5, 1.5, -10))
	for i in APARECE.size():
		_nuevo_zombi(APARECE[i])
	_pantalla()
	if OS.has_feature("web"):
		var q = JavaScriptBridge.eval("location.search")
		if typeof(q) == TYPE_STRING and "vista=callejon" in q:
			jugador.position = Vector3(0.3, 0, 1.2)
			jugador.mirar_a(Vector3(0.0, 2.2, 30.0))
	if fotos_dir != "":
		_sacar_fotos.call_deferred()
	if "--prueba" in OS.get_cmdline_user_args():
		_prueba.call_deferred()


# ------------------------------------------------------------------ materiales
func _sm(ruta: String, p: Dictionary) -> ShaderMaterial:
	var s := ShaderMaterial.new()
	s.shader = load(ruta)
	for k in p:
		s.set_shader_parameter(k, p[k])
	return s


func _std(col: Color, rough := 0.8, metal := 0.0) -> StandardMaterial3D:
	var s := StandardMaterial3D.new()
	s.albedo_color = col
	s.roughness = rough
	s.metallic = metal
	return s


func _luz_mat(col: Color, energia: float) -> StandardMaterial3D:
	var s := StandardMaterial3D.new()
	s.albedo_color = col
	s.emission_enabled = true
	s.emission = col
	s.emission_energy_multiplier = energia
	return s


func _materiales() -> void:
	m.piedra = _sm("res://shaders/ladrillo.gdshader", {"color_a": Color(0.42, 0.38, 0.33), "color_b": Color(0.28, 0.26, 0.24), "color_junta": Color(0.22, 0.2, 0.18), "tam": Vector2(0.55, 0.32), "junta": 0.02, "piedra": 1.0, "relieve": 0.8})
	m.ladrillo_bodega = _sm("res://shaders/ladrillo.gdshader", {"color_a": Color(0.5, 0.26, 0.17), "color_b": Color(0.33, 0.16, 0.11), "color_junta": Color(0.35, 0.32, 0.28)})
	m.ladrillo_izq = _sm("res://shaders/ladrillo.gdshader", {"color_a": Color(0.42, 0.18, 0.12), "color_b": Color(0.26, 0.11, 0.08), "color_junta": Color(0.3, 0.28, 0.26), "mojado": 0.7})
	m.ladrillo_der = _sm("res://shaders/ladrillo.gdshader", {"color_a": Color(0.5, 0.42, 0.32), "color_b": Color(0.36, 0.3, 0.24), "color_junta": Color(0.28, 0.27, 0.25), "tam": Vector2(0.26, 0.085), "mojado": 0.7})
	m.ladrillo_fondo = _sm("res://shaders/ladrillo.gdshader", {"color_a": Color(0.3, 0.3, 0.33), "color_b": Color(0.2, 0.2, 0.23), "color_junta": Color(0.25, 0.25, 0.26), "mojado": 0.6})
	m.suelo_bodega = _sm("res://shaders/suelo.gdshader", {"color_a": Color(0.38, 0.35, 0.31), "color_b": Color(0.24, 0.22, 0.2), "tam": Vector2(0.62, 0.48)})
	m.suelo_calle = _sm("res://shaders/suelo.gdshader", {"color_a": Color(0.3, 0.3, 0.32), "color_b": Color(0.17, 0.17, 0.19), "tam": Vector2(0.2, 0.14), "junta": 0.012, "charcos": 1.0, "lluvia": 1.0})
	m.madera = _sm("res://shaders/madera.gdshader", {})
	m.madera_oscura = _sm("res://shaders/madera.gdshader", {"color_a": Color(0.25, 0.15, 0.08), "color_b": Color(0.12, 0.07, 0.04), "ancho_tabla": 0.22})
	m.madera_caja = _sm("res://shaders/madera.gdshader", {"color_a": Color(0.6, 0.45, 0.28), "color_b": Color(0.42, 0.3, 0.17), "ancho_tabla": 0.16})
	m.duelas = _sm("res://shaders/madera.gdshader", {"usar_uv": true, "escala_uv": Vector2(2.4, 1.0), "vertical": 1.0, "ancho_tabla": 0.15, "color_a": Color(0.45, 0.26, 0.13), "color_b": Color(0.27, 0.14, 0.07)})
	m.hierro = _std(Color(0.1, 0.1, 0.11), 0.45, 0.85)
	m.hierro_oxido = _std(Color(0.22, 0.14, 0.1), 0.7, 0.5)
	m.verde = _std(Color(0.08, 0.22, 0.15), 0.4, 0.3)
	m.basura = _std(Color(0.03, 0.03, 0.035), 0.15, 0.0)
	m.cristal_oscuro = _std(Color(0.02, 0.025, 0.03), 0.05, 0.6)
	m.marco = _std(Color(0.16, 0.13, 0.11), 0.7)
	m.cuerda = _std(Color(0.05, 0.05, 0.05), 0.6)
	m.vidrio_botella = _std(Color(0.1, 0.25, 0.12), 0.08, 0.2)
	m.tela = _std(Color(0.55, 0.5, 0.42), 0.95)


# ------------------------------------------------------------------ luz y ambiente
func _entorno() -> void:
	var cielo := ProceduralSkyMaterial.new()
	cielo.sky_top_color = Color(0.015, 0.02, 0.04)
	cielo.sky_horizon_color = Color(0.09, 0.07, 0.07)
	cielo.ground_horizon_color = Color(0.05, 0.045, 0.045)
	cielo.ground_bottom_color = Color(0.01, 0.01, 0.01)
	cielo.sky_energy_multiplier = 2.0
	cielo.sun_angle_max = 1.0
	var sky := Sky.new()
	sky.sky_material = cielo
	var e := Environment.new()
	e.background_mode = Environment.BG_SKY
	e.sky = sky
	e.ambient_light_source = Environment.AMBIENT_SOURCE_SKY
	e.tonemap_mode = Environment.TONE_MAPPER_AGX
	e.tonemap_exposure = 1.0 if compat else 1.45
	e.glow_enabled = true
	e.glow_intensity = 0.7
	e.glow_bloom = 0.04
	e.glow_hdr_threshold = 1.0
	e.glow_blend_mode = Environment.GLOW_BLEND_MODE_SOFTLIGHT
	e.adjustment_enabled = true
	e.adjustment_contrast = 1.08
	e.adjustment_saturation = 1.05
	if compat:
		# la web: sin iluminación global ni niebla con volumen; se compensa con luz ambiente y niebla común
		e.ambient_light_sky_contribution = 0.0
		e.ambient_light_color = Color(0.32, 0.3, 0.33)
		e.ambient_light_energy = 0.8
		e.fog_enabled = true
		e.fog_light_color = Color(0.1, 0.11, 0.14)
		e.fog_density = 0.025
		e.glow_intensity = 0.9
	else:
		e.ambient_light_energy = 0.7
		e.sdfgi_enabled = true
		e.sdfgi_use_occlusion = true
		e.sdfgi_cascades = 4
		e.sdfgi_min_cell_size = 0.15
		e.sdfgi_energy = 1.6
		e.sdfgi_bounce_feedback = 0.6
		e.ssao_enabled = true
		e.ssao_radius = 1.3
		e.ssao_intensity = 2.2
		e.ssil_enabled = true
		e.ssr_enabled = true
		e.ssr_max_steps = 96
		e.ssr_fade_in = 0.1
		e.ssr_fade_out = 2.5
		e.ssr_depth_tolerance = 0.3
		e.volumetric_fog_enabled = true
		e.volumetric_fog_density = 0.012
		e.volumetric_fog_albedo = Color(0.85, 0.88, 0.95)
		e.volumetric_fog_anisotropy = 0.55
		e.volumetric_fog_length = 48.0
		e.volumetric_fog_gi_inject = 0.6
		e.volumetric_fog_sky_affect = 0.15
	var we := WorldEnvironment.new()
	we.environment = e
	add_child(we)
	# la luna: luz fría y débil, con sombras
	var luna := DirectionalLight3D.new()
	luna.light_color = Color(0.55, 0.66, 1.0)
	luna.light_energy = 0.5
	luna.rotation_degrees = Vector3(-62, 28, 0)
	luna.shadow_enabled = true
	luna.light_angular_distance = 1.5
	luna.directional_shadow_max_distance = 60.0
	luna.light_volumetric_fog_energy = 0.6
	add_child(luna)


func _omni(pos: Vector3, col: Color, energia: float, rango: float, sombra := false, niebla := 1.0, tam := 0.05) -> OmniLight3D:
	var l := OmniLight3D.new()
	l.position = pos
	l.light_color = col
	l.light_energy = energia
	l.omni_range = rango
	l.omni_attenuation = 1.4
	l.shadow_enabled = sombra
	l.light_size = tam
	l.light_volumetric_fog_energy = niebla
	add_child(l)
	return l


func _spot(pos: Vector3, mira: Vector3, col: Color, energia: float, rango: float, angulo: float, sombra := true, niebla := 2.0) -> SpotLight3D:
	var l := SpotLight3D.new()
	add_child(l)
	l.position = pos
	l.look_at_from_position(pos, mira, Vector3.UP if abs((mira - pos).normalized().y) < 0.99 else Vector3.FORWARD)
	l.light_color = col
	l.light_energy = energia
	l.spot_range = rango
	l.spot_angle = angulo
	l.spot_attenuation = 1.2
	l.shadow_enabled = sombra
	l.light_size = 0.08
	l.light_volumetric_fog_energy = niebla
	return l


# ------------------------------------------------------------------ piezas
## Bloque entre dos esquinas (a = mínimo, b = máximo). Si choca, se agrega al suelo de navegación como obstáculo.
func bloque(a: Vector3, b: Vector3, mat: Material, choca := true, padre: Node3D = null) -> MeshInstance3D:
	return caja((a + b) * 0.5, (b - a).abs(), mat, choca, Vector3.ZERO, padre)


func caja(c: Vector3, tam: Vector3, mat: Material, choca := true, rot := Vector3.ZERO, padre: Node3D = null) -> MeshInstance3D:
	if padre == null:
		padre = region if choca else self
	var mi := MeshInstance3D.new()
	var bm := BoxMesh.new()
	bm.size = tam
	mi.mesh = bm
	mi.material_override = mat
	if choca:
		var sb := StaticBody3D.new()
		sb.position = c
		sb.rotation = rot
		padre.add_child(sb)
		var cs := CollisionShape3D.new()
		var sh := BoxShape3D.new()
		sh.size = tam
		cs.shape = sh
		sb.add_child(cs)
		sb.add_child(mi)
	else:
		mi.position = c
		mi.rotation = rot
		padre.add_child(mi)
	return mi


func malla(mesh: Mesh, mat: Material, pos: Vector3, rot := Vector3.ZERO, padre: Node3D = null) -> MeshInstance3D:
	var mi := MeshInstance3D.new()
	mi.mesh = mesh
	mi.material_override = mat
	mi.position = pos
	mi.rotation = rot
	(padre if padre else self).add_child(mi)
	return mi


func cil(r1: float, r2: float, h: float, seg := 20) -> CylinderMesh:
	var c := CylinderMesh.new()
	c.top_radius = r1
	c.bottom_radius = r2
	c.height = h
	c.radial_segments = seg
	return c


func barril(pos: Vector3, rot := Vector3.ZERO, choca := true) -> void:
	var raiz := Node3D.new()
	if choca:
		var sb := StaticBody3D.new()
		sb.position = pos
		sb.rotation = rot
		region.add_child(sb)
		var cs := CollisionShape3D.new()
		var sh := CylinderShape3D.new()
		sh.radius = 0.38
		sh.height = 1.0
		cs.shape = sh
		sb.add_child(cs)
		sb.add_child(raiz)
	else:
		raiz.position = pos
		raiz.rotation = rot
		add_child(raiz)
	for k in 2:
		var c := cil(0.39, 0.33, 0.5) if k == 0 else cil(0.33, 0.39, 0.5)
		c.cap_top = false
		c.cap_bottom = false
		malla(c, m.duelas, Vector3(0, 0.25 - k * 0.5, 0), Vector3.ZERO, raiz)
	for y in [-0.42, -0.2, 0.2, 0.42]:
		var r: float = 0.395 - abs(y) * 0.13
		malla(cil(r, r, 0.05), m.hierro_oxido, Vector3(0, y, 0), Vector3.ZERO, raiz)
	malla(cil(0.335, 0.335, 0.02), m.madera_oscura, Vector3(0, 0.48, 0), Vector3.ZERO, raiz)
	malla(cil(0.335, 0.335, 0.02), m.madera_oscura, Vector3(0, -0.48, 0), Vector3.ZERO, raiz)


func cajon(pos: Vector3, lado: float, giro := 0.0, choca := true) -> void:
	var mi := caja(pos + Vector3(0, lado * 0.5, 0), Vector3(lado, lado, lado), m.madera_caja, choca, Vector3(0, giro, 0))
	# listones de las esquinas
	for sx in [-1, 1]:
		for sz in [-1, 1]:
			var l := MeshInstance3D.new()
			var bm := BoxMesh.new()
			bm.size = Vector3(0.07, lado + 0.01, 0.07)
			l.mesh = bm
			l.material_override = m.madera_oscura
			l.position = Vector3(sx * (lado * 0.5 - 0.03), 0, sz * (lado * 0.5 - 0.03))
			mi.add_child(l)
	var d := MeshInstance3D.new()
	var bd := BoxMesh.new()
	bd.size = Vector3(lado + 0.01, 0.08, lado + 0.01)
	d.mesh = bd
	d.material_override = m.madera_oscura
	mi.add_child(d)


# ------------------------------------------------------------------ la bodega
func _bodega() -> void:
	var X := 6.0
	var Z0 := -12.0
	var H := 3.4
	# suelo y techo
	bloque(Vector3(-X - 0.4, -0.3, Z0 - 0.4), Vector3(X + 0.4, 0, 0), m.suelo_bodega)
	bloque(Vector3(-X - 0.4, H, Z0 - 0.4), Vector3(X + 0.4, H + 0.3, 0), m.madera_oscura)
	# paredes de piedra: oeste, este
	bloque(Vector3(-X - 0.4, 0, Z0 - 0.4), Vector3(-X, H, 0), m.piedra)
	bloque(Vector3(X, 0, Z0 - 0.4), Vector3(X + 0.4, H, 0), m.piedra)
	# pared norte con la ventana a la calle (entre x 1.5 y 3.5, alto 2.2 a 3.1)
	bloque(Vector3(-X, 0, Z0 - 0.4), Vector3(1.5, H, Z0), m.piedra)
	bloque(Vector3(3.5, 0, Z0 - 0.4), Vector3(X, H, Z0), m.piedra)
	bloque(Vector3(1.5, 0, Z0 - 0.4), Vector3(3.5, 2.2, Z0), m.piedra)
	bloque(Vector3(1.5, 3.1, Z0 - 0.4), Vector3(3.5, H, Z0), m.piedra)
	for i in 5:
		malla(cil(0.018, 0.018, 0.9, 8), m.hierro, Vector3(1.75 + i * 0.38, 2.65, Z0 - 0.2))
	# el pozo de luz detrás de la ventana (abierto al cielo: entra la lluvia y la luz fría de la calle)
	bloque(Vector3(1.0, 0, Z0 - 2.0), Vector3(4.0, 2.2, Z0 - 0.4), m.piedra, false)
	bloque(Vector3(1.0, 0, Z0 - 2.4), Vector3(4.0, 7.0, Z0 - 2.0), m.ladrillo_fondo, false)
	bloque(Vector3(0.6, 0, Z0 - 2.4), Vector3(1.0, 7.0, Z0 - 0.4), m.ladrillo_fondo, false)
	bloque(Vector3(4.0, 0, Z0 - 2.4), Vector3(4.4, 7.0, Z0 - 0.4), m.ladrillo_fondo, false)
	_spot(Vector3(2.5, 6.5, Z0 - 1.9), Vector3(0.2, 0.0, -7.0), Color(0.55, 0.7, 1.0), 12.0, 16.0, 20.0, true, 1.6)
	# pared sur con la puerta al callejón (x de -1 a 1, alto 2.4)
	bloque(Vector3(-X - 0.4, 0, -0.4), Vector3(-1.0, H, 0), m.piedra)
	bloque(Vector3(1.0, 0, -0.4), Vector3(X + 0.4, H, 0), m.piedra)
	bloque(Vector3(-1.0, 2.4, -0.4), Vector3(1.0, H, 0), m.piedra)
	bloque(Vector3(-1.15, 2.4, -0.5), Vector3(1.15, 2.6, 0.1), m.madera_oscura, false)   # dintel
	# vigas del techo y pilares
	for z in [-1.6, -4.2, -6.8, -9.4]:
		bloque(Vector3(-X, H - 0.32, z - 0.14), Vector3(X, H, z + 0.14), m.madera_oscura, false)
	bloque(Vector3(-0.15, H - 0.45, Z0), Vector3(0.15, H - 0.32, 0), m.madera_oscura, false)
	for p in [Vector3(-2.8, 0, -6.8), Vector3(2.8, 0, -6.8)]:
		bloque(p + Vector3(-0.28, 0, -0.28), p + Vector3(0.28, H - 0.32, 0.28), m.ladrillo_bodega)
	# barriles: echados en su soporte a lo largo de la pared oeste, de pie en la esquina del fondo
	bloque(Vector3(-X, 0, -11.6), Vector3(-X + 1.1, 0.25, -2.4), m.madera_oscura)
	for i in 7:
		var z := -11.0 + i * 1.25
		barril(Vector3(-X + 0.55, 0.65, z), Vector3(0, 0, PI / 2), false)
		if i % 2 == 0 and i < 6:
			barril(Vector3(-X + 0.55, 1.42, z + 0.62), Vector3(0, 0, PI / 2), false)
	bloque(Vector3(-X, 0, -11.6), Vector3(-X + 1.1, 1.9, -2.4), m.madera_oscura, true).visible = false   # choque del soporte
	for p in [Vector3(4.9, 0.5, -11.0), Vector3(4.1, 0.5, -11.2), Vector3(5.0, 0.5, -10.15), Vector3(4.6, 1.5, -10.7)]:
		barril(p)
	# cajas
	cajon(Vector3(4.7, 0, -1.4), 0.9, 0.1)
	cajon(Vector3(4.8, 0, -2.5), 0.8, -0.15)
	cajon(Vector3(4.75, 0.9, -1.5), 0.7, 0.3)
	cajon(Vector3(3.6, 0, -1.0), 0.6, 0.5)
	cajon(Vector3(-4.6, 0, -1.2), 0.75, 0.2)
	# mesa con botellas y una lámpara de aceite
	bloque(Vector3(1.3, 0.85, -9.0), Vector3(3.3, 0.93, -8.1), m.madera)
	for p in [Vector3(1.4, 0, -8.95), Vector3(3.2, 0, -8.95), Vector3(1.4, 0, -8.15), Vector3(3.2, 0, -8.15)]:
		bloque(p + Vector3(-0.05, 0, -0.05), p + Vector3(0.05, 0.85, 0.05), m.madera_oscura, false)
	for i in 5:
		malla(cil(0.035, 0.04, 0.3, 10), m.vidrio_botella, Vector3(1.6 + i * 0.22, 1.08, -8.6 + (i % 2) * 0.12))
	malla(cil(0.06, 0.08, 0.05, 12), m.hierro, Vector3(2.9, 0.955, -8.5))
	var llama := malla(SphereMesh.new(), _luz_mat(Color(1.0, 0.55, 0.2), 8.0), Vector3(2.9, 1.05, -8.5))
	llama.scale = Vector3(0.035, 0.07, 0.035)
	llama.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	_omni(Vector3(2.9, 1.15, -8.5), Color(1.0, 0.55, 0.25), 0.8, 4.0, false, 0.5)
	# farol de pared junto a los barriles (cálido)
	bloque(Vector3(-X, 2.05, -3.15), Vector3(-X + 0.25, 2.12, -3.05), m.hierro, false)
	malla(cil(0.09, 0.07, 0.22, 8), _std(Color(0.08, 0.08, 0.08), 0.5, 0.8), Vector3(-X + 0.3, 2.25, -3.1))
	malla(SphereMesh.new(), _luz_mat(Color(1.0, 0.6, 0.28), 10.0), Vector3(-X + 0.3, 2.1, -3.1)).scale = Vector3(0.1, 0.14, 0.1)
	_omni(Vector3(-X + 0.45, 2.0, -3.1), Color(1.0, 0.58, 0.28), 2.2, 7.5, not compat, 0.8, 0.04)
	# una tubería en el techo
	malla(cil(0.07, 0.07, 12.0, 12), m.hierro_oxido, Vector3(X - 0.2, H - 0.6, -6.0), Vector3(PI / 2, 0, 0))
	# el foco colgante (cálido) que se mece un poco
	foco_pivote = Node3D.new()
	foco_pivote.position = Vector3(0.3, H - 0.45, -5.6)
	add_child(foco_pivote)
	malla(cil(0.006, 0.006, 0.7, 6), m.cuerda, Vector3(0, -0.35, 0), Vector3.ZERO, foco_pivote)
	malla(cil(0.025, 0.03, 0.08, 10), m.hierro, Vector3(0, -0.72, 0), Vector3.ZERO, foco_pivote)
	var plato := malla(cil(0.04, 0.24, 0.12, 20), m.verde, Vector3(0, -0.8, 0), Vector3.ZERO, foco_pivote)
	plato.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	var bombilla := SphereMesh.new()
	bombilla.radius = 0.06
	bombilla.height = 0.13
	var b := malla(bombilla, _luz_mat(Color(1.0, 0.75, 0.45), 14.0), Vector3(0, -0.9, 0), Vector3.ZERO, foco_pivote)
	b.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	foco_luz = OmniLight3D.new()
	foco_luz.position = Vector3(0, -0.98, 0)
	foco_luz.light_color = Color(1.0, 0.68, 0.38)
	foco_luz.light_energy = 4.5
	foco_luz.omni_range = 11.0
	foco_luz.omni_attenuation = 1.3
	foco_luz.shadow_enabled = true
	foco_luz.light_size = 0.06
	foco_luz.light_volumetric_fog_energy = 0.6
	foco_pivote.add_child(foco_luz)
	if compat:
		_omni(Vector3(-3.5, 2.2, -9.5), Color(1.0, 0.6, 0.35), 0.8, 7.0)
		_omni(Vector3(3.5, 2.0, -3.0), Color(1.0, 0.6, 0.35), 0.6, 6.0)
		var rayo := MeshInstance3D.new()
		rayo.mesh = cil(0.5, 1.6, 7.5, 16)
		rayo.material_override = _sm("res://shaders/rayo_luz.gdshader", {})
		rayo.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
		add_child(rayo)
		rayo.look_at_from_position(Vector3(1.4, 1.4, -10.0), Vector3(2.5, 6.5, -13.9), Vector3.UP)
		rayo.rotate_object_local(Vector3.RIGHT, -PI / 2)


# ------------------------------------------------------------------ el callejón
func _callejon() -> void:
	var L := 36.0
	bloque(Vector3(-4.0, -0.3, 0), Vector3(4.0, 0, L), m.suelo_calle)
	# fachadas: izquierda (ladrillo rojo, 13 m) y derecha (ladrillo claro, 10 m); arriba de la bodega, otra
	bloque(Vector3(-4.6, 0, 0), Vector3(-3.5, 13.0, L), m.ladrillo_izq)
	bloque(Vector3(3.5, 0, 0), Vector3(4.6, 10.0, L), m.ladrillo_der)
	bloque(Vector3(-3.5, 3.4, -0.4), Vector3(3.5, 12.0, 0), m.ladrillo_izq, false)
	bloque(Vector3(-3.7, 12.9, 0), Vector3(-3.3, 13.2, L), m.piedra, false)
	bloque(Vector3(3.3, 9.9, 0), Vector3(3.7, 10.2, L), m.piedra, false)
	# fondo: un muro bajo y, detrás, la calle con su farola y un edificio con ventanas
	bloque(Vector3(-3.5, 0, L), Vector3(3.5, 3.2, L + 0.4), m.ladrillo_fondo)
	bloque(Vector3(-16, -0.3, L + 0.4), Vector3(16, 0, L + 14), m.suelo_calle, false)
	bloque(Vector3(-16, 0, L + 12), Vector3(16, 18, L + 13), m.ladrillo_fondo, false)
	for i in 8:
		for j in 4:
			if (i * 3 + j * 5) % 4 != 0:
				_ventana(Vector3(-12.0 + i * 3.4, 4.0 + j * 3.4, L + 11.98), Vector3(0, 0, -1), (i + j) % 3 != 0)
	malla(cil(0.07, 0.09, 5.5, 10), m.hierro, Vector3(-1.5, 2.75, L + 3.0))
	malla(BoxMesh.new(), _luz_mat(Color(0.75, 0.85, 1.0), 10.0), Vector3(-1.5, 5.5, L + 3.0)).scale = Vector3(0.35, 0.12, 0.25)
	_omni(Vector3(-1.5, 5.3, L + 3.0), Color(0.62, 0.75, 1.0), 5.0, 18.0, not compat, 2.0)
	# ventanas en las dos fachadas (algunas encendidas, con cortinas)
	for piso in 3:
		for k in 9:
			var z := 2.5 + k * 3.7
			_ventana(Vector3(-3.5, 4.4 + piso * 3.0, z), Vector3(1, 0, 0), rng.randf() < 0.6)
			if piso < 2:
				_ventana(Vector3(3.5, 4.4 + piso * 3.0, z + 1.2), Vector3(-1, 0, 0), rng.randf() < 0.6)
	# escaleras de incendio en la fachada izquierda
	_escalera_incendio(5.0, 10.0)
	_escalera_incendio(19.0, 24.0)
	# planta baja izquierda: puerta de metal, contenedor de basura, bolsas, tubería
	bloque(Vector3(-3.55, 0, 13.2), Vector3(-3.42, 2.3, 14.4), m.hierro_oxido, false)
	_contenedor(Vector3(-2.7, 0, 16.2))
	for p in [Vector3(-2.9, 0.22, 18.0), Vector3(-2.5, 0.18, 18.5), Vector3(-3.0, 0.2, 18.9)]:
		var bolsa := malla(SphereMesh.new(), m.basura, p)
		bolsa.scale = Vector3(0.55, 0.42, 0.5)
	for z in [3.2, 11.8, 27.5]:
		malla(cil(0.07, 0.07, 13.0, 10), m.hierro, Vector3(-3.4, 6.5, z))
	# planta baja derecha: el Bar El Trébol
	_bar(Vector3(3.5, 0, 13.0))
	cajon(Vector3(2.7, 0, 22.5), 0.85, 0.3)
	cajon(Vector3(2.8, 0, 23.5), 0.7, -0.2)
	cajon(Vector3(2.75, 0.85, 22.6), 0.6, 0.6)
	barril(Vector3(2.85, 0.5, 9.0))
	# el foco enjaulado sobre la puerta de la bodega (cálido)
	malla(cil(0.07, 0.05, 0.14, 10), m.hierro, Vector3(0, 2.95, 0.12))
	malla(SphereMesh.new(), _luz_mat(Color(1.0, 0.7, 0.4), 12.0), Vector3(0, 2.83, 0.15)).scale = Vector3(0.1, 0.12, 0.1)
	_omni(Vector3(0, 2.7, 0.45), Color(1.0, 0.62, 0.32), 2.4, 8.0, true, 1.5)
	# la lámpara fría de pared, a media calle: hace los rayos de luz con la lluvia
	bloque(Vector3(-3.5, 4.35, 26.6), Vector3(-2.8, 4.45, 26.75), m.hierro, false)
	malla(cil(0.05, 0.22, 0.16, 16), m.verde, Vector3(-2.8, 4.32, 26.68))
	malla(SphereMesh.new(), _luz_mat(Color(0.8, 0.9, 1.0), 12.0), Vector3(-2.8, 4.22, 26.68)).scale = Vector3(0.12, 0.08, 0.12)
	_spot(Vector3(-2.8, 4.15, 26.68), Vector3(-1.4, 0.0, 27.5), Color(0.62, 0.76, 1.0), 9.0, 11.0, 50.0, true, 3.0)
	# dos faroles de pared más (cálidos) para que se lean las fachadas
	for lp in [Vector3(3.5, 4.0, 5.5), Vector3(3.5, 4.0, 30.0)]:
		bloque(lp + Vector3(-0.6, 0.15, -0.06), lp + Vector3(0, 0.22, 0.06), m.hierro, false)
		malla(SphereMesh.new(), _luz_mat(Color(1.0, 0.72, 0.42), 10.0), lp + Vector3(-0.6, 0.0, 0)).scale = Vector3(0.14, 0.18, 0.14)
		_omni(lp + Vector3(-0.75, -0.1, 0), Color(1.0, 0.66, 0.36), 2.6, 9.0, not compat and lp.z < 10.0, 1.2)
	# cables y ropa tendida de lado a lado
	for z in [8.0, 21.5]:
		malla(cil(0.008, 0.008, 7.0, 4), m.cuerda, Vector3(0, 7.8, z), Vector3(0, 0, PI / 2))
		var colores := [Color(0.7, 0.15, 0.12), Color(0.85, 0.82, 0.72), Color(0.2, 0.3, 0.5), Color(0.75, 0.6, 0.2)]
		for i in 5:
			var ropa := MeshInstance3D.new()
			var q := QuadMesh.new()
			q.size = Vector2(rng.randf_range(0.4, 0.7), rng.randf_range(0.5, 0.9))
			ropa.mesh = q
			var mat := _std(colores[i % 4], 0.95)
			mat.cull_mode = BaseMaterial3D.CULL_DISABLED
			ropa.material_override = mat
			ropa.position = Vector3(-2.6 + i * 1.25, 7.8 - q.size.y * 0.5, z)
			ropa.rotation.y = rng.randf_range(-0.2, 0.2)
			add_child(ropa)
	malla(cil(0.012, 0.012, 7.5, 4), m.cuerda, Vector3(0, 9.3, 14.5), Vector3(0, 0.3, PI / 2))
	# rejilla con vapor (alcantarilla) y aire acondicionado que gotea
	bloque(Vector3(-1.4, 0.0, 29.4), Vector3(-0.4, 0.02, 30.2), m.hierro, false)
	_vapor(Vector3(-0.9, 0.05, 29.8))
	bloque(Vector3(3.0, 6.0, 17.5), Vector3(3.5, 6.6, 18.5), _std(Color(0.55, 0.55, 0.52), 0.5, 0.3), false)


func _ventana(c: Vector3, n: Vector3, encendida: bool) -> void:
	# c = centro sobre la fachada; n = hacia dónde mira la fachada
	var lado := Vector3(-n.z, 0, n.x)   # a lo ancho de la ventana
	var w := 1.0
	var h := 1.45
	var raiz := Node3D.new()
	add_child(raiz)
	raiz.position = c
	raiz.basis = Basis(lado, Vector3.UP, n)
	var vidrio := MeshInstance3D.new()
	var q := QuadMesh.new()
	q.size = Vector2(w, h)
	vidrio.mesh = q
	vidrio.position = Vector3(0, 0, 0.02)
	raiz.add_child(vidrio)
	if encendida:
		var tv := rng.randf() < 0.15
		var col := Color(0.55, 0.7, 1.0) if tv else Color(1.0, 0.68, 0.36).lerp(Color(1.0, 0.82, 0.55), rng.randf())
		vidrio.material_override = _luz_mat(col, rng.randf_range(2.5, 4.5))
		# cortinas (a veces solo una, a veces corridas a medias)
		var tela := Color(0.6, 0.15, 0.1) if rng.randf() < 0.5 else Color(0.75, 0.6, 0.35)
		var mc := _luz_mat(tela, 0.9)
		mc.albedo_color = tela * 0.5
		for s in ([-1, 1] if rng.randf() < 0.7 else [-1]):
			var cort := MeshInstance3D.new()
			var cq := QuadMesh.new()
			var ancho := rng.randf_range(0.2, 0.45)
			cq.size = Vector2(ancho, h - 0.05)
			cort.mesh = cq
			cort.material_override = mc
			cort.position = Vector3(s * (w * 0.5 - ancho * 0.5), 0, 0.03)
			raiz.add_child(cort)
	else:
		vidrio.material_override = m.cristal_oscuro
	# marco y repisa
	for p in [[Vector3(0, h * 0.5 + 0.05, 0.06), Vector3(w + 0.2, 0.1, 0.12)], [Vector3(0, -h * 0.5 - 0.06, 0.08), Vector3(w + 0.3, 0.1, 0.18)],
			[Vector3(-w * 0.5 - 0.05, 0, 0.06), Vector3(0.1, h, 0.12)], [Vector3(w * 0.5 + 0.05, 0, 0.06), Vector3(0.1, h, 0.12)], [Vector3(0, 0.1, 0.045), Vector3(w, 0.04, 0.05)], [Vector3(0, 0, 0.045), Vector3(0.04, h, 0.05)]]:
		var b := MeshInstance3D.new()
		var bm := BoxMesh.new()
		bm.size = p[1]
		b.mesh = bm
		b.material_override = m.marco
		b.position = p[0]
		raiz.add_child(b)


func _escalera_incendio(z0: float, z1: float) -> void:
	var x0 := -3.5
	var x1 := -2.3
	for y in [3.9, 6.9, 9.9]:
		bloque(Vector3(x0, y - 0.05, z0), Vector3(x1, y, z1), m.hierro, false)
		bloque(Vector3(x1 - 0.04, y + 0.95, z0), Vector3(x1, y + 1.0, z1), m.hierro, false)
		bloque(Vector3(x1 - 0.04, y + 0.48, z0), Vector3(x1, y + 0.52, z1), m.hierro, false)
		for zz in [z0, z1 - 0.04]:
			bloque(Vector3(x0, y + 0.95, zz), Vector3(x1, y + 1.0, zz + 0.04), m.hierro, false)
		var n := int((z1 - z0) / 0.5)
		for i in n + 1:
			var z := z0 + i * (z1 - z0) / n
			bloque(Vector3(x1 - 0.03, y, z - 0.015), Vector3(x1, y + 1.0, z + 0.015), m.hierro, false)
		# ménsulas
		for zz in [z0 + 0.3, z1 - 0.3]:
			var b := caja(Vector3((x0 + x1) * 0.5, y - 0.35, zz), Vector3(0.04, 0.04, 1.6), m.hierro, false, Vector3(0, PI / 2, 0.6))
			b.rotation = Vector3(0, PI / 2, 0)
			b.rotate_object_local(Vector3.RIGHT, 0.55)
	# tramos de escalera entre pisos (en diagonal)
	for y in [3.9, 6.9]:
		var largo := Vector2(z1 - z0 - 1.0, 3.0).length()
		var ang := atan2(3.0, z1 - z0 - 1.0)
		var c := Vector3(-2.9, y + 1.5, (z0 + z1) * 0.5 + 0.3)
		var e := caja(c, Vector3(0.6, 0.05, largo), m.hierro, false)
		e.rotation = Vector3(ang, 0, 0)
		for s in [-1, 1]:
			var lado := caja(c + Vector3(s * 0.3, 0.45, 0), Vector3(0.03, 0.03, largo), m.hierro, false)
			lado.rotation = Vector3(ang, 0, 0)
	# escalerilla que cuelga al suelo
	for s in [-1, 1]:
		bloque(Vector3(-2.65 + s * 0.2 - 0.015, 1.7, z1 - 0.3), Vector3(-2.65 + s * 0.2 + 0.015, 3.9, z1 - 0.27), m.hierro, false)
	for i in 8:
		bloque(Vector3(-2.85, 1.8 + i * 0.27, z1 - 0.3), Vector3(-2.45, 1.82 + i * 0.27, z1 - 0.27), m.hierro, false)


func _contenedor(p: Vector3) -> void:
	caja(p + Vector3(0, 0.6, 0), Vector3(1.2, 1.1, 2.0), m.verde)
	caja(p + Vector3(0.05, 1.2, 0), Vector3(1.3, 0.06, 2.1), m.verde, false, Vector3(0, 0, -0.12))
	for z in [-0.8, 0.8]:
		malla(cil(0.07, 0.07, 0.06, 10), m.hierro, p + Vector3(0.45, 0.04, z), Vector3(0, 0, PI / 2))


func _bar(p: Vector3) -> void:
	# fachada de madera pintada, puerta y vitrina encendida
	bloque(p + Vector3(-0.08, 0, -0.4), p + Vector3(0, 3.0, 5.2), _std(Color(0.08, 0.18, 0.12), 0.45, 0.1), false)
	bloque(p + Vector3(-0.12, 0, 0.3), p + Vector3(-0.08, 2.3, 1.4), m.madera_oscura, false)
	malla(QuadMesh.new(), _luz_mat(Color(1.0, 0.7, 0.4), 2.5), p + Vector3(-0.125, 1.75, 0.85), Vector3(0, -PI / 2, 0)).scale = Vector3(0.6, 0.6, 1)
	malla(QuadMesh.new(), _luz_mat(Color(1.0, 0.62, 0.32), 2.2), p + Vector3(-0.09, 1.45, 3.3), Vector3(0, -PI / 2, 0)).scale = Vector3(2.6, 1.5, 1)
	bloque(p + Vector3(-0.14, 0.62, 1.95), p + Vector3(-0.08, 0.7, 4.65), m.madera_oscura, false)
	var abierto := Label3D.new()
	abierto.text = "ABIERTO"
	abierto.font_size = 48
	abierto.pixel_size = 0.005
	abierto.modulate = Color(1.0, 0.95, 0.85)
	abierto.outline_size = 8
	abierto.outline_modulate = Color(0.3, 0.05, 0.02)
	abierto.position = p + Vector3(-0.1, 1.9, 3.3)
	abierto.rotation = Vector3(0, -PI / 2, 0)
	add_child(abierto)
	_omni(p + Vector3(-1.2, 1.6, 3.2), Color(1.0, 0.6, 0.3), 2.2, 6.5, false, 1.0)
	# letrero colgante «Bar El Trébol» (de madera pintada, con su lamparita)
	var x := p.x
	bloque(Vector3(x - 1.5, 3.62, p.z - 0.03), Vector3(x, 3.67, p.z + 0.03), m.hierro, false)
	var tabla := caja(Vector3(x - 0.85, 3.15, p.z), Vector3(1.2, 0.75, 0.06), _std(Color(0.06, 0.2, 0.11), 0.55), false)
	tabla.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	caja(Vector3(x - 0.85, 3.15, p.z), Vector3(1.28, 0.83, 0.04), _std(Color(0.55, 0.42, 0.18), 0.4, 0.8), false)
	for s in [-1, 1]:
		bloque(Vector3(x - 0.85 + s * 0.45 - 0.01, 3.52, p.z - 0.01), Vector3(x - 0.85 + s * 0.45 + 0.01, 3.62, p.z + 0.01), m.hierro, false)
		for txt in [["BAR", 3.32, 40], ["El Trébol", 3.08, 56]]:
			var l := Label3D.new()
			l.text = txt[0]
			l.font_size = txt[2]
			l.pixel_size = 0.004
			l.modulate = Color(0.98, 0.88, 0.55)
			l.outline_size = 0
			l.shaded = true
			l.double_sided = false
			l.position = Vector3(x - 0.85, txt[1] - 0.06, p.z + s * 0.04)
			l.rotation = Vector3(0, 0 if s > 0 else PI, 0)
			add_child(l)
	malla(cil(0.03, 0.1, 0.1, 12), m.verde, Vector3(x - 0.85, 3.85, p.z + 0.35), Vector3(-0.6, 0, 0))
	_spot(Vector3(x - 0.85, 3.85, p.z + 0.4), Vector3(x - 0.85, 3.0, p.z), Color(1.0, 0.75, 0.45), 4.0, 2.2, 55.0, false, 0.5)
	_spot(Vector3(x - 0.85, 3.85, p.z - 0.4), Vector3(x - 0.85, 3.0, p.z), Color(1.0, 0.75, 0.45), 4.0, 2.2, 55.0, false, 0.5)


func _textura_humo() -> GradientTexture2D:
	var g := GradientTexture2D.new()
	g.width = 64
	g.height = 64
	g.fill = GradientTexture2D.FILL_RADIAL
	g.fill_from = Vector2(0.5, 0.5)
	g.fill_to = Vector2(1.0, 0.5)
	var gr := Gradient.new()
	gr.set_color(0, Color(1, 1, 1, 1))
	gr.set_color(1, Color(1, 1, 1, 0))
	g.gradient = gr
	return g


func _vapor(p: Vector3) -> void:
	var v := GPUParticles3D.new()
	v.amount = 36
	v.lifetime = 4.5
	v.preprocess = 4.5
	v.position = p
	v.visibility_aabb = AABB(Vector3(-3, 0, -3), Vector3(6, 8, 6))
	var pm := ParticleProcessMaterial.new()
	pm.emission_shape = ParticleProcessMaterial.EMISSION_SHAPE_BOX
	pm.emission_box_extents = Vector3(0.4, 0.02, 0.3)
	pm.direction = Vector3(0, 1, 0)
	pm.spread = 12.0
	pm.initial_velocity_min = 0.5
	pm.initial_velocity_max = 0.9
	pm.gravity = Vector3(0.12, 0.05, 0.05)
	pm.damping_min = 0.05
	pm.damping_max = 0.1
	pm.angle_min = 0
	pm.angle_max = 360
	pm.scale_min = 0.6
	pm.scale_max = 1.0
	var sc := CurveTexture.new()
	var cu := Curve.new()
	cu.add_point(Vector2(0, 0.4))
	cu.add_point(Vector2(1, 2.6))
	sc.curve = cu
	pm.scale_curve = sc
	var cr := GradientTexture1D.new()
	var gr := Gradient.new()
	gr.offsets = PackedFloat32Array([0.0, 0.15, 1.0])
	gr.colors = PackedColorArray([Color(1, 1, 1, 0), Color(1, 1, 1, 0.22), Color(1, 1, 1, 0)])
	cr.gradient = gr
	pm.color_ramp = cr
	v.process_material = pm
	var q := QuadMesh.new()
	q.size = Vector2(1.2, 1.2)
	var mat := StandardMaterial3D.new()
	mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	mat.vertex_color_use_as_albedo = true
	mat.albedo_texture = _textura_humo()
	mat.albedo_color = Color(0.8, 0.82, 0.85)
	mat.roughness = 1.0
	q.material = mat
	v.draw_pass_1 = q
	v.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	add_child(v)
	if not compat:
		var fv := FogVolume.new()
		fv.shape = RenderingServer.FOG_VOLUME_SHAPE_ELLIPSOID
		fv.size = Vector3(1.6, 5.0, 1.6)
		fv.position = p + Vector3(0.2, 2.0, 0)
		var fm := FogMaterial.new()
		fm.density = 0.35
		fm.albedo = Color(0.9, 0.9, 0.95)
		fv.material = fm
		add_child(fv)


func _lluvia() -> void:
	var cuanto := 1400 if compat else 3200
	_lluvia_en(Vector3(0, 14, 18), Vector3(3.6, 0.5, 18), cuanto)
	_lluvia_en(Vector3(2.5, 8, -13.2), Vector3(1.4, 0.3, 0.8), 200)
	_lluvia_en(Vector3(0, 14, 42), Vector3(10, 0.5, 6), cuanto / 3)
	# salpicaduras en el suelo
	var s := GPUParticles3D.new()
	s.amount = 700 if not compat else 300
	s.lifetime = 0.25
	s.position = Vector3(0, 0.02, 18)
	s.visibility_aabb = AABB(Vector3(-5, -1, -19), Vector3(10, 3, 38))
	var pm := ParticleProcessMaterial.new()
	pm.emission_shape = ParticleProcessMaterial.EMISSION_SHAPE_BOX
	pm.emission_box_extents = Vector3(3.4, 0.0, 17.8)
	pm.direction = Vector3(0, 1, 0)
	pm.spread = 35.0
	pm.initial_velocity_min = 0.6
	pm.initial_velocity_max = 1.4
	pm.gravity = Vector3(0, -9.8, 0)
	pm.scale_min = 0.5
	pm.scale_max = 1.0
	s.process_material = pm
	var q := QuadMesh.new()
	q.size = Vector2(0.025, 0.04)
	var mat := StandardMaterial3D.new()
	mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat.billboard_mode = BaseMaterial3D.BILLBOARD_ENABLED
	mat.albedo_color = Color(0.75, 0.8, 0.9, 0.35)
	q.material = mat
	s.draw_pass_1 = q
	s.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	add_child(s)


func _lluvia_en(c: Vector3, ext: Vector3, cuanto: int) -> void:
	var r := GPUParticles3D.new()
	r.amount = cuanto
	r.lifetime = 1.1
	r.preprocess = 1.5
	r.position = c
	r.visibility_aabb = AABB(Vector3(-ext.x - 1, -c.y - 1, -ext.z - 1), Vector3(ext.x * 2 + 2, c.y + 2, ext.z * 2 + 2))
	var pm := ParticleProcessMaterial.new()
	pm.emission_shape = ParticleProcessMaterial.EMISSION_SHAPE_BOX
	pm.emission_box_extents = ext
	pm.direction = Vector3(0.05, -1, 0.02)
	pm.spread = 1.5
	pm.initial_velocity_min = 12.0
	pm.initial_velocity_max = 15.0
	pm.gravity = Vector3(0, -2, 0)
	r.process_material = pm
	var q := QuadMesh.new()
	q.size = Vector2(0.008, 0.42)
	var mat := StandardMaterial3D.new()
	mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat.billboard_mode = BaseMaterial3D.BILLBOARD_FIXED_Y
	mat.albedo_color = Color(0.7, 0.75, 0.85, 0.12)
	q.material = mat
	r.draw_pass_1 = q
	r.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	add_child(r)


# ------------------------------------------------------------------ zombis
func _nuevo_zombi(p: Vector3) -> void:
	var z := Zombi.new()
	z.construir(rng)
	z.objetivo = jugador
	add_child(z)
	z.global_position = p
	z.murio.connect(_zombi_murio)
	zombis.append(z)


func _zombi_murio(z) -> void:
	zombis.erase(z)
	vencidos += 1
	_actualizar_hud()
	# vuelve a salir otro, lejos del jugador
	get_tree().create_timer(4.0).timeout.connect(func():
		var lejos := APARECE.filter(func(q): return q.distance_to(jugador.global_position) > 9.0)
		if lejos.size() > 0:
			_nuevo_zombi(lejos[rng.randi() % lejos.size()]))


# ------------------------------------------------------------------ la pantalla (textos)
func _etiqueta(txt: String, tam: int, pos: Vector2, padre: Control) -> Label:
	var l := Label.new()
	l.text = txt
	var ls := LabelSettings.new()
	ls.font_size = tam
	ls.outline_size = 6
	ls.outline_color = Color(0, 0, 0, 0.85)
	ls.shadow_color = Color(0, 0, 0, 0.5)
	ls.shadow_offset = Vector2(2, 2)
	l.label_settings = ls
	l.position = pos
	padre.add_child(l)
	return l


func _pantalla() -> void:
	var capa := CanvasLayer.new()
	add_child(capa)
	var raiz := Control.new()
	raiz.set_anchors_preset(Control.PRESET_FULL_RECT)
	raiz.mouse_filter = Control.MOUSE_FILTER_IGNORE
	capa.add_child(raiz)
	rojo = ColorRect.new()
	rojo.color = Color(0.7, 0.0, 0.0, 0.0)
	rojo.set_anchors_preset(Control.PRESET_FULL_RECT)
	rojo.mouse_filter = Control.MOUSE_FILTER_IGNORE
	raiz.add_child(rojo)
	var titulo := _etiqueta("Sala de prueba en Godot", 30, Vector2(24, 16), raiz)
	titulo.label_settings.font_color = Color(1.0, 0.85, 0.5)
	_etiqueta("Las Bodegas · la bodega y el callejón del Bar El Trébol", 18, Vector2(24, 56), raiz)
	var motor := "Forward+ (computadora)" if not compat else "Compatibilidad (navegador)"
	lbl_fps = _etiqueta("Motor gráfico: " + motor, 16, Vector2(24, 82), raiz)
	var ayuda := _etiqueta("Clic: empezar y disparar   ·   W A S D: caminar   ·   Mayús: correr   ·   Espacio: saltar   ·   R: recargar   ·   Esc: soltar el ratón\nEn el teléfono: arrastra a la izquierda para caminar, a la derecha para mirar; toca a la derecha para disparar", 15, Vector2.ZERO, raiz)
	_anclar(ayuda, 0, 1, 1, 1, Rect2(24, -64, -24, -12))
	lbl_balas = _etiqueta("", 22, Vector2.ZERO, raiz)
	lbl_balas.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	_anclar(lbl_balas, 1, 0, 1, 0, Rect2(-420, 16, -24, 110))
	var mira := _etiqueta("+", 28, Vector2.ZERO, raiz)
	mira.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	mira.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	_anclar(mira, 0, 0, 1, 1, Rect2(0, 0, 0, 0))
	aviso = _etiqueta("Haz clic (o toca la pantalla) para empezar", 26, Vector2.ZERO, raiz)
	aviso.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_anclar(aviso, 0, 0.5, 1, 0.5, Rect2(0, 60, 0, 110))
	jugador.cambio_balas.connect(func(_b): _actualizar_hud())
	jugador.golpeado.connect(_golpe)
	_actualizar_hud()
	if fotos_dir != "":
		aviso.visible = false


## Pega un texto a la pantalla: anclas (izquierda, arriba, derecha, abajo) entre 0 y 1 y márgenes en píxeles.
func _anclar(c: Control, al: float, at: float, ar: float, ab: float, o: Rect2) -> void:
	c.anchor_left = al
	c.anchor_top = at
	c.anchor_right = ar
	c.anchor_bottom = ab
	c.offset_left = o.position.x
	c.offset_top = o.position.y
	c.offset_right = o.size.x
	c.offset_bottom = o.size.y


func _actualizar_hud() -> void:
	lbl_balas.text = "Balas: %d / 6\nZombis vencidos: %d\nVida: %d" % [jugador.balas, vencidos, jugador.vida]


func _golpe(_vida: int) -> void:
	_actualizar_hud()
	rojo.color.a = 0.35
	create_tween().tween_property(rojo, "color:a", 0.0, 0.5)


func _process(dt: float) -> void:
	t += dt
	# el foco se mece y a veces parpadea
	foco_pivote.rotation.z = sin(t * 0.9) * 0.05
	foco_pivote.rotation.x = sin(t * 0.7 + 1.0) * 0.035
	var parpadeo := 1.0
	if fmod(t, 7.3) > 7.0:
		parpadeo = 0.35 + 0.65 * float(sin(t * 60.0) > 0.0)
	foco_luz.light_energy = 4.5 * parpadeo
	if aviso.visible and (Input.mouse_mode == Input.MOUSE_MODE_CAPTURED or jugador.dedo_mover >= 0 or jugador.dedo_mirar >= 0):
		aviso.visible = false
	if fotos_dir == "" and Engine.get_process_frames() % 30 == 0:
		var motor := "Forward+ (computadora)" if not compat else "Compatibilidad (navegador)"
		lbl_fps.text = "Motor gráfico: %s   ·   %d cuadros por segundo" % [motor, Engine.get_frames_per_second()]


# ------------------------------------------------------------------ fotos (sin jugar)
func _sacar_fotos() -> void:
	jugador.bloqueado = true
	for z in zombis:
		z.quieto = true
	var vistas := [
		["bodega", Vector3(-4.6, 0, -1.4), Vector3(1.5, 1.3, -10.5), [[Vector3(-0.9, 0, -6.6), 0.7], [Vector3(1.4, 0, -7.4), -0.2]]],
		["callejon", Vector3(0.3, 0, 1.2), Vector3(0.0, 2.2, 30.0), [[Vector3(-0.8, 0, 11.0), PI + 0.2], [Vector3(1.2, 0, 16.5), PI - 0.3], [Vector3(-1.4, 0, 24.0), PI]]],
		["callejon_vuelta", Vector3(1.4, 0, 31.0), Vector3(-0.2, 2.6, 0.0), [[Vector3(-0.5, 0, 21.0), 0.1], [Vector3(1.4, 0, 17.0), -0.2]]],
	]
	var solo := ""
	for a in OS.get_cmdline_user_args():
		if a.begins_with("--solo="):
			solo = a.substr(7)
	for v in vistas:
		if solo != "" and v[0] != solo:
			continue
		jugador.global_position = v[1]
		jugador.mirar_a(v[2])
		for i in zombis.size():
			var z = zombis[i]
			if i < v[3].size():
				z.visible = true
				z.global_position = v[3][i][0]
				z.rotation.y = v[3][i][1]
			else:
				z.visible = false
				z.global_position = Vector3(0, -50 - i * 3, 0)
		for f in 110:
			await get_tree().process_frame
		var img := get_viewport().get_texture().get_image()
		img.save_png(fotos_dir.path_join(v[0] + ".png"))
		print("foto guardada: ", v[0])
	get_tree().quit()


# ------------------------------------------------------------------ prueba automática (sin pantalla): ¿caminan los zombis y caen de un disparo?
func _prueba() -> void:
	var antes := zombis.map(func(z): return z.global_position)
	var lejos_antes: float = zombis[2].global_position.distance_to(jugador.global_position)
	await get_tree().create_timer(4.0).timeout
	var movidos := 0
	for i in zombis.size():
		if zombis[i].global_position.distance_to(antes[i]) > 1.0:
			movidos += 1
	print("PRUEBA zombis que caminaron: ", movidos, " de ", zombis.size())
	var z = zombis[2]
	print("PRUEBA el zombi de la bodega se acercó: ", lejos_antes, " -> ", z.global_position.distance_to(jugador.global_position))
	jugador.mirar_a(z.global_position + Vector3(0, 1.2, 0))
	await get_tree().physics_frame
	jugador.disparar()
	print("PRUEBA disparo: el zombi cayó = ", not z.vivo, " · balas = ", jugador.balas)
	get_tree().quit()
