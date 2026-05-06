# 申海漂 — AI 像素素材生成提示词

> 要求统一风格：**16px base 像素风、俯视 2D、现代城市、有限调色板（每图 ≤16色）、干净轮廓线**
> 尺寸说明：游戏实际使用 64×64（4倍放大），AI 生成时建议用 256×256 然后缩放到 64×64

---

## 一、地面/地形瓦片（每组1张图 = 1行 × 37列，每格16×16）

每组提示词生成一张 592×16（或更高）的长条图，包含37个连续变体。

### 1.1 草地（Grass）— 6组
```
Row A — 浅草地变体 x37:
Pixel art 16x16 top-down grass tile spritesheet row, 37 tiles in a strip, light green grass variations, seamless tiles, some with tiny flowers, some with darker patches, modern city park style, limited palette, pixel art game tiles

Row B — 深草地变体 x37:
Pixel art 16x16 top-down dark grass tile spritesheet row, 37 seamless grass variations, darker green tones, some with moss patches, some with small weeds, city lawn texture style, limited palette

Row C — 草地+野花 x37:
Pixel art 16x16 top-down grass tile spritesheet row, 37 variations with wildflowers, white and yellow tiny flowers scattered on green grass, spring meadow style, seamless, limited palette

Row D — 草地边缘/过渡 x37:
Pixel art 16x16 top-down grass edge tiles spritesheet row, 37 transition tiles, grass to dirt edges, grass to path edges, grass to road edges, semi-transparent edges, seamless, limited palette
```

### 1.2 沙地/泥土（Sand/Dirt）— 3组
```
Row E — 沙滩沙地 x37:
Pixel art 16x16 top-down sand tile spritesheet row, 37 beige sand variations, beach sand with grain texture, some with small pebbles, some with shell fragments, seamless, limited palette

Row F — 泥土/裸地 x37:
Pixel art 16x16 top-down dirt tile spritesheet row, 37 brown soil variations, some with small rocks, some cracked dry earth, some with root details, seamless, limited palette

Row G — 砾石/石子路 x37:
Pixel art 16x16 top-down gravel tile spritesheet row, 37 small stone/gravel path variations, gray-brown tones, some with larger stones, some compacted, seamless, limited palette
```

### 1.3 水域（Water）— 4组
```
Row H — 浅水/蓝色水面 x37:
Pixel art 16x16 top-down water tile spritesheet row, 37 light blue water variations, calm ocean or lake surface, subtle wave patterns, some with light reflections, seamless, limited palette

Row I — 深水 x37:
Pixel art 16x16 top-down deep water tile spritesheet row, 37 dark blue water variations, deeper ocean areas, slight wave ripple patterns, some white foam crests, seamless, limited palette

Row J — 水岸/水边 x37:
Pixel art 16x16 top-down water edge tile spritesheet row, 37 transition tiles, water to land edges, 沙滩与水交界, some with foam lines on shore, some with rocks at edge, seamless, limited palette

Row K — 水浪/泡沫 x37:
Pixel art 16x16 top-down water wave tile spritesheet row, 37 wave and foam variations, white foam patterns on blue water, breaking waves, water surface details, seamless, limited palette
```

---

## 二、道路/基础设施（每组1行 × 37列）

### 2.1 道路 — 5组
```
Row L — 沥青马路 x37:
Pixel art 16x16 top-down asphalt road tile spritesheet row, 37 dark gray road variations, smooth asphalt texture, some with subtle cracks, some with manhole covers, some with lane markings (yellow/white), seamless, limited palette

Row M — 人行道/砖铺地 x37:
Pixel art 16x16 top-down sidewalk tile spritesheet row, 37 light gray concrete sidewalk variations, brick paving pattern, some with expansion joints, some with different brick patterns, some with curb edges, seamless, limited palette

Row N — 斑马线 x37:
Pixel art 16x16 top-down crosswalk tile spritesheet row, 37 pedestrian crossing variations, white stripe patterns on dark road, different stripe angles, some with zebra crossing, some with pedestrian waiting area markings, limited palette

Row O — 路缘/路肩 x37:
Pixel art 16x16 top-down curb tile spritesheet row, 37 curb/road-edge transition tiles, gray concrete curb edge, road-to-sidewalk transition, different curb heights and angles, some with drainage, limited palette

Row P — 路面标记/箭头 x37:
Pixel art 16x16 top-down road marking tile spritesheet row, 37 painted road markings, white and yellow arrows, turn lane indicators, directional arrows, stop lines, text markings like BUS or TAXI, limited palette
```

