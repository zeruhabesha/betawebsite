HERO VIDEO — how to add your own
=================================

The hero section works out of the box with an animated canvas scene
(a glowing shield repelling incoming cyber-attacks). To replace it
with a real video of "a man defending against a cyberattack":

1. Add your video file here as:
     assets/hero.mp4        (recommended: 1920x1080, H.264, muted, ~10-20s loop, under ~6 MB)

2. (Optional) Add a still frame shown before the video loads:
     assets/hero-poster.jpg

That's it. The site auto-detects the video: if hero.mp4 loads it fades
in over the animation; if it's missing, the animated shield stays.

No other code changes are needed.
