const invoke = window.__TAURI__.invoke;

// Preload animation:
var preload = document.querySelector('.preload')
window.addEventListener("load",function(){
  setInterval(()=> {
    preload.style.display="none";
  } , 3000)
})


// resizing terminals


// sidebar resizing

var resizeable = document.querySelector('.sidr'),
    sidebar = document.querySelector('.right_sidebar'),
    main = document.querySelector('.main');

function resizer(sidebar, resizeable, main) {
    var x, w;

    function rs_mousedownHandler(e) {
        x = e.clientX;
        var sbwidth = window.getComputedStyle(sidebar).width;
        w = parseInt(sbwidth, 10);
        document.addEventListener("mousemove", rs_mousemoveHandler);
        document.addEventListener("mouseup", rs_mouseupHandler);
    }

    function rs_mousemoveHandler(e) {
        var dx = e.clientX - x;
        var cw = dx + w;
        if (cw < 400) { // Set minimum and maximum sidebar width
            sidebar.style.width = `${cw}px`;
            main.style.flexBasis = `calc(100% - ${cw}px)`; // Adjust main content width
        }
    }

    function rs_mouseupHandler() {
        document.removeEventListener("mousemove", rs_mousemoveHandler);
        document.removeEventListener("mouseup", rs_mouseupHandler);
    }

    resizeable.addEventListener("mousedown", rs_mousedownHandler);
}

resizer(sidebar, resizeable, main);

// codearea resizing


var codeArea = document.querySelector('.codearea'),
    resizeHandleCode = document.querySelector('.coder');

function codeAreaResizer(codeArea, resizeHandleCode) {
    var x, w;

    function rs_mousedownHandler(e) {
        x = e.clientX;
        var sbwidth = window.getComputedStyle(codeArea).width;
        w = parseInt(sbwidth, 10);
        document.addEventListener("mousemove", rs_mousemoveHandler);
        document.addEventListener("mouseup", rs_mouseupHandler);
    }

    function rs_mousemoveHandler(e) {
        var dx = e.clientX - x;
        var cw = w - dx; // Update width calculation to resize from left to right
        if (cw > 200 && cw < window.innerWidth - 800) { // Set minimum and maximum code area width
            codeArea.style.width = `${cw}px`;
        }
    }

    function rs_mouseupHandler() {
        document.removeEventListener("mousemove", rs_mousemoveHandler);
        document.removeEventListener("mouseup", rs_mouseupHandler);
    }

    resizeHandleCode.addEventListener("mousedown", rs_mousedownHandler);
}

codeAreaResizer(codeArea, resizeHandleCode);



// terminal resizing
var terminal = document.querySelector('.terminal'),
    resizeHandle = document.querySelector('.terminalr');

function terminalResizer(terminal, resizeHandle) {
    var y, h;

    function tr_mousedownHandler(e) {
        y = e.clientY;
        var termHeight = window.getComputedStyle(terminal).height;
        h = parseInt(termHeight, 10);
        document.addEventListener("mousemove", tr_mousemoveHandler);
        document.addEventListener("mouseup", tr_mouseupHandler);
    }

    function tr_mousemoveHandler(e) {
        var dy = y - e.clientY;
        var ch = h + dy;
        if (ch < 500 && ch > 100) { // Set minimum and maximum terminal height
            terminal.style.height = `${ch}px`;
        }
    }

    function tr_mouseupHandler() {
        document.removeEventListener("mousemove", tr_mousemoveHandler);
        document.removeEventListener("mouseup", tr_mouseupHandler);
    }

    resizeHandle.addEventListener("mousedown", tr_mousedownHandler);
}

terminalResizer(terminal, resizeHandle);


// sidebar click functionalities

