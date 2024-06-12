// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn n_count(seq: &str) -> String {
    let newseq = seq.to_uppercase();
    let count_a = newseq.matches('A').count();
    let count_t = newseq.matches('T').count();
    let count_g = newseq.matches('G').count();
    let count_c = newseq.matches('C').count();
    format!("Count of A is {}! Count of T is {}! Count of G is {}! Count of C is {}!", count_a, count_t, count_g, count_c)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![n_count])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}