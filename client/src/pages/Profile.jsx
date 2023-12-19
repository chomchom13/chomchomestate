import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]); // this [file] means whenever the content of file changes, run this useEffect hook

  const handleFileUpload = (file) => {
    const storage = getStorage(app); // the app we exported from firebase.js
    const fileName = new Date().getTime + file.name; // so that we always have an unique file name ( so it doesn't show error if the user uploads the same file )
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // we get a snapshot ( which is a piece of information for every state change )
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // calculating the percentage of upload done
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // get the downloadURL of the pic that the use selected
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      {/* for the <h1> tag, we use text-center but for the <img> tag, we use the self-center to bring it to the center */}
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* This reference (fileRef) allows you to interact with the input element programmatically */}
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        {/* accept='image/*' means this is going to accept only images */}
        {/* for the <img> tag, we use the self-center to bring it to the center unlike the text-center that we use for the <h1> tag */}
        {/* In the img tag, you have an onClick event that triggers the click method on the fileRef.current when the image is clicked */}
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar} // if formData.avatar exists, then it will show it otherwise currentUser.avatar
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Upload Image ( upload an image less than 1 mb )</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image Succesfully Uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer ">Delete account</span>
        <span className="text-red-700 cursor-pointer ">Sign out</span>
      </div>
    </div>
  );
}
