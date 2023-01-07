import html2canvas from "html2canvas";



export function htmlToPNG(id: string){
    const ref = document.getElementById("app");
    if(ref !== null)
    html2canvas(ref).then((canvas) => {
        const base64Image = canvas.toDataURL("image/png");
        var anchor = document.createElement('a');
        anchor.setAttribute("href", base64Image);
        anchor.setAttribute("download", "card.png");
        anchor.click();
        anchor.remove();
    });

}

export function htmlToJPEG(id: string){
    const ref = document.getElementById("app");
    if(ref !== null)
    html2canvas(ref).then((canvas) => {
        const base64Image = canvas.toDataURL("image/jpeg");
        var anchor = document.createElement('a');
        anchor.setAttribute("href", base64Image);
        anchor.setAttribute("download", "card.jpeg");
        anchor.click();
        anchor.remove();
    });

}