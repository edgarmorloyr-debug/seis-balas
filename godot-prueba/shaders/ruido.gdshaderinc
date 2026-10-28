// Ruido hecho a mano (sin texturas): sirve para la piedra, el ladrillo, la madera y los charcos.
float hash12(vec2 p) {
	vec3 p3 = fract(vec3(p.xyx) * 0.1031);
	p3 += dot(p3, p3.yzx + 33.33);
	return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
	vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
	p3 += dot(p3, p3.yzx + 33.33);
	return fract((p3.xx + p3.yz) * p3.zy);
}

float vnoise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x),
			mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
	float a = 0.5;
	float s = 0.0;
	for (int i = 0; i < 5; i++) {
		s += a * vnoise(p);
		p = p * 2.03 + vec2(17.1, 3.7);
		a *= 0.5;
	}
	return s;
}

// Proyección según hacia dónde mira la cara (suelo, pared que mira a X o pared que mira a Z).
// Devuelve las coordenadas 2D (en metros) y los dos ejes del mundo que les corresponden.
void plano(vec3 wp, vec3 wn, out vec2 uv, out vec3 eu, out vec3 ev) {
	vec3 a = abs(wn);
	if (a.y > a.x && a.y > a.z) {
		uv = wp.xz; eu = vec3(1.0, 0.0, 0.0); ev = vec3(0.0, 0.0, 1.0);
	} else if (a.x > a.z) {
		uv = vec2(wp.z, wp.y); eu = vec3(0.0, 0.0, 1.0); ev = vec3(0.0, 1.0, 0.0);
	} else {
		uv = vec2(wp.x, wp.y); eu = vec3(1.0, 0.0, 0.0); ev = vec3(0.0, 1.0, 0.0);
	}
}