---

## 三、建筑墙体外墙（每组1行 × 37列）

### 3.1 砖/石墙 — 8组
```
Row Q — 红砖墙 x37:
Pixel art 16x16 top-down brick wall tile spritesheet row, 37 red brick wall variations, different brick patterns, some with weathering, some with mortar variations, straight and staggered brick layouts, seamless, limited palette

Row R — 灰石墙 x37:
Pixel art 16x16 top-down stone wall tile spritesheet row, 37 gray stone wall variations, cut stone blocks, some with moss, some with different stone sizes, rustic city wall style, seamless, limited palette

Row S — 白色抹灰墙 x37:
Pixel art 16x16 top-down white plaster wall tile spritesheet row, 37 white/cream plaster wall variations, smooth surface, some with subtle texture, some with slight discoloration, modern building style, seamless, limited palette

Row T — 深色砖墙 x37:
Pixel art 16x16 top-down dark brick wall tile spritesheet row, 37 dark charcoal/black brick variations, industrial building style, different bond patterns, some with grime effects, limited palette

Row U — 瓷砖/马赛克 x37:
Pixel art 16x16 top-down tile/mosaic wall tile spritesheet row, 37 ceramic tile pattern variations, small square tiles, different colors (blue, green, white), bathroom/shophouse style, seamless, limited palette

Row V — 混凝土墙 x37:
Pixel art 16x16 top-down concrete wall tile spritesheet row, 37 gray concrete variations, poured concrete texture, some formwork marks, some with weathering, brutalist style, seamless, limited palette

Row W — 木墙/木板 x37:
Pixel art 16x16 top-down wooden wall tile spritesheet row, 37 wood plank wall variations, horizontal and vertical boards, different wood tones (brown, dark brown), some weathered, some painted, seamless, limited palette

Row X — 玻璃幕墙 x37:
Pixel art 16x16 top-down glass window wall tile spritesheet row, 37 glass curtain wall variations, blue/green glass panes with frame grid, some reflective, some with interior lights, modern office building style, limited palette
```

---

## 四、建筑屋顶（每组1行 × 37列）

### 4.1 屋顶 — 4组
```
Row Y — 红瓦屋顶 x37:
Pixel art 16x16 top-down red roof tile spritesheet row, 37 red terracotta roof tile variations, overlapping tile pattern, ridge tiles, different roof slopes, some with chimneys, limited palette

Row Z — 灰瓦/石板顶 x37:
Pixel art 16x16 top-down slate roof tile spritesheet row, 37 gray/blue slate roof variations, rectangular slate pattern, different roof angles, some with moss patches, limited palette

Row AA — 平顶/现代屋顶 x37:
Pixel art 16x16 top-down flat roof tile spritesheet row, 37 modern flat roof variations, gravel surface, some with equipment (AC units), some with skylights, waterproof membrane texture, limited palette

Row AB — 玻璃顶/天窗 x37:
Pixel art 16x16 top-down glass roof tile spritesheet row, 37 glass roof/skylight variations, glass panel grid on metal frame, some with interior visible, greenhouse/conservatory style, limited palette
```

---

## 五、建筑细部（门窗、阳台、楼梯等 — 每组1行 × 37列）

