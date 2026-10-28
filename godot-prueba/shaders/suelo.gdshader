// Suelo: losas de piedra (bodega) o adoquines con charcos y gotas de lluvia (callejón).
shader_type spatial;
#include "res://shaders/ruido.gdshaderinc"

uniform vec3 color_a : source_color = vec3(0.36, 0.34, 0.31);
uniform vec3 color_b : source_color = vec3(0.22, 0.21, 0.20);
uniform vec2 tam = vec2(0.6, 0.45);
uniform float junta = 0.02;
uniform float charcos = 0.0;      // 0 = seco (bodega), 1 = calle mojada
uniform float lluvia = 0.0;       // ondas de gotas en los charcos

varying vec3 wpos;

void vertex() {
	wpos = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
}

float losa(vec2 uv, out vec2 celda) {
	float fila = floor(uv.y / tam.y);
	vec2 q = vec2(uv.x / tam.x + hash12(vec2(fila, 1.7)), uv.y / tam.y);
	celda = floor(q);
	vec2 f = fract(q) * tam;
	float d = min(min(f.x, tam.x - f.x), min(f.y, tam.y - f.y));
	return smoothstep(junta * 0.4, junta * 2.0, d) * (0.85 + 0.25 * fbm(uv * 6.0 + celda * 3.0));
}

// ondas de las gotas: devuelve la inclinación (para la normal)
vec2 ondas(vec2 uv, float t) {
	vec2 g = vec2(0.0);
	for (int k = 0; k < 2; k++) {
		vec2 p = uv * (2.2 + float(k) * 1.3) + float(k) * 13.7;
		vec2 c = floor(p);
		for (int i = -1; i <= 1; i++) {
			for (int j = -1; j <= 1; j++) {
				vec2 cc = c + vec2(float(i), float(j));
				vec2 o = hash22(cc);
				float fase = fract(t * 0.9 + hash12(cc + 5.0));
				vec2 d = p - (cc + o);
				float r = length(d);
				float radio = fase * 0.9;
				float anillo = sin((r - radio) * 40.0) * exp(-pow((r - radio) * 9.0, 2.0)) * (1.0 - fase);
				g += (r > 0.0001 ? d / r : vec2(0.0)) * anillo;
			}
		}
	}
	return g;
}

void fragment() {
	vec2 uv = wpos.xz;
	vec2 celda;
	float h = losa(uv, celda);
	vec2 c2;
	float e = 0.004;
	vec2 g = vec2(losa(uv + vec2(e, 0.0), c2) - h, losa(uv + vec2(0.0, e), c2) - h) / e;

	vec3 col = mix(color_a, color_b, hash12(celda)) * (0.65 + 0.6 * fbm(uv * 8.0 + celda));
	col *= mix(0.8, 1.05, fbm(uv * 0.7));
	float es_junta = 1.0 - smoothstep(0.1, 0.6, h);
	col = mix(col, col * 0.45, es_junta);

	// charcos: zonas bajas donde se junta el agua
	float m = fbm(uv * 0.32 + 4.0) + 0.15 * fbm(uv * 3.0);
	float charco = smoothstep(0.50, 0.56, m) * charcos;
	float humedo = max(charcos * 0.65, charco);
	col *= 1.0 - 0.5 * humedo;

	vec2 inclina = g * 0.05 * (1.0 - charco);
	if (lluvia > 0.0) {
		inclina += ondas(uv, TIME) * 0.12 * charco * lluvia;
	}
	vec3 n = normalize(vec3(-inclina.x, 1.0, -inclina.y));

	ALBEDO = col;
	ROUGHNESS = mix(mix(0.85, 0.95, es_junta), 0.3, charcos * 0.7);
	ROUGHNESS = mix(ROUGHNESS, 0.02, charco);
	SPECULAR = mix(0.4, 0.6, humedo);
	NORMAL = normalize((VIEW_MATRIX * vec4(n, 0.0)).xyz);
	AO = mix(1.0, 0.6, es_junta);
	AO_LIGHT_AFFECT = 0.4;
}
