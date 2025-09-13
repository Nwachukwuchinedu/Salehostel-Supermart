import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

const FileUpload = ({ 
  onFileSelect, 
  onFileRemove, 
  acceptedFileTypes = '*', 
  maxFileSize = 5, 
  multiple = false, 
  error = false,
  files = [],
  className = ''
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    onFileSelect(selectedFiles);
  };

  const handleRemoveFile = (index) => {
    onFileRemove(index);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={className}>
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          error 
            ? 'border-red-500 bg-red-50' 
            : 'border-customer-gray-300 hover:border-customer-primary hover:bg-customer-primary/5'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptedFileTypes}
          multiple={multiple}
          className="hidden"
        />
        <Upload className="w-10 h-10 text-customer-gray-400 mx-auto mb-3" />
        <p className="text-customer-gray-700 font-medium">
          Click to upload or drag and drop
        </p>
        <p className="text-customer-gray-500 text-sm mt-1">
          {acceptedFileTypes === '*' 
            ? `Any file type up to ${maxFileSize}MB` 
            : `${acceptedFileTypes.replace(/\*/g, '')} up to ${maxFileSize}MB`}
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-customer-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-customer-primary/10 flex items-center justify-center mr-3">
                  <Upload className="w-5 h-5 text-customer-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-customer-gray-900 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-customer-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFile(index)}
                className="text-customer-gray-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;