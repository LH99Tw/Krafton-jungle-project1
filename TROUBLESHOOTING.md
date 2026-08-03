# Motion Troubleshooting

## Reference behavior

Reference: <https://taotajima.jp/works/xperia-ear/>

The reference presents a fixed, full-viewport visual scene. Scroll input advances a visual sequence and the lower project navigation stays anchored to the viewport. The current item changes as the scene settles; the page does not behave like a normal long document where every element is reflowed on each scroll event.

## Symptoms

- The reel occasionally jumped when moving from the last chapter back to the first.
- `PREVIOUS`, `NEXT`, the chapter label, and the detail CTA all disappeared together.
- Repeated wheel input could feel uneven or trigger multiple transitions.
- Route changes used a dark full-screen hold that felt disconnected from the reference.

## Root causes

1. The home wheel/key `useEffect` had no dependency array. It re-registered event listeners after every render, so one wheel gesture could be handled by multiple closures.
2. The cylinder transform was based on the wrapped chapter index. A transition from index `4` to `0` changed the transform by four chapter angles instead of one.
3. The changing state was applied to `.home-nav`, which grouped the fixed previous/next controls with the content that should be refreshed.
4. The route curtain used a dark overlay with a 720ms hold, producing a pause/flash rather than a short editorial wipe.

## Fixes

- The reel now uses a continuous `step` value. Each gesture changes it by exactly `+1` or `-1`, while the visible chapter index is derived with modulo arithmetic.
- Wheel and keyboard listeners are attached through a stable callback dependency and cleaned up on effect teardown.
- Scroll distance now controls a continuous reel position. After a short idle window, the position snaps to the nearest chapter only when it crosses the 50% threshold; the snap can be interrupted and reversed by another scroll gesture.
- `PREVIOUS` and `NEXT` remain visible and positionally fixed while the chapter wheel, current item label, and `OPEN WORK / VIEW DETAILS` fade out and return after the reel settles.
- The route curtain is now a lighter, shorter horizontal wipe (`480ms` CSS motion, `520ms` React lifecycle).

## Reference blend technique

The reference page exposes a `canvas#three` and loads a Three.js scene. Its slide texture controller keeps two textures alive at once (`texture1` and `texture2`) and updates them as image/video sources become ready. The shader uniforms include `progress`, `waveAmpFreq`, `waveSpeedPhase`, and `waveBlend`; the fragment shader uses those values to displace the planes and blend the outgoing and incoming textures over time. This is why the transition feels liquid instead of looking like two flat opacity fades.

The implementation now uses the same architectural shape in Three.js: `ThreeReel` owns a WebGL scene, one subdivided plane, and two active textures. A custom vertex/fragment shader moves a narrow transition boundary across the plane instead of mixing the full screen at once. Around that boundary it samples a mirrored outgoing texture, adds a restrained reflection ridge with actual z displacement on a perspective camera, and then hands off to `texture2` through the scroll-controlled `progress` uniform. Work-to-work detail navigation uses the same shader in `ThreeBlendTransition`, so it is a texture handoff on a single canvas rather than a CSS curtain or two DOM images sliding across the screen. The asset loader is intentionally compatible with still images now and can be extended to `THREE.VideoTexture` for muted inline video sources.

## Reference text timing

The reference does not reveal all copy at the same instant as the visual slide. Its state machine waits roughly `0.7s` after the slide begins, enables the text state, and then draws the text texture over about `1.2–1.6s` with cubic easing and offset/displacement. The home caption now follows the same staged rhythm: it stays clipped while the reel moves, then enters with a delayed clip reveal, vertical offset, blur reduction, and staggered child spans.

## Infinite reel boundary

Do not render only one copy of the five panels when the rotation is continuous. At the `005 ↔ 001` boundary, the cylinder can expose an empty side if the next face has already left the finite scene. The reel now renders three consecutive copies of the work set at `-1`, `0`, and `+1` cycle offsets. The active step remains continuous, so the visible sequence never reaches an empty edge.

The reference's slide change is a canvas scene transition, not a generic full-screen route curtain. Work navigation no longer mounts the page curtain; only the separately requested About transition keeps its light information-page wipe.

For work-to-work detail navigation, `RouteVisualTransition` preserves the previous and next hero assets and mounts a temporary Three.js canvas. The outgoing and incoming images occupy the same plane while the shader drives the displacement and blend. The new detail heading remains independently delayed until after the visual handoff. The About route keeps its separate light information-page transition because it is a different navigation mode.

## Verification checklist

- `npm run build`
- `git diff --check`
- Test `005 → 004 → 003 → 002 → 001 → 005` with wheel and arrow keys.
- Confirm previous/next stay anchored during every transition.
- Confirm the chapter label and detail CTA disappear during movement and reappear after settling.
- Confirm the home reel and work-to-work route transition each render through a WebGL canvas, with no `.route-liquid-transition` image layer involved.
- Test reduced motion with `prefers-reduced-motion: reduce`.

## If motion becomes choppy again

Check for new render-time event registration, large synchronous work inside the wheel handler, and transforms that use wrapped indexes instead of a continuous position. Keep visual motion on `transform` and `opacity`, and avoid animating layout properties such as `top`, `left`, `width`, or `height` during the reel transition.
