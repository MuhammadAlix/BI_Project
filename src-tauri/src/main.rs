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

#[tauri::command]
fn complementary(seq: &str) -> String {
    let newseq = seq.to_uppercase();
    let mut complementary_sequence = String::new();

    for base in newseq.chars() {
        let complementary_base = match base {
            'A' => 'T',
            'T' => 'A',
            'C' => 'G',
            'G' => 'C',
            'U' => 'T', 
            _ => base,
        };
        complementary_sequence.push(complementary_base);
    }
    
    format!("The complementary strand is {}",complementary_sequence)
}

#[tauri::command]
fn gc(seq: &str) -> String {
    let newseq = seq.to_uppercase();
    let count_a = newseq.matches('A').count();
    let count_t = newseq.matches('T').count();
    let count_g = newseq.matches('G').count();
    let count_c = newseq.matches('C').count();
    let total = count_a + count_c + count_g + count_t;

    let gc = if total != 0 {
        ((count_c + count_g) as f64 / total as f64) * 100.0
    } else {
        0.0 
    };

    format!("GC content in the sequence is {:.2}%", gc)
}

#[tauri::command]
fn transcription(seq: &str) ->String {
    let newseq= seq.to_uppercase();
    let mut transcription_sequence = String::new();

    for base in newseq.chars() {
        let transcription_base = match base {
            'A' => 'A',
            'T' => 'U',
            'C' => 'C',
            'G' => 'G',
            
            _ => base,
        };
        transcription_sequence.push(transcription_base);
    }
    
    transcription_sequence    
}

#[tauri::command]
fn dna_motif(seq: &str, motif: &str) -> String {
    let sequence = seq.to_uppercase();
    let motif = motif.to_uppercase();
    let seq_len = sequence.len();
    let motif_len = motif.len();
    let mut locations = Vec::new();

    if motif_len > seq_len {
        return "Motif is longer than the sequence".to_string();
    }
    for i in 0..=(seq_len - motif_len) {
        if &sequence[i..i + motif_len] == motif {
            locations.push(i + 1); 
        }
    }
    format!("The given motif is at positions {:?}", locations)
}

#[tauri::command]
fn point_mutation(seq1: &str, seq2: &str) -> String {
    let first_seq = seq1.to_uppercase();
    let second_seq = seq2.to_uppercase();
    let mut c = 0;

    let first_chars: Vec<char> = first_seq.chars().collect();
    let second_chars: Vec<char> = second_seq.chars().collect();

    let first_len = first_chars.len();
    let second_len = second_chars.len();

    if first_len != second_len {
        return "Strings are of different lengths".to_string();
    }

    for i in 0..first_len {
        if first_chars[i] != second_chars[i] {
            c += 1;
        }
    }

    format!("There are {} mutations in your sequences", c)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![n_count,complementary,gc,transcription,dna_motif,point_mutation])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}