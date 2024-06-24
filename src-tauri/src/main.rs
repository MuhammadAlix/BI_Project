// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::collections::HashMap;


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
    let count_u = newseq.matches('U').count();
    let total = count_a + count_c + count_g + count_t+count_u;

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


#[tauri::command]
fn calculate_profile_matrix_and_consensus(sequences: Vec<String>) -> Result<(HashMap<char, Vec<String>>, String), String> {
    if sequences.is_empty() {
        return Err("Input list of sequences is empty".to_string());
    }

    let sequence_length = sequences[0].len();
    let num_sequences = sequences.len() as f64;

    // Initialize the profile matrix with zeros
    let mut profile_matrix: HashMap<char, Vec<f64>> = HashMap::new();
    for nucleotide in ['A', 'C', 'G', 'T'].iter() {
        profile_matrix.insert(*nucleotide, vec![0.0; sequence_length]);
    }

    // Count the occurrences of each nucleotide at each position
    for sequence in sequences.iter() {
        for (i, nucleotide) in sequence.chars().enumerate() {
            if let Some(counts) = profile_matrix.get_mut(&nucleotide) {
                counts[i] += 1.0;
            }
        }
    }

    // Normalize the counts to probabilities
    for counts in profile_matrix.values_mut() {
        for count in counts.iter_mut() {
            *count /= num_sequences;
        }
    }

    // Format the probabilities to two decimal places
    let mut formatted_profile_matrix: HashMap<char, Vec<String>> = HashMap::new();
    for (nucleotide, counts) in profile_matrix.iter() {
        let formatted_counts: Vec<String> = counts.iter().map(|&c| format!("{:.2}", c)).collect();
        formatted_profile_matrix.insert(*nucleotide, formatted_counts);
    }

    // Determine the consensus sequence
    let mut consensus_sequence = String::new();
    for i in 0..sequence_length {
        let mut max_nucleotide = ' ';
        let mut max_count = -1.0;
        for nucleotide in ['A', 'C', 'G', 'T'].iter() {
            if profile_matrix[nucleotide][i] > max_count {
                max_count = profile_matrix[nucleotide][i];
                max_nucleotide = *nucleotide;
            }
        }
        consensus_sequence.push(max_nucleotide);
    }

    Ok((formatted_profile_matrix, consensus_sequence))
}



// Kmer Composition Rust

fn generate_kmers_recursive(k: usize, current: String, alphabet: &[char], kmers: &mut Vec<String>) {
    if current.len() == k {
        kmers.push(current);
        return;
    }
    for &c in alphabet {
        let mut next = current.clone();
        next.push(c);
        generate_kmers_recursive(k, next, alphabet, kmers);
    }
}

fn generate_kmers(k: usize) -> Vec<String> {
    let alphabet = ['A', 'C', 'G', 'T'];
    let mut kmers = Vec::new();
    generate_kmers_recursive(k, String::new(), &alphabet, &mut kmers);
    kmers.sort();
    kmers
}

#[tauri::command]
fn kmer_composition(sequence: &str, k: usize) -> Vec<usize> {
    let kmers = generate_kmers(k);
    let mut kmer_count: HashMap<String, usize> = HashMap::new();
    
    for kmer in &kmers {
        kmer_count.insert(kmer.clone(), 0);
    }
    
    for i in 0..=(sequence.len() - k) {
        let kmer: String = sequence[i..i + k].to_string();
        if let Some(count) = kmer_count.get_mut(&kmer) {
            *count += 1;
        }
    }
    
    kmers.iter().map(|kmer| *kmer_count.get(kmer).unwrap_or(&0)).collect()
}
#[tauri::command]
fn parse_fasta(fasta_string: &str) -> String {
    fasta_string.lines().skip(1).collect()
}



// Protein Mass Calculating
#[tauri::command]
fn protein_mass(sequence: &str) -> String {
    let mut dict = HashMap::new();
    dict.insert('A', 71.03711);dict.insert('C', 103.00919);
    dict.insert('D', 115.02694);dict.insert('E', 129.04259);
    dict.insert('F', 147.06841);dict.insert('G', 57.02146);
    dict.insert('H', 137.05891);dict.insert('I', 113.08406);
    dict.insert('K', 128.09496);dict.insert('L', 113.08406);
    dict.insert('M', 131.04049);dict.insert('N', 114.04293);
    dict.insert('P', 97.05276);dict.insert('Q', 128.05858);
    dict.insert('R', 156.10111);dict.insert('S', 87.03203);
    dict.insert('T', 101.04768);dict.insert('V', 99.06841);
    dict.insert('W', 186.07931);dict.insert('Y', 163.06333);

    // Variable to accumulate the sum
    let mut e = 0.0;

    // Iterate over the sequence and accumulate the values
    for c in sequence.chars() {
        if let Some(&value) = dict.get(&c) {
            e += value;
        } else {
            println!("Character {} not found in dictionary", c);
        }
    }

    // Return the result as a string
    format!("Your Weight of protein is {}",e)
}




