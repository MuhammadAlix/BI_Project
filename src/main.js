const invoke = window.__TAURI__.invoke;



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
    const DNA = document.querySelector('.DNA');
    const DNA_data = document.querySelector('.DNA-data');
    const RNA = document.querySelector('.RNA');
    const RNA_data = document.querySelector('.RNA-data');

    DNA.addEventListener('click', function() {
        DNA_data.style.display = "block";
        RNA_data.style.display = "none";

    });
    RNA.addEventListener('click', function() {
        RNA_data.style.display = "block";
        DNA_data.style.display="none";    
    });
})

//DNA Tools Handeling

document.addEventListener("DOMContentLoaded", function(){

    const submit = document.querySelector("#submitbtn");
    const terminal = document.querySelector('.terminal');


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

document.addEventListener("DOMContentLoaded", function(){

    const submit = document.querySelector("#NC_submitbtn");
    const terminal = document.querySelector('.terminal');

        submit.addEventListener('click', function() {
            var textarea = document.querySelector('#NC_seq-text');
            var output = document.querySelector('.NC_outputs');
            var text = textarea.value;
            invoke('n_count', {seq: text}).then((result) => output.textContent=result);
            terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
        });
    })

    document.addEventListener("DOMContentLoaded",function(){
        const codedata = document.querySelector(".codearea");
        const reset = document.querySelector("#resetbtn");
        const textarea = document.querySelector("#NC_seq-text");
        const terminal = document.querySelector('.terminal');
    
        reset.addEventListener('click',function(){
            textarea.value = '';
            terminal.style.display='none';
            codedata.style.display='none';
        });
    });





// Complementary Page JS

document.addEventListener("DOMContentLoaded", function(){

    const submit = document.querySelector("#Comp_submitbtn");
    const terminal = document.querySelector('.terminal');

        submit.addEventListener('click', function() {
            var textarea = document.querySelector('#Comp_seq-text');
            var output = document.querySelector('.Comp_outputs');
            var text = textarea.value;
            invoke('complementary', {seq: text}).then((result) => output.textContent=result);
            terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
        });
    })

    document.addEventListener("DOMContentLoaded",function(){
        const codedata = document.querySelector(".codearea");
        const reset = document.querySelector("#resetbtn");
        const textarea = document.querySelector("#Comp_seq-text");
        const terminal = document.querySelector('.terminal');

        reset.addEventListener('click',function(){
            textarea.value = '';
            terminal.style.display='none';
            codedata.style.display='none';
        });
    });



// GC Page JS

document.addEventListener("DOMContentLoaded", function(){

    const submit = document.querySelector("#GC_submitbtn");
    const terminal = document.querySelector('.terminal');

        submit.addEventListener('click', function() {
            var textarea = document.querySelector('#GC_seq-text');
            var output = document.querySelector('.GC_outputs');
            var text = textarea.value;
            invoke('gc', {seq: text}).then((result) => output.textContent=result);
            terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
        });
    })

    document.addEventListener("DOMContentLoaded",function(){
        const codedata = document.querySelector(".codearea");
        const reset = document.querySelector("#resetbtn");
        const textarea = document.querySelector("#GC_seq-text");
        const terminal = document.querySelector('.terminal');

        reset.addEventListener('click',function(){
            textarea.value = '';
            terminal.style.display='none';
            codedata.style.display='none';
        });
    });





// Transcription Page JS

document.addEventListener("DOMContentLoaded", function(){

    const submit = document.querySelector("#Transcription_submitbtn");
    const terminal = document.querySelector('.terminal');

        submit.addEventListener('click', function() {
            var textarea = document.querySelector('#Transcription_seq-text');
            var output = document.querySelector('.Transcription_outputs');
            var text = textarea.value;
            invoke('transcription', {seq: text}).then((result) => output.textContent=result);
            terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
        });
    })

    document.addEventListener("DOMContentLoaded",function(){
        const codedata = document.querySelector(".codearea");
        const reset = document.querySelector("#resetbtn");
        const textarea = document.querySelector("#Transcription_seq-text");
        const terminal = document.querySelector('.terminal');

        reset.addEventListener('click',function(){
            textarea.value = '';
            terminal.style.display='none';
            codedata.style.display='none';
        });
    });





// DNA Motif Page JS

document.addEventListener("DOMContentLoaded", function(){

    const submit = document.querySelector("#Motif_submitbtn");
    const terminal = document.querySelector('.terminal');

        submit.addEventListener('click', function() {
            var textarea = document.querySelector('#Motif_seq-text');
            var motif = document.querySelector('#Motif');
            var output = document.querySelector('.Motif_outputs');
            var text = textarea.value;
            var motif_value=motif.value
            invoke('dna_motif', {seq: text,motif: motif_value}).then((result) => output.textContent=result);
            terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
        });
    })

    document.addEventListener("DOMContentLoaded",function(){
        const codedata = document.querySelector(".codearea");
        const reset = document.querySelector("#resetbtn");
        const textarea = document.querySelector("#Motif_seq-text");
        const terminal = document.querySelector('.terminal');

        reset.addEventListener('click',function(){
            textarea.value = '';
            terminal.style.display='none';
            codedata.style.display='none';
        });
    });



// Point Mutations JS

document.addEventListener("DOMContentLoaded", function(){

    const submit = document.querySelector("#Point_submitbtn");
    const terminal = document.querySelector('.terminal');

        submit.addEventListener('click', function() {
            var textarea = document.querySelector('#Point1_seq-text');
            var textarea2 = document.querySelector('#Point2_seq-text');
            var output = document.querySelector('.Point_outputs');
            var Point1_value = textarea.value;
            var Point2_value=textarea2.value;
            invoke('point_mutation', {seq1: Point1_value,seq2: Point2_value}).then((result) => output.textContent=result);
            terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
        });
    })

    document.addEventListener("DOMContentLoaded",function(){
        const codedata = document.querySelector(".codearea");
        const reset = document.querySelector("#resetbtn");
        var textarea = document.querySelector('#Point1_seq-text');
        var textarea2 = document.querySelector('#Point2_seq-text');
        const terminal = document.querySelector('.terminal');

        reset.addEventListener('click',function(){
            textarea.value = '';
            textarea2.value='';
            terminal.style.display='none';
            codedata.style.display='none';
        });
    });