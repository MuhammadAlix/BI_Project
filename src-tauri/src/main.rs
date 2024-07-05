// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::collections::HashMap;


#[tauri::command]
fn read_fasta(content: &str) -> Result<HashMap<String, String>, String> {
    let mut sequences = HashMap::new();
    let mut sequence_id: Option<String> = None;
    let mut sequence_data = Vec::new();
    
    for line in content.lines() {
        let line = line.trim();
        
        if line.starts_with('>') {
            if let Some(id) = sequence_id.take() {
                sequences.insert(id, sequence_data.join(""));
            }
            sequence_id = Some(line[1..].to_string());  // Remove the '>' character
            sequence_data.clear();
        } else {
            sequence_data.push(line.to_string());
        }
    }
    
    if let Some(id) = sequence_id {
        sequences.insert(id, sequence_data.join(""));
    }
    
    Ok(sequences)
}


#[tauri::command]
fn n_count(seq: &str) -> Result<String, String> {
    let parsed_sequences = read_fasta(seq)?;
    
    let mut results = String::new();

    for (id, seq) in parsed_sequences {
        let seq = seq.to_uppercase();
        let mut count_a = 0;
        let mut count_t = 0;
        let mut count_c = 0;
        let mut count_g = 0;

        for base in seq.chars() {
            match base {
                'A' => count_a += 1,
                'T' => count_t += 1,
                'C' => count_c += 1,
                'G' => count_g += 1,
                _ => {}
            }
        }

        results.push_str(&format!("Sequence {}:\n A={},\n T={},\n C={},\n G={}\n", id, count_a, count_t, count_c, count_g));
    }

    Ok(results)

}

