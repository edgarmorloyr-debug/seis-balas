// Rayo de luz falso (solo en la versión web, que no tiene niebla volumétrica).
shader_type spatial;
render_mode unshaded, blend_add, depth_draw_never, cull_disabled, shadows_disabled;

uniform vec3 color : source_color = vec3(0.5, 0.65, 1.0);
uniform float fuerza = 0.12;

void fragment() {
	float borde = pow(1.0 - abs(dot(NORMAL, VIEW)), 2.0);
	float largo = smoothstep(0.0, 0.25, UV.y) * (1.0 - UV.y);
	ALBEDO = color * fuerza * (1.0 - borde) * largo;
}
