


export const DEFAULT_GLOBAL_CODE = `/**
* GLOBAL CONFIGURATION
 */
ElementBuilder.setConfigs({
  // Sets the default animation type for all skeletons
  animation: SkeletonAnimation.Progress,

  // Defines the background color palette
  colors: ["#e3e3e3", "#fbfbfb"],
});

// Override the global color palette
// ElementBuilder.setColors(["#e3e3e3", "#fbfbfb"]);

// Change the active animation type to Pulse
// ElementBuilder.setAnimation(SkeletonAnimation.Pulse);

// Customizing specific keyframes for different animation types
// 1. Update Progress animation behavior
// ElementBuilder.setKeyframe(SkeletonAnimation.Progress,
// \`
//    0% { background-position: 90% 0; }
//    100% { background-position: 200% 0; }
// \`);

// 2. Update Pulse animation behavior (opacity breathing effect)
// ElementBuilder.setKeyframe(SkeletonAnimation.Pulse,
// \`
//    0%, 100% { opacity: 1; }
//    50% { opacity: 0; }
// \`);

/**
 * DEBUGGING & INSPECTION
 */

// Get and log the CSS keyframe string for Progress animation
// console.log("Current Progress Keyframe:", ElementBuilder.getKeyframe(SkeletonAnimation.Progress));

// Get and log the currently active animation type
// console.log("Active Animation:", ElementBuilder.getAnimation());`;
