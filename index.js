window.onload = () => {
    let fileListUrl = [];
    let colorData = [];
    const fileInput = document.querySelector('#file-input');
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const canvasWrapper = document.querySelector('.cp-image-canvas');
    const colorsElem = document.querySelector('#cp-colors');

    // function declaretion 
    const debounce = (collback) => {
        let timer;
        return () => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(collback, 300)
        }
    }
    // evemts
    fileInput.addEventListener('change', loadFile, false);
    window.addEventListener('resize', debounce(setCanvasSize), false);
    canvas.addEventListener('click', clickColor, false);
    canvas.addEventListener('mousemove', hoverColor, false);
    // 

    setCanvasSize();
    // color //////////////////
    function clickColor(event) {
        const CanvasOffset = canvas.getBoundingClientRect()
        const x = event.pageX - CanvasOffset.left;
        const y = event.pageY - CanvasOffset.top;
        const img_data = ctx.getImageData(x, y, 1, 1).data;
        const R = img_data[0];
        const G = img_data[1];
        const B = img_data[2];
        const rgb = R + ',' + G + ',' + B;
        const hex = rgbToHex(R, G, B);
    }
    
    function setCurrentColor (hex,rgb){
        const currentHex = document.getElementById("current-hex")
        currentHex.innerText = hex;
        const currentRgb = document.getElementById("current-rgb")
        currentRgb.innerText = rgb;
        const currentColor = document.getElementById("current-color")
        currentColor.style.backgroundColor =`#${hex}`;
        
    }

    function rgbToHex(R, G, B) {
        return toHex(R) + toHex(G) + toHex(B);
    }

    function toHex(n) {
        n = parseInt(n, 10);
        if (isNaN(n)) return "00";
        n = Math.max(0, Math.min(n, 255));
        return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
    }
// Todo add canvas for render curent color 
    function hoverColor(event) {
        const CanvasOffset = canvas.getBoundingClientRect()
        const x = event.pageX - CanvasOffset.left;
        const y = event.pageY - CanvasOffset.top;
        const img_data = ctx.getImageData(x, y, 1, 1).data;
        const R = img_data[0];
        const G = img_data[1];
        const B = img_data[2];
        const rgb = R + ',' + G + ',' + B;
        const hex = rgbToHex(R, G, B);
        setCurrentColor(hex, rgb)
    }
    // // //////////////////////
    function setCanvasSize() {
        canvas.width = canvasWrapper.clientWidth;
        canvas.height = canvasWrapper.clientHeight;
        if (fileListUrl.length > 0) {
            rederImages(fileListUrl)
        }
    }

    function loadFile(e) {
        const {
            files
        } = e.target
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) {
                continue
            }
            fileListUrl.push(URL.createObjectURL(file))
        }
        rederImages(fileListUrl);
    }

    function rederImages(images) {
        if (images instanceof Array) {
            countImages = images.length;
            for (let i = 0; i < countImages; ++i) {
                tempImage = new Image();
                tempImage.onload = () => {
                    ctx.drawImage(tempImage, 10, 10)
                }
                tempImage.src = images[i]
            }
        } else {
            console.log('somtings is vrong')
        }
    }
}