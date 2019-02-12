window.onload = () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = "400";
    canvas.height = "400";
    ctx.save();
    ctx.fillStyle = "#dedede"
    ctx.rect(0, 0 , canvas.width, canvas.height);
    ctx.fill();
    ctx.restore();
}