precision mediump float;

varying vec2 vUv;
varying float vElevation;
varying vec3 vColor1;
varying vec3 vColor2;
varying float vColorOffset;
varying float vColorMultiplier;

  float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float PI = 3.1415926535897932384626433832795;

vec3 colorMix(vec3 colorA, vec3 colorB, float factor) {
    return mix(colorA, colorB, factor);
}

void main() {
    
    vec3 strength = colorMix(vColor1, vColor2, (vElevation + vColorOffset) * vColorMultiplier);
    gl_FragColor = vec4(strength, 1.0); // Red color
}