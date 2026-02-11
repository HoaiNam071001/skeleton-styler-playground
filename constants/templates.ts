// Định nghĩa kiểu dữ liệu cho template
export interface TemplateItem {
  name: string;
  code: string;
}

export interface TemplateGroup {
  group: string;
  items: TemplateItem[];
}

export const TEMPLATE_GROUPS: TemplateGroup[] = [
  {
    group: "Animations & Themes",
    items: [
      {
        name: "Gallery: All Animations",
        code: `SkeletonTemplate.Grid({ cols: 3, gap: 20 }).s_w(600).append(
    // 1. Pulse (Default)
    new ElementBuilder().s_flexColumn().s_gap(8).append(
        new ElementBuilder().s_wFull().s_h(60).s_rounded(8).markAsSkeleton(SkeletonAnimation.Pulse),
        new ElementBuilder().s_textSize(12).s_textColor("#666")
    ),
    // 2. Fade
    new ElementBuilder().s_flexColumn().s_gap(8).append(
        new ElementBuilder().s_wFull().s_h(60).s_rounded(8).markAsSkeleton(SkeletonAnimation.Fade),
        new ElementBuilder().s_textSize(12).s_textColor("#666")
    ),
    // 3. Scale
    new ElementBuilder().s_flexColumn().s_gap(8).append(
        new ElementBuilder().s_wFull().s_h(60).s_rounded(8).markAsSkeleton(SkeletonAnimation.Scale),
        new ElementBuilder().s_textSize(12).s_textColor("#666")
    ),
    // 4. Progress (Shimmer)
    new ElementBuilder().s_flexColumn().s_gap(8).append(
        new ElementBuilder().s_wFull().s_h(60).s_rounded(8).markAsSkeleton(SkeletonAnimation.Progress),
        new ElementBuilder().s_textColor("#666")
    ),
    // 5. None (Static)
    new ElementBuilder().s_flexColumn().s_gap(8).append(
        new ElementBuilder().s_wFull().s_h(60).s_rounded(8).markAsSkeleton(SkeletonAnimation.None).s_bg("#e5e7eb"),
        new ElementBuilder().s_textSize(12).s_textColor("#666")
    )
)`
      },
      {
        name: "Override: Mixed Animations",
        code: `new ElementBuilder().s_w(300).s_flexColumn().s_gap(16).append(
    // 1. Image dùng hiệu ứng Scale (Zoom nhẹ)
    new ElementBuilder().s_flexColumn().s_gap(8).append(
        new ElementBuilder().s_wFull().s_h(150).s_rounded(8).markAsSkeleton(SkeletonAnimation.Scale),
        new ElementBuilder().s_textSize(10).s_textColor("#888")
    ),

    // 2. Avatar dùng hiệu ứng Fade (Nhấp nháy chậm)
    SkeletonTemplate.Flex({ gap: 12 }).s_itemsCenter().append(
        SkeletonTemplate.Avatar({ size: 40 }).setAnimation(SkeletonAnimation.Fade),
        new ElementBuilder().s_textSize(10).s_textColor("#888")
    )
)`
      },
      {
        name: "Progress & Gradients",
        code: `SkeletonTemplate.Flex({ direction: 'column', gap: 24 }).s_w(400).append(
    // 1. Default Grayscale Progress
    new ElementBuilder().s_flexColumn().s_gap(8).append(
        new ElementBuilder().s_wFull().s_h(40).s_rounded(4).markAsSkeleton(SkeletonAnimation.Progress),
        new ElementBuilder().s_textSize(12)
    ),

    // 2. Blue Gradient (Facebook style)
    new ElementBuilder().s_flexColumn().s_gap(8).append(
        new ElementBuilder()
            .s_wFull().s_h(40).s_rounded(4)
            .markAsSkeleton(SkeletonAnimation.Progress)
            .setSkeletonColors(["#e0f2fe", "#7dd3fc"]), // Light Blue -> Blue
        new ElementBuilder().s_textSize(12)
    ),

    // 3. Dark Mode Gradient
    new ElementBuilder().s_flexColumn().s_gap(8).append(
        new ElementBuilder()
            .s_wFull().s_h(40).s_rounded(4)
            .markAsSkeleton(SkeletonAnimation.Progress)
            .setSkeletonColors(["#374151", "#4b5563"]), // Gray 700 -> Gray 600
        new ElementBuilder().s_textSize(12)
    )
)`
      }
    ]
  },
{
    group: "Basic Components",
    items: [
      {
        name: "Lines (Text)",
        code: `SkeletonTemplate.Flex({ direction: 'column', gap: 20 }).s_w(400).append(
    SkeletonTemplate.Line({ w: "60%", h: 32 }),
    SkeletonTemplate.Line({ w: "100%", h: 16, count: 3 }),
    SkeletonTemplate.Line({ w: "100%", h: 14, count: 4, isRandomWidth: true })
)`
      },
      {
        name: "Buttons (Sizes)",
        code: `SkeletonTemplate.Flex({ direction: 'column', gap: 16 }).append(
    SkeletonTemplate.Flex({ gap: 8 }).s_itemsCenter().append(
        SkeletonTemplate.Button({ w: 60, h: 24 }),
        SkeletonTemplate.Button({ w: 100, h: 36 }),
        SkeletonTemplate.Button({ w: 140, h: 48 })
    ),
    SkeletonTemplate.Flex({ gap: 8 }).s_itemsCenter().append(
        SkeletonTemplate.Button({ w: 100, h: 36 }).s_rounded(0),
        SkeletonTemplate.Button({ w: 100, h: 36 }).s_rounded(8),
        SkeletonTemplate.Button({ w: 100, h: 36 }).s_roundedFull()
    )
)`
      },
      {
        name: "Avatars (Sizes & Shapes)",
        code: `SkeletonTemplate.Flex({ direction: 'column', gap: 16 }).append(
    SkeletonTemplate.Flex({ gap: 12 }).s_itemsCenter().append(
        SkeletonTemplate.Avatar({ size: 24 }),
        SkeletonTemplate.Avatar({ size: 48 }),
        SkeletonTemplate.Avatar({ size: 80 })
    ),
    SkeletonTemplate.Flex({ gap: 12 }).s_itemsCenter().append(
        SkeletonTemplate.Avatar({ size: 48 }).s_rounded(8),
        SkeletonTemplate.Avatar({ size: 48 }).s_rounded(0),
        new ElementBuilder().s_w(48).s_h(48).s_roundedFull().s_border(2, "solid", "#3b82f6").markAsSkeleton()
    )
)`
      },
      {
        name: "Inputs & Controls",
        code: `new ElementBuilder().s_w(300).s_flexColumn().s_gap(16).append(
    new ElementBuilder().s_wFull().s_h(40).s_rounded(4).s_border(1).markAsSkeleton(),
    new ElementBuilder().s_wFull().s_h(80).s_rounded(4).s_border(1).markAsSkeleton(),
    SkeletonTemplate.Flex({ gap: 10 }).s_itemsCenter().append(
        new ElementBuilder().s_w(20).s_h(20).s_rounded(4).markAsSkeleton(),
        SkeletonTemplate.Line({ w: 100, h: 16 })
    ),
    SkeletonTemplate.Flex({ gap: 10 }).s_itemsCenter().append(
        new ElementBuilder().s_w(20).s_h(20).s_roundedFull().markAsSkeleton(),
        SkeletonTemplate.Line({ w: 100, h: 16 })
    )
)`
      },
      {
        name: "Image Placeholders",
        code: `SkeletonTemplate.Grid({ cols: 2, gap: 16 }).s_w(400).append(
    new ElementBuilder().s_wFull().s_aspectRatio("16/9").s_rounded(8).markAsSkeleton(),
    new ElementBuilder().s_wFull().s_aspectRatio("4/3").s_rounded(8).markAsSkeleton(),
    new ElementBuilder().s_wFull().s_aspectRatio("1/1").s_rounded(8).markAsSkeleton(),
    new ElementBuilder().s_wFull().s_aspectRatio("9/16").s_rounded(8).markAsSkeleton()
)`
      }
    ]
  },
{
    group: "Complex Layouts",
    items: [
      {
        name: "Social Feed Card",
        code: `new ElementBuilder()
  .s_w(450).s_bgWhite().s_rounded(12).s_border(1, "solid", "#e5e7eb").s_shadow("0 4px 6px -1px rgba(0,0,0,0.05)")
  .s_p(16).s_flexColumn().s_gap(16)
  .append(
    // 1. Header: Avatar + Name + Time + Options Dot
    SkeletonTemplate.Flex({ gap: 12 }).s_itemsCenter().append(
        SkeletonTemplate.Avatar({ size: 40 }),
        new ElementBuilder().s_flexColumn().s_gap(4).s_flex1().append(
            SkeletonTemplate.Line({ w: 120, h: 14 }), // Name
            SkeletonTemplate.Line({ w: 80, h: 12 })   // Time
        ),
        new ElementBuilder().s_w(24).s_h(24).s_roundedFull().markAsSkeleton() // Option Icon
    ),

    // 2. Body Text
    SkeletonTemplate.Line({ count: 2, isRandomWidth: true, h: 14 }),

    // 3. Media Content (Image)
    new ElementBuilder().s_wFull().s_aspectRatio("16/9").s_rounded(8).markAsSkeleton(),

    // 4. Footer: Action Bar (Like, Comment, Share)
    new ElementBuilder().s_borderTop(1, "solid", "#f3f4f6").s_pt(12).s_flex().s_justifyBetween().append(
        new ElementBuilder().s_w(80).s_h(24).s_rounded(4).markAsSkeleton(), // Like btn
        new ElementBuilder().s_w(80).s_h(24).s_rounded(4).markAsSkeleton(), // Comment btn
        new ElementBuilder().s_w(80).s_h(24).s_rounded(4).markAsSkeleton()  // Share btn
    )
)`
      },
      {
        name: "E-commerce Product",
        code: `new ElementBuilder()
  .s_w(240).s_bgWhite().s_rounded(16).s_border(1, "solid", "#e5e7eb").s_overflowHidden()
  .s_flexColumn().s_relative() // Relative for badge positioning
  .append(
    // 1. Product Image
    new ElementBuilder().s_wFull().s_h(200).markAsSkeleton(),

    // 2. Discount Badge (Overlay)
    new ElementBuilder()
        .s_absolute().s_top(12).s_left(12)
        .s_w(40).s_h(20).s_bgWhite().s_rounded(4).s_opacity(0.8),

    // 3. Content
    new ElementBuilder().s_p(16).s_flexColumn().s_gap(10).append(
        // Category tag
        SkeletonTemplate.Line({ w: 60, h: 10 }),

        // Title
        SkeletonTemplate.Line({ w: "90%", h: 16 }),

        // Rating Stars Row
        SkeletonTemplate.Flex({ gap: 4 }).append(
           ...Array.from({length: 5}).map(() => new ElementBuilder().s_w(12).s_h(12).s_roundedFull().markAsSkeleton())
        ),

        // Price & Add Button Row
        SkeletonTemplate.Flex({ gap: 8 }).s_justifyBetween().s_itemsCenter().s_mt(8).append(
            new ElementBuilder().s_flexColumn().s_gap(4).append(
                SkeletonTemplate.Line({ w: 80, h: 20 }), // Price
                SkeletonTemplate.Line({ w: 40, h: 12 })  // Old Price
            ),
            // Add to Cart Btn
            new ElementBuilder().s_w(36).s_h(36).s_rounded(10).s_bg("#3b82f6").markAsSkeleton()
        )
    )
)`
      },
      {
        name: "Chat Conversation",
        code: `new ElementBuilder().s_w(380).s_bgWhite().s_p(16).s_rounded(12).s_border(1).s_flexColumn().s_gap(20).append(
    // 1. Incoming Message (Left)
    SkeletonTemplate.Flex({ gap: 12 }).s_itemsEnd().append(
        SkeletonTemplate.Avatar({ size: 32 }),
        new ElementBuilder()
            .s_bg("#f3f4f6").s_p(12).s_rounded(16)
            .s_style("borderBottomLeftRadius", "4px") // Bubble tail effect
            .s_maxW("75%")
            .append(SkeletonTemplate.Line({ count: 2, isRandomWidth: true, h: 12 }))
    ),

    // 2. Outgoing Message (Right)
    SkeletonTemplate.Flex({ gap: 12 }).s_justifyEnd().s_itemsEnd().append(
        new ElementBuilder()
            .s_bg("#dbeafe").s_p(12).s_rounded(16) // Blue tint bg
            .s_style("borderBottomRightRadius", "4px")
            .s_maxW("75%")
            .append(
                 // Custom blue-ish skeleton lines
                 new ElementBuilder().s_w(140).s_h(12).markAsSkeleton().setSkeletonColors(["#93c5fd", "#bfdbfe"]),
                 new ElementBuilder().s_mt(6).s_w(80).s_h(12).markAsSkeleton().setSkeletonColors(["#93c5fd", "#bfdbfe"])
            )
    )
)`
      },
      {
        name: "Video Horizontal Card",
        code: `new ElementBuilder()
  .s_w(400).s_flex().s_gap(12).s_itemsStart()
  .append(
    // Thumbnail (Left)
    new ElementBuilder().s_w(160).s_aspectRatio("16/9").s_rounded(8).markAsSkeleton(),

    // Info (Right)
    new ElementBuilder().s_flex1().s_flexColumn().s_gap(8).append(
        SkeletonTemplate.Line({ w: "95%", h: 16 }), // Title line 1
        SkeletonTemplate.Line({ w: "60%", h: 16 }), // Title line 2

        // Metadata row
        new ElementBuilder().s_mt(4).s_flex().s_itemsCenter().s_gap(8).append(
            SkeletonTemplate.Avatar({ size: 24 }),
            SkeletonTemplate.Line({ w: 80, h: 12 })
        )
    )
)`
      }
    ]
  },
{
    group: "Loading Spinners",
    items: [
      {
        name: "Size Variations (S/M/L)",
        code: `SkeletonTemplate.Grid({ cols: 3, gap: 32 }).s_w(500).s_itemsCenter().s_justifyCenter().append(
    // Small Row
    SkeletonTemplate.Loading.ClipLoader({ size: 20, color: "#6366f1", borderWidth: 2 }),
    SkeletonTemplate.Loading.MaskedSpinner({ size: 20, color: "#10b981" }),
    SkeletonTemplate.Loading.DotLoading({ width: 24, color: "#ef4444" }),

    // Medium Row
    SkeletonTemplate.Loading.ClipLoader({ size: 40, color: "#6366f1", borderWidth: 4 }),
    SkeletonTemplate.Loading.MaskedSpinner({ size: 40, color: "#10b981" }),
    SkeletonTemplate.Loading.DotLoading({ width: 40, color: "#ef4444" }),

    // Large Row
    SkeletonTemplate.Loading.ClipLoader({ size: 64, color: "#6366f1", borderWidth: 6 }),
    SkeletonTemplate.Loading.MaskedSpinner({ size: 64, color: "#10b981" }),
    SkeletonTemplate.Loading.DotLoading({ width: 64, color: "#ef4444" })
)`
      },
      {
        name: "Loaders in Buttons",
        code: `SkeletonTemplate.Flex({ gap: 16 }).append(
    // 1. Filled Button with Spinner
    new ElementBuilder().s_bg("#3b82f6").s_px(24).s_py(12).s_rounded(8).s_flex().s_itemsCenter().s_gap(10).append(
         SkeletonTemplate.Loading.ClipLoader({ size: 18, color: "white", borderWidth: 2 }),
         new ElementBuilder().s_w(60).s_h(10).s_bg("rgba(255,255,255,0.4)").s_rounded(2)
    ),
    // 2. Outlined Button with Spinner
    new ElementBuilder().s_border(1, "solid", "#e5e7eb").s_px(24).s_py(12).s_rounded(8).s_flex().s_itemsCenter().s_gap(10).append(
         SkeletonTemplate.Loading.MaskedSpinner({ size: 18, color: "#6b7280" }),
         SkeletonTemplate.Line({ w: 80, h: 10 })
    ),
    // 3. Icon Only Button
    new ElementBuilder().s_w(48).s_h(48).s_roundedFull().s_border(1, "solid", "#e5e7eb").s_flex().s_justifyCenter().s_itemsCenter().append(
         SkeletonTemplate.Loading.LegacySpinner({ size: 4, color: "#8b5cf6" })
    )
)`
      },
      {
        name: "Legacy Spinner Configs",
        code: `SkeletonTemplate.Flex({ gap: 100 }).s_itemsCenter().append(
    // Default tiny
    SkeletonTemplate.Loading.LegacySpinner({ size: 4, color: "#64748b" }),

    // Medium Custom Radius
    SkeletonTemplate.Loading.LegacySpinner({ size: 6, color: "#0ea5e9", radius: 8 }),

    // Large Custom Duration (Slower)
    SkeletonTemplate.Loading.LegacySpinner({ size: 8, color: "#ec4899", radius: 12, duration: 2.5 })
)`
      }
    ]
  },
  {
    group: "UI Layouts",
    items: [
      {
        name: "Profile Card",
        code: `SkeletonTemplate.FlexCenter({ direction: 'column', gap: 16 })
  .s_w(300).s_p(32).s_bgWhite().s_rounded(16)
  .s_border(1, "solid", "#eee")
  .s_shadow("0 4px 6px -1px rgba(0, 0, 0, 0.1)")
  .append(
     SkeletonTemplate.Avatar({ size: 80 }),
     SkeletonTemplate.Line({ w: 140, h: 20 }),
     SkeletonTemplate.Line({ w: 100, h: 14 }),
     new ElementBuilder().s_mt(8).append(SkeletonTemplate.Button({ w: 120, h: 36 }))
  )`,
      },
      {
        name: "YouTube Video",
        code: `new ElementBuilder().s_w(320).s_flexColumn().s_gap(12).append(
    new ElementBuilder().s_wFull().s_aspectRatio("16/9").s_rounded(12).markAsSkeleton(),
    SkeletonTemplate.Flex({ gap: 12 }).append(
        SkeletonTemplate.Avatar({ size: 36 }),
        new ElementBuilder().s_flex1().s_flexColumn().s_gap(6).append(
             SkeletonTemplate.Line({ w: "90%", h: 14 }),
             SkeletonTemplate.Line({ w: "60%", h: 12 })
        )
    )
)`,
      },
      {
        name: "Chat Message",
        code: `SkeletonTemplate.Flex({ gap: 20 }).s_flexColumn().s_w(350).append(
    SkeletonTemplate.Flex({ gap: 10 }).append(
        SkeletonTemplate.Avatar({ size: 32 }),
        new ElementBuilder().s_bg("#f3f4f6").s_p(12).s_rounded(12)
            .s_style("borderTopLeftRadius", "0")
            .append(SkeletonTemplate.Line({ w: 180, count: 2, isRandomWidth: true }))
    ),
    SkeletonTemplate.Flex({ gap: 10 }).s_justifyEnd().append(
        new ElementBuilder().s_bg("#3b82f6").s_p(12).s_rounded(12)
            .s_style("borderTopRightRadius", "0")
            .append(new ElementBuilder().s_w(150).s_h(12).markAsSkeleton().setSkeletonColors(["#60a5fa", "#93c5fd"]))
    )
)`,
      },
    ],
  },
  {
    group: "Application UI",
    items: [
      {
        name: "Data Table",
        code: `new ElementBuilder().s_w(600).s_border(1, "solid", "#e5e7eb").s_rounded(8).s_overflowHidden().append(
    new ElementBuilder().s_flex().s_p(16).s_bg("#f9fafb").s_borderBottom(1, "solid", "#e5e7eb").append(
        SkeletonTemplate.Line({ w: 100, h: 16 }),
        new ElementBuilder().s_mlAuto().append(SkeletonTemplate.Line({ w: 40, h: 16 }))
    ),
    SkeletonTemplate.Table({ rows: 4, cols: 3, colH: 14, spaceY: 16 }).s_style("table-layout", "fixed")
)`,
      },
      {
        name: "Feed Post",
        code: `new ElementBuilder().s_w(450).s_p(16).s_bgWhite().s_rounded(12).s_shadow().s_flexColumn().s_gap(16).append(
    SkeletonTemplate.UserAvatar({ r: 20, line: 2 }),
    SkeletonTemplate.Line({ count: 3, isRandomWidth: true }),
    new ElementBuilder().markAsSkeleton().s_wFull().s_h(250).s_rounded(8),
    new ElementBuilder().s_flex().s_gap(12).append(
        SkeletonTemplate.Button({ w: 60, h: 28 }), SkeletonTemplate.Button({ w: 60, h: 28 })
    )
)`,
      },
    ],
  },
];
