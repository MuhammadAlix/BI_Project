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
        if (DNA_data.style.display === "none") {
            DNA_data.style.display = "block";
            RNA_data.style.display = "none";
        } else {
            DNA_data.style.display = "none";
        }
    });
    RNA.addEventListener('click', function() {
        if (RNA_data.style.display === "none") {
            RNA_data.style.display = "block";
            DNA_data.style.display="none";
        } else {
            RNA_data.style.display = "none";
        }
    });
});


// input area click functionalities

document.addEventListener("DOMContentLoaded",function(){
    const code = document.querySelector("#codebtn");
    const codedata = document.querySelector(".codearea");
    const reset = document.querySelector("#resetbtn");
    const textarea = document.querySelector("#seq-text");


    code.addEventListener('click',function(){
        if(codedata.style.display==="none"){
            codedata.style.display = "flex";
        }else {
            codedata.style.display = "none";
        }
    });

    reset.addEventListener('click',function(){
        textarea.value = '';
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
        if (rust_code.style.display === 'none') {
            rust_code.style.display = 'block';
            python_code.style.display = 'none';
            rust.style.backgroundColor = '#e6edf3';
            rust.style.border = '1px solid #e6edf3';
            rust.style.color = '#656d76';
            python.style.backgroundColor = '#656d76';
            python.style.border = '1px solid #656d76';
            python.style.color = '#e6edf3';
        } else {
            rust_code.style.display = 'none';
        }
    });

    python.addEventListener('click', function() {
        if (python_code.style.display === 'none') {
            python_code.style.display = 'block';
            rust_code.style.display = 'none';
            python.style.backgroundColor = '#e6edf3';
            python.style.border = '1px solid #e6edf3';
            python.style.color = '#656d76';
            rust.style.backgroundColor = '#656d76';
            rust.style.border = '1px solid #656d76';
            rust.style.color = '#e6edf3';
        } else {
            python_code.style.display = 'none';
        }
    });

    copy.addEventListener('click', function() {
        if (python_code.style.display === "block") {
            navigator.clipboard.writeText(python_code.innerText)
                .then(() => {
                    console.log('Python code copied to clipboard');
                })
                .catch(err => {
                    console.error('Failed to copy Python code: ', err);
                });
        } else {
            navigator.clipboard.writeText(rust_code.innerText)
                .then(() => {
                    console.log('Rust code copied to clipboard');
                })
                .catch(err => {
                    console.error('Failed to copy Rust code: ', err);
                });
        }
    });
});



// submit event


document.addEventListener("DOMContentLoaded", function() {
    const submit = document.querySelector('.submit');
    const terminal = document.querySelector('.terminal');

    submit.addEventListener('click', function() {
        var textarea = document.querySelector('#seq-text');
        var output = document.querySelector('.outputss');
        var text = textarea.value;
        invoke('n_count', {seq: text}).then((result) => output.textContent=result);
        terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
    });
});