### 5.1 门窗 — 4组
```
Row AC — 窗户 x37:
Pixel art 16x16 top-down window tile spritesheet row, 37 window variations from top-down view, different sizes (1x1, 2x1 tiles), some lit (yellow), some dark, different frame colors (white, brown), some with curtains, shop windows, limited palette

Row AD — 门 x37:
Pixel art 16x16 top-down door tile spritesheet row, 37 door variations top-down view, different types (wooden, glass, sliding, double), some open, some closed, different colors, shop entrance doors, limited palette

Row AE — 阳台/栏杆 x37:
Pixel art 16x16 top-down balcony tile spritesheet row, 37 balcony/railing variations, metal or concrete railings, different heights and patterns, some with plants, some empty, limited palette

Row AF — 楼梯 x37:
Pixel art 16x16 top-down stair tile spritesheet row, 37 stair variations, stairs going up/down, different angles, indoor and outdoor styles, some with railings, limited palette
```

### 5.2 其他建筑细部 — 4组
```
Row AG — 遮阳篷 x37:
Pixel art 16x16 top-down awning tile spritesheet row, 37 shop awning variations, striped canvas (red/white, green/white), retractable awnings, different angles, shopfront style, limited palette

Row AH — 招牌/标志 x37:
Pixel art 16x16 top-down sign tile spritesheet row, 37 sign variations, shop signs (horizontal, vertical), neon signs, hanging signs, different colors, Chinese characters suggested, limited palette

Row AI — 管道/通风 x37:
Pixel art 16x16 top-down pipe tile spritesheet row, 37 pipe/ventilation variations, drain pipes, AC pipes, ventilation grilles, manhole covers, utility access, limited palette

Row AJ — 围栏 x37:
Pixel art 16x16 top-down fence tile spritesheet row, 37 fence variations, metal railing, wooden fence, chain link, iron gate, different heights, some with plants, limited palette
```

---

## 六、室内地面（每组1行 × 37列）

### 6.1 地板 — 4组
```
Row AK — 木地板 x37:
Pixel art 16x16 top-down wood floor tile spritesheet row, 37 wood flooring variations, different wood tones (oak, walnut, pine), plank patterns (straight, herringbone), some with wear marks, seamless, limited palette

Row AL — 瓷砖地板 x37:
Pixel art 16x16 top-down tile floor spritesheet row, 37 ceramic/porcelain tile variations, checkerboard, hexagonal, square tile patterns, different colors (white, gray, beige), seamless, limited palette

Row AM — 地毯 x37:
Pixel art 16x16 top-down carpet floor tile spritesheet row, 37 carpet variations, different textures and patterns, solid colors (red, blue, beige), some with geometric patterns, some with wear marks, seamless, limited palette

Row AN — 大理石地板 x37:
Pixel art 16x16 top-down marble floor tile spritesheet row, 37 polished stone floor variations, marble veining patterns, different colors (white, gray, black), elegant lobby style, some with decorative borders, seamless, limited palette
```

### 6.2 室内墙 — 2组
```
Row AO — 室内白墙 x37:
Pixel art 16x16 top-down interior wall tile spritesheet row, 37 white/cream painted wall variations, smooth surface, some with subtle texture, some with baseboards, some with electrical outlets, limited palette

Row AP — 壁纸 x37:
Pixel art 16x16 top-down wallpaper tile spritesheet row, 37 wallpaper pattern variations, striped, floral, geometric patterns, different colors (blue, green, beige), some with borders, limited palette
```

---

## 七、家具（每组1行 × 37列，带透明背景）

