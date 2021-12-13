const main = () => {
    const generateBtn = document.getElementById("generateBtn");
    const dataBox = document.getElementById("dataBox");
    const downloadBtn = document.getElementById("downloadBtn");
    const qrCode = document.getElementById("qrcode");
    const qrDiv = document.getElementById("qrdiv");

    const errorClassName = "error";
    const shakeClassName = "shake";
    const dataBoxClassName = "dataBox";
    const toHideClassName = "hide";
    const qrDivClassName = "qrdiv";

    const QR_CODE = new QRCode("qrcode", {
		width: 260,
		height: 260,
		colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.H,
	});

    generateBtn.onclick = (event) => {
		const data = dataBox.value;

		if (data) {
			generateQRCode(data);
		} else {
			markDataBoxError();
		}
	};

    dataBox.onfocus = (event) => {
		const classList = dataBox.classList;

		if (classList.contains(errorClassName)) {
			// Removing error class
			dataBox.className = dataBoxClassName;
		}
	};

    downloadBtn.onclick = (event) => {
		// Image tag
		const img = qrCode.getElementsByTagName("img")[0];
		// Canvas tag
		const canvas = qrCode.getElementsByTagName("canvas")[0];

		// Padding to QRCode
		const padding = 40;

		// Adding padding to width and height
		canvas.width = canvas.width + padding;
		canvas.height = canvas.height + padding;

		// Canvas context
		const context = canvas.getContext("2d");
		// Clearing previous content
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Making the background white
		context.fillStyle = "#ffffff";
		context.fillRect(0, 0, canvas.width, canvas.height);
		// Adding the image of QRCode
		// x and y are padding / 2
		context.drawImage(img, padding / 2, padding / 2);

		// Getting base64 url
		const image = canvas.toDataURL("image/png", 1);
		const filename = `QR_Code_${Date.now()}.png`;
		downloadImage(image, filename);
	};

    const markDataBoxError = () => {
		const prevClassName = dataBox.className;
		dataBox.className = `${prevClassName} ${errorClassName} ${shakeClassName}`;
		vibrate();
		setTimeout(() => {
			// Reset class
			dataBox.className = `${prevClassName} ${errorClassName}`;
		}, 500);
	};

    function generateQRCode(data) {
		QR_CODE.clear();
		QR_CODE.makeCode(data);
		// Show QRCode div
		qrDiv.className = qrDivClassName;
	}

    function vibrate() {
		if (Boolean(window.navigator.vibrate)) {
			window.navigator.vibrate([100, 100, 100]);
		}
	}

    function downloadImage(image, filename) {
		// Creating hidden <a> tag to download
		const element = document.createElement("a");
		element.setAttribute("href", image);
		element.setAttribute("download", filename);
		element.setAttribute("class", toHideClassName);
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
};

main();
