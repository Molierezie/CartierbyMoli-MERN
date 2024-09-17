import { useState } from "react";
import { toast } from "react-toastify";

const usePreviewImg = ()=>{

    const [imgUrl, setImgUrl] = useState(null);
	// const showToast = useShowToast();
	const handleImageChange = (e) => {

		// it's was return an array we take the first element
		const file = e.target.files[0];

		// the image have a type in our folder or image / webpg or an video
		// So we check if the file is an image
		if (file && file.type.startsWith("image/")) {


			// now we use a javasxcript method for use the base64 for our handleImage
			const reader = new FileReader();


// this code take our file that we selected and it's gonna turn in into base 64 string ( a long string)
// then we are going to be ale to get string base 64 and render in our react app

			reader.onloadend = () => {
				setImgUrl(reader.result);
			};

			reader.readAsDataURL(file);
		} else {
            toast.error("Please select an image file, Invalid file type");
			setImgUrl(null);
		}
	};
	return { handleImageChange, imgUrl, setImgUrl };
}

export default usePreviewImg