#[tauri::command]
fn complementary(seq: String) -> Result<String, String> {
    let newseq = seq.to_uppercase();
    match read_fasta(&newseq) {
        Ok(parsed_sequences) => {
            let mut result = String::new();
            for (id, sequence) in parsed_sequences {
                let mut complementary_sequence = String::new();
                for base in sequence.chars() {
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
                result.push_str(&format!(">{}\n{}\n", id, complementary_sequence));
            }
            Ok(result)
        },
        Err(e) => Err(e),
    }
}


#[tauri::command]
fn gc(content: String) -> Result<String, String> {
    let parsed_sequences = read_fasta(&content)?;
    let mut result = String::new();

    for (id, sequence) in parsed_sequences {
        let sequence = sequence.to_uppercase();
        let count_a = sequence.matches('A').count();
        let count_t = sequence.matches('T').count();
        let count_g = sequence.matches('G').count();
        let count_c = sequence.matches('C').count();
        let count_u = sequence.matches('U').count();
        let total = count_a + count_c + count_g + count_t + count_u;

        let gc = if total != 0 {
            ((count_c + count_g) as f64 / total as f64) * 100.0
        } else {
            0.0 
        };

        result.push_str(&format!("GC content in sequence {} is {:.2}%\n", id, gc));
    }

    Ok(result)
}

#[tauri::command]
fn transcription(seq: &str) -> Result<String, String> {
    let parsed_sequences = read_fasta(&seq)?; 
    let mut result = String::new();

    for (id, sequence) in parsed_sequences {
        let sequence = sequence.to_uppercase();
        let mut transcribed_sequence = String::new();

        for base in sequence.chars() {
            let transcription_base = match base {
                'A' => 'A',
                'T' => 'U',
                'C' => 'C',
                'G' => 'G',
                _ => base,
            };

            transcribed_sequence.push(transcription_base);
        }

        result.push_str(&format!(">{}\n{}\n", id, transcribed_sequence));
    }

    Ok(result)
}


#[tauri::command]
fn dna_motif(content: String, motif: String) -> Result<String, String> {
    let parsed_sequences = read_fasta(&content)?;
    let motif = motif.to_uppercase();
    let mut result = String::new();
    
    for (id, sequence) in parsed_sequences {
        let sequence = sequence.to_uppercase();
        let seq_len = sequence.len();
        let motif_len = motif.len();
        let mut locations = Vec::new();

        if motif_len > seq_len {
            result.push_str(&format!("Motif is longer than the sequence in {}\n", id));
            continue;
        }

        for i in 0..=(seq_len - motif_len) {
            if &sequence[i..i + motif_len] == motif {
                locations.push(i + 1); 
            }
        }

        result.push_str(&format!("In sequence {}:\n Motif is at positions {:?}\n", id, locations));
    }

    Ok(result)
}

#[tauri::command]
fn point_mutation(content: &str) -> Result<String, String> {
    let sequences = read_fasta(content)?;

    if sequences.len() < 2 {
        return Err("Expected at least two sequences in input".to_string());
    }

    let mut sequence_ids: Vec<&String> = sequences.keys().collect();
    sequence_ids.sort(); // Sorting to ensure consistent output order

    let mut results = String::new();

    for i in 0..sequence_ids.len() {
        for j in (i + 1)..sequence_ids.len() {
            let seq1 = &sequences[sequence_ids[i]];
            let seq2 = &sequences[sequence_ids[j]];

            let mut mutations = 0;
            let seq1_chars: Vec<char> = seq1.chars().collect();
            let seq2_chars: Vec<char> = seq2.chars().collect();

            if seq1_chars.len() != seq2_chars.len() {
                return Err(format!("Sequence {} and Sequence {} have different lengths", sequence_ids[i], sequence_ids[j]));
            }

            for k in 0..seq1_chars.len() {
                if seq1_chars[k] != seq2_chars[k] {
                    mutations += 1;
                }
            }

            results.push_str(&format!("No of point mutations between {} and\n {} is:     {}\n", sequence_ids[i], sequence_ids[j], mutations));
        }
    }

    Ok(results)
}





#[tauri::command]
fn calculate_profile_matrix_and_consensus(content: &str) -> Result<(HashMap<char, Vec<String>>, String), String> {
    let sequences_map = read_fasta(content)?;
    
    if sequences_map.is_empty() {
        return Err("Input list of sequences is empty".to_string());
    }

    let sequences: Vec<String> = sequences_map.values().cloned().collect();
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
fn generate_kmers(k: usize) -> Vec<String> {
    let alphabet = ['A', 'C', 'G', 'T'];
    let mut kmers = Vec::new();
    
    for i in 0..(1 << (2 * k)) {
        let mut kmer = String::new();
        let mut val = i;
        for _ in 0..k {
            kmer.push(alphabet[val & 0b11]);
            val >>= 2;
        }
        kmers.push(kmer.chars().rev().collect::<String>());
    }
    
    kmers.sort();
    kmers
}

// Function to calculate the k-mer composition of a sequence
#[tauri::command]
fn kmer_composition(content: &str, k: usize) -> Result<Vec<usize>, String> {
    let sequences = read_fasta(content)?;
    
    // Combine all sequences into a single string
    let combined_sequence: String = sequences.values().cloned().collect();
    
    let kmers = generate_kmers(k);
    let mut kmer_count: HashMap<String, usize> = HashMap::new();

    for kmer in &kmers {
        kmer_count.insert(kmer.clone(), 0);
    }

    for i in 0..=(combined_sequence.len() - k) {
        let kmer: String = combined_sequence[i..i + k].to_string();
        if let Some(count) = kmer_count.get_mut(&kmer) {
            *count += 1;
        }
    }

    Ok(kmer_count.values().cloned().collect())
}


// Protein Mass Calculating
#[tauri::command]

fn protein_mass(sequence: &str) -> Result<String, String> {
    let parsed_sequences = read_fasta(sequence)?;
    
    let mut dict = HashMap::new();
    dict.insert('A', 71.03711); dict.insert('C', 103.00919);
    dict.insert('D', 115.02694); dict.insert('E', 129.04259);
    dict.insert('F', 147.06841); dict.insert('G', 57.02146);
    dict.insert('H', 137.05891); dict.insert('I', 113.08406);
    dict.insert('K', 128.09496); dict.insert('L', 113.08406);
    dict.insert('M', 131.04049); dict.insert('N', 114.04293);
    dict.insert('P', 97.05276); dict.insert('Q', 128.05858);
    dict.insert('R', 156.10111); dict.insert('S', 87.03203);
    dict.insert('T', 101.04768); dict.insert('V', 99.06841);
    dict.insert('W', 186.07931); dict.insert('Y', 163.06333);

    let mut results = String::new();

    for (id, seq) in parsed_sequences {
        let seq = seq.to_uppercase();
        let mut protein_mass = 0.0;

        for c in seq.chars() {
            if let Some(&mass) = dict.get(&c) {
                protein_mass += mass;
            } else {
                return Err(format!("Unknown amino acid '{}' in sequence {}", c, id));
            }
        }

        results.push_str(&format!("Protein mass of Sequence {}: is {:.2} Da\n", id, protein_mass));
    }

    Ok(results)
}




#[tauri::command]

fn translation(content: &str) -> Result<String, String> {
    // Parse the FASTA content into sequences
    let parsed_sequences = read_fasta(content)?;

    // RNA codon table
    let mut rna_codon_table = HashMap::new();
    rna_codon_table.insert("AUG", 'M'); rna_codon_table.insert("AAA", 'K'); rna_codon_table.insert("AAC", 'N');
    rna_codon_table.insert("AAG", 'K'); rna_codon_table.insert("AAU", 'N'); rna_codon_table.insert("ACA", 'T');
    rna_codon_table.insert("ACC", 'T'); rna_codon_table.insert("ACG", 'T'); rna_codon_table.insert("ACU", 'T');
    rna_codon_table.insert("AGA", 'R'); rna_codon_table.insert("AGC", 'S'); rna_codon_table.insert("AGG", 'R');
    rna_codon_table.insert("AGU", 'S'); rna_codon_table.insert("AUA", 'I'); rna_codon_table.insert("AUC", 'I');
    rna_codon_table.insert("AUU", 'I'); rna_codon_table.insert("CAA", 'Q'); rna_codon_table.insert("CAC", 'H');
    rna_codon_table.insert("CAG", 'Q'); rna_codon_table.insert("CAU", 'H'); rna_codon_table.insert("CCA", 'P');
    rna_codon_table.insert("CCC", 'P'); rna_codon_table.insert("CCG", 'P'); rna_codon_table.insert("CCU", 'P');
    rna_codon_table.insert("CGA", 'R'); rna_codon_table.insert("CGC", 'R'); rna_codon_table.insert("CGG", 'R');
    rna_codon_table.insert("CGU", 'R'); rna_codon_table.insert("CUA", 'L'); rna_codon_table.insert("CUC", 'L');
    rna_codon_table.insert("CUG", 'L'); rna_codon_table.insert("CUU", 'L'); rna_codon_table.insert("GAA", 'E');
    rna_codon_table.insert("GAC", 'D'); rna_codon_table.insert("GAG", 'E'); rna_codon_table.insert("GAU", 'D');
    rna_codon_table.insert("GCA", 'A'); rna_codon_table.insert("GCC", 'A'); rna_codon_table.insert("GCG", 'A');
    rna_codon_table.insert("GCU", 'A'); rna_codon_table.insert("GGA", 'G'); rna_codon_table.insert("GGC", 'G');
    rna_codon_table.insert("GGG", 'G'); rna_codon_table.insert("GGU", 'G'); rna_codon_table.insert("GUA", 'V');
    rna_codon_table.insert("GUC", 'V'); rna_codon_table.insert("GUG", 'V'); rna_codon_table.insert("GUU", 'V');
    rna_codon_table.insert("UAA", '*'); rna_codon_table.insert("UAC", 'Y'); rna_codon_table.insert("UAG", '*');
    rna_codon_table.insert("UAU", 'Y'); rna_codon_table.insert("UCA", 'S'); rna_codon_table.insert("UCC", 'S');
    rna_codon_table.insert("UCG", 'S'); rna_codon_table.insert("UCU", 'S'); rna_codon_table.insert("UGA", '*');
    rna_codon_table.insert("UGC", 'C'); rna_codon_table.insert("UGG", 'W'); rna_codon_table.insert("UGU", 'C');
    rna_codon_table.insert("UUA", 'L'); rna_codon_table.insert("UUC", 'F'); rna_codon_table.insert("UUG", 'L');
    rna_codon_table.insert("UUU", 'F');

    // Translate each sequence
    let mut translation_result = String::new();

    for (id, sequence) in parsed_sequences {
        let sequence = sequence.to_uppercase();
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

        translation_result.push_str(&format!(">{}\n{}\n", id, protein));
    }

    Ok(translation_result)
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![n_count,complementary,gc,transcription,dna_motif,point_mutation,calculate_profile_matrix_and_consensus,kmer_composition,protein_mass,translation,read_fasta])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    }
