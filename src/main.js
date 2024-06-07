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
        var cw = w + dx; // Update width calculation to resize from left to right
        if (cw > 100 && cw < window.innerWidth - 100) { // Set minimum and maximum code area width
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