### 7.1 家具 — 8组
```
Row AQ — 床 x37:
Pixel art 16x16 top-down bed furniture spritesheet row, 37 bed variations top-down view, single bed, double bed, different frame colors (wood, metal), some with blankets/pillows, transparent background, limited palette

Row AR — 桌 x37:
Pixel art 16x16 top-down table furniture spritesheet row, 37 table variations top-down view, different shapes (rectangular, round, square), different styles (wood, glass, modern), some with chairs attached, transparent bg, limited palette

Row AS — 椅 x37:
Pixel art 16x16 top-down chair furniture spritesheet row, 37 chair variations top-down view, different types (dining, office, armchair, stool), different colors, some with cushions, transparent bg, limited palette

Row AT — 柜/架 x37:
Pixel art 16x16 top-down shelf/cabinet spritesheet row, 37 shelf and cabinet variations top-down view, bookshelves with books, cabinets with doors, display shelves with items, different wood tones, transparent bg, limited palette

Row AU — 桌/柜台 x37:
Pixel art 16x16 top-down counter/desk spritesheet row, 37 desk and counter variations top-down view, office desks with monitor, shop counters, reception desk, different styles, transparent bg, limited palette

Row AV — 沙发 x37:
Pixel art 16x16 top-down sofa spritesheet row, 37 sofa variations top-down view, different sizes (1-seat, 2-seat, 3-seat, L-shape), different colors (blue, red, gray), some with cushions, transparent bg, limited palette

Row AW — 家电 x37:
Pixel art 16x16 top-down appliance spritesheet row, 37 home appliance variations top-down view, refrigerator (different sizes), TV, washing machine, microwave, stove, different colors (white, silver), transparent bg, limited palette

Row AX — 装饰物 x37:
Pixel art 16x16 top-down decoration item spritesheet row, 37 decorative item variations, vases with flowers, small statues, potted plants, wall art, clocks, trophies, transparent bg, limited palette
```

---

## 八、室外装饰（每组1行 × 37列）

### 8.1 室外装饰 — 6组
```
Row AY — 植物 x37:
Pixel art 16x16 top-down plant spritesheet row, 37 plant/ bush variations, small shrubs, hedge bushes, flower bushes, different green tones, some with flowers (pink, red), transparent bg, limited palette

Row AZ — 树木 x37:
Pixel art 16x16 top-down tree spritesheet row, 37 tree variations top-down view, different tree types (round, oval, pine), different sizes, green canopy visible from above, some with shadows, transparent bg, limited palette

Row BA — 路灯 x37:
Pixel art 16x16 top-down street lamp spritesheet row, 37 lamp post variations, different styles (modern, classic, double-arm), circular light area around base, some lit (yellow glow), transparent bg, limited palette

Row BB — 公共设施 x37:
Pixel art 16x16 top-down street furniture spritesheet row, 37 public facility variations, park bench, trash bin, bus stop sign, mailbox, fire hydrant, phone booth, bicycle rack, transparent bg, limited palette

Row BC — 招牌/标志柱 x37:
Pixel art 16x16 top-down sign post spritesheet row, 37 street sign variations, directional signs, name signs, advertising boards, standing menu signs for shops, different colors, transparent bg, limited palette

Row BD — 路障/护栏 x37:
Pixel art 16x16 top-down barrier spritesheet row, 37 barrier variations, traffic cones, barriers, bollards, planters as barriers, chain link, different colors (orange, yellow, white), transparent bg, limited palette
```

---

## 九、小物品/道具（每组1行 × 37列，透明背景）

### 9.1 物品 — 6组
```
Row BE — 箱/桶 x37:
Pixel art 16x16 top-down container spritesheet row, 37 box and barrel variations, wooden crates, cardboard boxes, metal barrels (blue, red), plastic bins, some open showing contents, transparent bg

Row BF — 瓶/罐 x37:
Pixel art 16x16 top-down bottle/pot spritesheet row, 37 bottle and jar variations, glass bottles different colors, potion bottles, ceramic jars, vases, some with labels, transparent bg

Row BG — 工具 x37:
Pixel art 16x16 top-down tool spritesheet row, 37 tool variations, hammer, wrench, screwdriver, shovel, pickaxe, broom, different angles, some on ground, some in stands, transparent bg

Row BH — 食物 x37:
Pixel art 16x16 top-down food spritesheet row, 37 food item variations, bread, fruit (apple, banana), vegetables, cooked meals, plates with food, drinks (cup, bottle), different cuisines, transparent bg

Row BI — 书籍/文件 x37:
Pixel art 16x16 top-down book spritesheet row, 37 book and document variations, closed books different colors, open book, stack of books, rolled scroll, papers, folder, transparent bg

Row BJ — 钱币/珠宝 x37:
Pixel art 16x16 top-down valuables spritesheet row, 37 coin and jewel variations, gold coins scattered and stacked, silver coins, gemstones different colors, diamond, gold bar, treasure chest, transparent bg
```

