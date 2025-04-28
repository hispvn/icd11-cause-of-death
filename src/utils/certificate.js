import { PDFDocument, StandardFonts } from "pdf-lib";
import fontkit from '@pdf-lib/fontkit';

async function fillPdf(pdfFileTemplate,labels,customFont) {
    const reponsePDFBuffer = await pdfFileTemplate.arrayBuffer();

    const pdfDoc = await PDFDocument.load(reponsePDFBuffer);
    pdfDoc.registerFontkit(fontkit);

    const pages = pdfDoc.getPages();

    const PAGE_HEIGHT = pages[0].getSize().height;

    const font = await pdfDoc.embedFont(customFont !== null ? customFont : StandardFonts.Helvetica);
    const standardFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    

    // const HelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    // const FONT_SIZE = 12;
    // const pages = pdfDoc.getPages();
    // const PAGE_HEIGHT = pages[0].getSize().height;

    // pages[0].drawText(value, {
    //     x,
    //     y: PAGE_HEIGHT - y,
    //     size: FONT_SIZE,
    //     font
    // });

    // const qrCodeImage = await pdfDoc.embedPng(qrCodeImageFile);
    // pages[0].drawImage(qrCodeImage, {
    //     x: layout.qr.x,
    //     y: PAGE_HEIGHT - layout.qr.y,
    //     width: layout.qr.width,
    //     height: layout.qr.height,
    // });

    // const checkboxImageUrl = 'check-mark.jpg';
    // const checkboxImageBytes = await fetch(checkboxImageUrl).then( res => res.arrayBuffer() );
    // console.log(checkboxImageBytes);
    // const checkboxImage = await pdfDoc.embedPng(checkboxImageBytes);
    // console.log("image");
    // const checkmarkSymbol = '✓';
    Object.values(labels).map(({ label, value, page, valueType, coordinates, size }) => {
        if ( valueType === "text" ) {
            pages[page - 1].drawText( value.indexOf("#{") >= 0 ? label : value, {
                x: coordinates[0],
                y: PAGE_HEIGHT - coordinates[1],
                size,
                font: font
            });
        }
        else if ( valueType === "check" ) {
            pages[page - 1].drawText( value.indexOf("#{") >= 0 ? "X" : value, {
                x: coordinates[0],
                y: PAGE_HEIGHT - coordinates[1],
                size,
                font: standardFont
            });
        }
    });

    return pdfDoc;
}

const convertPdfDoc2FileURL = async pdfDoc => {
    let byteArray = await pdfDoc.save();
    let file = new Blob([byteArray], {
        type: "application/pdf;base64",
    });
    return URL.createObjectURL(file);
}

const showPage = async (pdfDoc, page_no) => {
    if ( pdfDoc ) {
        const binaryData = await pdfDoc.save();
        let _PDF_DOC;
        try {
            _PDF_DOC = await window.pdfjsLib.getDocument(binaryData).promise;
        } catch (e) {
            console.log(e);
        }



        const _CANVAS = document.querySelector("#pdf-canvas");
        var page = await _PDF_DOC.getPage(page_no);

        // original width of the pdf page at scale 1
        var pdf_original_width = page.getViewport({ scale: 1 }).width;
        // as the canvas is of a fixed width we need to adjust the scale of the viewport where page is rendered
        var scale_required = _CANVAS.width / pdf_original_width;

        // get viewport to render the page at required scale
        var viewport = page.getViewport({ scale: scale_required });

        // set canvas height same as viewport height
        _CANVAS.height = viewport.height;

        var render_context = {
            canvasContext: _CANVAS.getContext("2d"),
            viewport: viewport,
        };



        // render the page contents in the canvas
        try {
            await page.render(render_context);
            // await page_2.render(render_context_2);
        } catch (error) {
            alert(error.message);
        }

        

        if (pdfDoc.getPages().length > 1) {
            const _CANVAS_2 = document.querySelector("#pdf-canvas-2");
            var page_2 = await _PDF_DOC.getPage(2);
            
            // original width of the pdf page at scale 1
            var pdf_original_width_2 = page_2.getViewport({ scale: 1 }).width;
            // as the canvas is of a fixed width we need to adjust the scale of the viewport where page is rendered
            var scale_required_2 = _CANVAS_2.width / pdf_original_width_2;

            // get viewport to render the page at required scale
            var viewport_2 = page_2.getViewport({ scale: scale_required_2 });

            // set canvas height same as viewport height
            _CANVAS_2.height = viewport_2.height;

            var render_context_2 = {
                canvasContext: _CANVAS_2.getContext("2d"),
                viewport: viewport_2,
            };



            // render the page contents in the canvas
            try {
                // await page.render(render_context);
                await page_2.render(render_context_2);
            } catch (error) {
                alert(error.message);
            }
        }
        
    }
}

export {
    fillPdf,
    convertPdfDoc2FileURL,
    showPage
}