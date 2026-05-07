# 申海漂 - audio_manager.gd (Autoload)
# 音频管理：BGM 切换、SFX 播放、音量控制
extends Node

const BGM_BUS := "Music"
const SFX_BUS := "SFX"

var _current_bgm: AudioStreamPlayer = null
var _bgm_volume: float = 1.0
var _sfx_volume: float = 1.0

@onready var _sfx_player: AudioStreamPlayer = _make_sfx_player()

func _ready() -> void:
	process_mode = ProcessMode.PROCESS_MODE_ALWAYS
	add_child(_sfx_player)

func _make_sfx_player() -> AudioStreamPlayer:
	var p := AudioStreamPlayer.new()
	p.bus = SFX_BUS
	p.process_mode = ProcessMode.PROCESS_MODE_ALWAYS
	return p

## 播放 BGM（自动渐入渐出切换）
func play_bgm(stream: AudioStream, fade_time: float = 1.0) -> void:
	_fade_out_current(fade_time)
	_current_bgm = _start_new_bgm(stream, fade_time)

func _fade_out_current(fade_time: float) -> void:
	if not _current_bgm:
		return
	var old := _current_bgm
	var tw := create_tween()
	tw.set_process_mode(Tween.TWEEN_PROCESS_IDLE)
	tw.tween_property(old, "volume_db", -80.0, fade_time)
	tw.finished.connect(_free_player.bind(old))
	_current_bgm = null

func _start_new_bgm(stream: AudioStream, fade_time: float) -> AudioStreamPlayer:
	var p := AudioStreamPlayer.new()
	p.bus = BGM_BUS
	p.stream = stream
	p.volume_db = -80.0
	add_child(p)
	p.play()
	var tw := create_tween()
	tw.set_process_mode(Tween.TWEEN_PROCESS_IDLE)
	var target_vol := -10.0 * _bgm_volume
	tw.tween_property(p, "volume_db", target_vol, fade_time)
	return p

func _free_player(p: AudioStreamPlayer) -> void:
	if is_instance_valid(p):
		p.stop()
		p.queue_free()

func play_sfx(stream: AudioStream) -> void:
	_sfx_player.stream = stream
	_sfx_player.play()

func set_bgm_volume(vol: float) -> void:
	_bgm_volume = clampf(vol, 0.0, 1.0)
	var idx := AudioServer.get_bus_index(BGM_BUS)
	AudioServer.set_bus_volume_db(idx, _linear_to_db(_bgm_volume))

func set_sfx_volume(vol: float) -> void:
	_sfx_volume = clampf(vol, 0.0, 1.0)
	var idx := AudioServer.get_bus_index(SFX_BUS)
	AudioServer.set_bus_volume_db(idx, _linear_to_db(_sfx_volume))

func stop_bgm(fade_time: float = 0.5) -> void:
	_fade_out_current(fade_time)

static func _linear_to_db(v: float) -> float:
	if v <= 0.0:
		return -80.0
	return 20.0 * log(v) / log(10.0)