---

## 十、角色（每组1行 × 37列，48×64，透明背景）

### 10.1 角色 — 4组（每帧 48×64，每行放不下37个，可分多行）
```
Row BK — 市民NPC x37:
Pixel art top-down 2D character spritesheet, 37 NPC variations, diverse city residents (men, women, elderly, young), different outfits (casual, business, worker), 4 direction frames (down, left, right, up), each direction 48x64 pixels, transparent bg, urban style

Row BL — 敌人/混混 x37:
Pixel art top-down 2D character spritesheet, 37 enemy/thug variations, aggressive-looking characters, different outfits (leather jacket, hoodie, suit), different skin tones, 4 direction walk frames 48x64 each, transparent bg

Row BM — 玩家外观 x37:
Pixel art top-down 2D character spritesheet, 37 player character appearance variations, different hairstyles (short, long, ponytail), different outfits (t-shirt, hoodie, jacket, suit), different colors, 4 direction frames 48x64 each, transparent bg

Row BN — 动物 x37:
Pixel art top-down 2D animal spritesheet, 37 small animal variations, cat (different colors), dog (different breeds), bird, squirrel, rat, 4 direction walk frames, each 16x16 or 32x32, transparent bg
```

---

## 十一、UI 元素

### 11.1 UI（不需要按行，逐张生成即可）
```
Title screen background:
Pixel art city skyline at sunset, top-down wide view of a modern Chinese coastal city, skyscrapers, ocean, harbor, warm orange and blue palette, 800x600 pixels, limited palette game title screen

Game UI buttons:
Pixel art game UI button set, rounded rectangle buttons, different sizes (128x32, 96x28), different colors (blue primary, gray secondary, red danger), with hover state (lighter) and pressed state (darker), clean pixel style, limited palette

HUD elements:
Pixel art game HUD elements, health bar (red), energy bar (yellow), money icon (gold coin), time display, minimap frame, simple clean style, consistent with city theme, limited palette

Dialog box:
Pixel art game dialog box, rounded corners, border frame, dark blue semi-transparent background, name label area, text area, scroll indicator, 256x96 pixels, clean readable style
```

---

## 处理流程（拿到图片后）

1. **切片** — 每行37列的长条图 → 用工具切成 37 个单独的 16×16 PNG
   ```
   ImageMagick: convert row.png -crop 16x16 tile_%04d.png
   或用 Python:
   from PIL import Image
   img = Image.open('row.png')
   for i in range(37):
       tile = img.crop((i*16, 0, i*16+16, 16))
       tile.save(f'tile_{i:04d}.png')
   ```

2. **调色板量化**（可选）— 减少颜色数到 ≤16
   ```
   from PIL import Image
   pal = Image.new('P', (1,1))
   pal.putpalette([...])  # 你的调色板
   img.quantize(palette=pal).save('output.png')
   ```

3. **放大 4 倍** — 16×16 → 64×64
   ```
   img.resize((64, 64), Image.NEAREST).save('output.png')
   ```

4. **去背景** — 透明背景自动保留（PNG 格式输出）

---

## 批量生成建议

| 优先级 | 类别 | 行数 | 用途 |
|--------|------|------|------|
| P0 | 地面（草地、道路、水域） | 18行 | 城市地图基础 |
| P0 | 建筑墙体外墙 | 8行 | 建筑外观 |
| P0 | 门窗 | 4行 | 建筑入口 |
| P1 | 屋顶 | 4行 | 建筑顶部 |
| P1 | 室内地面/墙 | 6行 | 室内场景 |
| P1 | 家具 | 8行 | 室内布置 |
| P1 | 室外装饰 | 6行 | 地图美化 |
| P2 | 物品道具 | 6行 | 游戏物品 |
| P2 | 角色精灵 | 4行 | NPC和玩家 |
