window.onload = () => {
    let fileListUrl = [];
    const fileInput = document.querySelector('#file-input');
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const canvasWrapper = document.querySelector('.cp-image-canvas')

    // function declaretion 
    const debounce = (collback) => {
        let timer;
        return  () => {
            if(timer){ clearTimeout(timer)}
            timer  = setTimeout(collback, 100)
        }
    }
    // evemts
    fileInput.addEventListener('change', loadFile, false);
    window.addEventListener('resize', debounce(setCanvasSize), false);
    // 

    setCanvasSize();

    
    function setCanvasSize () {
        canvas.width = canvasWrapper.clientWidth;
        canvas.height = canvasWrapper.clientHeight;
        if(fileListUrl.length > 0){
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