#[tauri::command]
fn translation(sequence: &str) -> String {
    let mut rna_codon_table = HashMap::new();
    rna_codon_table.insert("AUG", 'M');
    rna_codon_table.insert("AAA", 'K');
    rna_codon_table.insert("AAC", 'N');
    rna_codon_table.insert("AAG", 'K');
    rna_codon_table.insert("AAU", 'N');
    rna_codon_table.insert("ACA", 'T');
    rna_codon_table.insert("ACC", 'T');
    rna_codon_table.insert("ACG", 'T');
    rna_codon_table.insert("ACU", 'T');
    rna_codon_table.insert("AGA", 'R');
    rna_codon_table.insert("AGC", 'S');
    rna_codon_table.insert("AGG", 'R');
    rna_codon_table.insert("AGU", 'S');
    rna_codon_table.insert("AUA", 'I');
    rna_codon_table.insert("AUC", 'I');
    rna_codon_table.insert("AUU", 'I');
    rna_codon_table.insert("CAA", 'Q');
    rna_codon_table.insert("CAC", 'H');
    rna_codon_table.insert("CAG", 'Q');
    rna_codon_table.insert("CAU", 'H');
    rna_codon_table.insert("CCA", 'P');
    rna_codon_table.insert("CCC", 'P');
    rna_codon_table.insert("CCG", 'P');
    rna_codon_table.insert("CCU", 'P');
    rna_codon_table.insert("CGA", 'R');
    rna_codon_table.insert("CGC", 'R');
    rna_codon_table.insert("CGG", 'R');
    rna_codon_table.insert("CGU", 'R');
    rna_codon_table.insert("CUA", 'L');
    rna_codon_table.insert("CUC", 'L');
    rna_codon_table.insert("CUG", 'L');
    rna_codon_table.insert("CUU", 'L');
    rna_codon_table.insert("GAA", 'E');
    rna_codon_table.insert("GAC", 'D');
    rna_codon_table.insert("GAG", 'E');
    rna_codon_table.insert("GAU", 'D');
    rna_codon_table.insert("GCA", 'A');
    rna_codon_table.insert("GCC", 'A');
    rna_codon_table.insert("GCG", 'A');
    rna_codon_table.insert("GCU", 'A');
    rna_codon_table.insert("GGA", 'G');
    rna_codon_table.insert("GGC", 'G');
    rna_codon_table.insert("GGG", 'G');
    rna_codon_table.insert("GGU", 'G');
    rna_codon_table.insert("GUA", 'V');
    rna_codon_table.insert("GUC", 'V');
    rna_codon_table.insert("GUG", 'V');
    rna_codon_table.insert("GUU", 'V');
    rna_codon_table.insert("UAA", '*');
    rna_codon_table.insert("UAC", 'Y');
    rna_codon_table.insert("UAG", '*');
    rna_codon_table.insert("UAU", 'Y');
    rna_codon_table.insert("UCA", 'S');
    rna_codon_table.insert("UCC", 'S');
    rna_codon_table.insert("UCG", 'S');
    rna_codon_table.insert("UCU", 'S');
    rna_codon_table.insert("UGA", '*');
    rna_codon_table.insert("UGC", 'C');
    rna_codon_table.insert("UGG", 'W');
    rna_codon_table.insert("UGU", 'C');
    rna_codon_table.insert("UUA", 'L');
    rna_codon_table.insert("UUC", 'F');
    rna_codon_table.insert("UUG", 'L');
    rna_codon_table.insert("UUU", 'F');

    let mut protein = String::new();
    let codon_len = 3;

    for i in (0..sequence.len()).step_by(codon_len) {
        if i + codon_len <= sequence.len() {
            let codon = &sequence[i..i + codon_len];
            if let Some(&amino_acid) = rna_codon_table.get(codon) {
                protein.push(amino_acid);
            } else {
                eprintln!("Warning: Codon {} not found in table", codon);
            }
        }
    }

    format!("Translated protein sequence: {}", protein)
} 


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![n_count,complementary,gc,transcription,dna_motif,point_mutation,calculate_profile_matrix_and_consensus,kmer_composition,parse_fasta,protein_mass,translation])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    

    }
