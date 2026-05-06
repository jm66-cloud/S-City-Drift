# Execution Lock — Shen Hai Piao

## canvas
- base_size: 48x64
- tile_size: 64x64
- item_size: 32x32
- format: RGBA PNG

## palette
- name: DB32 (DawnBringer 32)
- colors:
  - #000000
  - #222034
  - #45283C
  - #663931
  - #8F563B
  - #DF7126
  - #D9A066
  - #EEC39A
  - #FBF236
  - #99E550
  - #6ABE30
  - #37946E
  - #4B692F
  - #524B24
  - #323C39
  - #3F3F74

## style
- sub_style: outlined
- outline_color: #000000
- shading: 3-tone
- dithering: none
- light_direction: top-left

## per_sprite_budget
- max_colors: 16

## assets
- characters:
  - player: 6 outfits x 5 hairstyles = 30 variants, 48x64, 4-dir, idle(2)+walk(4)+interact(2)=8f/dir, 32f total
  - npc_core: [wang_ayi, a_qiang, chen_ya, xiao_lin, lao_zhang, officer_zhao], 48x64, 4-dir, idle(2)+walk(4)+interact(2)
  - npc_city: 14 npcs, 48x64, 4-dir, idle(2)+walk(4)
  - pedestrians: 5 base templates, 48x64, 4-dir, walk(4)

- tiles:
  - ground: grass(6v), sidewalk(4v), road(5v), sand(4v), dirt(4v), water(8f anim), indoor(8v)
  - buildings: residential(1), exchange(1), store(1), cafe(1), bank(1), hospital(1), office(1), library(1), restaurant(1), police(1), ktv(1), bar(1), stadium(1), lighthouse(1), port(1)
  - decorations: lamp, bench, trashcan, bus_stop, atm, mailbox, notice_board, trees(4 seasons), flowers
  - indoor_tiles: apartment(8), exchange(6), store(6), cafe(6)

- items: 120 items, 32x32
  - food(15), drink(5), ingredient(10), medicine(5), gift(20), tool(5), furniture(60)

- ui: title_screen, buttons(6), icons(20), dialog_boxes(3), hud_elements(10), phone_ui(8), toolbar, map_markers(8)

- effects: wave(8f), cherry_blossom(4f), leaf(4f), rain(2f), coin_sparkle(4f), buy_effect(4f), dust(2f), dialog_bubble(4)

- backgrounds: title_bg(1, 1920x1080), sky_gradient(4 season variants, 64x64 tileable)

## forbidden
- Anti-aliasing
- Gradient fills
- Partial opacity (1-254 alpha)
- Colors outside declared palette
- Sub-pixel rendering
