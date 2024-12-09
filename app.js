// Referencias a los elementos del DOM
const name_tt_element = document.getElementById("name_tt");
const name_os_element = document.getElementById("name_os");
const contrato_element = document.getElementById("contrato");
const correott_element = document.getElementById("correott");
const correo_os_element = document.getElementById("correo_os");
const fecha_activacion_element = document.getElementById("fecha_activacion");
const previous_element = document.getElementById("previous");
const after_element = document.getElementById("after");
const universidad_element = document.getElementById("universidad");


document.getElementById("download").addEventListener("click", async () => {
    // Obtener los valores de los elementos y transformarlos a mayúsculas
    const name_tt_value = name_tt_element.value.toUpperCase();
    const name_os_value = name_os_element.value.toUpperCase();
    const contrato_value = contrato_element.value.toUpperCase();
    const correott_value = correott_element.value.toLowerCase(); // Convertir a minúsculas
    const correo_os_value = correo_os_element.value.toLowerCase(); // Convertir a minúsculas
    const fecha_activacion_value = fecha_activacion_element.value.toUpperCase();
    const previous_value = previous_element.value.toUpperCase();
    const after_value = after_element.value.toUpperCase();
    const universidad_value = universidad_element.value.toUpperCase();
    const fechaCartaRaw = new Date(); // Obtiene la fecha actual
    const fechaCarta = fechaCartaRaw.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    console.log(name_os_value)

    const fecha_activacion_formateada = new Date(fecha_activacion_value).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });


    if (!name_tt_value || !contrato_value || !correott_value || !fecha_activacion_value || !previous_value || !after_value || !universidad_value) {
        alert("Por favor completa todos los campos requeridos.");
        return;
    } else {
        if (!name_os_value || !correo_os_value){

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
        
            // Función para justificar texto
            const addJustifiedText = (doc, text, x, y, maxWidth, lineHeight) => {
                const words = text.split(" ");
                let line = "";
                const spaceWidth = doc.getTextWidth(" ");
        
                words.forEach((word) => {
                    const testLine = line + word + " ";
                    const testWidth = doc.getTextWidth(testLine);
        
                    if (testWidth > maxWidth) {
                        const gaps = line.split(" ").length - 1;
                        const extraSpace = (maxWidth - doc.getTextWidth(line.trim())) / gaps;
        
                        let currentX = x;
                        line.split(" ").forEach((w, i) => {
                            doc.text(w, currentX, y);
                            currentX += doc.getTextWidth(w) + spaceWidth + (i < gaps ? extraSpace : 0);
                        });
        
                        y += lineHeight;
                        line = word + " ";
                    } else {
                        line = testLine;
                    }
                });
        
                if (line.trim()) {
                    doc.text(line.trim(), x, y);
                }
            };
        
            // Agregar logo
            const logo = await fetch("logo.png")
                .then((res) => res.blob())
                .then((blob) => URL.createObjectURL(blob));
            pdf.addImage(logo, "PNG", 10, 8, 50, 25); // Ajustar tamaño y posición del logo
        
            // Agregar folio y fecha
            pdf.setFont("Times New Roman", "normal");
            pdf.setFontSize(12);
            pdf.text(`Ciudad de México a ${fechaCarta}`, 190, 20, { align: "right" });
        
            // Título
            pdf.setFontSize(14);
            pdf.text("SOLICITUD DE AMPLIACIÓN", 105, 67, { align: "center" });
        
            pdf.setFontSize(12);
            pdf.text("A quien corresponda:", 10, 80, { align: "left"});
        
            // Contenido
            // Contenido
            pdf.setFontSize(12);
            const texto = `Por medio de la presente, yo ${name_tt_value } en mi carácter de Acreditado, solicitó, en términos de la Cláusula Tercera inciso (i) del contrato ${contrato_value} de fecha ${fecha_activacion_formateada}, una ampliación al Monto de la línea de crédito otorgada la cual asciende a un monto de $${previous_value}, la cual se ampliará hasta llegar a la cantidad de $${after_value}`;
            addJustifiedText(pdf, texto, 10, 95, 180, 8);
        
            const texto2 = `El monto en comentó será utilizado para financiar mis estudios en  ${universidad_value}.`;
            addJustifiedText(pdf, texto2, 10, 130, 180, 8);
        
            const texto3 = `Por lo anterior, en caso de que sea acordada la ampliación nos obligamos en los términos del contrato antes mencionado reconociendo las obligaciones preexistentes.`;
            addJustifiedText(pdf, texto3, 10, 140, 180, 8);
        
            pdf.text("Atentamente", 105, 190, { align: "center" });
        
            // Sección de firmas y correos
            pdf.setFontSize(8);


            // Coordenadas del rectángulo
            const x = 85; // Coordenada X del borde
            const y = 205; // Coordenada Y del borde
            const width = 40; // Ancho del rectángulo
            const height = 35; // Altura del rectángulo

            // Dibujar el rectángulo
            pdf.setDrawColor(0); // Color del borde (negro)
            pdf.rect(x, y, width, height); // Rectángulo (x, y, ancho, alto)

        
            // Firma del suscriptor
            const suscriptorX = 105; // Ajusta el valor para centrar en la columna izquierda

            pdf.text("FIRMAMEX", suscriptorX, 220, { align: "center" });
            pdf.text(`${correott_value}`, suscriptorX, 225, { align: "center" }); // Correo en minúsculas
            pdf.text("STROKE", suscriptorX, 230, { align: "center" });


            pdf.setFontSize(10);
            pdf.text("_____________________________", suscriptorX, 240, { align: "center" });
            pdf.text(`${name_tt_value}`, suscriptorX, 255, { align: "center" }); // Nombre en mayúsculas
            pdf.save(`${contrato_value}_solicitud_ampliacion.pdf`);
        

        } else {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
        
            // Función para justificar texto
            const addJustifiedText = (doc, text, x, y, maxWidth, lineHeight) => {
                const words = text.split(" ");
                let line = "";
                const spaceWidth = doc.getTextWidth(" ");
        
                words.forEach((word) => {
                    const testLine = line + word + " ";
                    const testWidth = doc.getTextWidth(testLine);
        
                    if (testWidth > maxWidth) {
                        const gaps = line.split(" ").length - 1;
                        const extraSpace = (maxWidth - doc.getTextWidth(line.trim())) / gaps;
        
                        let currentX = x;
                        line.split(" ").forEach((w, i) => {
                            doc.text(w, currentX, y);
                            currentX += doc.getTextWidth(w) + spaceWidth + (i < gaps ? extraSpace : 0);
                        });
        
                        y += lineHeight;
                        line = word + " ";
                    } else {
                        line = testLine;
                    }
                });
        
                if (line.trim()) {
                    doc.text(line.trim(), x, y);
                }
            };
        
            // Agregar logo
            const logo = await fetch("logo.png")
                .then((res) => res.blob())
                .then((blob) => URL.createObjectURL(blob));
            pdf.addImage(logo, "PNG", 10, 8, 50, 25); // Ajustar tamaño y posición del logo
        
            // Agregar folio y fecha
            pdf.setFont("Times New Roman", "normal");
            pdf.setFontSize(12);
            pdf.text(`Ciudad de México a ${fechaCarta}`, 190, 20, { align: "right" });
        
            // Título
            pdf.setFontSize(14);
            pdf.text("SOLICITUD DE AMPLIACIÓN", 105, 67, { align: "center" });
        
            pdf.setFontSize(12);
            pdf.text("A quien corresponda:", 10, 80, { align: "left"});
        
            // Contenido
            // Contenido
            pdf.setFontSize(12);
            const texto = `Por medio de la presente, yo ${name_tt_value } en mi carácter de Acreditado, y en su carácter de Obligado Solidario ${name_os_value } solicitó, en términos de la Cláusula Tercera inciso (i) del contrato ${contrato_value} de fecha ${fecha_activacion_formateada}, una ampliación al Monto de la línea de crédito otorgada la cual asciende a un monto de $${previous_value}, la cual se ampliará hasta llegar a la cantidad de $${after_value}`;
            addJustifiedText(pdf, texto, 10, 95, 180, 8);
        
            const texto2 = `El monto en comentó será utilizado para financiar mis estudios en  ${universidad_value}.`;
            addJustifiedText(pdf, texto2, 10, 135, 180, 8);
        
            const texto3 = `Por lo anterior, en caso de que sea acordada la ampliación nos obligamos en los términos del contrato antes mencionado reconociendo las obligaciones preexistentes.`;
            addJustifiedText(pdf, texto3, 10, 145, 180, 8);
        
            pdf.text("Atentamente", 105, 190, { align: "center" });
        
            // Sección de firmas y correos
            pdf.setFontSize(8);
        
            // Firma del suscriptor

            // Coordenadas del rectángulo
            const x = 35; // Coordenada X del borde
            const y = 215; // Coordenada Y del borde
            const width = 50; // Ancho del rectángulo
            const height = 30; // Altura del rectángulo

            // Dibujar el rectángulo
            pdf.setDrawColor(0); // Color del borde (negro)
            pdf.rect(x, y, width, height); // Rectángulo (x, y, ancho, alto)


            pdf.text("FIRMAMEX", 60, 220, { align: "center" });
            pdf.text(`${correott_value}`, 60, 230, { align: "center" }); // Correo en minúsculas
            pdf.text("STROKE", 60, 240, { align: "center" });

            pdf.setFontSize(9);
            pdf.text("_____________________________", 60, 250, { align: "center" });
            pdf.text(`${name_tt_value}`, 60, 255, { align: "center" }); // Nombre en mayúsculas


            pdf.setFontSize(8);

            // Posiciones para el texto y el rectángulo
            const x2 = 125; // Coordenada X del borde
            const y2 = 215; // Coordenada Y del borde
            const width2 = 50; // Ancho del borde
            const height2 = 30; // Altura del borde
            // Dibujar el borde
            pdf.rect(x2, y2, width2, height2); // Rectángulo (x, y, ancho, alto)

            pdf.text("FIRMAMEX", 150, 220, { align: "center" });
            pdf.text(`${correo_os_value}`, 150, 230, { align: "center" }); // Correo en minúsculas
            pdf.text("STROKE", 150, 240, { align: "center" });

            pdf.setFontSize(9);
            // Firma del aval
            pdf.text("_____________________________", 150, 250, { align: "center" });
            pdf.text(`${name_os_value}`, 150, 255, { align: "center" }); // Nombre en mayúsculas
        
            pdf.save(`${contrato_value}_solicitud_ampliacion.pdf`);

        }
    }  
    
});
