import { SkeletonTemplate } from "skeleton-styler";

export const getCodeTemplates = () => {
  return [
    {
      name: "Text Paragraph",
      code: `SkeletonTemplate.Line()
.s_randomWidth(40, 400)`,
    },
    {
      name: "Buttons",
      code: `SkeletonTemplate.Flex({ gap: 16 }).append(
    SkeletonTemplate.Button({ w: 100, h: 40 }), // Standard
    SkeletonTemplate.Button({ w: 40, h: 40 }).s_roundedFull(), // Circle Button
    SkeletonTemplate.Button({ w: 120, h: 40 }).s_rounded(20) // Pill Button
)`,
    },
    {
      name: "Avatar & User",
      code: `SkeletonTemplate.Flex({ gap: 24 }).s_flexColumn().append(
    SkeletonTemplate.Flex({ gap: 12, direction: 'row' }).s_itemsCenter().append(
        SkeletonTemplate.Avatar({ size: 48 }),
        SkeletonTemplate.Avatar({ size: 48 }).s_rounded(8),
    ),
    SkeletonTemplate.UserAvatar({ r: 25, line: 2 })
)`,
    },

    {
      name: "Showcase: All Loaders",
      code: `SkeletonTemplate.Grid({ cols: 2, gap: 100 })
  .s_w(300)
  .append(
    // 1. Dot Loading
    new ElementBuilder().s_flexColumn().s_itemsCenter().s_gap(8).append(
        SkeletonTemplate.Loading.DotLoading({ width: 50, color: "#3b82f6" }),
    ),
    // 2. Clip Loader
    new ElementBuilder().s_flexColumn().s_itemsCenter().s_gap(8).append(
        SkeletonTemplate.Loading.ClipLoader({ size: 30, color: "#ef4444" }),
    ),
    // 3. Masked Spinner
    new ElementBuilder().s_flexColumn().s_itemsCenter().s_gap(8).append(
        SkeletonTemplate.Loading.MaskedSpinner({ size: 30, color: "#10b981" }),
    ),
    // 4. Legacy Spinner
    new ElementBuilder().s_flexColumn().s_itemsCenter().s_gap(8).append(
        SkeletonTemplate.Loading.LegacySpinner({ size: 5, color: "#f59e0b" }),
    )
  )`,
    },

    // --- 3. LAYOUT & CARDS (Giao diện thực tế) ---
    {
      name: "UI: Profile Card (Center)",
      code: `SkeletonTemplate.FlexCenter({ direction: 'column', gap: 16 })
  .s_w(300)
  .s_p(32)
  .s_bgWhite()
  .s_rounded(16)
  .s_border(1, "solid", "#eee")
  .s_shadow("0 4px 6px -1px rgba(0, 0, 0, 0.1)")
  .append(
     SkeletonTemplate.Avatar({ size: 80 }),
     SkeletonTemplate.Line({ w: 140, h: 20 }), // Name
     SkeletonTemplate.Line({ w: 100, h: 14 }), // Role
     new ElementBuilder().s_mt(8).append(
        SkeletonTemplate.Button({ w: 120, h: 36 })
     )
  )`,
    },
    {
      name: "UI: YouTube Video",
      code: `new ElementBuilder().s_w(320).s_flexColumn().s_gap(12).append(
    // Thumbnail 16:9
    new ElementBuilder()
        .s_wFull().s_aspectRatio("16/9").s_rounded(12).markAsSkeleton(),

    // Info Row
    SkeletonTemplate.Flex({ gap: 12 }).append(
        SkeletonTemplate.Avatar({ size: 36 }), // Channel icon
        new ElementBuilder().s_flex1().s_flexColumn().s_gap(6).append(
             SkeletonTemplate.Line({ w: "90%", h: 14 }), // Title
             SkeletonTemplate.Line({ w: "60%", h: 12 })  // Views/Time
        )
    )
)`,
    },
    {
      name: "UI: Chat Message",
      code: `SkeletonTemplate.Flex({ gap: 20 }).s_flexColumn().s_w(350).append(
    // Incoming msg
    SkeletonTemplate.Flex({ gap: 10 }).append(
        SkeletonTemplate.Avatar({ size: 32 }),
        new ElementBuilder()
            .s_bg("#f3f4f6").s_p(12).s_rounded(12)
            .s_style("borderTopLeftRadius", "0") // Chat bubble effect
            .append(SkeletonTemplate.Line({ w: 180, count: 2, isRandomWidth: true }))
    ),
    // Outgoing msg
    SkeletonTemplate.Flex({ gap: 10 }).s_justifyEnd().append(
        new ElementBuilder()
            .s_bg("#3b82f6").s_p(12).s_rounded(12)
            .s_style("borderTopRightRadius", "0")
            .append(
                // Custom color for skeleton inside blue bubble
                new ElementBuilder().s_w(150).s_h(12).markAsSkeleton()
                    .setSkeletonColors(["#60a5fa", "#93c5fd"])
            )
    )
)`,
    },
    {
      name: "UI: Data Table",
      code: `new ElementBuilder().s_w(600).s_border(1, "solid", "#e5e7eb").s_rounded(8).s_overflowHidden().append(
    // Header
    new ElementBuilder().s_flex().s_p(16).s_bg("#f9fafb").s_borderBottom(1, "solid", "#e5e7eb").append(
        SkeletonTemplate.Line({ w: 100, h: 16 }),
        new ElementBuilder().s_mlAuto().append(SkeletonTemplate.Line({ w: 40, h: 16 }))
    ),
    // Body (Sử dụng Template Table có sẵn)
    SkeletonTemplate.Table({
        rows: 4,
        cols: 3,
        colH: 14,
        spaceY: 16,
        // Tuỳ chỉnh từng cột (Table template mặc định chia đều,
        // ở đây ta dùng CSS Grid của TableTemplate để chia)
    })
    .s_style("table-layout", "fixed")
)`,
    },
    {
      name: "Feed Post",
      code: `new ElementBuilder()
  .s_w(450)
  .s_p(16)
  .s_bgWhite()
  .s_rounded(12)
  .s_shadow()
  .s_flexColumn()
  .s_gap(16)
  .append(
    // Header: User Info
    SkeletonTemplate.UserAvatar({ r: 20, line: 2 }),

    // Content: Paragraph
    SkeletonTemplate.Line({ count: 3, isRandomWidth: true }),

    // Media: Image
    new ElementBuilder()
      .markAsSkeleton()
      .s_wFull()
      .s_h(250)
      .s_rounded(8),

    // Footer: Buttons
    new ElementBuilder()
      .s_flex()
      .s_gap(12)
      .append(
        SkeletonTemplate.Button({ w: 60, h: 28 }),
        SkeletonTemplate.Button({ w: 60, h: 28 })
      )
  )`,
    },
    {
      name: "E-commerce Grid",
      code: `SkeletonTemplate.Grid({ cols: 3, gap: 20 })
  .s_w(700)
  .append(
    ...Array.from({ length: 6 }).map(() =>
      new ElementBuilder()
        .s_flexColumn()
        .s_gap(8)
        .append(
          new ElementBuilder().s_aspectRatio(1).s_rounded(8).markAsSkeleton(),
          SkeletonTemplate.Line({ w: "80%", h: 16 }),
          SkeletonTemplate.Line({ w: "40%", h: 14 }),
          new ElementBuilder().s_flex().s_justifyBetween().s_itemsCenter().append(
            SkeletonTemplate.Line({ w: 60, h: 18 }),
            SkeletonTemplate.Avatar({ size: 24 })
          )
        )
    )
  )`,
    },
    {
      name: "Comment Thread",
      code: `new ElementBuilder()
  .s_flexColumn()
  .s_gap(24)
  .s_w(500)
  .append(
    ...Array.from({ length: 2 }).map(() =>
      new ElementBuilder().s_flex().s_gap(12).append(
        SkeletonTemplate.Avatar({ size: 32 }),
        new ElementBuilder().s_flexColumn().s_gap(8).s_flex1().append(
          new ElementBuilder()
            .s_bg("#f3f4f6")
            .s_p(12)
            .s_rounded(12)
            .append(
               SkeletonTemplate.Line({ w: 100, h: 14 }),
               new ElementBuilder().s_mt(6).append(SkeletonTemplate.Line({ count: 2, isRandomWidth: true }))
            ),
          new ElementBuilder().s_flex().s_gap(16).s_ml(12).append(
            SkeletonTemplate.Line({ w: 40, h: 12 }),
            SkeletonTemplate.Line({ w: 40, h: 12 })
          )
        )
      )
    )
  )`,
    },
    {
      name: "Profile Header",
      code: `new ElementBuilder()
  .s_wFull()
  .s_flexColumn()
  .append(
    // Cover image
    new ElementBuilder().s_h(150).s_bg("#e5e7eb").markAsSkeleton(),
    // Profile info
    new ElementBuilder()
      .s_px(24)
      .s_flex()
      .s_justifyBetween()
      .s_itemsEnd()
      .s_style("marginTop", "-40px")
      .append(
        new ElementBuilder()
          .s_border(4, "solid", "white")
          .s_roundedFull()
          .append(SkeletonTemplate.Avatar({ size: 80 })),
        new ElementBuilder().s_mb(8).append(
          SkeletonTemplate.Button({ w: 100, h: 36 })
        )
      ),
    new ElementBuilder().s_p(24).s_flexColumn().s_gap(8).append(
      SkeletonTemplate.Line({ w: 200, h: 24 }),
      SkeletonTemplate.Line({ w: 150, h: 16 }),
      new ElementBuilder().s_mt(8).append(SkeletonTemplate.Line({ w: "60%", count: 2 }))
    )
  )`,
    },
    {
      name: "Video Player Sidebar",
      code: `new ElementBuilder()
  .s_flexColumn()
  .s_gap(12)
  .s_w(350)
  .append(
    ...Array.from({ length: 5 }).map(() =>
      new ElementBuilder().s_flex().s_gap(8).append(
        new ElementBuilder().s_w(120).s_h(68).s_rounded(4).markAsSkeleton(),
        new ElementBuilder().s_flexColumn().s_gap(6).s_flex1().append(
          SkeletonTemplate.Line({ w: "90%", h: 14 }),
          SkeletonTemplate.Line({ w: "60%", h: 12 }),
          SkeletonTemplate.Line({ w: "40%", h: 12 })
        )
      )
    )
  )`,
    },
    {
      name: "Social: Instagram Post",
      code: `new ElementBuilder()
  .s_w(400)
  .s_bgWhite()
  .s_border(1, "solid", "#dbdbdb")
  .s_rounded(8)
  .s_flexColumn()
  .append(
    // 1. Header: Avatar + Username
    new ElementBuilder().s_p(12).s_flex().s_itemsCenter().s_gap(10).append(
       SkeletonTemplate.Avatar({ size: 32 }),
       SkeletonTemplate.Line({ w: 120, h: 14 })
    ),

    // 2. Image: Aspect Ratio 1:1
    new ElementBuilder().s_wFull().s_aspectRatio("1/1").markAsSkeleton(),

    // 3. Actions: Like/Comment/Share icons
    new ElementBuilder().s_p(12).s_flex().s_gap(16).append(
       SkeletonTemplate.Avatar({ size: 24 }), // Icon placeholder
       SkeletonTemplate.Avatar({ size: 24 }),
       SkeletonTemplate.Avatar({ size: 24 }),
       new ElementBuilder().s_mlAuto().append(SkeletonTemplate.Avatar({ size: 24 })) // Save icon
    ),

    // 4. Likes & Caption
    new ElementBuilder().s_px(12).s_pb(16).s_flexColumn().s_gap(8).append(
       SkeletonTemplate.Line({ w: 100, h: 14 }), // "100 likes"
       SkeletonTemplate.Line({ count: 2, isRandomWidth: true }) // Caption
    )
  )`,
    },
    {
      name: "Social: Twitter/X Post",
      code: `new ElementBuilder()
  .s_w(500)
  .s_p(16)
  .s_borderBottom(1, "solid", "#eff3f4")
  .s_flex()
  .s_gap(12)
  .append(
     // Avatar
     SkeletonTemplate.Avatar({ size: 48 }),

     // Content Column
     new ElementBuilder().s_flex1().s_flexColumn().s_gap(8).append(
        // User Name & Handle
        new ElementBuilder().s_flex().s_gap(8).s_itemsCenter().append(
           SkeletonTemplate.Line({ w: 100, h: 16 }),
           SkeletonTemplate.Line({ w: 60, h: 14 })
        ),
        // Tweet Text
        SkeletonTemplate.Line({ count: 3, isRandomWidth: true }),
        // Action Bar (Reply, Retweet, Like, Share)
        new ElementBuilder().s_flex().s_justifyBetween().s_mt(8).s_w("80%").append(
           SkeletonTemplate.Line({ w: 20, h: 20 }),
           SkeletonTemplate.Line({ w: 20, h: 20 }),
           SkeletonTemplate.Line({ w: 20, h: 20 }),
           SkeletonTemplate.Line({ w: 20, h: 20 })
        )
     )
  )`,
    },

    // --- SECTION 2: E-COMMERCE ---
    {
      name: "Shop: Product Card",
      code: `new ElementBuilder()
  .s_w(240)
  .s_rounded(12)
  .s_overflowHidden()
  .s_border(1, "solid", "#eee")
  .s_flexColumn()
  .append(
    // Product Image with "Discount" badge placeholder
    new ElementBuilder().s_h(240).s_wFull().s_relative().markAsSkeleton().append(
       new ElementBuilder().s_absolute().s_top(8).s_right(8).s_w(40).s_h(20).s_rounded(4).s_bg("#fff")
    ),

    // Info
    new ElementBuilder().s_p(12).s_flexColumn().s_gap(8).append(
       SkeletonTemplate.Line({ w: "90%", h: 16 }), // Title
       SkeletonTemplate.Line({ w: "40%", h: 14 }), // Category

       new ElementBuilder().s_flex().s_justifyBetween().s_itemsCenter().s_mt(4).append(
          SkeletonTemplate.Line({ w: 60, h: 20 }), // Price
          SkeletonTemplate.Button({ w: 32, h: 32 }).s_roundedFull() // Add to cart
       )
    )
  )`,
    },
    {
      name: "Shop: Checkout Cart Item",
      code: `new ElementBuilder()
  .s_w(500)
  .s_flex()
  .s_gap(16)
  .s_p(16)
  .s_border(1, "solid", "#f3f4f6")
  .s_rounded(8)
  .append(
     // Product Thumbnail
     new ElementBuilder().s_w(100).s_h(100).s_rounded(8).markAsSkeleton(),

     // Details
     new ElementBuilder().s_flex1().s_flexColumn().s_justifyBetween().append(
        new ElementBuilder().s_flexColumn().s_gap(6).append(
           SkeletonTemplate.Line({ w: "80%", h: 16 }),
           SkeletonTemplate.Line({ w: "30%", h: 14 })
        ),
        new ElementBuilder().s_flex().s_justifyBetween().s_itemsCenter().append(
           SkeletonTemplate.Line({ w: 80, h: 18 }), // Price
           // Quantity Stepper
           new ElementBuilder().s_flex().s_gap(8).append(
              SkeletonTemplate.Button({ w: 24, h: 24 }),
              SkeletonTemplate.Line({ w: 20, h: 20 }),
              SkeletonTemplate.Button({ w: 24, h: 24 })
           )
        )
     )
  )`,
    },

    // --- SECTION 3: DARK MODE & MEDIA ---
    {
      name: "Media: Music Player (Dark)",
      code: `new ElementBuilder()
  .s_w(320)
  .s_p(24)
  .s_bg("#1e1e1e") // Dark Background
  .s_rounded(24)
  .s_flexColumn()
  .s_gap(20)
  .s_shadow("0 10px 15px -3px rgba(0, 0, 0, 0.5)")
  .append(
     // Album Art
     new ElementBuilder()
        .s_aspectRatio(1)
        .s_rounded(16)
        .markAsSkeleton()
        .setSkeletonColors(["#333", "#444"]), // Darker skeleton colors

     // Song Info
     new ElementBuilder().s_flexColumn().s_gap(8).append(
        SkeletonTemplate.Line({ h: 20, w: "70%" }).setSkeletonColors(["#333", "#444"]),
        SkeletonTemplate.Line({ h: 14, w: "40%" }).setSkeletonColors(["#333", "#444"])
     ),

     // Progress Bar
     SkeletonTemplate.Line({ h: 4 }).setSkeletonColors(["#444", "#555"]),

     // Controls
     new ElementBuilder().s_flex().s_justifyBetween().s_itemsCenter().s_mt(8).append(
        SkeletonTemplate.Button({ w: 24, h: 24 }).setSkeletonColors(["#333", "#444"]), // Shuffle
        new ElementBuilder().s_flex().s_gap(16).s_itemsCenter().append(
           SkeletonTemplate.Button({ w: 32, h: 32 }).setSkeletonColors(["#333", "#444"]), // Prev
           SkeletonTemplate.Button({ w: 56, h: 56 }).s_roundedFull().setSkeletonColors(["#4f46e5", "#6366f1"]), // Play (Accent Color)
           SkeletonTemplate.Button({ w: 32, h: 32 }).setSkeletonColors(["#333", "#444"]) // Next
        ),
        SkeletonTemplate.Button({ w: 24, h: 24 }).setSkeletonColors(["#333", "#444"]) // Loop
     )
  )`,
    },

    // --- SECTION 4: DATA VISUALIZATION ---
    {
      name: "Chart: Analytics Dashboard",
      code: `SkeletonTemplate.Grid({ cols: 2, gap: 16 }).s_w(600).append(
    // 1. Stats Cards
    ...Array.from({ length: 2 }).map(() =>
       new ElementBuilder().s_p(16).s_border(1, "solid", "#eee").s_rounded(8).append(
          SkeletonTemplate.Line({ w: 80, h: 14 }),
          SkeletonTemplate.Line({ w: 120, h: 32 }).s_mt(8)
       )
    ),

    // 2. Bar Chart Simulation (Chiếm 2 cột)
    new ElementBuilder()
       .s_style("gridColumn", "span 2")
       .s_p(20).s_border(1, "solid", "#eee").s_rounded(8)
       .s_flexColumn().s_gap(16)
       .append(
          SkeletonTemplate.Line({ w: 150, h: 18 }), // Chart Title
          // Bars container
          new ElementBuilder().s_flex().s_itemsEnd().s_justifyBetween().s_h(150).s_mt(10).append(
             ...Array.from({ length: 12 }).map(() => {
                // Random height for bars
                const h = Math.floor(30 + Math.random() * 70) + "%";
                return new ElementBuilder()
                   .s_w(20)
                   .s_h(h)
                   .s_rounded(4)
                   .markAsSkeleton()
             })
          )
       )
)`,
    },

    // --- SECTION 5: FORMS ---
    {
      name: "Form: Registration",
      code: `new ElementBuilder()
  .s_w(400)
  .s_flexColumn()
  .s_gap(20)
  .append(
     // Header
     new ElementBuilder().s_flexColumn().s_gap(8).s_itemsCenter().s_mb(10).append(
        SkeletonTemplate.Line({ w: 150, h: 24 }),
        SkeletonTemplate.Line({ w: 250, h: 14 })
     ),

     // Inputs
     ...["Full Name", "Email", "Password"].map(() =>
        new ElementBuilder().s_flexColumn().s_gap(8).append(
           SkeletonTemplate.Line({ w: 80, h: 14 }), // Label
           SkeletonTemplate.Line({ w: "100%", h: 42 }) // Input field
        )
     ),

     // Submit Button
     SkeletonTemplate.Button({ w: "100%", h: 48 }).s_mt(10)
  )`,
    },

    // --- SECTION 6: KANBAN BOARD ---
    {
      name: "App: Kanban Board",
      code: `SkeletonTemplate.Flex({ gap: 16 }).s_itemsStart().append(
    // Column 1: Todo
    new ElementBuilder().s_w(260).s_bg("#f4f5f7").s_p(12).s_rounded(8).s_flexColumn().s_gap(12).append(
       SkeletonTemplate.Line({ w: 100, h: 16 }), // Col Header
       // Task Cards
       ...Array.from({ length: 3 }).map(() =>
          new ElementBuilder().s_bgWhite().s_p(12).s_rounded(6).s_shadow("0 1px 2px rgba(0,0,0,0.1)").append(
             SkeletonTemplate.Line({ count: 2, isRandomWidth: true }),
             new ElementBuilder().s_flex().s_justifyBetween().s_mt(8).append(
                SkeletonTemplate.Avatar({ size: 20 }),
                SkeletonTemplate.Button({ w: 40, h: 16 })
             )
          )
       )
    ),

    // Column 2: In Progress
    new ElementBuilder().s_w(260).s_bg("#f4f5f7").s_p(12).s_rounded(8).s_flexColumn().s_gap(12).append(
       SkeletonTemplate.Line({ w: 120, h: 16 }),
       new ElementBuilder().s_bgWhite().s_p(12).s_rounded(6).s_shadow("0 1px 2px rgba(0,0,0,0.1)").append(
             SkeletonTemplate.Line({ count: 3, isRandomWidth: true }),
             new ElementBuilder().s_mt(8).append(SkeletonTemplate.Avatar({ size: 20 }))
       )
    )
)`,
    },
  ];
};
