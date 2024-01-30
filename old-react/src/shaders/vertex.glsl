/*
    The vertex shader is responsible for transforming the vertices of the geometry.
    This is where we'd do stuff to actually change the shape of the geometry like make wabes or something.
*/

varying vec2 vUv;
uniform vec2 resolution;
void main() {
    vUv = uv * 2.0 - 1.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