document.addEventListener("DOMContentLoaded", function() {
    // Select elements
    const DNA = document.querySelector('.DNA');
    const DNA_data = document.querySelector('.DNA-data');
    const RNA = document.querySelector('.RNA');
    const RNA_data = document.querySelector('.RNA-data');
    const Protein = document.querySelector('.Protein');
    const Protein_data = document.querySelector('.Protein-data');


    // Add event listeners
    Protein.addEventListener('click', function() {
        Protein_data.style.display = "block";
        DNA_data.style.display = "none";    
        RNA_data.style.display = "none";  
    });

    DNA.addEventListener('click', function() {
        DNA_data.style.display = "block";
        RNA_data.style.display = "none";
        Protein_data.style.display = "none";
    });

    RNA.addEventListener('click', function() {
        RNA_data.style.display = "block";
        DNA_data.style.display = "none";    
        Protein_data.style.display = "none";
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // Select elements
    const PDNA = document.querySelector('.DNA');
    const PDNA_data = document.querySelector('.PDNA-data');
    const PRNA = document.querySelector('.RNA');
    const PRNA_data = document.querySelector('.PRNA-data');
    const PProtein = document.querySelector('.Protein');
    const PProtein_data = document.querySelector('.PProtein-data');


    // Add event listeners
    PProtein.addEventListener('click', function() {
        PProtein_data.style.display = "block";
        PDNA_data.style.display = "none";    
        PRNA_data.style.display = "none";  
    });

    PDNA.addEventListener('click', function() {
        PDNA_data.style.display = "block";
        PRNA_data.style.display = "none";
        PProtein_data.style.display = "none";
    });

    PRNA.addEventListener('click', function() {
        PRNA_data.style.display = "block";
        PDNA_data.style.display = "none";    
        PProtein_data.style.display = "none";
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // Select elements
    const RDNA = document.querySelector('.DNA');
    const RDNA_data = document.querySelector('.RDNA-data');
    const RRNA = document.querySelector('.RNA');
    const RRNA_data = document.querySelector('.RRNA-data');
    const RProtein = document.querySelector('.Protein');
    const RProtein_data = document.querySelector('.RProtein-data');


    // Add event listeners
    RProtein.addEventListener('click', function() {
        RProtein_data.style.display = "block";
        RDNA_data.style.display = "none";    
        RRNA_data.style.display = "none";  
    });

    RDNA.addEventListener('click', function() {
        RDNA_data.style.display = "block";
        RRNA_data.style.display = "none";
        RProtein_data.style.display = "none";
    });

    RRNA.addEventListener('click', function() {
        RRNA_data.style.display = "block";
        RDNA_data.style.display = "none";    
        RProtein_data.style.display = "none";
    });
});

//DNA Tools Handeling

document.addEventListener("DOMContentLoaded", function(){

    const submit = document.querySelector("#submitbtn");
    const terminal = document.querySelector('.terminal');
    const description = document.querySelector('.description');
    const description_text = document.querySelector('.description_text');

        description.addEventListener('click',function(){
            description_text.style.display = description_text.style.display === 'none' ? 'block' : 'none';
        });
        submit.addEventListener('click', function() {
            var textarea = document.querySelector('#seq-text');
            var output = document.querySelector('.outputss');
            var text = textarea.value;
            invoke('n_count', {seq: text}).then((result) => output.textContent=result);
            terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
        });
    })
    

document.addEventListener("DOMContentLoaded",function(){
    const code = document.querySelector("#codebtn");
    const codedata = document.querySelector(".codearea");
    const reset = document.querySelector("#resetbtn");
    const textarea = document.querySelector("#seq-text");
    const terminal = document.querySelector('.terminal');


    code.addEventListener('click',function(){
        if(codedata.style.display==="none"){
            codedata.style.display = "flex";
        }else {
            codedata.style.display = "none";
        }
    });

    reset.addEventListener('click',function(){
        textarea.value = '';
        terminal.style.display='none';
        codedata.style.display='none';
    });


});


// Codearea click events

document.addEventListener('DOMContentLoaded', function() {
    const rust = document.querySelector('#rust');
    const python = document.querySelector('#python');
    const rust_code = document.querySelector('#rustCode');
    const python_code = document.querySelector('#pythonCode');
    const copy = document.querySelector('#copybtn');

    rust.addEventListener('click', function() {
        rust_code.style.display = 'block';
        python_code.style.display = 'none';
        rust.style.backgroundColor = '#e6edf3';
        rust.style.border = '1px solid #e6edf3';
        rust.style.color = '#656d76';
        python.style.backgroundColor = '#656d76';
        python.style.border = '1px solid #656d76';
        python.style.color = '#e6edf3';
    });

    python.addEventListener('click', function() {
        python_code.style.display = 'block';
        rust_code.style.display = 'none';
        python.style.backgroundColor = '#e6edf3';
        python.style.border = '1px solid #e6edf3';
        python.style.color = '#656d76';
        rust.style.backgroundColor = '#656d76';
        rust.style.border = '1px solid #656d76';
        rust.style.color = '#e6edf3';
    });

    copy.addEventListener('click', function() {
        if (python_code.style.display === "block") {
            navigator.clipboard.writeText(python_code.innerText)
                .then(() => {
                    window.alert('Python code copied to clipboard');
                })
                .catch(err => {
                    console.error('Failed to copy Python code: ', err);
                });
        } else {
            navigator.clipboard.writeText(rust_code.innerText)
                .then(() => {
                    window.alert('Rust code copied to clipboard');
                })
                .catch(err => {
                    console.error('Failed to copy Rust code: ', err);
                });
        }
    });
});                        






// NC Page JS


document.addEventListener("DOMContentLoaded", function() {
    const codedata = document.querySelector(".codearea");
    const reset = document.querySelector("#resetbtn");
    const submit = document.querySelector("#NC_submitbtn");
    const terminal = document.querySelector('.terminal');
    const fileInput = document.querySelector("#NC_fasta_file_input");
    const textarea = document.querySelector("#NC_seq-text");
    const output = document.querySelector('.NC_outputs');

    fileInput.addEventListener("change", async function() {
        const file = fileInput.files[0];

        if (!file) {
            textarea.value = 'Please select a file.';
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const fileContent = new TextDecoder().decode(arrayBuffer);
            textarea.value = fileContent;
        } catch (error) {
            textarea.value = `Error: ${error}`;
        }
    });

    submit.addEventListener('click', function() {
        const fileContent = textarea.value;

        if (!fileContent.trim()) {
            output.textContent = 'There is no input';
            return;
        }

        invoke('n_count', { seq: fileContent }).then((result) => {
            output.textContent = result;
            terminal.style.display = 'block';
        }).catch((error) => {
            output.textContent = `Error: ${error}`;
        });
    });

    reset.addEventListener('click', function() {
        textarea.value = '';
        terminal.style.display = 'none';
        codedata.style.display = 'none';
        output.textContent = '';
    });
});






// Complementary Page JS

document.addEventListener("DOMContentLoaded", function(){
    const codedata = document.querySelector(".codearea");
    const reset = document.querySelector("#resetbtn");
    const textarea = document.querySelector("#Comp_seq-text");
    const submit = document.querySelector("#Comp_submitbtn");
    const terminal = document.querySelector('.terminal');
    const fileInput = document.querySelector("#Comp_fasta_file_input");
    const output = document.querySelector('.Comp_outputs');


    fileInput.addEventListener("change", async function() {
        const file = fileInput.files[0];

        if (!file) {
            textarea.value = 'Please select a file.';
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const fileContent = new TextDecoder().decode(arrayBuffer);
            textarea.value = fileContent;
        } catch (error) {
            textarea.value = `Error: ${error}`;
        }
    });

    submit.addEventListener('click', function() {
        const fileContent = textarea.value;

        if (!fileContent.trim()) {
            output.textContent = 'There is no input';
            return;
        }

        invoke('complementary', { seq: fileContent }).then((result) => {
            output.textContent = result;
            terminal.style.display = 'block';
        }).catch((error) => {
            output.textContent = `Error: ${error}`;
        });
    });
        reset.addEventListener('click',function(){
            textarea.value = '';
            terminal.style.display='none';
            codedata.style.display='none';
        });
    });






// GC Page JS

document.addEventListener("DOMContentLoaded", function() {
    const submit = document.querySelector("#GC_submitbtn");
    const terminal = document.querySelector('.terminal');
    const textarea = document.querySelector('#GC_seq-text');
    const output = document.querySelector('.GC_outputs');
    const codedata = document.querySelector(".codearea");
    const reset = document.querySelector("#resetbtn");
    const fileInput = document.querySelector("#GC_fasta_file_input");

    fileInput.addEventListener("change", async function() {
        const file = fileInput.files[0];

        if (!file) {
            textarea.value = 'Please select a file.';
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const fileContent = new TextDecoder().decode(arrayBuffer);
            textarea.value = fileContent;
        } catch (error) {
            textarea.value = `Error: ${error}`;
        }
    });

    submit.addEventListener('click', function() {
        var text = textarea.value;

        if (!text.trim()) {
            output.textContent = 'There is no input';
            return;
        }

        invoke('gc', { content: text }).then((result) => {
            output.textContent = result;
            terminal.style.display = 'block';
        }).catch((error) => {
            output.textContent = `Error: ${error}`;
        });
    });

    reset.addEventListener('click', function() {
        textarea.value = '';
        output.textContent = '';
        terminal.style.display = 'none';
        codedata.style.display = 'none';
    });
});







// Transcription Page JS

document.addEventListener("DOMContentLoaded", function() {
    const submit = document.querySelector("#Transcription_submitbtn");
    const terminal = document.querySelector('.terminal');
    const codedata = document.querySelector(".codearea");
    const reset = document.querySelector("#resetbtn");
    const textarea = document.querySelector("#Transcription_seq-text");
    const fileInput = document.querySelector("#Transcription_fasta_file_input");
    const output = document.querySelector('.Transcription_outputs');

    fileInput.addEventListener("change", async function() {
        const file = fileInput.files[0];

        if (!file) {
            textarea.value = 'Please select a file.';
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const fileContent = new TextDecoder().decode(arrayBuffer);
            textarea.value = fileContent;
        } catch (error) {
            textarea.value = `Error: ${error}`;
        }
    });

    submit.addEventListener('click', function(event) {
        event.preventDefault();
        const text = textarea.value;

        console.log("Submit button clicked");
        console.log("Text area content:", text);

        if (!text.trim()) {
            output.textContent = 'There is no input';
            return;
        }

        invoke('transcription', { seq: text }).then((result) => {
            console.log("Invoke result:", result);
            output.textContent = result;
            terminal.style.display = 'block';
        }).catch((error) => {
            console.log("Invoke error:", error);
            output.textContent = `Error: ${error}`;
        });
    });

    reset.addEventListener('click', function() {
        textarea.value = '';
        fileInput.value = '';  
        output.textContent = '';
        terminal.style.display = 'none';
        codedata.style.display = 'none';
    });
});


// DNA Motif Page JS

document.addEventListener("DOMContentLoaded", function() {
    const submit = document.querySelector("#Motif_submitbtn");
    const terminal = document.querySelector('.terminal');
    const textarea = document.querySelector('#Motif_seq-text');
    const motif = document.querySelector('#Motif');
    const output = document.querySelector('.Motif_outputs');
    const codedata = document.querySelector(".codearea");
    const reset = document.querySelector("#resetbtn");
    const fileInput = document.querySelector("#Motif_fasta_file_input");

    fileInput.addEventListener("change", async function() {
        const file = fileInput.files[0];

        if (!file) {
            textarea.value = 'Please select a file.';
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const fileContent = new TextDecoder().decode(arrayBuffer);
            textarea.value = fileContent;
        } catch (error) {
            textarea.value = `Error: ${error}`;
        }
    });

    submit.addEventListener('click', function() {
        const text = textarea.value;
        const motif_value = motif.value;

        if (!text.trim()) {
            output.textContent = 'There is no input';
            return;
        }

        if (!motif_value.trim()) {
            output.textContent = 'Please enter a motif';
            return;
        }

        invoke('dna_motif', { content: text, motif: motif_value }).then((result) => {
            output.textContent = result;
            terminal.style.display = 'block';
        }).catch((error) => {
            output.textContent = `Error: ${error}`;
        });
    });

    reset.addEventListener('click', function() {
        textarea.value = '';
        motif.value = '';
        output.textContent = '';
        terminal.style.display = 'none';
        codedata.style.display = 'none';
    });
});




// Point Mutations JS
document.addEventListener("DOMContentLoaded", function() {
    const submit = document.querySelector("#Point_submitbtn");
    const terminal = document.querySelector('.terminal');
    const codedata = document.querySelector(".codearea");
    const reset = document.querySelector("#resetbtn");
    const textarea = document.querySelector('#Point_seq-text');
    const output = document.querySelector('.Point_outputs');
    const fileInput = document.querySelector("#Point_fasta_file_input");

    fileInput.addEventListener("change", async function() {
        const file = fileInput.files[0];

        if (!file) {
            textarea.value = 'Please select a file.';
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const fileContent = new TextDecoder().decode(arrayBuffer);
            textarea.value = fileContent;
        } catch (error) {
            textarea.value = `Error: ${error}`;
        }
    });

    submit.addEventListener('click', function() {
        const text = textarea.value.trim();

        if (!text) {
            output.textContent = 'There is no input';
            return;
        }

        
        invoke('point_mutation', { content: text }).then((result) => {
            output.textContent = result;
            terminal.style.display = 'block';
        }).catch((error) => {
            output.textContent = `Error: ${error}`;
            terminal.style.display = 'block';
        });
    });

    reset.addEventListener('click', function() {
        textarea.value = '';
        output.textContent = '';
        terminal.style.display = 'none';
        codedata.style.display = 'none';
    });
});









// Profile Census Page JS
document.addEventListener("DOMContentLoaded", function() {
    const submit = document.querySelector("#ProCen_submitbtn");
    const reset = document.querySelector("#resetbtn");
    const textarea = document.querySelector("#ProCen_seq-text");
    const outputProfile = document.querySelector('.ProCen_profile');
    const outputConsensus = document.querySelector('.ProCen_consensus');
    const terminal = document.querySelector('.terminal');
    const codedata = document.querySelector(".codearea");
    const fileInput = document.querySelector("#ProCen_fasta_file_input");

    fileInput.addEventListener("change", async function() {
        const file = fileInput.files[0];

        if (!file) {
            textarea.value = 'Please select a file.';
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const fileContent = new TextDecoder().decode(arrayBuffer);
            textarea.value = fileContent;
        } catch (error) {
            textarea.value = `Error: ${error}`;
        }
    });

    submit.addEventListener('click', function() {
        const text = textarea.value.trim();

        if (!text) {
            outputProfile.textContent = 'There is no input';
            outputConsensus.textContent = '';
            return;
        }

        invoke('calculate_profile_matrix_and_consensus', { content: text }).then((result) => {
            const [profileMatrix, consensusSequence] = result;
            
            let profileText = "Profile Matrix:\n";
            for (const [nucleotide, counts] of Object.entries(profileMatrix)) {
                profileText += `${nucleotide}: ${counts.join(' ')}\n`;
            }

            outputProfile.textContent = profileText;
            outputConsensus.textContent = `Consensus Sequence: ${consensusSequence}`;
            terminal.style.display = 'block';
        }).catch((error) => {
            console.error('Error:', error);
            outputProfile.textContent = 'An error occurred while calculating the profile matrix and consensus sequence.';
            outputConsensus.textContent = '';
            terminal.style.display = 'block';
        });
    });

    reset.addEventListener('click', function() {
        textarea.value = '';
        outputProfile.textContent = '';
        outputConsensus.textContent = '';
        terminal.style.display = 'none';
        codedata.style.display = 'none';
    });
});

    



// Kmer Composition JS
document.addEventListener("DOMContentLoaded", function() {
    const submit = document.querySelector("#Kmer_comp_submitbtn");
    const reset = document.querySelector("#resetbtn");
    const textarea = document.querySelector("#Kmer_comp_seq-text");
    const outputProfile = document.querySelector('.Kmer_comp_outputs');
    const terminal = document.querySelector('.terminal');
    const codedata = document.querySelector(".codearea");
    const fileInput = document.querySelector("#Kmer_fasta_file_input");

    fileInput.addEventListener("change", async function() {
        const file = fileInput.files[0];

        if (!file) {
            textarea.value = 'Please select a file.';
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const fileContent = new TextDecoder().decode(arrayBuffer);
            textarea.value = fileContent;
        } catch (error) {
            textarea.value = `Error: ${error}`;
        }
    });

    submit.addEventListener('click', function() {
        const text = textarea.value.trim();

        if (!text) {
            outputProfile.textContent = 'There is no input';
            return;
        }

        const k = parseInt(document.querySelector("#kmer_length").value);

        if (isNaN(k) || k <= 0) {
            outputProfile.textContent = 'Please enter a valid k-mer length';
            return;
        }

        invoke('kmer_composition', { content: text, k: k }).then((result) => {
            const profileText = result.join(" ");
            outputProfile.textContent = profileText;
            terminal.style.display = 'block';
        }).catch((error) => {
            console.error('Error:', error);
            outputProfile.textContent = 'An error occurred while calculating the k-mer composition.';
            terminal.style.display = 'block';
        });
    });

    reset.addEventListener('click', function() {
        textarea.value = '';
        outputProfile.textContent = '';
        terminal.style.display = 'none';
        codedata.style.display = 'none';
    });
});





    // Protein_Mass_Calculation Page JS
    document.addEventListener("DOMContentLoaded", function() {
        const submit = document.querySelector("#Pro_Mass_submitbtn");
        const terminal = document.querySelector('.terminal');
        const codedata = document.querySelector(".codearea");
        const reset = document.querySelector("#resetbtn");
        const textarea = document.querySelector("#Pro_Mass_seq-text");
        const output = document.querySelector('.Pro_Mass_outputs');
        const fileInput = document.querySelector("#Pro_fasta_file_input");
    
        fileInput.addEventListener("change", async function() {
            const file = fileInput.files[0];
    
            if (!file) {
                textarea.value = 'Please select a file.';
                return;
            }
        
            try {
                const arrayBuffer = await file.arrayBuffer();
                const fileContent = new TextDecoder().decode(arrayBuffer);
                textarea.value = fileContent;
            } catch (error) {
                textarea.value = `Error: ${error}`;
            }
        });
        
        submit.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent form submission
            
            const text = textarea.value.trim();
        
            if (!text) {
                output.textContent = 'There is no input';
                return;
            }
    
            invoke('protein_mass', { sequence: text }).then((result) => {
                output.textContent = result;
                terminal.style.display = 'block';
            }).catch((error) => {
                output.textContent = `Error: ${error}`;
            });
        });
    
        reset.addEventListener('click', function() {
            textarea.value = '';
            output.textContent = '';
            terminal.style.display = 'none';
            codedata.style.display = 'none';
        });
    });
    
//  Translation page JS

document.addEventListener("DOMContentLoaded", function() {
    const submit = document.querySelector("#Translation_submitbtn");
    const terminal = document.querySelector('.terminal');
    const reset = document.querySelector("#resetbtn");
    const codedata = document.querySelector(".codearea");
    const textarea = document.querySelector('#Translation_seq-text');
    const output = document.querySelector('.Translation_outputs');
    const fileInput = document.querySelector("#Translation_fasta_file_input");

    fileInput.addEventListener("change", async function() {
        const file = fileInput.files[0];

        if (!file) {
            textarea.value = 'Please select a file.';
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const fileContent = new TextDecoder().decode(arrayBuffer);
            textarea.value = fileContent;
        } catch (error) {
            textarea.value = `Error: ${error}`;
        }
    });

    submit.addEventListener('click', function() {
        const text = textarea.value.trim();

        if (!text) {
            output.textContent = 'There is no input';
            return;
        }

        invoke('translation', { content: text }).then((result) => {
            output.textContent = result;
            terminal.style.display = 'block';
        }).catch((error) => {
            output.textContent = `Error: ${error}`;
        });
    });

    reset.addEventListener('click', function() {
        textarea.value = '';
        output.textContent = '';
        terminal.style.display = 'none';
        codedata.style.display = 'none';
    });
});















document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.querySelector("#fasta_file_input");
    const textarea = document.querySelector("#seq-text");
    const output = document.querySelector('.outputss');
    const submit = document.querySelector('#submitbtn');

    fileInput.addEventListener("change", async function() {
        const file = fileInput.files[0];

        if (!file) {
            textarea.value = 'Please select a file.';
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const fileContent = new TextDecoder().decode(arrayBuffer);
            textarea.value = fileContent;
        } catch (error) {
            textarea.value = `Error: ${error}`;
        }
    });

    submit.addEventListener('click', function() {
        const fileContent = textarea.value;

        if (!fileContent.trim()) {
            output.textContent = 'There is no input';
            return;
        }

        invoke('read_fasta', { content: fileContent }).then((result) => {
            const sequences = Object.values(result).join('\n');
            output.textContent = sequences;
        }).catch((error) => {
            output.textContent = `Error: ${error}`;
        });
    });
});



