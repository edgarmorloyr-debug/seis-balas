// Ladrillo o piedra de pared, dibujado con matemáticas (sin imágenes).
shader_type spatial;
#include "res://shaders/ruido.gdshaderinc"

uniform vec3 color_a : source_color = vec3(0.45, 0.22, 0.15);
uniform vec3 color_b : source_color = vec3(0.30, 0.14, 0.10);
uniform vec3 color_junta : source_color = vec3(0.32, 0.30, 0.27);
uniform vec2 tam = vec2(0.30, 0.10);      // ancho y alto de cada ladrillo (m)
uniform float junta = 0.012;              // grosor de la junta (m)
uniform float relieve = 0.6;
uniform float mojado = 0.0;               // 0 seco, 1 mojado por la lluvia
uniform float piedra = 0.0;               // 1 = bloques de piedra irregulares

varying vec3 wpos;
varying vec3 wnor;

void vertex() {
	wpos = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
	wnor = normalize((MODEL_MATRIX * vec4(NORMAL, 0.0)).xyz);
}

float altura(vec2 uv, out vec2 celda) {
	float fila = floor(uv.y / tam.y);
	float desplaza = mod(fila, 2.0) * 0.5 + piedra * hash12(vec2(fila, 3.1)) * 0.7;
	vec2 q = vec2(uv.x / tam.x + desplaza, uv.y / tam.y);
	celda = floor(q);
	vec2 f = fract(q) * tam;
	float d = min(min(f.x, tam.x - f.x), min(f.y, tam.y - f.y));
	float borde = smoothstep(junta * 0.5, junta * 1.6 + piedra * 0.02, d);
	float n = fbm(uv * 9.0) * 0.25 + piedra * fbm(uv * 3.0 + celda) * 0.5;
	return borde * (0.75 + n);
}

void fragment() {
	vec2 uv; vec3 eu; vec3 ev;
	plano(wpos, wnor, uv, eu, ev);
	vec2 celda;
	float h = altura(uv, celda);
	vec2 c2;
	float e = 0.004;
	float hx = altura(uv + vec2(e, 0.0), c2);
	float hy = altura(uv + vec2(0.0, e), c2);
	vec2 g = vec2(hx - h, hy - h) / e;

	float var = hash12(celda);
	float manchas = fbm(uv * 1.3 + 7.0);
	vec3 ladrillo = mix(color_a, color_b, var) * (0.7 + 0.6 * fbm(uv * 14.0 + celda));
	ladrillo *= mix(0.75, 1.1, manchas);
	float es_junta = 1.0 - smoothstep(0.1, 0.5, h);
	vec3 col = mix(ladrillo, color_junta * (0.8 + 0.3 * fbm(uv * 30.0)), es_junta);

	// suciedad y humedad abajo; chorreones de lluvia en la fachada
	float abajo = 1.0 - smoothstep(0.0, 1.2, wpos.y);
	col *= 1.0 - 0.35 * abajo;
	float chorro = smoothstep(0.55, 0.8, fbm(vec2(uv.x * 4.0, uv.y * 0.35))) * mojado;
	float hum = clamp(mojado * (0.35 + 0.65 * abajo) + chorro, 0.0, 1.0);
	col *= 1.0 - 0.45 * hum;

	ALBEDO = col;
	ROUGHNESS = mix(mix(0.88, 0.97, es_junta), 0.35, hum);
	SPECULAR = 0.4;
	vec3 n = normalize(wnor - relieve * 0.06 * (g.x * eu + g.y * ev));
	NORMAL = normalize((VIEW_MATRIX * vec4(n, 0.0)).xyz);
	AO = mix(1.0, 0.55, es_junta);
	AO_LIGHT_AFFECT = 0.5;
}
