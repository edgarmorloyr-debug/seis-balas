// Madera con vetas y tablas (vigas, cajas, barriles, letrero).
shader_type spatial;
#include "res://shaders/ruido.gdshaderinc"

uniform vec3 color_a : source_color = vec3(0.42, 0.27, 0.15);
uniform vec3 color_b : source_color = vec3(0.24, 0.14, 0.07);
uniform float ancho_tabla = 0.14;
uniform bool usar_uv = false;       // barriles: usa las coordenadas propias de la malla
uniform vec2 escala_uv = vec2(3.0, 1.0);
uniform float vertical = 0.0;       // 1 = vetas a lo alto (duelas de un barril)

varying vec3 wpos;
varying vec3 wnor;

void vertex() {
	wpos = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
	wnor = normalize((MODEL_MATRIX * vec4(NORMAL, 0.0)).xyz);
}

void fragment() {
	vec2 uv; vec3 eu; vec3 ev;
	if (usar_uv) {
		uv = UV * escala_uv;
	} else {
		plano(wpos, wnor, uv, eu, ev);
	}
	if (vertical > 0.5) {
		uv = uv.yx;
	}
	float tabla = floor(uv.y / ancho_tabla);
	float fy = fract(uv.y / ancho_tabla);
	float h = hash12(vec2(tabla, 2.0));
	float veta = fbm(vec2(uv.x * 1.2 + h * 10.0, uv.y * 28.0));
	float anillos = sin((uv.y * 60.0 + veta * 9.0)) * 0.5 + 0.5;
	vec3 col = mix(color_a, color_b, clamp(anillos * 0.6 + veta * 0.5, 0.0, 1.0));
	col *= 0.8 + 0.4 * h;
	float ranura = smoothstep(0.0, 0.06, fy) * smoothstep(1.0, 0.94, fy);
	col *= mix(0.35, 1.0, ranura);
	col *= 0.75 + 0.35 * fbm(uv * 2.0);
	ALBEDO = col;
	ROUGHNESS = mix(0.9, 0.62, anillos * 0.5);
	SPECULAR = 0.35;
	AO = mix(0.5, 1.0, ranura);
	AO_LIGHT_AFFECT = 0.4;
}
