#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate diff;

#[tauri::command]
fn diff_left(left: String, right: String) -> String {
    let mut left_result = String::from("");

    for diff in diff::chars(&left, &right) {
        match diff {
            diff::Result::Left(l) => {
                left_result.push_str("+");
                left_result.push_str(&l.to_string());
            }
            diff::Result::Both(l, _) => left_result.push_str(&l.to_string()),
            diff::Result::Right(_r) => (),
        }
    }

    left_result
}

#[tauri::command]
fn diff_right(left: String, right: String) -> String {
    let mut right_result = String::from("");

    for diff in diff::chars(&left, &right) {
        match diff {
            diff::Result::Left(_l) => (),
            diff::Result::Both(l, _) => right_result.push_str(&l.to_string()),
            diff::Result::Right(r) => {
                right_result.push_str("-");
                right_result.push_str(&r.to_string());
            }
        }
    }
    right_result
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![diff_left, diff_right])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
