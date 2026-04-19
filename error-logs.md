# Donut Browser Error Logs

## GBM Buffer Errors
```
Failed to create GBM buffer of size 800x500: Invalid argument
Failed to create GBM buffer of size 800x500: Invalid argument
```

## Webview Label Error
```
thread 'main' (303111) panicked at src/lib.rs:1282:40:
called `Result::unwrap()` on an `Err` value: WebviewLabelAlreadyExists("main")
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

## GTK Initialization Error (after DBus restart)
```
thread 'main' (303338) panicked at /home/pelvity/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/tao-0.34.8/src/platform_impl/linux/event_loop.rs:217:53:
Failed to initialize gtk backend!: BoolError { message: "Failed to initialize GTK", filename: "/home/pelvity/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/gtk-0.18.2/src/rt.rs", function: "gtk::rt::init", line: 141 }
```

## App Startup Logs (successful backend init)
```
[2026-04-16 22:35:56.261][donutbrowser_lib::app_auto_updater][INFO] === App Update Check ===
[2026-04-16 22:35:56.261][donutbrowser_lib::app_auto_updater][INFO] Current version: dev-0.21.0
[2026-04-16 22:35:56.261][donutbrowser_lib::app_auto_updater][INFO] Is nightly build: true
[2026-04-16 22:35:56.556][donutbrowser_lib::app_auto_updater][INFO] Fetched 100 releases from GitHub
[2026-04-16 22:35:56.688][donutbrowser_lib::api_client][INFO] Fetched 26 total Camoufox releases from GitHub
[2026-04-16 22:35:56.793][donutbrowser_lib::api_client][INFO] Fetched Wayfern version: 146.0.7680.165
[2026-04-16 22:35:57.508][donutbrowser_lib::downloaded_browsers_registry][INFO] Auto-downloading wayfern 146.0.7680.165
[2026-04-16 22:35:57.592][donutbrowser_lib::downloader][INFO] Download URL resolved: https://download.wayfern.com/wayfern-146.0.7680.164-linux-x64.tar.xz
```

## DBus Single Instance Error
```
[2026-04-16 22:59:03.938][zbus::connection][INFO] monitor_name_lost; name=com.donutbrowser.SingleInstance
thread 'main' (302939) panicked at src/lib.rs:1282:40:
called `Result::unwrap()` on an `Err` value: WebviewLabelAlreadyExists("main")
```

## Build Output
```
✓ Compiled successfully in 6.5s
✓ Finished TypeScript in 7.2s    
✓ Collecting page data using 4 workers in 284ms    
✓ Generating static pages using 4 workers (3/3) in 323ms
✓ Finalizing page optimization in 528ms    
Finished `release` profile [optimized] target(s) in 6m 06s
Built application at: /home/pelvity/personal/donutbrowser/src-tauri/target/release/donutbrowser
Bundling Donut_0.21.0_amd64.deb
Bundling Donut-0.21.0-1.x86_64.rpm
```

## Environment
- OS: Cachyos Linux (Arch-based)
- Architecture: x86_64
- Git repo: zhom/donutbrowser
- Branch: master (commit adb1335)
