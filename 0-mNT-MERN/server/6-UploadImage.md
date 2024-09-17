# <font color="#00b0f0">1️⃣ - Upload Image</font> 

## 🤔 - <span style="background:#d3f8b6"><font color="#00b050">Multer ?</font></span>


- `explanation`


- `use case`	

## 👨🏾‍💻 - <span style="background:#b1ffff"><font color="#002060">Practice</font></span>


### <font color="#7f7f7f">demonstration multer</font>

🧩`middleware/multer.js` file


`Code Before & Task`

```jsx

```

`Solution ✅`

```js



import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";

const router = express.Router();

1️⃣ const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

2️⃣ const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

3️⃣ const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");


router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;




```

- 1️⃣ - `Ensure the uploads Directory Exists`
    - **const uploadDir = 'uploads**'
        - Defines the path to the uploads directory.
    - **if (!fs.existsSync(uploadDir)) { fs.mkdirSync(uploadDir); }**: 
        - Checks if the uploads directory exists. If it doesn't, it creates the directory. This ensures that the directory is available for storing uploaded files.

--

- 2️⃣ - `storage`
    - Configures how multer stores the files on disk
    - `destination`
        - Specifies the directory where the files should be stored 
        - **cb(null, uploadDir)**: Calls the callback function with null (for no error) and the directory where the files should be stored.
    - `filename`
        - Specifies how the file names should be constructed.
        - <span style="background:#fff88f"><font color="#e36c09">**path.extname(file.originalname)**</font></span>: 
            - Extracts the file extension from the original file name
            - **Why Extract the File Extension?**:
                - The file extension helps identify the type of file being uploaded (e.g., .jpg, .png, .webp). This is crucial for ensuring that the uploaded file is of an acceptable type.
                - By extracting the file extension, you can validate whether the file type is allowed before saving it to the server. For instance, only images might be allowed, and you can check if the extension is one of the allowed types
              - **How the filename works ?**:
                - ```js
                    const path = require('path');
                    const ext = path.extname('example.jpg');
                    console.log(ext); // Output: .jpg

        - **cb(null, ${file.fieldname}-${Date.now()}${extname})**: Constructs a new file name using the field name, current timestamp, and the original file extension. This helps in avoiding name conflicts.

--

- 3️⃣ - `fileFilter`
    - Filters the files that can be uploaded based on their file type and MIME type
    - **filetypes** :
        -  Regular expression to match allowed file extensions.
    - **mimetypes**:
        - [Ressource StackOverFlow ](https://www.youtube.com/watch?v=ob3-ivQx2Es&list=PL1BztTYDF-QM8jn9jXESmx2vJwSmhe7t9)


        - MIME stands for Multi-purpose Internet Mail Extensions. MIME types form a standard way of classifying file types on the Internet. Internet programs such as Web servers and browsers all have a list of MIME types, so that they can transfer files of the same type in the same way, no matter what operating system they are working in.
        A MIME type has two parts: a type and a subtype. They are separated by a slash (/). For example, the MIME type for Microsoft Word files is application and the subtype is msword. Together, the complete MIME type is application/msword.
        Although there is a complete list of MIME types, it does not list the extensions associated with the files, nor a description of the file type. This means that if you want to find the MIME type for a certain kind of file, it can be difficult. Sometimes you have to look through the list and make a guess as to the MIME type of the file you are concerned with.


    - <span style="background:#fff88f"><font color="#e36c09"> **const extname = path.extname(file.originalname).toLowerCase()**</font></span>
        - Extracts the file extension and converts it to lowercase.
    - <span style="background:#fff88f"><font color="#e36c09">**const mimetype = file.mimetype**;</font></span>
        - Gets the MIME type of the file.
    - <span style="background:#fff88f"><font color="#e36c09">**if (filetypes.test(extname) && mimetypes.test(mimetype))**</font></span>
        -  Checks if both the file extension and MIME type match the allowed types.
    - 
