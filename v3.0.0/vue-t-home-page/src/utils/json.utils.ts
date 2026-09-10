export function fnDownloadJSON(jsonString: string, fileName: string = "data.json") {
	// Crear un Blob a partir del string JSON
	const blob = new Blob([jsonString], { type: "application/json" });
	// Generar una URL temporal para el Blob
	const url = URL.createObjectURL(blob);
	// Crear un elemento <a> y configurar sus atributos
	const a = document.createElement("a");
	a.href = url;
	a.download = fileName;
	// Agregar el elemento al documento (opcional)
	document.body.appendChild(a);
	// Simular un click para iniciar la descarga
	a.click();
	// Limpiar: eliminar el enlace y revocar la URL
	a.remove();
	URL.revokeObjectURL(url);
}
