'use client'
import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
  multiple,
}: {
  onChange?: (files: File[]) => void;
  multiple?: boolean;
}) => {
  const [mounted, setMounted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      const filesToSet = multiple ? [...files, ...newFiles] : [newFiles[0]];
      setFiles(filesToSet);
      onChange && onChange(filesToSet);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: multiple ?? false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
      alert("File type not accepted. Please upload an audio file.");
    },
    accept: {
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
      "audio/*": [],
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-fit" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-4 sm:p-6 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          name="audio"
          multiple={multiple ?? false}
          accept="audio/*"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        {/* Background pattern – now safely contained */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-full h-full">
            <GridPattern />
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center z-10">
          <p className="font-sans font-bold text-neutral-700 dark:text-neutral-300 text-sm sm:text-base">
            Upload Mp3 Audio
          </p>
          <p className="font-sans font-normal text-neutral-400 dark:text-neutral-400 text-xs sm:text-sm mt-2 text-center">
            Drag and drop your file here or tap to upload
          </p>

          <div className="relative w-full mt-6 sm:mt-8 max-w-md mx-auto">
            {/* Uploaded file cards */}
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start p-3 sm:p-4 mt-3 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-2 sm:gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 truncate max-w-[60%]"
                    >
                      upload successfully
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit shrink-0 text-[10px] sm:text-xs text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-[10px] sm:text-xs md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400 gap-1">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800"
                    >
                      {file.type || "audio"}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}

            {/* Initial upload box */}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-20 sm:h-24 mt-4 w-full mx-auto rounded-md",
                  "shadow-[0px_10px_30px_rgba(0,0,0,0.08)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center text-xs sm:text-sm"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-600 dark:text-neutral-400 mt-1" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-20 sm:h-24 mt-4 w-full mx-auto rounded-md"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  // Fewer, smaller cells so it behaves better on mobile
  const columns = 20;
  const rows = 8;

  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={cn(
                "w-4 h-4 sm:w-6 sm:h-6 flex shrink-0 rounded-[2px]",
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_2px_rgba(255,255,255,0.9)_inset] dark:shadow-[0px_0px_1px_2px_rgba(0,0,0,0.9)_inset]"
              )}
            />
          );
        })
      )}
    </div>
  );
}
